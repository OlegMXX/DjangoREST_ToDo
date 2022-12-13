import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth.models import User
from .views import ProjectModelViewSet
from .models import Project
from authapp.models import Author
from mixer.backend.django import mixer




class TestProjectModelViewSet(APITestCase):

    def test_get_lists(self):
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_project_admin(self):
        #author = Author.objects.create(username='Mjhsdf', firstname='jassdmmnasd', lastname='nbnsdjkd', email='jhsdf@kk.com')
        #project = Project.objects.create(name='JHSD', repo_link='jhsdfdjhdf.com')
        #project.authors.add(author)
        #project.save()

        project = mixer.blend(Project)

        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.put(f'/api/project/{project.id}/', {'name':'HGS', 'repo_link':'khsdfh.com', 'authors': 1})
        print(response.json())
        project = Project.objects.get(pk=project.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(project.name, 'HGS')
        self.client.logout()
