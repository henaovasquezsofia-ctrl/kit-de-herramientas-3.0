#!/usr/bin/env python3
"""Agente terminal sencillo para el Kit de Consultorio Psychólogo.

El agente recibe la solicitud del usuario por consola y decide cuál de
las 3 herramientas usar: consentimiento informado, notas de sesión o
tareas entre sesiones. Pide los datos que falten y devuelve el resultado.

Uso:
    python3 agente/agente.py

No requiere servidores ni interfaz externa.
"""

import os
import sys

# Añadir el directorio del proyecto al path para importar herramientas
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from herramientas.consentimiento_informado import main as generar_consentimiento
from herramientas.notas_sesion import main as generar_nota
from herramientas.tareas_entre_sesiones import main as generar_tarea


def mostrar_menu_herramientas():
    """Muestra las opciones de herramientas disponibles."""
    print("\n=== Agente: Menú de Herramientas ===")
    print("1. Consentimiento informado y encuadre terapéutico")
    print("2. Nota de sesión estructurada (SOAP)")
    print("3. Tareas o ejercicios entre sesiones")
    print("0. Salir")
    return input("\n¿Qué necesitas? ").strip()


def decidir_herramienta(opcion):
    """Decide qué herramienta ejecutar según la opción del usuario."""
    if opcion == "1":
        print("\n--- Consentimiento informado y encuadre terapéutico ---")
        generar_consentimiento()
    elif opcion == "2":
        print("\n--- Nota de sesión estructurada ---")
        generar_nota()
    elif opcion == "3":
        print("\n--- Tareas o ejercicios entre sesiones ---")
        generar_tarea()
    elif opcion == "0":
        print("\nHasta luego.")
        sys.exit(0)
    else:
        print("\nOpción no válida. Intenta con 1, 2, 3 o 0.")


def main():
    """Bucle principal del agente terminal."""
    while True:
        opcion = mostrar_menu_herramientas()
        decidir_herramienta(opcion)


if __name__ == "__main__":
    main()