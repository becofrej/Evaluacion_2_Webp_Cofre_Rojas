
from django.shortcuts import render, redirect, get_object_or_404
from .models import Categoria,Producto
from .forms import CustomAuthenticationForm, CustomUserCreationForm, ProductoForm
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.core.paginator import Paginator
from django.http import Http404
from django.contrib.auth.decorators import login_required, permission_required
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

def pagCarrito(request):
    return render(request, 'productos/carrito.html')

def pagIngresar(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(data=request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('index')
    else:
        form = CustomAuthenticationForm()
    return render(request, 'registration/ingresar.html', {'form': form})

def pagRegistrar(request):

    data = {
        'form': CustomUserCreationForm()
    }

    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(username=formulario.cleaned_data["username"], password=formulario.cleaned_data["password1"])
            if user is not None:
                login(request, user)
                messages.success(request, "Te has registrado correctamente")
                return redirect(to="index")
        data["form"] = formulario

    return render(request, 'registration/registrarse.html', data)

@permission_required('productos.add_producto')
def agregar_producto(request):

    data = {
        'form': ProductoForm()
    }

    if request.method == 'POST':
        formulario = ProductoForm(data=request.POST, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            messages.success(request,"Producto registrado correctamente")
        else:
            data['form'] = formulario



    return render(request, 'productos/crud/agregar.html', data)

@permission_required('productos.view_producto')
def listar_producto(request):
    productos = Producto.objects.all()
    page = request.GET.get('page', 1)
    
    try:
        paginator = Paginator(productos, 7)
        productos = paginator.page(page)
    except:
        raise Http404

    data = {
        'entity': productos,
        'paginator': paginator
    }

    return render(request, 'productos/crud/listar.html', data)

@permission_required('productos.change_producto')
def modificar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)

    data = {
        'form': ProductoForm(instance=producto)
    }

    if request.method == 'POST':
        formulario = ProductoForm(data=request.POST, instance=producto, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            messages.success(request, "Producto modificado correctamente")
            return redirect(to="listar_producto")
        data["form"] = formulario

    return render(request, 'productos/crud/modificar.html', data)

@permission_required('productos.delete_producto')
def eliminar_producto(request, id):

    producto = get_object_or_404(Producto, id=id)
    producto.delete()
    messages.success(request, "Producto eliminado correctamente")
    return redirect(to="listar_producto")

