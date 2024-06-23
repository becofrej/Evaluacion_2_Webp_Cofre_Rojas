from django.db import models

# Create your models here.

class Categoria(models.Model):
    nombre = models.CharField(max_length=200, verbose_name="Nombre")

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=50, verbose_name="Nombre")
    descripcion = models.TextField(verbose_name="Descripción")
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to="productos", null=True)
    precio = models.IntegerField(verbose_name="Precio")
    stock = models.PositiveIntegerField(verbose_name="Stock")
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")

    def __str__(self):
        return self.nombre