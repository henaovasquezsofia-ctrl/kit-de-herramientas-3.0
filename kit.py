#!/usr/bin/env python3
import subprocess
import sys

def mostrar_menu():
    print("=" * 50)
    print("KIT DE CONSULTORIO - Menú Principal")
    print("=" * 50)
    print("\nOpciones:")
    print("1. Consentimiento informado")
    print("2. Notas de sesión")
    print("3. Tareas entre sesiones")
    print("0. Salir")
    print("=" * 50)

def ejecutar_opcion(opcion):
    scripts = {
        "1": "herramientas/consentimiento_informado.py",
        "2": "herramientas/notas_sesion.py",
        "3": "herramientas/tareas_entre_sesiones.py",
        "0": None
    }
    
    if opcion in scripts:
        script = scripts[opcion]
        if script is None:
            print("\nSaliendo del programa. ¡Hasta luego!")
            return False
        print(f"\nEjecutando: {script}...")
        try:
            subprocess.run([sys.executable, script], check=True)
        except subprocess.CalledProcessError as e:
            print(f"\nError al ejecutar el script: {e}")
        except FileNotFoundError:
            print(f"\nNo se encontró el script: {script}")
        return True
    else:
        print("\nOpción no válida. Por favor, elige 1, 2, 3 o 0.")
        return True

def main():
    while True:
        mostrar_menu()
        opcion = input("\nElige una opción: ").strip()
        if not ejecutar_opcion(opcion):
            break

if __name__ == "__main__":
    main()