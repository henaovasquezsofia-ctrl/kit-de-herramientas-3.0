// === landing/script.js ===
// Interaccion puura: HTML + CSS + Vanilla JavaScript
// Sin frameworks, sin servidores, sin librerias externas

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

    // DEPURACIÓN: Verificar elementos en consola al inicio
    if (typeof console !== 'undefined') {
      console.log('Iniciando consentimiento:', {form: !!form, btn: !!btn, resultado: !!resultado});
    }

    if (!form || !btn || !resultado) {
      // Si no encuentra los elementos, crear un mensaje de error en la página
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'background: #fff0f0; border: 1px solid #ffe0e0; padding: 10px; margin: 10px 0; border-radius: 6; color: #c00;';
      errorDiv.innerHTML = '⚠️ Error: No se encontraron los elementos del formulario de consentimiento. Revisa que el HTML se haya cargado completamente.';
      if (resultado && resultado.parentElement) {
        resultado.parentElement.insertBefore(errorDiv, resultado);
      }
      return;
    }

    btn.addEventListener('click', function(e) {
      e.preventDefault();

      // Obtener valores con manejo de errores
      let nombre = '', modalidad = '', honorarios = '5000', cancelacion = '2';
      
      try {
        const nombreInput = form.elements['consultante-nombre'];
        const modalidadInput = form.elements['modalidad'];
        const honorariosInput = form.elements['honorarios'];
        const cancelacionInput = form.elements['cancelacion'];

        if (nombreInput) nombre = nombreInput.value || 'Consultante';
        if (modalidadInput) modalidad = modalidadInput.value || 'presencial';
        if (honorariosInput) honorarios = honorariosInput.value || '5000';
        if (cancelacionInput) cancelacion = cancelacionInput.value || '2';
      } catch (err) {
        console.error('Error al obtener valores del formulario:', err);
      }

      // Texto de ejemplo ficticio con los datos ingresados
      const textoEjemplo = `CONSENTIMIENTO INFORMADO

========================================

DATOS DEL PROFESIONAL
------------------------------
Profesional: Dr./a ${nombre}

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
      try {
        if (resultado) {
          resultado.innerHTML = `<pre style="font-family: ui-monospace, monospace; background: #f8f9fa; padding: 1.5rem; border-radius: 8; margin-top: 1rem; overflow-x: auto;">${textoEjemplo}</pre>`;
          resultado.parentElement.style.display = 'block';

          // Aviso ficticio
          const aviso = document.createElement('p');
          aviso.style.cssText = 'color: #6c757d; font-size: 0.85rem; margin-top: 0.5rem;';
          aviso.innerHTML = '⚠️ Ejemplo ficticio: Los datos anterior son para demostración. No incluyen información real de pacientes.';
          resultado.parentElement.appendChild(aviso);

          // Desplazamiento suave
          try {
            resultado.parentElement.scrollIntoView({ behavior: 'smooth' });
          } catch (scrollErr) {
            console.error('Error en scroll:', scrollErr);
          }
        }
      } catch (err) {
        console.error('Error al mostrar resultado del consentimiento:', err);
      }
    });
  }

  // B. Notas de Sesión
  function initNotasSesion() {
    const form = document.getElementById('form-notas');
    const btn = document.getElementById('btn-organizar');
    const resultado = document.getElementById('resultado-notas');

    // DEPURACIÓN
    if (typeof console !== 'undefined') {
      console.log('Iniciando notas:', {form: !!form, btn: !!btn, resultado: !!resultado});
    }

    if (!form || !btn || !resultado) {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'background: #fff0f0; border: 1px solid #ffe0e0; padding: 10px; margin: 10px 0; border-radius: 6; color: #c00;';
      errorDiv.innerHTML = '⚠️ Error: No se encontraron los elementos del formulario de notas';
      if (resultado && resultado.parentElement) {
        resultado.parentElement.insertBefore(errorDiv, resultado);
      }
      return;
    }

    btn.addEventListener('click', function(e) {
      e.preventDefault();

      // Obtener valores seguros
      let motivo = 'Cliente llega a consulta';
      let observaciones = 'Observa postura encogida y tono de voz bajo, manifestó ansiedad';
      let intervenciones = 'Trabajar en técnicas de respiración y exposición gradual';
      let plan = 'Practicar respiración diafragmática en casa y agenda exposición gradual en próximas sesiones';

      try {
        const motivoInput = form.elements['motivo'];
        const observacionesInput = form.elements['observaciones'];
        const intervencionesInput = form.elements['intervenciones'];
        const planInput = form.elements['plan'];

        if (motivoInput && motivoInput.value) motivo = motivoInput.value;
        if (observacionesInput && observacionesInput.value) observaciones = observacionesInput.value;
        if (intervencionesInput && intervencionesInput.value) intervenciones = intervencionesInput.value;
        if (planInput && planInput.value) plan = planInput.value;
      } catch (err) {
        console.error('Error al obtener valores del formulario notas:', err);
      }

      // Formato SOAP estructurado
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

      try {
        if (resultado) {
          resultado.innerHTML = `<div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8; margin-top: 1rem; overflow-x: auto; border: 1px solid #e3e6f0;">
            <pre>${soapText}</pre>
          </div>`;

          // Contadores
          const contador = document.createElement('p');
          contador.style.cssText = 'color: #6c757d; font-size: 0.85rem; margin-top: 0.5rem;';
          contador.innerHTML = '✓ 4 frases clasificadas (S, O, A, P) • 1 frase para revisar';
          resultado.innerHTML += '<br>' + contador.innerHTML;

          // Aviso ficticio
          const aviso = document.createElement('p');
          aviso.style.cssText = 'color: #6c757d; font-size: 0.85rem; margin-top: 0.5rem;';
          aviso.innerHTML = '⚠️ Ejemplo ficticio: Estructura automática de ejemplo. No reemplaza la clínica profesional.';
          resultado.innerHTML += '<br>' + aviso.innerHTML;

          // Mostrar y desplazar
          resultado.parentElement.style.display = 'block';
          try {
            resultado.parentElement.scrollIntoView({ behavior: 'smooth' });
          } catch (scrollErr) {
            console.error('Error en scroll de notas:', scrollErr);
          }
        }
      } catch (err) {
        console.error('Error al mostrar resultado de notas:', err);
      }
    });
  }

  // C. Tareas entre Sesiones
  function initTareas() {
    const selector = document.getElementById('objetivo-tema');
    const btn = document.getElementById('btn-sugerir-tarea');
    const resultado = document.getElementById('resultado-tarea');

    // DEPURACIÓN
    if (typeof console !== 'undefined') {
      console.log('Iniciando tareas:', {selector: !!selector, btn: !!btn, resultado: !!resultado});
    }

    if (!selector || !btn || !resultado) {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'background: #fff0f0; border: 1px solid #ffe0e0; padding: 10px; margin: 10px 0; border-radius: 6; color: #c00;';
      errorDiv.innerHTML = '⚠️ Error: No se encontraron los elementos del formulario de tareas';
      if (resultado && resultado.parentElement) {
        resultado.parentElement.insertBefore(errorDiv, resultado);
      }
      return;
    }

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

      // DEPURACIÓN del tema seleccionado
      try {
        const temaSeleccionado = selector ? selector.value : '';
        const temaData = ejercicios[temaSeleccionado] || ejercicios.ansiedad;

        // Verificar que hay datos
        if (!temaData) {
          console.error('Datos de tarea no disponibles para el tema seleccionado:', temaSeleccionado);
          // Mostrar tarea por defecto
          resultado.innerHTML = `<div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8; margin-top: 1rem; overflow-x: auto; border: 1px solid #e3e6f0;">
            <h4 style="margin-top: 0; color: var(--accent2);">Tarea de Ejemplo</h4>
            <p><strong>Ejercicio:</strong> Ejercicio de ejemplo generado por defecto.</p>
            <p><strong>Nota:</strong> Por favor selecciona un tema en el selector.</p>
          </div>`;
          const aviso = document.createElement('p');
          aviso.style.cssText = 'color: #6c757d; font-size: 0.85rem; margin-top: 0.5rem;';
          aviso.innerHTML = '⚠️ Por favor selecciona un objetivo terapéutico';
          resultado.innerHTML += '<br>' + aviso.innerHTML;
          resultado.parentElement.style.display = 'block';
          return;
        }

        resultado.innerHTML = `
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8; margin-top: 1rem; overflow-x: auto; border: 1px solid #e3e6f0;">
            <h4 style="margin-top: 0; color: var(--accent2);">${temaData.titulo}</h4>
            <p><strong>Ejercicio:</strong> ${temaData.ejercicio}</p>
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
              <td style="padding: 8px;">${temaData.ejercicio}</td>
              <td style="padding: 8px;">${temaData.registro.split('•')[0].split(': ')[1] || 'N/A'}</td>
              <td style="padding: 8px;">${temaData.registro.split('•')[1] ? temaData.registro.split('•')[1].trim() : ''}</td>
            </tr>
          </table>
        </div>`;

        // Aviso ficticio
        const aviso = document.createElement('p');
        aviso.style.cssText = 'color: #6c757d; font-size: 0.85rem; margin-top: 0.5rem;';
        aviso.innerHTML = '⚠️ Ejemplo ficticio: Ejercicio sugerido para demostración. No sustituye la intervención profesional.';
        resultado.innerHTML += '<br>' + aviso.innerHTML;

        // Mostrar y desplazar
        resultado.parentElement.style.display = 'block';
        try {
          resultado.parentElement.scrollIntoView({ behavior: 'smooth' });
        } catch (scrollErr) {
          console.error('Error en scroll de tareas:', scrollErr);
        }
      } catch (err) {
        console.error('Error en initTareas:', err);
      }
    });
  }

  // ==========================================
  // 2. AGENTE TIPO CHAT - VERSIÓN MEJORADA CON MÁS DEPURACIÓN
  // ==========================================

  function initAgenteChat() {
    const entrada = document.getElementById('entrada-agente');
    const btnEnviar = document.getElementById('btn-enviar');
    const mensajes = document.getElementById('mensajes-agente');
    const btnReset = document.getElementById('btn-reset');

    // DEPURACIÓN EXTENSA
    if (typeof console !== 'undefined') {
      console.log('Iniciando agente chat:', {
        entrada: !!entrada,
        btnEnviar: !!btnEnviar,
        mensajes: !!mensajes,
        btnReset: !!btnReset
      });
    }

    if (!entrada || !btnEnviar || !mensajes) {
      // Crear error visual en la página
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'background: #fff0f0; border: 1px solid #ffe0e0; padding: 15px; margin: 10px 0; border-radius: 6; color: #c00; font-size: 0.9rem;';
      errorDiv.innerHTML = '⚠️ Error: El agente chat no se pudo inicializar. Algunos elementos del DOM no fueron encontrados.';
      const footer = document.querySelector('footer');
      if (footer) {
        footer.parentNode.insertBefore(errorDiv, footer);
      } else {
        document.body.appendChild(errorDiv);
      }
      return;
    }

    // Botones de ejemplos rápidos
    const btnsEjemplo = document.querySelectorAll('.btn-ejemplo-rápido');

    function añadirMensaje(texto, esUsuario = false) {
      try {
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
        div.innerHTML = nl2br(texto);
        mensajes.appendChild(div);
        // Desplazamiento automático
        try {
          mensajes.scrollTop = mensajes.scrollHeight;
        } catch (e) {
          console.error('Error en scroll de mensajes:', e);
        }
      } catch (err) {
        console.error('Error al crear mensaje:', err);
      }
    }

    function nl2br(texto) {
      try {
        return (texto + '').replace(/([^>\r\n]?)(\r\n|\n\r|\n)/g, '$1<br>$2');
      } catch (err) {
        console.error('Error en nl2br:', err);
        return texto || '';
      }
    }

    function agenteResponder(textoUsuario) {
      try {
        // DEPURACIÓN DEL TEXTO
        if (typeof textoUsuario !== 'string') {
          return '🤖 Agente: Error - el mensaje no es texto válido.';
        }
        
        const bajo = textoUsuario.toLowerCase();

        // Detectar palabras clave con manejo de errores
        if (bajo.includes('consentimiento') || bajo.includes('consent')) {
          return `🤖 Agente: Detecté que necesitas consentimiento informado.

Como dato de ejemplo: El agente sugeriría generar un consentimiento con los datos básicos: nombre del profesional, modalidad, honorarios y política de cancelación. Usa el formulario de "Consentimiento informado" para completar los campos reales.

*Nota: El agente real funciona con python3 kit.py → menú → opción 1 → pide datos → genera archivo consentimiento.txt*`;`
        } else if (bajo.includes('nota') || bajo.includes('sesion') || bajo.includes('sesión') || bajo.includes('soap')) {
          return `🤖 Agente: Detecté que necesitas una nota de sesión.

Como dato de ejemplo: El agente sugeriría organizar tus apuntes en formato SOAP (S-O-A-P). Usa el generador de notas de sesión para estructurar motivo, observaciones, intervenciones y plan.

*Nota: El agente real funciona con python3 kit.py → menú → opción 2 → pide datos → genera nota estructurada*`;`
        } else if (bajo.includes('tarea') || bajo.includes('ejercicio') || bajo.includes('ansiedad')) {
          return `🤖 Agente: Detecté que necesitas una tarea o ejercicio.

Como dato de ejemplo: El agente sugeriría una tarea según tu objetivo (ansiedad, regulación emocional o hábitos de sueño). Usa el generador de tareas entre sesiones para seleccionar tema, nivel y duración.

*Nota: El agente real funciona con python3 kit.py → menú → opción 3 → pregunta tema/nivel/días → genera archivo tarea_*.txt*`;`
        } else {
          return `🤖 Agente: No identifico tu necesidad específica.

Usa los botones rápidos de abajo o escribe qué necesitas (consentimiento, nota de sesión o tarea). El agente detecta palabras clave para decidir qué herramienta mostrar.

*Nota: El agente real funciona con python3 kit.py → menú interactivo en terminal.`;`
        }
      } catch (err) {
        console.error('Error en agenteResponder:', err);
        return '🤖 Agente: Error interno. Por favor, inténtalo de nuevo.';
      }
    }

    function manejarEnvio(e) {
      try {
        const texto = entrada ? entrada.value.trim() : '';
        if (!texto) return;

        // Mostrar mensaje usuario
        try {
          añadirMensaje(texto, true);
        } catch (err) {
          console.error('Error en añadirMensaje:', err);
        }
        if (entrada) entrada.value = '';

        // Pequeña pausa para simular procesamiento
        try {
          setTimeout(() => {
            try {
              const respuesta = agenteResponder(texto);
              try {
                añadirMensaje(respuesta, false);
              } catch (err2) {
                console.error('Error al añadir respuesta:', err2);
              }
            } catch (err3) {
              console.error('Error al obtener respuesta del agente:', err3);
            }
          }, 500);
        } catch (err) {
          console.error('Error en manejarEnvio:', err);
        }
      } catch (err) {
        console.error('Error crítico en manejarEnvio:', err);
      }
    }

    // Evento envío por botón
    try {
      if (btnEnviar) btnEnviar.addEventListener('click', manejarEnvio);
    } catch (err) {
      console.error('Error al adjuntar evento al btnEnviar:', err);
    }

    // Evento Enter - con protección contra errores
    try {
      if (entrada) {
        entrada.addEventListener('keypress', function(e) {
          try {
            if (e.key === 'Enter' && !e.shiftKey) {
              manejarEnvio();
            }
          } catch (err) {
            console.error('Error en keypress handler:', err);
          }
        });
      }
    } catch (err) {
      console.error('Error al adjuntar keypress:', err);
    }

    // Botones de ejemplos rápidos - con protección
    try {
      if (btnsEjemplo && btnsEjemplo.length > 0) {
        btnsEjemplo.forEach(btn => {
          try {
            btn.addEventListener('click', function() {
              try {
                const texto = btn.getAttribute('data-texto');
                if (texto && entrada) {
                  entrada.value = texto;
                  setTimeout(() => {
                    try {
                      manejarEnvio();
                    } catch (err2) {
                      console.error('Error al procesar ejemplo rápido:', err2);
                    }
                  }, 100);
                }
              } catch (err2) {
                console.error('Error al procesar botón de ejemplo:', err2);
              }
            });
          } catch (err2) {
            console.error('Error al adjuntar event listener al botón:', err2);
          }
        });
      }
    } catch (err) {
      console.error('Error crítico al configurar botones de ejemplo:', err);
    }

    // Reset - con protección
    try {
      if (btnReset) {
        btnReset.addEventListener('click', function() {
          try {
            if (mensajes) mensajes.innerHTML = '';
            if (entrada) entrada.focus();
          } catch (err) {
            console.error('Error al resetear conversación:', err);
          }
        });
      }
    } catch (err) {
      console.error('Error al configurar botón reset:', err);
    }
  }

  // ==========================================
  // 3. SKILLS EXPANSIBLES (Accordions) - VERSIÓN ROBUSTA
  // ==========================================

  function initSkillsAccordions() {
    // DEPURACIÓN INICIAL
    if (typeof console !== 'undefined') {
      console.log('Iniciando skills accordions...');
    }

    const skills = document.querySelectorAll('.skill-acordeon');

    // Verificar si hay skills
    if (!skills || skills.length === 0) {
      if (typeof console !== 'undefined') {
        console.warn('No se encontraron elementos .skill-acordeon en el HTML');
      }
      return;
    }

    if (typeof console !== 'undefined') {
      console.log(`Encontradas ${skills.length} skills accordion`);
    }

    skills.forEach((skill, index) => {
      try {
        const titulo = skill.querySelector('.skill-titulo');
        const contenido = skill.querySelector('.skill-contenido');
        const toggleIcon = skill.querySelector('.skill-toggle-icon');

        // DEPURACIÓN de cada skill individual
        if (typeof console !== 'undefined') {
          console.log(`Procesando skill ${index + 1}:`, {
            tituloExists: !!titulo,
            contenidoExists: !!contenido,
            toggleIconExists: !!toggleIcon
          });
        }

        if (!titulo || !contenido) {
          if (typeof console !== 'undefined') {
            console.error(`Skill ${index + 1} incompleta: falta título o contenido`, skill);
          }
          return; // Saltar esta skill pero continuar con las demás
        }

        // Estado inicial: contraído
        let estaAbierto = false;

        // Función para toggle con animación robusta
        function toggle() {
          estaAbierto = !estaAbierto;
          
          // Forzar recálculo del height
          try {
            // Pequeño delay para que el navegador prepare el layout
            setTimeout(() => {
              const alturaReal = contenido.scrollHeight;
              
              if (estaAbierto) {
                contenido.style.maxHeight = `${alturaReal}px`;
              } else {
                contenido.style.maxHeight = '0';
              }
            }, 50);
          } catch (err) {
            console.error('Error al actualizar height del accordion:', err);
          }

          // Actualizar atributo ARIA
          try {
            titulo.setAttribute('aria-expanded', estaAbierto);
          } catch (err) {
            console.error('Error al actualizar aria-expanded:', err);
          }

          // Actualizar icono
          if (toggleIcon) {
            try {
              toggleIcon.textContent = estaAbierto ? '▼' : '▶';
            } catch (err) {
              console.error('Error al actualizar icono:', err);
            }
          }
        }

        // Evento click en título
        try {
          titulo.addEventListener('click', toggle);
        } catch (err) {
          console.error('Error al adjuntar click al título de skill:', err);
        }

        // Mejorar accesibilidad
        try {
          titulo.setAttribute('role', 'button');
          // Usar un ID único para aria-controls
          const skillId = `skill-${index}-${Date.now()}`;
          titulo.setAttribute('aria-controls', skillId);
          titulo.setAttribute('id', skillId);
          titulo.setAttribute('tabindex', '0');
        } catch (err) {
          console.error('Error al configurar accesibilidad de skill:', err);
        }

        // Teclado: Enter y Espacio para abrir/cerrar
        try {
          titulo.addEventListener('keydown', function(e) {
            try {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
              }
            } catch (err) {
              console.error('Error en keydown handler de skill:', err);
            }
          });
        } catch (err) {
          console.error('Error al adjuntar keydown a skill:', err);
        }
      } catch (err) {
        console.error(`Error crítico procesando skill ${index + 1}:`, err);
      }
    });
  }

  // ==========================================
  // 4. AVISOS FICTICIOS Y ENFOQUE
  // ==========================================

  function initAvisos() {
    // Verificar si ya existe el banner
    if (document.querySelector('.aviso-ficticio')) return;

    try {
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
        order: -1;
      `;
      banner.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <span>⚠️ <strong>Ejemplos ficticios:</strong> Los datos generados son solo para demostración y no incluyen información real de pacientes. Este kit apoya al profesional y no reemplaza su criterio clínico.</span>
      `;
      const footer = document.querySelector('footer');
      if (footer) {
        footer.parentNode.insertBefore(banner, footer);
      } else {
        document.body.appendChild(banner);
      }
    } catch (err) {
      console.error('Error al crear aviso ficticio:', err);
    }
  }

  // ==========================================
  // 5. INICIALIZAR TODAS LAS FUNCIONES
  // ==========================================

  // Ejecutar todas las funciones con protección try/catch y delay
  const initFunctions = () => {
    try { initConsentimiento(); } catch (e) { console.error('Error initConsentimiento:', e); }
    try { initNotasSesion(); } catch (e) { console.error('Error initNotasSesion:', e); }
    try { initTareas(); } catch (e) { console.error('Error initTareas:', e); }
    try { initAgenteChat(); } catch (e) { console.error('Error initAgenteChat:', e); }
    try { initSkillsAccordions(); } catch (e) { console.error('Error initSkillsAccordions:', e); }
    try { initAvisos(); } catch (e) { console.error('Error initAvisos:', e); }
  };

  // Ejecutar después de un pequeño delay para asegurar DOM completo
  setTimeout(initFunctions, 100);
  
  // También ejecutar una vez al cargar completamente la página
  window.addEventListener('load', () => {
    setTimeout(initFunctions, 500);
  });

});