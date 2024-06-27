from django.contrib import admin
from .models import Categoria, Producto
from .forms import ProductoForm

# Register your models here.

class ProductoAdmin(admin.ModelAdmin):
    list_display = ["nombre", "precio", "categoria", "stock"]
    list_editable = ["precio"]
    search_fields = ["nombre"]
    list_filter = ["fecha_creacion", "categoria"]
    list_per_page = 10
    form = ProductoForm

admin.site.register(Categoria)
admin.site.register(Producto, ProductoAdmin)