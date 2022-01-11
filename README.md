# API REST para BB. DD. de pruebas de BSale

Acceso a base de datos MySQL de pruebas de BSale para consultar listas de productos tipo e-commerce. API construida en Node JS, usando Express JS.

Link base de la API: https://bsale-test-api-psg.herokuapp.com

## Endpoints

Ruta | Parámetros | Contenidos
------|------------|------------
/ |  | Lista versiones de la base de datos con sus URL.
/v[número de versión] |  | Lista de categorías con sus URL.
/v[versión]/[categoría] |  | Lista de productos de la categoría.

Parámetros comunes | Contenidos
-------------------|------------
lang               | Idioma de los mensajes y atributos del objeto de salida ("eng" o "esp").

Ejemplo: https://bsale-test-api-psg.herokuapp.com/v1/snack?lang=esp

### Características

- Deploy en Heroku
- Base de datos MySQL con datos de acceso por variable de entorno
