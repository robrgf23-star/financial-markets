Descripción del Proyecto de Finanzas
Este proyecto es una aplicación web de una sola página, organizada en tres archivos modulares: index.html para la estructura, style.css para el diseño y script.js para la lógica. Juntos, crean una interfaz interactiva con una calculadora financiera y una tabla de datos bursátiles.

1. Archivo index.html
Este archivo es el esqueleto de la aplicación. Define la estructura y el contenido visible en la página.

Líneas 1-6:

<!DOCTYPE html>: Declara que es un documento HTML5.

<html lang="es">: Define el idioma de la página.

<head>: Contiene metadatos y enlaces a archivos externos. Las etiquetas <meta> aseguran la compatibilidad con caracteres especiales y la adaptación a dispositivos móviles.

Línea 8:

<link rel="stylesheet" href="style.css">: Vincula la hoja de estilos externa, importando el diseño desde style.css.

Línea 10:

<script src="https://cdn.tailwindcss.com"></script>: Carga la librería de clases CSS Tailwind, que se usa para el diseño rápido y responsivo.

Líneas 14-17:

<video autoplay muted loop id="video-background">: Crea el fondo de video de la página. La etiqueta <source> especifica la ruta del video (img/fondo.mp4).

Líneas 20-23:

<header>: Contiene el encabezado principal de la página, con el título y un subtítulo.

Líneas 25-63:

<main>: El contenedor principal del contenido de la página. Se divide en dos paneles: la calculadora y la tabla de datos.

Líneas 28-36:

<div class="calculator-btn-group">: Agrupa los botones que cambian entre las distintas calculadoras financieras.

Líneas 39-49, y otras similares:

<div id="...">: Son los contenedores individuales para cada calculadora. Se muestran u ocultan dinámicamente con JavaScript para cambiar de vista.

Líneas 89-100:

<table>: La tabla HTML donde se mostrarán los datos de las empresas. El id="empresas-container" permite que JavaScript inserte el contenido.

Línea 109:

<script src="script.js"></script>: Vincula el archivo de JavaScript que contiene toda la lógica interactiva.

2. Archivo style.css
Este archivo se dedica por completo a la apariencia y el diseño de la aplicación, usando reglas para estilizar los elementos HTML.

Regla #video-background:

Define el estilo del fondo de video. position: fixed lo mantiene estático, z-index: -100 lo coloca detrás del contenido, y min-width/min-height aseguran que cubra toda la pantalla.

Regla body:

Establece la fuente de texto (font-family) y el color de texto base para toda la página.

Regla .card:

Estiliza las ventanas principales. background: rgba(...) crea un fondo semitransparente, y backdrop-filter: blur(5px) le da un efecto de desenfoque para mejorar la legibilidad del texto sobre el video de fondo.

Reglas .input-group label y .input-group input:

Definen los estilos de los campos de entrada de la calculadora. Aseguran que las etiquetas y los cuadros de texto se muestren de forma clara y con un formato consistente.

Regla .calculator-btn-group button.active:

Aplica un estilo visual especial al botón de la calculadora que está actualmente seleccionado, cambiando su color de fondo a azul y su texto a blanco para destacarlo.

3. Archivo script.js
Este es el cerebro de la aplicación. Contiene toda la lógica que hace que la página sea interactiva.

Líneas 2-6:

const script = ...: Carga la librería MathJax para poder renderizar fórmulas matemáticas en el futuro.

Línea 8:

document.addEventListener('DOMContentLoaded', ...): Garantiza que todo el código JavaScript se ejecute solo después de que el HTML de la página haya sido cargado por completo, evitando errores.

Líneas 18-25:

function showCalculator(calcId): Una función que se encarga de cambiar la vista de la calculadora. Oculta todos los paneles y solo muestra el que le pases como argumento.

Líneas 39-82:

Funciones de Cálculo: Cada función (calcularMontoSimple, calcularTasa, calcularTiempo, calcularMontoCompuesto) toma los valores de los campos de entrada, realiza el cálculo financiero correspondiente y muestra el resultado en la pantalla.

Fórmulas Utilizadas:

Monto Simple: M = C(1+rt)

Tasa / Tiempo: r = ((M/C) - 1)/t y t = ((M/C) - 1)/r

Monto Compuesto: M = C(1+r)^t (donde Math.pow eleva a la potencia t)

Líneas 85-95:

Event Listeners: Asignan las funciones de cálculo a los eventos de clic de los botones, para que la calculadora reaccione a la interacción del usuario.

Líneas 99-123:

async function obtenerEmpresas(): Una función que simula la obtención de datos en tiempo real. Contiene un array de datos de ejemplo y usa el método map() para generar filas de tabla HTML, las cuales son insertadas dinámicamente en el contenedor de empresas. En un proyecto real, aquí se haría una llamada a una API financiera.