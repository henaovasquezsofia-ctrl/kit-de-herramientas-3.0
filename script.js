// === landing/script.js ===
// Interactividad pura: HTML + CSS + Vanilla JavaScript
// Sin frameworks, sin servidores, sin librerías externas

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // CONFIGURACIÓN Y ELEMENTOS
  // ==========================================

  const acento = '#ff6b6b';
  const acento2 = '#4a90e2';

  // ==========================================
  // 1. HERRAMIENTAS INTERACTIVAS
  // ==========================================

  // A. Consentimiento Informado
  function initConsentimiento() {
    const form = document.getElementById('form-consentimiento');
    const btn = document.getElementById('btn-generar-consentimiento');
    const resultado = document.getElementById('resultado-consentimiento');

    if (!form || !btn || !resultado) return;

    btn.addEventListener('click', function(e) {
      e.preventDefault();

      // Obtener valores del formulario
      const nombre = form.elements['consultante-nombre']?.value || 'Consultante';
      const modalidad = form.elements['modalidad']?.value || 'presencial';
      const honorarios = form.elements['honorarios']?.value || '$5000';
      const cancelacion = form.elements['cancelacion']?.value || '2';

      // Texto de ejemplo ficticio
      const textoEjemplo = `CONSENTIMIENTO INFORMADO

========================================

DATOS DEL PROFESIONAL
------------------------------
Profesional: Dr./a [Nombre del profesional]

Modalidad de atención: ${modalidad}

EN QUÉ CONSISTE EL PROCESO
------------------------------
El presente documento tiene como objetivo establecer el marco de la relación profesional-consultante, definiendo los términos en los que se prestará el servicio de psicología.

ENCUADRE TERAPÉUTICO
------------------------------
Duración de la sesión: 50 minutos
Frecuencia de las sesiones: Quincenal
Valor de la sesión: ${honorarios}
Política de cancelación: ${cancelacion} horas con anticipación

CONFIDENCIALIDAD Y SUS LÍMITES
------------------------------
La información compartida en las sesiones es confidencial y no será divulgada sin el consentimiento explícito del consultante, excepto en los siguientes casos:
• Riesgo para la vida propia o de otros (peligro inmediato de daño grave)
• Orden judicial o requisa legalmente válida

DERECHOS DEL CONSULTANTE
------------------------------
• Derecho a la privacidad y confidencialidad
• Derecho a recibir información sobre el proceso terapéutico
• Derecho a dar su consentimiento o retirarlo en cualquier momento
• Derecho a recibir un trato respetuoso y profesional

FECHA Y FIRMA
------------------------------
_______________________________
Fecha: ___/___/________
Firma del profesional: _________________________
Firma del consultante: _________________________`;

      // Mostrar resultado
      resultado.innerHTML = `<pre style="font-family: ui-monospace, monospace; background: #f8f9fa; padding: 1.5rem; border-radius: 8; margin-top: 1rem; overflow-x: auto;">${textoEjemplo}</pre>`;
      resultado.parentElement.style.display = 'block';

      // Aviso ficticio
      const aviso = document.createElement('p');
      aviso.style.color = '#6c757d';
      aviso.style.fontSize = '0.85rem';
      aviso.style.marginTop = '0.5rem';
      aviso.innerHTML = '⚠️ Ejemplo ficticio: Los datos anterior son para demostración. No incluyen información real de pacientes.';
      resultado.parentElement.appendChild(aviso);

      // Enfocar de nuevo el resultado
      resultado.parentElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // B. Notas de Sesión
  function initNotasSesion() {
    const form = document.getElementById('form-notas');
    const btn = document.getElementById('btn-organizar');
    const resultado = document.getElementById('resultado-notas');

    if (!form || !btn || !resultado) return;

    btn.addEventListener('click', function(e) {
      e.preventDefault();

      // Obtener valores
      const motivo = form.elements['motivo']?.value || 'Cliente llega a consulta';
      const observaciones = form.elements['observaciones']?.value || 'Observa postura encogida, tono de voz bajo, manifestó ansiedad por hablar en público';
      const intervenciones = form.elements['intervenciones']?.value || 'Trabajar en técnicas de respiración y exposición gradual';
      const plan = form.elements['plan']?.value || 'Practicar respiración diafragmática en casa; agenda exposición gradual en próximas sesiones';

      // Estructurar en formato SOAP
      const soapText = `FORMATO SOAP

S - SUBJETIVO (Consultante)
------------------------------
${motivo}

O - OBJETIVO (Profesional)
------------------------------
${observaciones}

A - ANÁLISIS (Profesional)
------------------------------
${intervenciones}

P - PLAN (Profesional)
------------------------------
${plan}

Frases que conviene revisar: ${motivo} (clasificada como Subjetivo)`;

      resultado.innerHTML = `<div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8; margin-top: 1rem; overflow-x: auto; border: 1px solid #e3e6f0;">
        <pre>${soapText}</pre>
      </div>`;

      // Contadores
      const contador = document.createElement('p');
      contador.style.color = '#6c757d';
      contador.style.fontSize = '0.85rem';
      contador.style.marginTop = '0.5rem';
      contador.innerHTML = '✓ 4 frases clasificadas (S, O, A, P) • 1 frase para revisar';
      resultado.innerHTML += '<br>' + contador.innerHTML;

      // Aviso ficticio
      const aviso = document.createElement('p');
      aviso.style.color = '#6c757d';
      aviso.style.fontSize = '0.85rem';
      aviso.style.marginTop = '0.5rem';
      aviso.innerHTML = '⚠️ Ejemplo ficticio: Estructura automática de ejemplo. No reemplaza la clínica profesional.';
      resultado.innerHTML += '<br>' + aviso.innerHTML;

      resultado.parentElement.style.display = 'block';
      resultado.parentElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // C. Tareas entre Sesiones
  function initTareas() {
    const selector = document.getElementById('objetivo-tema');
    const btn = document.getElementById('btn-sugerir-tarea');
    const resultado = document.getElementById('resultado-tarea');

    if (!selector || !btn || !resultado) return;

    // Base de datos de ejercicios de ejemplo
    const ejercicios = {
      ansiedad: {
        titulo: 'Tarea para Ansiedad',
        ejercicio: 'Ejercicio de anclaje 5-4-3-2-1: Nombra 5 cosas que puedes ver, 4 que puedes tocar, 3 que puedes oír, 2 que puedes oler y 1 que puedes saborear. Realiza este ejercicio durante 5 minutos cuando sientas ansiedad intensa.',
        registro: 'Lunes: Ejercicio realizado • Cómo te sentiste: 4/5 • Observaciones: Disminuyó la intensidad de la ansiedad'
      },
      regulacion: {
        titulo: 'Tarea para Regulación Emocional',
        ejercicio: 'Técnica de respiración 4-7-8: Inspira por 4 cuentas, mantén la respiración 7 cuentas, exhala por 8 cuentas. Repite 4 veces. Practica 3 veces al día.',
        registro: 'Lunes: 4-7-8 completado • Cómo te sentiste: 3/5 • Observaciones: Mayor calma después de la práctica'
      },
      sueño: {
        titulo: 'Tarea para Hábitos de Sueño',
        ejercicio: 'Regla de las 3 pantallas: No usar celular, computadora ni TV al menos 30 minutos antes de acostarte. Lee un libro físico o hace estiramientos suaves en su lugar.',
        registro: 'Lunes: Sin pantallas antes de dormir • Cómo me sentí: 4/5 • Observaciones: Me dormí más rápido que de costumbre'
      }
    };

    btn.addEventListener('click', function(e) {
      e.preventDefault();

      const temaSeleccionado = selector.value;
      const temaData = ejercicios[temaSeleccionado] || ejercicios.ansiedad;

      resultado.innerHTML = `
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8; margin-top: 1rem; overflow-x: auto; border: 1px solid #e3e6f0;">
          <h4 style="margin-top: 0; color: ${acento2};">${data.titulo}</h3>
          <p><strong>Ejercicio:</strong> ${data.ejercicio}</p>
          <p><strong>Tabla de registro diario:</strong></p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem;">
            <tr style="background: #e9ecef;">
              <th style="padding: 8px; text-align: left;">Día</th>
              <th style="padding: 8px; text-align: left;">Ejercicio realizado</th>
              <th style="padding: 8px; text-align: left;">Cómo me sentí (1-5)</th>
              <th style="padding: 8px; text-align: left;">Observaciones</th>
            </tr>
            <tr>
              <td style="padding: 8px;">Lunes</td>
              <td style="padding: 8px;">${data.ejercicio}</td>
              <td style="padding: 8px;">${data.registro.split('•')[0].split(': ')[1]}</td>
              <td style="padding: 8px;">${data.registro.split('•')[1] ? data.registro.split('•')[1].trim() : ''}</td>
            </tr>
          </table>
        </div>`;

      // Aviso ficticio
      const aviso = document.createElement('p');
      aviso.style.color = '#6c757d';
      aviso.style.fontSize = '0.85rem';
      aviso.style.marginTop = '0.5rem';
      aviso.innerHTML = '⚠️ Ejemplo ficticio: Ejercicio sugerido para demostración. No sustituye la intervención profesional.';
      resultado.innerHTML += '<br>' + aviso.innerHTML;

      resultado.parentElement.style.display = 'block';
      resultado.parentElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================
  // 2. AGENTE TIPO CHAT
  // ==========================================

  function initAgenteChat() {
    const entrada = document.getElementById('entrada-agente');
    const btnEnviar = document.getElementById('btn-enviar');
    const mensajes = document.getElementById('mensajes-agente');
    const btnReset = document.getElementById('btn-reset');

    if (!entrada || !btnEnviar || !mensajes) return;

    // Botones de ejemplos rápidos
    const btnsEjemplo = document.querySelectorAll('.btn-ejemplo-rápido');

    function añadirMensaje(texto, esUsuario = false) {
      const div = document.createElement('div');
      div.style.cssText = `
        padding: 10px 15px;
        margin: 8px 0;
        border-radius: 18px;
        max-width: 80%;
        word-wrap: break-word;
        font-size: 0.9rem;
      `;
      div.style.background = esUsuario ? '#ff6b6b' : '#e3e6f0';
      div.style.color = esUsuario ? '#ffffff' : '#2d3a3c';
      div.style.marginLeft = esUsuario ? 'auto' : '0';
      div.style.marginRight = esUsuario ? '0' : 'auto';
      div.style.boxShadow = esUsuario ? '0 1px 2px rgba(0,0,0,0.1)' : 'none';
      div.innerHTML = marked ? marked(texto) : nl2br(texto);
      mensajes.appendChild(div);
      mensajes.scrollTop = mensajes.scrollHeight;
    }

    function nl2br(texto) {
      return (texto + '').replace(/([^>\r\n]?)(\r\n|\n\r|\n)/g, '$1<br>$2');
    }

    function agenteResponder(textoUsuario) {
      const bajo = textoUsuario.toLowerCase();

      // Detectar palabras clave
      if (bajo.includes('consentimiento') || bajo.includes('consent')) {
        return `🤖 Agente: Detecté que necesitas consentimiento informado.

Como dato de ejemplo: El agente sugeriría generar un consentimiento con los datos básicos: nombre del profesional, modalidad, honorarios y política de cancelación. Usa el formulario de "Consentimiento informado" para completar los campos reales.

*Nota: El agente real funciona con python3 kit.py → menú → opción 1 → pide datos → genera archivo consentimiento.txt*`;`
      } else if (bajo.includes('nota') || bajo.includes('sesion') || bajo.includes('sesión') || bajo.includes('soap')) {
        return `🤖 Agente: Detecté que necesitas una nota de sesión.

Como dato de ejemplo: El agente sugeriría organizar tus apuntes en formato SOAP (S-O-A-P). Usa el generador de notas de sesión para estructurar motivo, observaciones, intervenciones y plan.

*Nota: El agente real funciona con python3 kit.py → menú → opción 2 → pide datos → genera nota estructurada*`;`
      } else if (bajo.includes('tarea') || bajo.includes('ejercicio') || bajo.includes('ansiedad') || bajo.includes('depresión')) {
        return `🤖 Agente: Detecté que necesitas una tarea o ejercicio.

Como dato de ejemplo: El agente sugeriría una tarea según tu objetivo (ansiedad, regulación emocional o hábitos de sueño). Usa el generador de tareas entre sesiones para seleccionar tema, nivel y duración.

*Nota: El agente real funciona con python3 kit.py → menú → opción 3 → pregunta tema/nivel/días → genera archivo tarea_*.txt*`;`
      } else {
        return `🤖 Agente: No identifico tu necesidad específica.

Usa los botones rápidos de abajo o escribe qué necesitas (consentimiento, nota de sesión o tarea). El agente detecta palabras clave para decidir qué herramienta mostrar.

*Nota: El agente real funciona con python3 kit.py → menú interactivo en terminal.`;`
      }
    }

    // Manejar envío
    function manejarEnvio(e) {
      const texto = entrada.value.trim();
      if (!texto) return;

      // Mostrar mensaje usuario
      añadirMensaje(texto, true);
      entrada.value = '';

      // Pequeña pausa para simular procesamiento
      setTimeout(() => {
        const respuesta = agenteResponder(texto);
        añadirMensaje(respuesta, false);
      }, 500);
    }

    // Evento envío por botón
    btnEnviar.addEventListener('click', manejarEnvio);

    // Evento Enter
    entrada.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        manejarEnvio();
      }
    });

    // Botones de ejemplos rápidos
    btnsEjemplo.forEach(btn => {
      btn.addEventListener('click', function() {
        const texto = this.getAttribute('data-texto');
        entrada.value = texto;
        setTimeout(manejarEnvio, 100);
      });
    });

    // Reset
    if (btnReset) {
      btnReset.addEventListener('click', function() {
        mensajes.innerHTML = '';
        entrada.focus();
      });
    }
  }

  // ==========================================
  // 3. SKILLS EXPANSIBLES (Accordions)
  // ==========================================

  function initSkillsAccordions() {
    const skills = document.querySelectorAll('.skill-acordeon');

    skills.forEach(skill => {
      const titulo = skill.querySelector('.skill-titulo');
      const contenido = skill.querySelector('.skill-contenido');
      const toggleIcon = skill.querySelector('.skill-toggle-icon');

      if (!titulo || !contenido) return;

      // Estado inicial: contraído
      let estaAbierto = false;

      function toggle() {
        estaAbierto = !estaAbierto;
        contenido.style.maxHeight = estaAbierto ? `${contenido.scrollHeight}px` : '0';
        contenido.style.transition = 'max-height 0.3s ease-out';
        titulo.setAttribute('aria-expanded', estaAbierto);
        if (toggleIcon) {
          toggleIcon.textContent = estaAbierto ? '▼' : '▶';
        }
      }

      titulo.addEventListener('click', toggle);

      // Cerrar al hacer clic fuera (opcional)
      titulo.setAttribute('role', 'button');
      titulo.setAttribute('aria-controls', contenido.id);
      titulo.setAttribute('tabindex', '0');
      titulo.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  // ==========================================
  // 4. AVISOS FICTICIOS Y ENFOQUE
  // ==========================================

  function initAvisos() {
    // Crear banner de aviso si no existe
    if (!document.querySelector('.aviso-ficticio')) {
      const banner = document.createElement('div');
      banner.className = 'aviso-ficticio';
      banner.style.cssText = `
        background: #fff8f0;
        border: 1px solid #ffe8f0;
        padding: 12px 16px;
        margin: 20px 0;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #6c757d;
        display: flex;
        align-items: center;
        gap: 10px;
      `;
      banner.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <span>⚠️ <strong>Ejemplos ficticios:</strong> Los datos generados son solo para demostración y no incluyen información real de pacientes. Este kit apoya al profesional y no reemplaza su criterio clínico.</span>
      `;
      // Insertar antes del footer
      const footer = document.querySelector('footer');
      if (footer) {
        footer.parentNode.insertBefore(banner, footer);
      } else {
        document.body.insertBefore(banner, document.body.lastElementChild);
      }
    }
  }

  // ==========================================
  // INICIALIZAR TODAS LAS FUNCIONES
  // ==========================================

  initConsentimiento();
  initNotasSesion();
  initTareas();
  initAgenteChat();
  initSkillsAccordions();
  initAvisos();

});