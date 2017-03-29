from __future__ import unicode_literals

from django.db import models
import requests
import json
import pdb
from mongoengine import *
from django.conf import settings
import pandas as pd
import datetime


db = settings.DB


# Create your models here.

# Scrap Kaggle..

class ScrapeKaggle(object):
	"""docstring for ScrapKaggle"""
	def __init__(self):
		super(ScrapeKaggle, self).__init__()



	def scrape(self,counter=1,url = 'https://www.kaggle.com/datasets.json?sortBy=hottest&group=all&page=1'):
		
		if counter == 1:
			db.datasets.delete_many({})
		r=requests.Session()
		r.headers.update({"User-Agent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36"})

		r  = requests.get(url)

		

		json_doc = r.content

		reactJson=json.loads(json_doc)
		totalDatasetListItems = reactJson['totalDatasetListItems']
		dataSets = reactJson['datasetListItems']

		ds_df = pd.DataFrame(dataSets)
		ds_df['created_at'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')


		numOfPages = int(totalDatasetListItems/20)

		db.datasets.insert_many(ds_df.to_dict('records'))
		
		print('page'+str(counter)+' was scrapped..')
		
		if counter == numOfPages:
			return True
			


		return self.scrape(counter+1,url='https://www.kaggle.com/datasets.json?sortBy=hottest&group=all&page=' + str(counter+1))
		# try:

		# except Exception as e:
		# 	return False


	def get_datasets(self):
		datasets = db.datasets.find({"isFeatured" : True}).limit(5)
		return datasets
