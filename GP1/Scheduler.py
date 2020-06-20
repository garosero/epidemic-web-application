import logging
import logging.config
import json
from crawler import Covid19_Crawler

class Scheduler:
    def __init__(self):
        self.fitterpath = ''
        self.diseases = {
            'covid19': Covid19_Crawler()
        }


    def runCrawler(self):
        for disease, crawler in self.diseases.items():
            raw_data = crawler.crawl()
            timeseries_data = crawler.toTimeSeries(raw_data)
            crawler.saveData(timeseries_data, disease)


if __name__ == "__main__":
    config = json.load(open('logger.json'))
    logging.config.dictConfig(config)
    logger = logging.getLogger(__name__)

    logger.info("Scheduler Start")
    try:
        sch = Scheduler()
        sch.runCrawler()
    except Exception as e:
        logger.warning(e)
    logger.info("Scheduler End")
