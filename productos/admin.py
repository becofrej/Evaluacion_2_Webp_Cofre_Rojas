from django.contrib import admin
from .models import Categoria, Producto

# Register your models here.

class ProductoAdmin(admin.ModelAdmin):
    list_display = ["nombre", "precio", "categoria", "stock"]
    list_editable = ["precio"]
    search_fields = ["nombre"]
    list_filter = ["fecha_creacion", "categoria"]
    list_per_page = 10

admin.site.register(Categoria)
admin.site.register(Producto, ProductoAdmin)