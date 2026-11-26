def verificar_confidencialidad(texto):
    sensitive_palabras = ["contraseña", "dato personal", "privado", "confidencial"]
    texto_lower = texto.lower()
    for p in sensitive_palabras:
        if p in texto_lower:
            return "⚠️ Cuidado: No compartas información confidencial o datos personales en el chat."
    return None