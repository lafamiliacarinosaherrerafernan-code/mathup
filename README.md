# Aula Matematica Margarita Salas

Primera version local de la app de matematicas del IES Margarita Salas.

## Acceso

- Alumnos: seleccionan ano academico, curso, grupo y nombre. Cada alumno tiene una clave propia visible en el panel del profesor.
- Profesor: abre el acceso con `Ctrl + Alt + A` y utiliza la contrasena configurada localmente.

## Configuracion local

1. Copia `config.example.js` como `config.local.js`.
2. Sustituye los valores de ejemplo por las claves que quieras usar en tu instalacion.
3. No compartas ni subas `config.local.js`: Git lo excluye automaticamente.

Las claves del prototipo permiten controlar el acceso local, pero no constituyen autenticacion segura porque la aplicacion se ejecuta en el navegador. Antes de publicar el producto para usuarios reales se necesitara autenticacion en un servidor.

## Contenido incluido

- Pantalla inicial con logos institucionales.
- Lista desplegable con alumnado extraido del PDF aportado.
- Seleccion de curso e itinerario.
- Temas de ESO y Bachillerato.
- Enlace a materiales PDF o carpetas de documentos.
- Juego de preguntas con puntuacion, racha, medallas y destellos.
- Panel de informes local con descarga CSV.
- ESO: pantalla principal con zona de estudio y aventura gamificada.
- Bachillerato: entrada directa a estudio de temas y retos, sin gamificacion.

## Siguiente fase recomendada

Sustituir las preguntas de ejemplo por bancos de 10 preguntas por reto, con niveles de dificultad y explicaciones de error.

## Archivos no incluidos en Git

La biblioteca local `documentos/`, los libros completos, los ZIP duplicados y los archivos temporales no se guardan en este repositorio. Estos materiales deben tener una estrategia de almacenamiento separada del codigo fuente.
