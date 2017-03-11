import os
import pandas as pd
from django.http import JsonResponse

df = pd.read_csv(os.getcwd()+'/hr_analytics/HR_comma_sep.csv')

# Create your views here.








def index(request):
    return JsonResponse(df.to_dict())