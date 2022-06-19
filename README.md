Si quieres leer la documentación en Español, [haz click aquí](#spanish)

If you want to read the documentation in English, [click here](#english)

# CSV-to-JSON <a name="spanish"></a>

> Este proyecto es un convertidor de archivos CSV a JSON, creado para para participar en la Hackathon de Barcelona Digital Talent 2022.

Para este proyecto se usaron las tecnologías:

* <a href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank">JavaScript</a>, como lenguaje de programación.
* <a href="https://nodejs.org/en/" target="_blank">Node.js</a>, como el ejecutor de JavaScript.
* <a href="https://www.npmjs.com/package/express" target="_blank">Express</a>, para crear el servidor http.
* <a href="https://www.npmjs.com/package/supertest" target="_blank">SuperTest</a>, para testear el endpoint de la API.
* <a href="https://www.npmjs.com/package/jest" target="_blank">Jest</a>, para comparar las respuestas recibidas en los tests.
* <a href="https://www.postman.com/" target="_blank">Postman</a>, para testear el endpoint de la API.
* <a href="https://github.com/" target="_blank">GitHub</a>, para el control de versiones.

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

La configuración de los ficheros `index.js` y `app.js` fue hecha separando lo que se quería testear de lo que no. Es por eso que en el fichero `index.js` solo se encuentra la creación del puerto, ya que todo lo que se quiere testear se encuentra en `app.js`.

Dentro de la carpeta helpers, están los ficheros `convert_numbers.js` y `get_file_decoded.js`.

El fichero `convert_numbers.js` contiene la función que encuentra los números en el archivo CSV y los transforma de formato String a formato numérico. Se utiliza un for loop, que itera en cada elemento del archivo transformado a JSON, y al encontrar un elemento numérico es transformado a tipo numérico.

El fichero `get_file_decoded.js` contiene la función que decodifica el archivo CSV de Base64 a ASCII, y hace una comprobación previa de que el archivo exista.

En el directorio tests, se encuentran los ficheros `app.test.js`, `Hackathon tests.postman_collection.json`, `helpers.test.js` y `test_file.csv`.

El fichero `app.test.js` contiene los tests corresponientes al fichero `app.js`, y tiene importadas las librerías Jest y Supertest. Se comienza describiendo lo que se testeará, y se procede describiendo todos los tests que se realizarán. En este caso se realizan tres tests asíncronos, para comprobar que el endpoint devuelve un array, que al obtener un body vacío se envía una respuesta 200 y que se devuelven los datos en formato JSON del CSV que fue cargado.

Jest, al igual que Node, no permite la importación ni exportación de módulos, por lo cual se debe utilizar un comando especial para la ejecución de los tests, que es `node --experimental-vm-modules node_modules/jest/bin/jest.js`. Éste comando permite la importación y exportación de módulos al ejecutar los tests.

El fichero `Hackathon tests.postman_collection` contiene los tests realizados con Postman. En el fichero, se describen los tests que debe comprobar Postman, como lo son que el request devuelva un estado 200, que devuelva un body, que devuelva un JSON correcto y que devuelva un schema.

Luego, se declara lo que se espera de respuesta ante los tests, como es que la respuesta sea un JSON, que tenga dos columnas, que el nombre esté en formato String y equivalga al valor que fue indicado en el fichero `test_file.csv`, y que la edad esté en formato numérico y que corresponda al fichero `test_file.csv`.

El fichero `helpers.test.js` contiene los tests de los helpers, es decir, los ficheros `convert_number.js` y `get_file_decoded.js`. Se realizan tres tests que comprueban que se devuelve false cuando el request no tiene un atributo `base64File` existente, que devuelva un String cuando el atributo `base64File` existe, y que se devuelva false cuando el request no tiene el atributo `base64File` pero existe la key.

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

# CSV-to-JSON <a name="english"></a>

> This project is a CSV to JSON file converter, created to participate in the Barcelona Digital Talent 2022 Hackathon.

For this project, the technologies used were:

* <a href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank">JavaScript</a>, as the programming language.
* <a href="https://nodejs.org/en/" target="_blank">Node.js</a>, as the JavaScript executor.
* <a href="https://www.npmjs.com/package/express" target="_blank">Express</a>, to create the http server.
* <a href="https://www.npmjs.com/package/supertest" target="_blank">SuperTest</a>, to test the API endpoint.
* <a href="https://www.npmjs.com/package/jest" target="_blank">Jest</a>, to compare the received answers in the tests.
* <a href="https://www.postman.com/" target="_blank">Postman</a>, to test the API endpoint.
* <a href="https://github.com/" target="_blank">GitHub</a>, for the versions control.

## Usage

To use this project it is recommended to have installed Postman.

The first to do is to install the project and raise it. When it's up, in Postman, a type POST petition must me done to the url `http://localhost/api/csv`.

In the body, the encoded Base64 CSV has to be inserted inside a JSON. The element's name is "base64File", and as the value the encoded CSV must be assigned.

When the petition is done, the answer will be a 200 OK, and it will return the file in JSON format. The numeric characters will be returned in numeric format, and the rest will be returned in String format.

If the body of the petition is empty, it will return a 200 OK and a message saying that the file wasn't uploaded.

To show the endpoint working, a demostration video is attached:

https://user-images.githubusercontent.com/87100080/174458287-ce69c403-296b-43be-9ff1-55886a5edf57.mp4


## API/Component

The project has two directories; sec and tests. It also contains the `Makefile` and the c.

The `package.json` was modified so module imports and exports could be compatible, adding the module as a type.

Inside src, there are the files `app.js` and `index.js`. There's also the helpers folder.

The file `app.js` is the one that creates the endpoint, using the Express library. When the request is received, it checks that the file isn't empty. In case it is empty, the response `'No file uploaded'` will be sent. If it isn't empty, the CSV file will be decoded with the function created in the file `get_files_decoded.js` and the numeric characters will be transformed to numeric format, with the function created in the file `convert_numbers.js`, sending this response to the request.

The file `index.js` creates the port where the endpoint will be listening. It is imported from `app.js` and it prints through the console that it is listening in the port specified.

The configuration of the files `index.js` and `app.js` was done separating what had to be tested of what didn't have to be tested. That's why in the file `index.js` there's only the creation of the port, since everything that has to be tested is inside `app.js`.

Inside the helpers folder, there are the files `convert_numbers.js` and `get_file_decoded.js`

The file `convert_numbers.js` contains the function that finds the numbers in the CSV file, and it transforms them from String format to numeric format. This is done with a for loop, that iterates through every element of the file transformed to JSON format, and once it finds a numeric element it transforms it to numeric format.

The file `get_file_decoded.js` contains the function that decodes the CSV file from Base64 to ASCII, and it does a previous check that the file exists.

In the tests directory, there are the files `app.test.js`, `Hackathon tests.postman_collection.json`, `helpers.test.js` and `test_file.csv`

The file  `app.test.js` contains all the tests associated with the file `app.js` and it has the libraries Jest and Supertest imported. It starts describing what will be tested, and then it proceeds describing all the tests that will be made. In this case, there will be three asynchronous tests, to check that the endpoint returns an array, that when an empty body is obtained a 200 OK response will be sent and that data is returned in JSON format from the CSV that was uploaded.

Jest, just like Node, doesn't allow the module imports and exports, that's why a special command must be used for the tests running. The command is `node --experimental-vm-modules node_modules/jest/bin/jest.js` and it allows the modules imports and exports when executing the tests.

The file `Hackathon tests.postman_collection` contains the tests made with Postman. In the file, the tests that Postman must check are described. What has to be tested is that the request returns a 200 OK response, that it returns a body, that it returns a correct JSON and that it returns a schema.

Then, the expected responses are declared. It is expected that the response is a JSON, that it has two columns, that the name is in String format and that it is equal to the value that was indicated in the file `test_file.csv`, and that the age is in numeric format and it also matches the file `test_file.csv`.

The file `helpers.test.js` contains the tests associated with the helpers, the files `convert_number.js` and `get_file_decoded.js`. Three tests are done, it checks that false is returned when the request doesn't have an existing `base64File` attribute, that a String is returned when the `base64File` attribute does exist, and that false is returned when the request doesn't have the `base64File` attribute but the key does exist.

Then, the function `convertNumericStringsToNumbers` is tested. There are two tests, one checks that the numbers are converted once they are detected and that the array is returned with the numbers in Float format.

Lastly, the file `test_file.csv` contains the CSV that is used for testing. Inside of this file, there are three columns that are used to simulate a decoded CSV. In the test `app.test.js` the CSV file is encoded in Base64 so the tests can be done correctly. 

## Installation

To execute the commands, Make or Node.js must be installed.

- In case Make is installed

For the installation and raising the project the command has to be:

```shell
    make all
```
If it's just the installation of the project, the command has to be:

```shell
    make install
```

If it's just raising the project, the command has to be:

```shell
    make run
```

For running the tests, the command has to be:

```shell
    make test
```

- In case Make is not installed

For installing the project the command has to be:

```shell
    npm install 
```

For raising the project the command has to be:

```shell
    npm run dev
```


For running the tests the command has to be:

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


