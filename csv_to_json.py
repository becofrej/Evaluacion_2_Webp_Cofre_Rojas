import csv
import json
import os

# Ruta de la carpeta de datos CSV
csv_folder_path = './csv-data'

# Ruta de la carpeta de salida JSON
json_folder_path = './json-data'
os.makedirs(json_folder_path, exist_ok=True)

# Mapeo de nombres de tablas a nombres de modelos
table_to_model = {
    'admin_interface_theme': 'admin_interface.theme',
    'auth_group': 'auth.group',
    'auth_group_permissions': 'auth.group_permissions',
    'auth_permission': 'auth.permission',
    'auth_user': 'auth.user',
    'auth_user_groups': 'auth.user_groups',
    'auth_user_user_permissions': 'auth.user_user_permissions',
    'captcha_captchastore': 'captcha.captchastore',
    'django_admin_log': 'admin.logentry',
    'django_content_type': 'contenttypes.contenttype',
    'django_migrations': 'migrations.migration',
    'django_session': 'sessions.session',
    'productos_categoria': 'productos.categoria',
    'productos_producto': 'productos.producto'
}

def convert_csv_to_json(csv_file_path, json_file_path, model_name):
    with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file)
        json_data = []

        for row in reader:
            # Crear una nueva entrada en formato Django
            if 'id' in row:
                pk = row['id']
                del row['id']
            else:
                pk = None  # O puedes definir alguna otra lógica para la clave primaria

            data = {
                'model': model_name,
                'pk': pk,
                'fields': row
            }
            json_data.append(data)

    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(json_data, json_file, indent=4, ensure_ascii=False)

# Convertir cada archivo CSV en la carpeta
for csv_filename in os.listdir(csv_folder_path):
    if csv_filename.endswith('.csv'):
        table_name = csv_filename.replace('.csv', '')
        model_name = table_to_model.get(table_name)
        if model_name:
            csv_file_path = os.path.join(csv_folder_path, csv_filename)
            json_file_path = os.path.join(json_folder_path, f'{table_name}.json')
            convert_csv_to_json(csv_file_path, json_file_path, model_name)
            print(f'Convertido {csv_filename} a {table_name}.json')

print('Conversión completada.')
