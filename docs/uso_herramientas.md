# Documentación de las Herramientas

## 1. Consentimiento Informado (`herramientas/consentimiento_informado.py`)

### Descripción
Genera un documento de consentimiento informado y encuadre terapéutico para sesiones psicológicas.

### Datos que solicita
- **Nombre del profesional**: Nombre del psicólogo o institución.
- **Modalidad de atención**: Presencial o virtual.
- **Duración de la sesión**: En minutos.
- **Frecuencia**: Frecuencia de las sesiones (semanal, quincenal, etc.).
- **Valor de la sesión**: Precio o tarifa por sesión.
- **Política de cancelación**: Horas de anticipación necesarias para cancelar o reprogramar.
- **Medio de contacto**: Correo electrónico, teléfono, u otro medio.

### Archivo generado
- `consentimiento.txt` en el mismo directorio de la herramienta.

### Contenido del documento
El archivo generado incluye secciones de:
- Datos del profesional
- En qué consiste el proceso
- Encuadre terapéutico (duración, frecuencia, valor, cancelación)
- Confidencialidad y sus límites
- Derechos del consultante
- Fecha y firma

---

## 2. Nota de Sesión Estructurada (`herramientas/notas_sesion.py`)

### Descripción
Organiza las anotaciones de una sesión de terapia en formato estructurado SOAP (Subjective, Objective, Analysis, Plan) con clasificación automática de frases.

### Datos que solicita
- **Código ficticio del consultante**: Ej. C001
- **Fecha de la sesión**: Ej. 2024-02-10
- **Tus apuntes libres de la sesión**: Texto libre con los puntos clave de la sesión.

### Funcionamiento
1. Divide los apuntes en frases utilizando puntos, comas o la palabra "y".
2. Clasifica cada frase en una sección SOAP:
   - **P (Plan)**: Próxima sesión, tarea, derivaciones, prácticas sugeridas.
   - **O (Objetivo)**: Lo que el profesional observa (postura, tono de voz, llanto, etc.).
   - **A (Análisis)**: Hipótesis, posibles patrones, compatibilidades.
   - **S (Subjetivo)**: Lo que el consultante dice, refiere, cuenta, manifiesta, siente.
   - **Sin_clasificar**: Frases que no coinciden con las palabras clave definidas.
3. Permite marcado manual: si una frase comienza con `S:`, `O:`, `A:` o `P:`, va directo a esa sección.
4. Genera un archivo de texto con la nota SOAP completa y una sección de "Frases que conviene revisar".

### Archivo generado
- `nota_{codigo}_{fecha}.txt` en el mismo directorio de la herramienta.

---

## 3. Tareas entre Sesiones (`herramientas/tareas_entre_sesiones.py`)

### Descripción
Genera tareas o ejercicios personalizados para trabajar entre sesiones terapéuticas, según el objetivo terapéutico del consultante.

### Datos que solicita
- **Tema**: Ansiedad, sueño, manejo del enojo o hábitos saludables.
- **Nivel**: Basico o intermedio (según el tema seleccionado).
- **Número de días**: Entre 3 y 7 días (duración de la tarea).

### Funcionamiento
1. Selecciona de 2 a 3 ejercicios aleatorios de la base de datos disponible para el tema y nivel escogidos.
2. Genera un archivo de texto con:
   - Título y explicación de la tarea.
   - Los ejercicios seleccionados.
   - Una tabla de registro diario (día | ejercicio realizado | sensación 1-5 | observaciones).
   - Una nota importante sobre la naturaleza de la tarea (no sustituye la atención profesional).
3. Guarda los ejercicios en un archivo `ejercicios.json` para futuras actualizaciones y base de datos compartida.

### Archivos generados
- `tarea_{tema}.txt`: El contenido de la tarea con la tabla de registro.
- `ejercicios.json`: Base de datos JSON con los ejercicios guardados para reutilizarlos.

### Nota importante
La tarea no sustituye la atención psicológica profesional. Si se experimenta malestar intenso, ansiedad severa, pensamientos intrusivos o dificultades para funcionar en la vida diaria, se debe contactar al psicólogo o a un servicio de salud mental inmediato.