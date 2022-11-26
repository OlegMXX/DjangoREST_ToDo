from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins


from .models import Author
from .serializers import AuthorModelSerializer, AuthorModelCustomSerializer


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

class AuthorCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelCustomSerializer