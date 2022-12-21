import graphene
from graphene_django import DjangoObjectType
from authapp.models import Author
from memoapp.models import Todo, Project


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todoes = graphene.List(TodoType)
    all_authors = graphene.List(AuthorType)
    all_projects = graphene.List(ProjectType)
    author_by_id = graphene.Field(AuthorType, id=graphene.Int(required=True))
    todo_and_authors_by_project_name = graphene.List(TodoType, name=graphene.String(required=True))


    def resolve_todo_and_authors_by_project_name(root, info, name):
        todoes = Todo.objects.all()
        if name:
            todoes = todoes.filter(project__name=name)
        return todoes


    def resolve_all_todoes(root, info):
        return Todo.objects.all()

    def resolve_all_authors(root, info):
        return Author.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_author_by_id(root, info, id):
        try:
            return Author.objects.get(pk=id)
        except Author.DoesNotExist:
            return None




schema = graphene.Schema(query=Query)


