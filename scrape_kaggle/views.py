import os
import pandas as pd
from django.http import JsonResponse
import pdb

# Create your views here.
import models



def index(request):
	sk = models.ScrapeKaggle()
	return JsonResponse({'dumped':sk.scrape()})
	
