import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth.models import User
from .views import AuthorModelViewSet
from .models import Author


class TestAuthorViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors', {
            'username': 'Maxim9887',
            'firstname': 'Maxim',
            'lastname': 'Loveless',
            'email': 'Maxlove@kjdf.com'
        })
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors', {
            'username': 'Maxim9887',
            'firstname': 'Maxim',
            'lastname': 'Loveless',
            'email': 'Maxlove@kjdf.com'
        })
        admin = User.objects.create_superuser(
            'admin', 'admin@admin.com', 'admin')
        force_authenticate(request, admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        author = Author.objects.create(
            username='Mjhsdf', firstname='jassdmmnasd', lastname='nbnsdjkd', email='jhsdf@kk.com')
        client = APIClient()
        response = client.get(f'/api/authors/{author.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        author = Author.objects.create(
            username='Mjhsdf', firstname='jassdmmnasd', lastname='nbnsdjkd', email='jhsdf@kk.com')
        client = APIClient()
        response = client.put(f'/api/authors/{author.id}/', {
            'username': 'Maxim9887',
            'firstname': 'Maxim',
            'lastname': 'Loveless',
            'email': 'Maxlove@kjdf.com'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        author = Author.objects.create(
            username='Mjhsdf', firstname='jassdmmnasd', lastname='nbnsdjkd', email='jhsdf@kk.com')
        client = APIClient()
        admin = User.objects.create_superuser(
            'admin', 'admin@admin.com', 'admin')
        client.login(username='admin', password='admin')
        response = client.put(f'/api/authors/{author.id}/', {
            'username': 'Maxim9887',
            'firstname': 'Maxim',
            'lastname': 'Loveless',
            'email': 'Maxlove@kjdf.com'
        })
        author = Author.objects.get(pk=author.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(author.username, 'Maxim9887')
        client.logout() 


class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)


