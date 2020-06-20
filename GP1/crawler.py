from bs4 import BeautifulSoup
import requests
import re
import json
import pymysql
from datetime import datetime, timezone, timedelta
from name_map import covid19_country_name_map


class Crawler:
    host = 'gp1.cwoqkciaiowv.ap-northeast-2.rds.amazonaws.com'
    port = 3306
    username = 'GP1_T6'
    database = 'GP1_T6_DB'
    password = 'gp1_t6_pw'


    def __init__(self):
        self.DB = pymysql.connect(Crawler.host, user=Crawler.username, passwd=Crawler.password, db=Crawler.database, port=Crawler.port, use_unicode=True, charset='utf8')
        self.disease_name = ''


    def loadCountryList(self):
        with self.DB.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("SELECT * FROM COUNTRY")
            result = cursor.fetchall()
            countryList = []

            for data in result:
                countryList.append(data['country_name'])

        return countryList


    def toTimeSeries(self, raw_data):
        ''' 주어진 raw_data를 시계열 데이터로 전환한다. 기본 한국표준시
        '''
        KST_time = datetime.now(timezone.utc) + timedelta(hours=9)
        date = KST_time.date()

        for data in raw_data:
            data['days'] = date

        return raw_data


    def saveData(self, timeseries_data, disease_name):
        ''' 주어진 데이터를 DB CASES 테이블에 저장한다.
        '''
        with self.DB.cursor() as cursor:
            for data in timeseries_data:
                sql = f"""
                        INSERT IGNORE INTO CASES
                            (country_name, disease_name, days, confirmed, death, recovered)
                        VALUES ('{data['country_name']}', '{disease_name}', '{data['days']}', {data['confirmed']}, {data['death']}, {data['recovered']})
                        """
                cursor.execute(sql)
            self.DB.commit()
        self.DB.close()


class Covid19_Crawler(Crawler):
    def __init__(self):
        super().__init__()
        self.srcURL = 'https://ncov.dxy.cn/ncovh5/view/en_pneumonia?from=dxy&source=&link=&share='
        self.disease_name = 'covid19'


    def toTimeSeries(self, raw_data):
        ''' 주어진 raw_data를 시계열 데이터로 전환한다.
        데이터 소스의 시간대가 대만시간 기준 1일 전
        '''
        TW_time = datetime.now(timezone.utc) + timedelta(hours=8)
        date = TW_time.date() - timedelta(days=1)

        for data in raw_data:
            data['days'] = date

        return raw_data


    def crawl(self):
        req = requests.get(self.srcURL)
        soup = BeautifulSoup(req.content, 'lxml')
        worldwide_info = re.search(r'\[(.*)\]', str(soup.find('script', attrs={'id': 'getListByCountryTypeService2true'})))
        worldwide_info = json.loads(worldwide_info.group(0))

        covid19_raw_data = []

        for info in worldwide_info:
            provinceName = info['provinceName']
            # provinceName이 name map에 없을 경우 해당 데이터 제외하고 진행
            if provinceName in covid19_country_name_map:
                country_name = covid19_country_name_map[provinceName]
            else:
                continue

            if country_name is None or info['confirmedCount'] is None or info['deadCount'] is None or info['curedCount'] is None:
                raise Exception("데이터 중 None값 존재")
            if info['confirmedCount'] < 0 or info['deadCount'] < 0 or info['curedCount'] < 0:
                raise Exception("Wrong Data value")

            covid19_raw_data.append(
                {
                    'country_name': country_name,
                    'confirmed': info['confirmedCount'],
                    'death': info['deadCount'],
                    'recovered': info['curedCount']
                }
            )

        return covid19_raw_data


if __name__ == "__main__":
    crawler = Covid19_Crawler()
    crawl_data = crawler.crawl()
    crawl_timeseries = crawler.toTimeSeries(crawl_data)
    crawler.saveData(crawl_timeseries, crawler.disease_name)
    print("Crawling done")
