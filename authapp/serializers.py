from rest_framework.serializers import ModelSerializer

from .models import Author


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'username', 'firstname', 'lastname', 'email')


class AuthorFullModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'      


class AuthorModelCustomSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'