from django.urls import path

from authapp.views import AuthorListAPIView

app_name = 'authapp'
urlpatterns = [
    
    path('', AuthorListAPIView.as_view()),

]
