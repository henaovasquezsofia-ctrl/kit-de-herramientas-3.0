#!/usr/bin/env python3
import os
import re

def quitar_tildes(texto):
    """Quita las tildes del texto para comparación."""
    replacements = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
    }
    for tilde, sin_tilde in replacements.items():
        texto = texto.replace(tilde, sin_tilde)
    return texto

def normalizar_para_busqueda(texto):
    """Normaliza texto para búsqueda: quita tildes, minúsculas, y convierte verbos a infinitivo simple."""
    texto = quitar_tildes(texto).lower().strip()
    # Lista simple de conjugaciones comunes a infinitivo
    conjugaciones = {
        'trabajamos': 'trabajar', 'trabajan': 'trabajar', 'trabajé': 'trabajar',
        'hacemos': 'hacer', 'hacen': 'hacer', 'hice': 'hacer',
        'respiracion': 'respiracion', 'respiramos': 'respiracion',
        'diafragmatica': 'diafragmatica', 'diafragmático': 'diafragmatica',
    }
    for conjugado, infinito in conjugaciones.items():
        texto = texto.replace(conjugado, infinito)
    return texto

def preguntar(mensaje):
    respuesta = input(mensaje + ": ").strip()
    return respuesta

def dividir_en_frases(apuntes):
    """Divide el texto en frases por separadores: punto, coma, punto y salto o la palabra 'y'."""
    texto = apuntes.replace('\n', ' ')
    
    tiene_puntos = bool(re.search(r'[.!?]', texto))
    
    if tiene_puntos:
        frases = re.split(r'(?<=[.!?])\s+', texto)
    else:
        if ' y ' in texto:
            frases = re.split(r'\s+y\s+', texto)
        elif ',' in texto:
            frases = [f.strip() for f in texto.split(',') if f.strip()]
        else:
            frases = [texto.strip()] if texto.strip() else []
    
    frases = [f.strip() for f in frases if f.strip()]
    return frases

def clasificar_frase(frase, marcas_manual=None):
    """
    Clasifica una frase en una sección: P, O, A, S o Sin_clasificar.
    
    Prioridad: P > O > A > S
    Si la frase empieza con S:, O:, A: o P: (ignorando tildes y mayúsculas), 
    va directo a esa sección.
    """
    frase_norm = normalizar_para_busqueda(frase)
    
    manual_match = re.match(r'^([SsOoAaPp]):\s*(.+)$', frase_norm)
    if manual_match:
        etiqueta = manual_match.group(1).upper()
        texto_despues_dos_puntos = manual_match.group(2).strip()
        if texto_despues_dos_puntos and etiqueta in ['S', 'O', 'A', 'P']:
            return {'section': etiqueta, 'original': frase, 'reason': 'marcado_manual'}
    
    p_keywords = [
        "próxima sesión", "tarea", "quedamos", "se sugiere", "se acuerda",
        "trabajar", "revisar", "practicar", "derivar", "agendar", "pendiente",
        "respiración", "diafragmática", "ejercicios de respiración", "relajación"
    ]
    
    o_keywords = [
        "se observa", "se veía", "se ve", "observo", "postura", "tono de voz",
        "llanto", "contacto visual", "inquieto", "cansado", "afecto", "llegó", "puntual"
    ]
    
    s_keywords = [
        "dice", "refiere", "cuenta", "comenta", "manifiesta", "siente",
        "se siente", "le preocupa", "no puede", "no duerme", "tiene miedo", "según"
    ]
    
    a_keywords = [
        "posible", "hipótesis", "podría", "parece", "sugiere",
        "compatible con", "patrón", "relacionado con", "probablemente", "al parecer"
    ]
    
    frase_busqueda = normalizar_para_busqueda(frase)
    
    p_score = sum(1 for palabra in p_keywords if palabra in frase_busqueda)
    o_score = sum(1 for palabra in o_keywords if palabra in frase_busqueda)
    a_score = sum(1 for palabra in a_keywords if palabra in frase_busqueda)
    s_score = sum(1 for palabra in s_keywords if palabra in frase_busqueda)
    
    if p_score > 0:
        return {'section': 'P', 'original': frase, 'reason': 'palabras_clave', 'score': p_score}
    elif o_score > 0:
        return {'section': 'O', 'original': frase, 'reason': 'palabras_clave', 'score': o_score}
    elif a_score > 0:
        return {'section': 'A', 'original': frase, 'reason': 'palabras_clave', 'score': a_score}
    elif s_score > 0:
        return {'section': 'S', 'original': frase, 'reason': 'palabras_clave', 'score': s_score}
    else:
        return {'section': 'Sin_clasificar', 'original': frase, 'reason': 'ninguna_coincidencia'}

def main():
    print("=== Generador de Nota SOAP Estructurada ===\n")
    
    codigo = preguntar("Código ficticio del consultante (ej: C001)")
    fecha = preguntar("Fecha de la sesión (ej: 2024-02-10)")
    apuntes = preguntar("Tus apuntes libres de la sesión")
    
    # Dividir en frases
    frases = dividir_en_frases(apuntes)
    
    # Clasificar cada frase
    clasificadas = []
    frases_revisar = []
    
    for frase in frases:
        resultado = clasificar_frase(frase)
        clasificadas.append(resultado)
        
        if resultado['section'] == 'Sin_clasificar':
            frases_revisar.append(resultado['original'])
    
    # Contar frases por sección
    secciones = {'P': [], 'O': [], 'A': [], 'S': [], 'Sin_clasificar': []}
    for c in clasificadas:
        secciones[c['section']].append(c['original'])
    
    # Quitar posibles prefijos manuales S:, O:, A:, P: del contenido
    def quitar_prefijo_marcado(texto):
        """Elimina S:, O:, A: o P: al inicio de un texto si existe."""
        patron = r'^[SsOoAaPp]:\s*'
        match = re.match(patron, texto)
        if match:
            return texto[match.end():].strip()
        return texto
    
    # Aplicar limpieza a todas las frases antes de almacenar
    frases_limpias = {}
    for sec in ['P', 'O', 'A', 'S', 'Sin_clasificar']:
        frases_limpias[sec] = [quitar_prefijo_marcado(f) for f in secciones[sec]]
    
    # Construir la nota SOAP
    script_dir = os.path.dirname(os.path.abspath(__file__))
    nombre_archivo = os.path.join(script_dir, f"nota_{codigo}_{fecha}.txt")
    
    with open(nombre_archivo, "w", encoding="utf-8") as f:
        f.write("ADVERTENCIA: Este es un borrador para revisión del profesional.\n")
        f.write("No debe ser compartido con el consultante sin la debida revisión y firma.\n")
        f.write("=" * 50 + "\n\n")
        
        f.write("FORMATO SOAP\n\n")
        
        f.write("S - SUBJETIVO (Consultante)\n")
        f.write("-" * 30 + "\n")
        f.write("\n".join(frases_limpias['S']) + "\n\n")
        
        f.write("O - OBJETIVO (Profesional)\n")
        f.write("-" * 30 + "\n")
        f.write("\n".join(frases_limpias['O']) + "\n\n")
        
        f.write("A - ANÁLISIS (Profesional)\n")
        f.write("-" * 30 + "\n")
        f.write("\n".join(frases_limpias['A']) + "\n\n")
        
        f.write("P - PLAN (Profesional)\n")
        f.write("-" * 30 + "\n")
        f.write("\n".join(frases_limpias['P']) + "\n")
        
        # Sección de frases a revisar
        f.write("\nFrases que conviene revisar\n")
        f.write("-" * 30 + "\n")
        for frase in frases_revisar:
            f.write(f"- {quitar_prefijo_marcado(frase)}\n")
    
    print(f"\nNota generada: {nombre_archivo}")
    
    # Mostrar resumen
    print("\n=== Resumen de clasificación ===")
    for sec in ['P', 'O', 'A', 'S', 'Sin_clasificar']:
        if secciones[sec]:
            print(f"{sec}: {len(secciones[sec])} frase(s)")
            for f in secciones[sec]:
                print(f"  - {f[:60]}...")

if __name__ == "__main__":
    main()