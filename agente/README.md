# Agente Terminal - Kit de Consultorio

### Descripción
Agente sencillo que se ejecuta en la terminal. El usuario escribe lo que necesita y el agente decide cuál de las 3 herramientas usar (consentimiento informado, notas de sesión o tareas entre sesiones), pide los datos que falten y devuelve el resultado.

### Características
- **Sin interfaz externa**: Solo consola, sin dependencias externas.
- **Privado**: Los datos no se envían a ningun lado, se quedan en tu computadora.
- **Local**: Las herramientas se ejecutan en tu máquina sin necesidad de conexiones externas.

### Cómo usar
Ejecuta el agente desde la terminal:

```bash
python3 agente/agente.py
```

### Menú de opciones
Al iniciar, el agente muestra:

```
=== Agente: Menú de Herramientas ===

1. Consentimiento informado y encuadre terapéutico
2. Nota de sesión estructurada (SOAP)
3. Tareas o ejercicios entre sesiones
0. Salir
```

### Flujo de trabajo

**Opción 1: Consentimiento informado**
- El agente ejecuta la herramienta `herramientas/consentimiento_informado.py`
- Pide los datos del profesional y del encuadre terapéutico
- Genera un archivo `consentimiento.txt`

**Opción 2: Nota de sesión estructurada**
- El agente ejecuta la herramienta `herramientas/notas_sesion.py`
- Pide el código del consultante, fecha y apuntes libres
- Genera un archivo `nota_{codigo}_{fecha}.txt` con formato SOAP

**Opción 3: Tareas entre sesiones**
- El agente ejecuta la herramienta `herramientas/tareas_entre_sesiones.py`
- Pide tema (ansiedad/sueño/manejo del enojo/hábitos saludables), nivel y duración
- Genera `tarea_{tema}.txt` y actualiza `ejercicios.json`

**Opción 0: Salir**
- Termina la ejecución del agente.

### Requisitos
- Python 3.9+
- Las 3 herramientas en `herramientas/` (incluidas en el proyecto)
- No se requiere librerías externas adicionales (usa solo `input` y `os`)