import models

def my_scheduled_job():
	sk = models.ScrapeKaggle()
	return JsonResponse({'dumped':sk.scrape()})
	print('site was scrapped..')

