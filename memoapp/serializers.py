from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        #depth = 1
        fields = '__all__'
        
