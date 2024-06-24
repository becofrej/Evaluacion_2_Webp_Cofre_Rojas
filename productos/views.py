
from django.shortcuts import render, redirect
from .models import Categoria,Producto
from .forms import CustomUserCreationForm
from django.contrib.auth import authenticate, login
# Create your views here.

def home(request):
    #obtener categorias
    categoria_perros = Categoria.objects.get(nombre='Alimentos para Perros')
    categoria_gatos = Categoria.objects.get(nombre='Alimentos para Gatos')
    categoria_accesorios = Categoria.objects.get(nombre='Accesorios')
    categoria_snacks = Categoria.objects.get(nombre='Snacks')
    
    #obtener productos por categoria
    productos_perros = Producto.objects.filter(categoria=categoria_perros)[:2]
    productos_gatos = Producto.objects.filter(categoria=categoria_gatos)[:2]
    productos_accesorios = Producto.objects.filter(categoria=categoria_accesorios)[:4]
    productos_snacks = Producto.objects.filter(categoria=categoria_snacks)[:4]
    
    context = {
        'productos_perros_gatos': list(productos_perros) + list(productos_gatos),
        'productos_accesorios': productos_accesorios,
        'productos_snacks': productos_snacks,
    }
    return render(request, 'productos/index.html', context)

def pagPerros(request):
    categoria_perros = Categoria.objects.get(nombre='Alimentos para Perros')
    productos_perros = Producto.objects.filter(categoria=categoria_perros)
    context = {'productos_perros': productos_perros}
    return render(request, 'productos/productos-perro.html', context)

def pagGatos(request):
    categoria_gatos = Categoria.objects.get(nombre='Alimentos para Gatos')
    productos_gatos = Producto.objects.filter(categoria=categoria_gatos)
    context = {'productos_gatos': productos_gatos}
    return render(request, 'productos/productos-gato.html', context)

def pagAccesorios(request):
    categoria_accesorios = Categoria.objects.get(nombre='Accesorios')
    productos_accesorios = Producto.objects.filter(categoria=categoria_accesorios)
    context = {'productos_accesorios': productos_accesorios}
    return render(request, 'productos/productos-accesorios.html', context)

def pagSnacks(request):
    categoria_snacks = Categoria.objects.get(nombre='Snacks')
    productos_snacks = Producto.objects.filter(categoria=categoria_snacks)
    context = {'productos_snacks': productos_snacks}
    return render(request, 'productos/productos-snacks.html', context)

def pagIngresar(request):
    return render(request, 'registration/ingresar.html')

def pagCarrito(request):
    return render(request, 'productos/carrito.html')

def pagRegistrar(request):
    data = {
        'form' : CustomUserCreationForm()
    }

    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(username=formulario.cleaned_data["username"],\
                                password=formulario.cleaned_data["password1"])
            #redirigir al home
            return redirect(to="index")
        data["form"] = formulario

    return render(request, 'registration/registrarse.html', data)


