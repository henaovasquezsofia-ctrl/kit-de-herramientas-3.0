def profesionalizar_texto(texto):
    formal_map = {
        "hola": "Saludos",
        "chao": "Hasta luego",
        "thanks": "Agradezco mucho tu colaboración",
        "ok": "De acuerdo",
        "sí": "Sí, correcto",
        "no": "No, no es posible",
    }
    texto_lower = texto.lower()
    for clave, respuesta in formal_map.items():
        if clave in texto_lower:
            return respuesta
    return texto