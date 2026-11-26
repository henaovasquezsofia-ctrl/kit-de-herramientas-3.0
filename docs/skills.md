# Skills que apoyan al Agente

Este directorio contiene 3 skills que el agente puede usar para mejorar sus respuestas y procesamiento de texto. Cada skill está en su carpeta con un archivo `SKILL.md`.

## 1. `skills/etica-confidencialidad/SKILL.md`

### Propósito
Validar que la información manejada en sesiones o documentos respete los principios de confidencialidad y ética psicológica.

### Funcionalidades
- **Detectar información sensible**: Identificar palabras o patrones que involucren datos personales, contraseñas, información médica detallada u otros datos confidenciales que no deberían compartirse en documentos generados automáticamente.
- **Recordar límites éticos**: Recordar al profesional los límites de confidencialidad (riesgo de daño, orden judicial, etc.) al momento de generar documentos como el consentimiento informado.
- **Validar contenido**: Verificar que el texto generado no incluya información identificable sin el debido cuidado.

### Uso sugerido por el agente
Al generar un consentimiento informado o una nota SOAP, el agente puede consultar esta skill para añadir un recordatorio sobre los límites de confidencialidad o validar que no se están incluyendo datos sensibles innecesarios.

---

## 2. `skills/lenguaje-empatico/SKILL.md`

### Propósito
Transformar lenguaje técnico, formal o frío a un tono más empático y cálido, manteniendo el profesionalismo.

### Funcionalidades
- **Mapeo de palabras clave**: Reemplazar términos técnicos o cerrados por frases más abiertas y comprensivas.
- **Transformar tonos**: Convertir respuestas estándar a respuestas que validen los sentimientos del consultante.
- **Mantener precisión**: Los cambios respetan la información clínica pero expresada de manera más acogedora.

### Uso sugerido por el agente
Cuando el agente interactúe con el consultante o redacte partes de las notas, puede aplicar esta skill para mejorar la empatía del comunicado, siempre bajo la supervisión profesional.

---

## 3. `skills/redaccion-profesional/SKILL.md`

### Propósito
Normalizar el texto a un formato profesional coherente, eliminando informalidades, corrección de estilo y asegurando la terminología adecuada.

### Funcionalidades
- **Corrección de informalidades**: Transformar saludos informales, despidos coloquiales o lenguaje coloquial a formas profesionales.
- **Consistencia de terminología**: Asegurar que términos psicológicos y médicos se usen de manera estándar.
- **Formato de salida**: Preparar el texto para su inclusión en documentos formales (consentimientos, notas, informes).

### Uso sugerido por el agente
Al procesar la entrada del usuario o generar partes del documento, el agente puede aplicar esta skill para asegurar que el lenguaje cumpla con los estándares profesionales esperados en un consultorio psicológico.