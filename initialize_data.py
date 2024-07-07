import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PawPalace.settings')
django.setup()

from productos.models import Categoria

# Crear categorías
categorias = [
    'Alimentos para Perros',
    'Alimentos para Gatos',
    'Accesorios',
    'Snacks'
]

for nombre in categorias:
    Categoria.objects.get_or_create(nombre=nombre)

print("Categorías inicializadas correctamente.")
