from django import forms
from .models import Producto
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from .validators import MaxSizeFileValidator
from django.forms import ValidationError
from captcha.fields import CaptchaField


class CustomUserCreationForm(UserCreationForm):
    captcha = CaptchaField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2','captcha']

class CustomAuthenticationForm(AuthenticationForm):
    captcha = CaptchaField()  # Agregar el campo de CAPTCHA

    class Meta:
        model = User
        fields = ['username', 'password', 'captcha']

class ProductoForm(forms.ModelForm):

    nombre = forms.CharField(min_length=3, max_length=50)
    imagen = forms.ImageField(required=False, validators=[MaxSizeFileValidator(max_file_size=2)])
    precio = forms.IntegerField(min_value=1, max_value=1500000)
    stock = forms.IntegerField(min_value=1)

    def clean_nombre(self):
        nombre = self.cleaned_data["nombre"]
        existe = Producto.objects.filter(nombre__iexact=nombre).exists()

        if existe:
            raise ValidationError("Este producto ya existe")
        return nombre

    class Meta:
        model = Producto
        fields = '__all__'