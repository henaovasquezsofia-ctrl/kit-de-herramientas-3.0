#!/usr/bin/env python3
import os
import json
import random

# Base de datos de ejercicios por tema
EJERCICIOS_DISPONIBLES = {
    "ansiedad": {
        "basico": [
            "Respiración diafragmática: Coloca una mano en el abdomen y otra en el pecho. Inspira profundamente por la nariz, sintiendo que el abdomen se eleva, y exhala lentamente por la boca.",
            "Anclaje 5-4-3-2-1: Nombra 5 cosas que puedes ver, 4 que puedes tocar, 3 que puedes oír, 2 que puedes oler y 1 que puedes saborear.",
            "Autoafirmación positiva: Repite en voz alta o escrita: 'Soy capaz de manejar esta situación con calma'."
        ],
        "intermedio": [
            "Registro de pensamientos automáticos: Anota los pensamientos que atraviesan tu mente cuando sientes ansiedad y cuestiona su veracidad.",
            "Exposición gradual: Elige una situación que te causa ansiedad y acércate a ella poco a poco en sesiones cortas.",
            "Técnica de relajación muscular progresiva:Contrae y relaja cada grupo muscular del cuerpo, desde los pies hasta la cabeza."
        ]
    },
    "sueño": {
        "basico": [
            "Higiene del sueño: Mantén horarios fijos para acostarte y levantarte, incluso los fines de semana.",
            "Ambiente adecuado: Asegúrate de que tu habitación esté oscura, silenciosa y a temperatura fresca.",
            "Sin pantallas antes de dormir: Evita celulares, computadoras y TV al menos 30 minutos antes de acostarte."
        ],
        "intermedio": [
            "Restricción de cama: Solo usa la cama para dormir y relaciones sexuales, no para ver TV o trabajar.",
            "Ritual relajante: Crea una rutina de 30 minutos antes de dormir (lectura, baño tibio, estiramientos suaves).",
            "Control de preocupaciones: Escribe tus preocupaciones en un papel y guárdalo en otra habitación para no rumiar en la cama."
        ]
    },
    "manejo_del_enojo": {
        "basico": [
            "Pausa de 10 segundos: Antes de responder, cuenta hasta 10 y respira profundo.",
            "Identificar desencadenantes: Anota qué situaciones o personas suelen provocarte enojo.",
            "Salida temporal: Si sientes que la ira te está abrumando, retira del momento durante 15 minutos."
        ],
        "intermedio": [
            "Técnica del 'yo siento': Expresa tus sentimientos usando: 'Siento que... cuando... porque...'.",
            "Negociación interna: Negocia con tu parte enojada qué necesidad está tratando de satisfacer y cómo satisfacerla de forma saludable.",
            "Visualización de paz: Cierra los ojos e imagina un lugar tranquilo donde te sientas completamente seguro."
        ]
    },
    "hábitos_saludables": {
        "basico": [
            "Agua al despertar: Toma un vaso de agua tibia con limón antes del desayuno.",
            "Caminata de 15 minutos: Sal a caminar al aire libre después de la comida principal.",
            "Porción de vegetales: Asegúrate de que la mitad de tu plato sea vegetales en cada comida."
        ],
        "intermedio": [
            "Registro de comida y estado: Anota qué comes y cómo te sientes físicamente y emocionalmente después de cada comida.",
            "Preparación de comidas: Dedica un tiempo semanal a preparar porciones saludables para la semana.",
            "Alimentación consciente: Come sin distracciones (sin celular/TV), mastica lentamente y disfruta cada bocado."
        ]
    }
}

def validar_dias(dias_str):
    """Valida que el número de días esté entre 3 y 7."""
    try:
        dias = int(dias_str)
        if 3 <= dias <= 7:
            return dias
        return None
    except ValueError:
        return None

def preguntar(mensaje, opciones=None):
    """Pregunta al usuario y valida la respuesta."""
    while True:
        respuesta = input(mensaje + ": ").strip().lower()
        if opciones:
            if respuesta in opciones:
                return respuesta
            print(f"Por favor, elige una de las opciones: {', '.join(opciones)}")
        else:
            return respuesta

def generar_tema(tema, nivel, dias):
    """Genera la tarea y actualiza el JSON de ejercicios."""
    if tema not in EJERCICIOS_DISPONIBLES:
        print(f"Tema no reconocido. Temas disponibles: {', '.join(EJERCICIOS_DISPONIBLES.keys())}")
        return False
    
    if nivel not in EJERCICIOS_DISPONIBLES[tema]:
        print(f"Nivel no reconocido para este tema. Niveles disponibles: {', '.join(EJERCICIOS_DISPONIBLES[tema].keys())}")
        return False
    
    # Seleccionar 2-3 ejercicios aleatorios
    ejercicios_disponibles = EJERCICIOS_DISPONIBLES[tema][nivel]
    ejercicios_seleccionados = random.sample(ejercicios_disponibles, k=min(3, len(ejercicios_disponibles)))
    
    # Generar título
    titulo = f"Tarea de {nivel} - {tema}"
    
    # Generar explicación de máximo 4 líneas
    explicacion = f"Esta tarea está diseñada para trabajar con {tema} en un nivel {nivel}. " \
                  "Realiza los ejercicios diarios y registra tus impresiones."
    
    # Nombre del archivo
    nombre_archivo = f"tarea_{tema}.txt"
    ruta_archivo = os.path.join(os.path.dirname(os.path.abspath(__file__)), nombre_archivo)
    
    # Generar contenido de la tabla diaria
    dias_semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    filas_tabla = dias
    
    # Generar contenido del archivo
    contenido = f"""{titulo}
{'=' * len(titulo)}

EXPLICACIÓN
-----------
{explicacion}

EJERCICIOS
----------
"""
    
    for i, ejercicio in enumerate(ejercicios_seleccionados, 1):
        contenido += f"{i}. {ejercicio}\n"
    
    contenido += "\nTABLA DE REGISTRO DIARIO\n"
    contenido += "-" * 30 + "\n"
    contenido += "Día\t\tEjercicio realizado\t\tCómo me sentí (1-5)\tObservaciones\n"
    
    for dia_idx in range(dias):
        dia_nombre = dias_semana[dia_idx] if dia_idx < 7 else f"Día {dia_idx + 1}"
        for col in range(3):  # Ejercicio, sensación, observaciones
            if col == 0:
                contenido += f"{dia_nombre}\t"
            else:
                contenido += "\t"
        contenido += "\n"
    
    contenido += "-" * 30 + "\n"
    contenido += "(Registra cada día completando las columnas)\n\n"
    
    contenido += "NOTA IMPORTANTE\n"
    contenido += "-" * 30 + "\n"
    contenido += "Esta tarea no sustituye la atención psicológica profesional. "\
                 "Si experimentas malestar intenso, ansiedad severa, pensamientos intrusivos "\
                 "o dificultades para funcionar en tu vida diaria, por favor contacta a tu psicólogo "\
                 "o a un servicio de salud mental inmediato.\n"
    
    # Escribir el archivo
    with open(ruta_archivo, "w", encoding="utf-8") as f:
        f.write(contenido)
    
    # Actualizar/guardar el archivo JSON de ejercicios
    json_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ejercicios.json")
    
    # Cargar ejercicios existentes si el archivo existe
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            ejercicios_json = json.load(f)
    else:
        ejercicios_json = {}
    
    # Agregar los ejercicios seleccionados a la base de datos
    if tema not in ejercicios_json:
        ejercicios_json[tema] = {}
    if nivel not in ejercicios_json[tema]:
        ejercicios_json[tema][nivel] = []
    
    # Agregar solo si no existen ya
    ejercicios_actuales = set(ejercicios_json[tema][nivel])
    for e in ejercicios_seleccionados:
        if e not in ejercicios_actuales:
            ejercicios_json[tema][nivel].append(e)
    
    # Guardar el JSON actualizado
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(ejercicios_json, f, ensure_ascii=False, indent=4)
    
    print(f"\n¡Tarea generada exitosamente!: {nombre_archivo}")
    print(f"Ejercicios guardados en la base de datos: {json_path}")
    return True

def main():
    print("=== Herramienta de Tareas entre Sesiones ===\n")
    
    # Preguntar tema
    print("Temas disponibles:")
    for i, tema in enumerate(EJERCICIOS_DISPONIBLES.keys(), 1):
        print(f"{i}. {tema}")
    
    tema = preguntar("El tema (ansiedad, sueño, manejo del enojo o hábitos saludables)", 
                      list(EJERCICIOS_DISPONIBLES.keys()))
    
    # Preguntar nivel
    print(f"\nNiveles disponibles para {tema}:")
    for nivel in EJERCICIOS_DISPONIBLES[tema].keys():
        print(f"- {nivel}")
    
    nivel = preguntar(f"El nivel ({tema})", list(EJERCICIOS_DISPONIBLES[tema].keys()))
    
    # Preguntar número de días
    while True:
        dias_str = preguntar("El número de días de la tarea (entre 3 y 7)")
        dias = validar_dias(dias_str)
        if dias:
            break
        print("Por favor, ingresa un número entre 3 y 7.")
    
    # Generar la tarea
    generar_tema(tema, nivel, dias)

if __name__ == "__main__":
    main()