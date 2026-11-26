def aplicar_tono_empatico(texto):
    empathic_map = {
        "hola": "¡Hola! Cómo estás hoy?",
        "gracias": "De nada, siempre es un placer ayudarte.",
        "adiós": "Hasta luego, cuídate mucho.",
        "perdón": "No te preocupes, todos cometemos errores.",
        "que tal": "Espero que todo vaya bien por tu lado.",
    }
    texto_lower = texto.lower()
    for clave, respuesta in empathic_map.items():
        if clave in texto_lower:
            return respuesta
    return texto