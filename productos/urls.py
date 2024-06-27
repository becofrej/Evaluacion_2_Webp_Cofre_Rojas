from django.urls import path
from . import views
from .views import home, pagPerros, pagGatos, pagAccesorios, pagSnacks, pagIngresar, pagRegistrar, pagCarrito, agregar_producto, listar_producto, CustomLoginView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', home, name="index"),
    path('perros/', pagPerros, name="pagPerros"),
    path('gatos/', pagGatos, name="pagGatos"),
    path('accesorios/', pagAccesorios, name="pagAccesorios"),
    path('snacks/', pagSnacks, name="pagSnacks"),
    path('ingresar/', pagIngresar, name="pagIngresar"),
    path('registrarse/', views.pagRegistrar, name='registrarse'),
    path('carrito/', pagCarrito, name="pagCarrito"),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('agregar-producto/', agregar_producto, name="agregar_producto"),
    path('listar-producto/', listar_producto, name="listar_producto")
]