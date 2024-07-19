# ChatVis v2

Web para el procesamiento de los chats de whatsApp. complementado con funcionalidades con multiples graficas para la representacion de los datos. Analisis de los mensajes con Natural y stopword.

## Caracteristicas
    * Procesamieno de multiples chats.
    * Opcion de procesar los datos en el nevegador o bien hacer uso de una API.
    * Mejora de analisis de los chats.
    * Implementacion desde cero el codigo para separar cada mensaje en `fecha`, `nombre`, `hora`, `mensaje` ademas ajustar el formato de la fecha.
    * Implementacion de un gestor de estado con Zustand.
    * Implemetacion de natural para el analisis y procesamiento de los datos.
    * Mejora y correcion del codigo de las graficas que muestran los datos.

## Cambios
    * Implementacion de un estado global con zustand.
    * Implementacion de dos opciones de procesamiento de los chats.
    * Correcio y mejora del diseño en general.
    * Implementacion de un panel administrativo para interctuar con la informacion.
    * Creacion del las funcionalidades desde cero mejorando al codigo anterior.
    * Un diseño mas minimalista.
    * Mejor estructura de las opciones y funcionalidades de la web.

## Instalación
- Para clonar el repositorio ejecuta

```console
git clone https://github.com/Moisessantos45/graficador-chatvis-frontend.git
```

* Para trabajar con la nueva version
```console
git checkout version-2
```

*Una vez clonado el repositorio ejeucta sel siguiente comando para que se instalen las dependencias

```console
npm install
```
# Configuracion

* Una vez realizada la instalacion de dependencias
* Hay dos formas de proder intecartuar con el proyecto
    * La primera es realizar todo el proceso en el navegador sin necesidad de usar una API.
    * La segunda es usar una API que esta construida en pyhton.
       * Algunas benefecios es que se crean json con la informacion de los chat manteniendo un    mejor control de la informacion ademas de poder mantener la persistencia de datos a diferencia del uso del navegador que se guarda en la memoria Ram.
       
        Para mas informacion sobre la [documentacion sobre la API](http://expressjs.com/en/starter/installing.html).
* crea un arhivo .env en la raiz del proyecto.
* Dentro de ese archivo crea una variable con siguiente nombre.

```console
VITE_BACKEND_URL_API
```
* A esa variable de entorno se le debe asignar el puerto en cual se ejecuta la API de python.
  - Por defecto es el PORT 8000 pero ya dependera de tus configuraciones.