from django.db import models
from authapp.models import Author



class Project(models.Model):
    name = models.CharField(max_length=64)
    repo_link = models.URLField(max_length=200)
    authors = models.ManyToManyField(Author)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    created_by = models.ForeignKey(Author, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    def delete(self, *args):
        self.active = False
        self.save()
