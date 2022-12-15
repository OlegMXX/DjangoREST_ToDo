from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins


from .models import Author
from .serializers import AuthorFullModelSerializer, AuthorModelSerializer, AuthorModelCustomSerializer
from rest_framework.generics import ListAPIView


class AuthorModelViewSet(ModelViewSet):

    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class AuthorListAPIView(ListAPIView):

    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
    
    def get_serializer_class(self):
        if self.request.version == 'v2':
            return AuthorFullModelSerializer
        return AuthorModelSerializer


class AuthorCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelCustomSerializer
