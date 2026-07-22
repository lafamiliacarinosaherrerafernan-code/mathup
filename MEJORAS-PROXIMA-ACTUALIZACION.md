# Mejoras para la próxima actualización

## AUDIO-001 · Narración femenina neuronal para los vídeos explicativos

**Estado:** Pendiente  
**Prioridad:** Alta  
**Primera prueba:** 1.º ESO · Números naturales

### Problema observado

La narración generada por la voz local de Windows resulta demasiado robótica. Aunque se ha seleccionado una voz femenina y se han ajustado la velocidad, el tono y las pausas, no alcanza la calidez, la expresividad ni los cambios naturales de entonación de una voz neuronal como la utilizada en Notebook.

### Mejora solicitada

Sustituir la narración local de los vídeos explicativos por una voz neuronal:

- Femenina, cálida y cercana.
- Español de España.
- Entonación natural y didáctica, sin leer el texto de forma monótona.
- Pausas claras entre conceptos, ejemplos y operaciones.
- Ritmo apropiado para alumnado de ESO.
- Pronunciación correcta de números, símbolos y expresiones matemáticas.

### Criterios para considerar la mejora terminada

1. La narración del vídeo de Números naturales se escucha completa con voz femenina neuronal en español de España.
2. Se perciben pausas y cambios de entonación naturales.
3. Los botones Pausar, Continuar, Repetir escena, Siguiente y Cerrar controlan también el audio neuronal.
4. Los subtítulos siguen mostrando exactamente la explicación correspondiente a cada escena.
5. Si el audio neuronal no estuviera disponible, la aplicación utiliza automáticamente la voz local actual como alternativa.
6. El audio se guarda comprimido dentro del proyecto de OneDrive y no se generan copias ni archivos temporales fuera de la carpeta del proyecto.
7. No se envía información del alumnado a ningún servicio externo.

### Aplicación posterior

Una vez aprobada la voz y el estilo del tema piloto, utilizar el mismo formato de narración en los demás vídeos explicativos de la aplicación.

### Solución técnica propuesta para la prueba

- Generar previamente el audio con una voz neuronal femenina de español de España, comenzando por `es-ES-ElviraNeural`.
- Preparar el texto con SSML para introducir pausas reales entre definiciones, fórmulas, ejemplos y comprobaciones, además de ajustar ritmo, énfasis y pronunciación matemática.
- Guardar el audio final comprimido dentro de una carpeta de recursos del propio proyecto. Durante el uso del alumnado no se enviará texto ni información a Internet.
- Comparar el audio neuronal con la voz actual antes de sustituirla. La voz local se mantendrá únicamente como alternativa si falta el archivo grabado.

## VIDEO-002 · Los vídeos se construyen desde la infografía del tema

**Estado:** Regla activa para todos los vídeos nuevos  
**Ámbito:** Todos los temas de ESO

### Fuente obligatoria

El guion de cada vídeo debe partir de la infografía exacta asociada al curso y al tema. No se utilizará un resumen genérico de otro tema ni el texto de un libro como sustituto de esa infografía.

### Preparación del guion

1. Leer todas las páginas de la infografía del tema.
2. Seleccionar y resumir, en este orden, las definiciones imprescindibles, fórmulas o propiedades, procedimiento de resolución, ejemplo principal, error frecuente y comprobación final.
3. Conservar la notación matemática de la infografía y adaptar únicamente la redacción para que la explicación oral sea clara, breve y natural.
4. Mostrar en pantalla solo una idea principal por escena y coordinarla con la narración y los subtítulos.
5. Revisar el guion final contra la infografía antes de incorporarlo a la aplicación.

La aplicación conserva en cada lección de vídeo la ruta de la infografía utilizada como fuente, para que pueda comprobarse esta correspondencia en posteriores revisiones.
