# CSV-to-JSON

> Este proyecto es un convertidor de archivos CSV a JSON, creado para para participar en la Hackathon de Barcelona Digital Talent 2022.

Para este proyecto se usaron las tecnologías:

* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript), como lenguaje de programación.
* [Node.js](https://nodejs.org/en/), como el ejecutor de JavaScript.
* [Express](https://www.npmjs.com/package/express), para crear el servidor http.
* [SuperTest](https://www.npmjs.com/package/supertest), para testear el endpoint de la API.
* [Jest](https://www.npmjs.com/package/jest), para comparar las respuestas recibidas en los tests.
* [Postman](https://www.postman.com/), para testear el endpoint de la API.
* [GitHub](https://github.com/), para el control de versiones.

## Usage

Para poder utilizar este proyecto se recomienda tener instalado Postman. 

Lo primero que se debe hacer es instalar el proyecto y levantarlo. Cuando esté levantado, en Postman se debe hacer una petición de tipo POST a la url `http://localhost/api/csv`.

En el body, se debe insertar el CSV codificado en Base64 dentro de un JSON, el nombre del elemento es "base64File", y se le debe asignar como valor el CSV codificado en Base64.

Cuando se envíe la petición, la respuesta será un 200 OK, y devolverá el archivo en formato JSON. Los carácteres numéricos serán devueltos en formato numérico, y los demás serán devueltos en formato String.

En caso de que no se inserte nada en el Body de la petición, devolverá un 200 OK, y un aviso de que no fue subido el archivo.

Para demostrar el funcionamiento de este endpoint, se adjunta un video probándolo:

https://user-images.githubusercontent.com/87100080/174458287-ce69c403-296b-43be-9ff1-55886a5edf57.mp4


## API/Component

El proyecto contiene dos directorios; src y tests. También contiene el `Makefile` y el `package.json`.

Para que pudiese ser compatible la importación y exportación de módulos con Node, se modificó el `package.json` añadiendo el module como tipo.

Dentro de src, se encuentran los ficheros `app.js` e `index.js`. También se encuentra la carpeta helpers.

El fichero `app.js` es el que crea el endpoint, utilizando la librería Express. Al recibir el request, se hace una comprobación de que no esté vacío. En caso de que lo esté, se enviará la respuesta `'No file uploaded'`. Si no está vacío, se decodificará el archivo CSV con ayuda de la función alojada en el fichero `get_files_decoded.js` y se transformarán los carácteres numéricos a formato numérico con ayuda de la función alojada en el fichero `convert_numbers.js`, enviando esta respuesta al request. 

El fichero `index.js` crea el puerto por donde escuchará el endpoint. Se importa app de `app.js` y muestra por consola que está escuchando en el puerto correspondiente.

La configuración de los ficheros `index.js` y `app.js` fue hecha separando lo que se quería testear de lo que no. Es por eso que en el fichero `index.js` solo se encuentra la creación del puerto, ya que todo lo que se quería testear se encuentra en `app.js`.

Dentro de la carpeta helpers, están los ficheros `convert_numbers.js` y `get_file_decoded.js`.

El fichero `convert_numbers.js` contiene la función que encuentra los números en el archivo CSV y los transforma de formato String a formato numérico. Se utiliza un for loop, que itera en cada elemento del archivo transformado a JSON, y al encontrar un archivo numérico es transformado a tipo numérico.

El fichero `get_file_decoded.js` contiene la función que decodifica el archivo CSV de Base64 a ASCII, hace una comprobación previa de que el archivo exista.

En el directorio tests, se encuentran los ficheros `app.test.js`, `Hackathon tests.postman_collection.json`, `helpers.test.js` y `test_file.csv`.

El fichero `app.test.js` contiene los tests corresponientes al fichero `app.js`, y tiene importadas las librerías Jest y Supertest. Se comienza describiendo lo que se testeará, y se procede describiendo todos los tests que se realizarán. En este caso se realizan tres tests asíncronos, para comprobar que el endpoint devuelve un array, que al obtener un body vacío se envía una respuesta 200 y que se devuelven los datos en formato JSON del CSV que fue cargado.

Jest, al igual que Node, no permite la importación ni exportación de módulos, por lo cual se debe utilizar un comando especial para la ejecución de los tests, que es `node --experimental-vm-modules node_modules/jest/bin/jest.js`. Este comando permite la importación y exportación de módulos al ejecutar los tests.

El fichero `Hackathon tests.postman_collection` contiene los tests realizados con Postman. En el fichero, se describen los tests que debe comprobar Postman, como lo son que el request devuelva un estado 200, que devuelva un body, que devuelva un JSON correcto y que devuelva un schema.

Luego, se declara lo que se espera de respuesta ante los tests, como es que la respuesta sea un JSON, que tenga dos columnas, que el nombre esté en formato String y equivalga al valor que fue indicado en el fichero `test_file.csv`, y que la edad esté en formato numérico y que corresponda al fichero `test_file.csv`.

El fichero `helpers.test.js` contiene los tests de los helpers, es decir,los ficheros `convert_number.js` y `get_file_decoded.js`. Se realizan tres tests que comprueban que se devuelve false cuando el request no tiene un atributo base64File existente, que devuelva un String cuando el atributo base64File existe, y que se devuelva false cuando el request no tiene el atributo base64File pero existe la key.

Luego, se hace test de la función `convertNumericStringsToNumbers`. Se realizan dos tests que comprueben que se convierten los números al ser detectados, y que se devuelve el array con números en formato Float.

Por último, el archivo `test_file.csv` contiene el CSV que se utiliza para los tests. Dentro, tiene tres columnas que son utilizadas para simular un CSV sin codificar. En el test `app.test.js` se convierte el CSV a Base64 para poder realizar los tests satisfactoriamente.  

## Installation

Para poder ejecutar los comandos, se debe tener instalado Make o Node.js.

- En caso de que se tenga Make

Para que se instale y se levante el proyecto se debe usar el comando:

```shell
    make all
```
Para que únicamente se instale el proyecto, se debe usar el comando:

```shell
    make install
```

Para únicamente levantar el proyecto, se debe usar el comando: 

```shell
    make run
```

Para correr los tests, se debe usar el comando:

```shell
    make test
```

- En caso de que no se tenga Make

Para instalar el proyecto se debe utilizar el comando:

```shell
    npm install 
```

Para levantar el proyecto se debe utilizar el comando:

```shell
    npm run dev
```

Para correr los tests se debe correr el comando:

```shell
    node --experimental-vm-modules node_modules/jest/bin/jest.js
```

## License 

MIT License

Copyright (c) [2022] [Claudia Di Pietro]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


