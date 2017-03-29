import os
import pandas as pd
from django.http import JsonResponse
import pdb

# Create your views here.
import models

import json
from bson import ObjectId


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)



def index(request):
	sk = models.ScrapeKaggle()
	datasets = sk.get_datasets()

	return JsonResponse({'datasets':JSONEncoder().encode(list(datasets))})
	


