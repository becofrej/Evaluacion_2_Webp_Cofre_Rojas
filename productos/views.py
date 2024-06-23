from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'productos/index.html')

def pagPerros(request):
    return render(request, 'productos/productos-perro.html')

def pagGatos(request):
    return render(request, 'productos/productos-gatos.html')

def pagAccesorios(request):
    return render(request, 'productos/productos-accesorios.html')

def pagSnacks(request):
    return render(request, 'productos/productos-snacks.html')

def pagIngresar(request):
    return render(request, 'productos/ingresar.html')

def pagRegistrar(request):
    return render(request, 'productos/registrarse.html')

def pagCarrito(request):
    return render(request, 'productos/carrito.html')