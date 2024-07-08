import os
import django
from django.core.management import call_command

# Configurar el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PawPalace.settings')
django.setup()

# Ruta de la carpeta de datos JSON
json_folder_path = './json-data'

# Cargar cada archivo JSON en la carpeta
for json_filename in os.listdir(json_folder_path):
    if json_filename.endswith('.json'):
        json_file_path = os.path.join(json_folder_path, json_filename)
        print(f'Cargando {json_file_path}...')
        try:
            call_command('loaddata', json_file_path)
            print(f'{json_filename} cargado con éxito.')
        except Exception as e:
            print(f'Error al cargar {json_filename}: {e}')
