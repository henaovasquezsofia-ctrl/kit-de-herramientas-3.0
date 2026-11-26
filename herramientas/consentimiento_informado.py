#!/usr/bin/env python3
import os

def preguntar(mensaje):
    respuesta = input(mensaje + ": ").strip()
    return respuesta

def main():
    print("=== Generador de Consentimiento Informado y Encuadre Terapéutico ===\n")
    
    nombre = preguntar("Nombre del profesional")
    modalidad = preguntar("Modalidad de atención (presencial o virtual)")
    duracion = preguntar("Duración de la sesión en minutos")
    frecuencia = preguntar("Frecuencia")
    valor = preguntar("Valor de la sesión")
    politica_cancelacion = preguntar("Política de cancelación en horas")
    contacto = preguntar("Medio de contacto")
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    nombre_archivo = os.path.join(script_dir, "consentimiento.txt")
    with open(nombre_archivo, "w", encoding="utf-8") as f:
        f.write("CONSENTIMIENTO INFORMADO\n")
        f.write("=" * 40 + "\n\n")
        
        f.write("DATOS DEL PROFESIONAL\n")
        f.write("-" * 30 + "\n")
        f.write(f"Profesional: {nombre}\n")
        f.write(f"Modalidad de atención: {modalidad}\n\n")
        
        f.write("EN QUÉ CONSISTE EL PROCESO\n")
        f.write("-" * 30 + "\n")
        f.write("El presente documento tiene como objetivo establecer el marco de la relación profesional-consultante, definiendo los términos en los que se prestará el servicio de psicología.\n\n")
        
        f.write("ENCUADRE TERAPÉUTICO\n")
        f.write("-" * 30 + "\n")
        f.write(f"Duración de la sesión: {duracion} minutos\n")
        f.write(f"Frecuencia de las sesiones: {frecuencia}\n")
        f.write(f"Valor de la sesión: {valor}\n")
        f.write(f"Política de cancelación: {politica_cancelacion} horas con anticipación\n\n")
        
        f.write("CONFIDENCIALIDAD Y SUS LÍMITES\n")
        f.write("-" * 30 + "\n")
        f.write("La información compartida en las sesiones es confidencial y no será divulgada sin el consentimiento explícito del consultante, excepto en los siguientes casos:\n")
        f.write("• Riesgo para la vida propia o de otros (peligro inmediato de daño grave)\n")
        f.write("• Orden judicial o requisa legalmente válida\n\n")
        
        f.write("DERECHOS DEL CONSULTANTE\n")
        f.write("-" * 30 + "\n")
        f.write("• Derecho a la privacidad y confidencialidad\n")
        f.write("• Derecho a recibir información sobre el proceso terapéutico\n")
        f.write("• Derecho a dar su consentimiento o retirarlo en cualquier momento\n")
        f.write("• Derecho a recibir un trato respetuoso y profesional\n\n")
        
        f.write("FECHA Y FIRMA\n")
        f.write("-" * 30 + "\n")
        f.write("_______________________________\n")
        f.write("Fecha: _________________________\n")
        f.write("Firma del profesional: _________________________\n")
        f.write("Firma del consultante: _________________________\n")
    
    print(f"\nDocumento generado: {nombre_archivo}")

if __name__ == "__main__":
    main()