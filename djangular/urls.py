from django.conf.urls import patterns, url, include
from rest_framework_nested import routers
from authentication.views import AccountViewSet
from authentication.views import LoginView,LogoutView
from posts.views import AccountPostsViewSet, PostViewSet
from djangular.views import IndexView
from django.conf import settings


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)
accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup = 'account'
)
accounts_router.register(r'posts',AccountPostsViewSet)
urlpatterns = patterns(
    '',
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/scrape_kaggle', include('scrape_kaggle.urls')),
    url(r'^api/v1/hr_analytics', include('hr_analytics.urls')),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', IndexView.as_view(), name='index'),
)


if not settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )