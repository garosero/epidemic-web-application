import pymysql
import unittest
from crawler import Covid19_Crawler
from datetime import datetime, timezone, timedelta


class Covid19_CrawlerTest(unittest.TestCase):
    test_crawler = Covid19_Crawler()
    test_raw_data = test_crawler.crawl()
    test_timeseries_data = test_crawler.toTimeSeries(test_raw_data)
    test_countryList = test_crawler.loadCountryList()


    def test_is_null(self):
        ''' Test#1-1 데이터 중 None 값이 있는지 확인
        '''

        for data in Covid19_CrawlerTest.test_raw_data:
            for k, v in data.items():
                self.assertIsNotNone(v)


    def test_above_zero(self):
        ''' Tes#1-2 확진자, 사망자, 회복 인원 데이터 값이 0 이상인가?
        '''
        for data in Covid19_CrawlerTest.test_raw_data:
            self.assertGreaterEqual(data['confirmed'], 0)
            self.assertGreaterEqual(data['death'], 0)
            self.assertGreaterEqual(data['recovered'], 0)


    def test_is_name_valid(self):
        ''' Test#1-3 크롤링한 국가 이름이 DB에 저장된 국가인가?
        '''
        for data in Covid19_CrawlerTest.test_raw_data:
            self.assertIn(data['country_name'], Covid19_CrawlerTest.test_countryList)


    def test_toTimeSeries(self):
        ''' Test#2 크롤링한 날짜가 TW기준 1일 전 날짜인가?
        '''
        correct_date = (datetime.now(timezone.utc) + timedelta(hours=8)).date() - timedelta(days=1)

        for data in Covid19_CrawlerTest.test_timeseries_data:
            self.assertEqual(data['days'], correct_date)


    def test_saveData(self):
        ''' Test#3 크롤링한 데이터와 DB에 저장된 데이터의 갯수가 같은가?
        '''
        with Covid19_CrawlerTest.test_crawler.DB.cursor(pymysql.cursors.DictCursor) as cursor:
            curr_date = (datetime.now(timezone.utc) + timedelta(hours=8)).date() - timedelta(days=1)
            sql = f"SELECT * FROM CASES WHERE days='{curr_date}'"
            cursor.execute(sql)
            result = cursor.fetchall()

            # 오늘 크롤링한 데이터와 DB에 저장된 갯수가 일치하는지 확인
            self.assertEqual(len(result), len(Covid19_CrawlerTest.test_timeseries_data))





if __name__ == "__main__":
    unittest.main(verbosity=2)
