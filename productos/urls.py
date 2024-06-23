from django.urls import path
from .views import home, pagPerros, pagGatos, pagAccesorios, pagSnacks, pagIngresar, pagRegistrar, pagCarrito

urlpatterns = [
    path('', home, name="index"),
    path('perros/', pagPerros, name="pagPerros"),
    path('gatos/', pagGatos, name="pagGatos"),
    path('accesorios/', pagAccesorios, name="pagAccesorios"),
    path('snacks/', pagSnacks, name="pagSnacks"),
    path('ingresar/', pagIngresar, name="pagIngresar"),
    path('registrarse/', pagRegistrar, name="pagRegistrar"),
    path('carrito/', pagCarrito, name="pagCarrito"),
]