# Kit de Consultorio

## Menú Principal

Ejecuta el menú interactivo con un solo comando:

```bash
python3 kit.py
```

Este menú te permitirá acceder a las tres herramientas principales:

1. **Consentimiento informado** - Genera documentos de consentimiento informado y encuadre terapéutico
2. **Notas de sesión** - Crea notas formatas SOAP con clasificación automática de frases
3. **Tareas entre sesiones** - Genera tareas personalizadas para ejercicios entre consultas

## Estructura del Proyecto

El proyecto contiene las siguientes herramientas organizadas en Python:

- `herramientas/consentimiento_informado.py` - Generador de consentimientos informados
- `herramientas/notas_sesion.py` - Generador de notas SOAP clínicas
- `herramientas/tareas_entre_sesiones.py` - Generador de tareas personalizadas
- `agente/agente.py` - Agente terminal sencillo que decide qué herramienta usar
- `skills/` - Skills que apoyan al agente (ética-confidencialidad, lenguaje-empatico, redaccion-profesional)

## Ejecución

Para iniciar el menú principal, ejecuta:

```bash
cd /ruta/al/proyecto
python3 kit.py
```

Sigue las instrucciones en pantalla para cada opción seleccionada.

## Herramientas Incluidas

1. **Consentimiento informado**: Pregunta datos del profesional y genera un documento de consentimiento con secciones de datos, proceso, encuadre terapéutico, confidencialidad y derechos del consultante.

2. **Notas de sesión**: Divide los apuntes en frases y las clasifica en formato SOAP (S, O, A, P). Incluye marcado manual con `S:`, `O:`, `A:`, `P:` y muestra frases que conviene revisar.

3. **Tareas entre sesiones**: Genera tareas personalizadas seleccionando tema (ansiedad, sueño, manejo del enojo, hábitos saludables), nivel (basico/intermedio) y duración (3-7 días). Incluye tabla de registro diario y ejercicios guardados en JSON para futuras actualizaciones.

## Agente Terminal

El agente decide cuál de las 3 herramientas usar según tu necesidad, pide los datos que falten y devuelve el resultado. Todo se ejecuta en la terminal, sin necesidad de servidores externos.

Skills disponibles:
- `etica-confidencialidad` - Principios de confidencialidad y límites éticos
- `lenguaje-empatico` - Transformación de lenguaje a tono empático
- `redaccion-profesional` - Normalización de texto a formato profesional