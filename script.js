document.addEventListener("DOMContentLoaded", () => {
  setupCopyCommand();
  setupToolTabs();
  setupConsentSandbox();
  setupSoapSandbox();
  setupTaskSandbox();
  setupAgentSandbox();
});

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return String(text).replace(/[&<>"']/g, (char) => map[char]);
}

function setupCopyCommand() {
  const button = document.getElementById("copy-run-command");
  const feedback = document.getElementById("command-feedback");
  if (!button || !feedback) return;

  const commandText = "cd /ruta/al/proyecto && python3 kit.py";

  button.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(commandText);
      } else {
        const temp = document.createElement("textarea");
        temp.value = commandText;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
      feedback.textContent = "Comando copiado al portapapeles.";
    } catch (_err) {
      feedback.textContent = "Ejecuta: python3 kit.py";
    }
  });
}

function setupToolTabs() {
  const tabs = Array.from(document.querySelectorAll(".tool-tab"));
  const panels = Array.from(document.querySelectorAll(".tool-panel"));
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTool = tab.getAttribute("data-tool");

      tabs.forEach((t) => {
        const isSelected = t === tab;
        t.classList.toggle("is-active", isSelected);
        t.setAttribute("aria-selected", String(isSelected));
      });

      panels.forEach((panel) => {
        const matches = panel.id === `panel-${targetTool}`;
        panel.classList.toggle("is-active", matches);
        panel.hidden = !matches;
      });
    });
  });
}

function setupConsentSandbox() {
  const form = document.getElementById("consent-form");
  const output = document.getElementById("consent-output");
  if (!form || !output) return;

  const renderConsent = () => {
    const name = document.getElementById("pro-name")?.value.trim() || "Profesional tratante";
    const role = document.getElementById("pro-role")?.value.trim() || "Atencion clinica";
    const freq = document.getElementById("session-freq")?.value.trim() || "A acordar";

    output.innerHTML = `
      <p class="result-heading">Documento generado (vista de ensayo)</p>
      <ul class="result-list">
        <li><strong>Datos del profesional:</strong> ${escapeHtml(name)} (${escapeHtml(role)}).</li>
        <li><strong>Proceso y encuadre terapeutico:</strong> Modalidad acordada con frecuencia de ${escapeHtml(freq)}, horarios y normas de cancelacion.</li>
        <li><strong>Confidencialidad:</strong> Resguardo de la informacion compartida en consulta, con limites eticos y legales informados previamente.</li>
        <li><strong>Derechos del consultante:</strong> Derecho a recibir informacion clara, resolver dudas, solicitar ajustes del proceso o finalizarlo cuando lo considere.</li>
      </ul>
    `;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderConsent();
  });

  renderConsent();
}

function setupSoapSandbox() {
  const form = document.getElementById("soap-form");
  const output = document.getElementById("soap-output");
  if (!form || !output) return;

  const classifySentences = (rawText) => {
    const rawChunks = rawText
      .split(/(?<=[.!?])\s+|\n+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const groups = { S: [], O: [], A: [], P: [] };
    const reviewItems = [];
    const reviewKeywords = ["quizas", "tal vez", "revisar", "duda", "pendiente", "no claro"];

    rawChunks.forEach((chunk) => {
      let label = null;
      let cleaned = chunk;

      const explicitMatch = chunk.match(/^(S|O|A|P)\s*:\s*(.+)$/i);
      if (explicitMatch) {
        label = explicitMatch[1].toUpperCase();
        cleaned = explicitMatch[2].trim();
      } else {
        const lower = chunk.toLowerCase();
        if (/(refiere|siente|reporta|expresa|sueno|animo|ansiedad|preocup)/.test(lower)) {
          label = "S";
        } else if (/(observa|contacto|postura|tono|ritmo|expresion|conducta|presenta)/.test(lower)) {
          label = "O";
        } else if (/(relacion|hipotesis|analisis|patron|formulacion|dinamica|asocia)/.test(lower)) {
          label = "A";
        } else if (/(practicar|registrar|acordar|proxima|sesion|tarea|continuar|objetivo)/.test(lower)) {
          label = "P";
        } else {
          label = "S";
          reviewItems.push(chunk);
        }
      }

      if (reviewKeywords.some((kw) => chunk.toLowerCase().includes(kw)) && !reviewItems.includes(chunk)) {
        reviewItems.push(chunk);
      }

      groups[label].push(cleaned);
    });

    const formatGroup = (code, title) => {
      const items = groups[code].length
        ? groups[code].map((item) => `<li>${escapeHtml(item)}</li>`).join("")
        : "<li>Sin frases asignadas en este ensayo.</li>";
      return `<li><strong>${code} · ${title}:</strong><ul>${items}</ul></li>`;
    };

    const reviewHtml = reviewItems.length
      ? `<div class="review-flag"><strong>Frases que conviene revisar:</strong> ${reviewItems.map(escapeHtml).join(" | ")}</div>`
      : "";

    output.innerHTML = `
      <p class="result-heading">Clasificacion SOAP resultante</p>
      <ul class="result-list">
        ${formatGroup("S", "Subjetivo")}
        ${formatGroup("O", "Objetivo")}
        ${formatGroup("A", "Analisis")}
        ${formatGroup("P", "Plan")}
      </ul>
      ${reviewHtml}
    `;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = document.getElementById("soap-input")?.value.trim() || "";
    if (!text) {
      output.innerHTML = "<p class=\"result-heading\">Escribe al menos una frase para clasificar.</p>";
      return;
    }
    classifySentences(text);
  });

  const initialText = document.getElementById("soap-input")?.value.trim();
  if (initialText) classifySentences(initialText);
}

function setupTaskSandbox() {
  const form = document.getElementById("task-form");
  const output = document.getElementById("task-output");
  if (!form || !output) return;

  const catalog = {
    ansiedad: {
      label: "Ansiedad",
      basico: "Pausa breve de respiracion diafragmatica y registro de disparador cotidiano.",
      intermedio: "Registro de pensamiento automatico, nivel de tension (1 a 10) y respuesta alternativa."
    },
    sueno: {
      label: "Sueno",
      basico: "Rutina de desaceleracion 30 minutos antes de acostarse sin pantallas.",
      intermedio: "Registro de hora de ingreso a cama, latencia estimada y habitos vespertinos."
    },
    enojo: {
      label: "Manejo del enojo",
      basico: "Senal fisica inicial del malestar y pausa de 5 minutos antes de responder.",
      intermedio: "Analisis de situacion detonante, necesidad subyacente y comunicacion asertiva."
    },
    habitos: {
      label: "Habitos saludables",
      basico: "Micro-accion diaria anclada a una rutina existente de la manana o tarde.",
      intermedio: "Seguimiento de constancia, barreras del dia y ajuste de plan para la siguiente jornada."
    }
  };

  const renderPlan = () => {
    const topicKey = document.getElementById("task-topic")?.value || "ansiedad";
    const levelKey = document.getElementById("task-level")?.value || "basico";
    const days = Math.min(7, Math.max(3, Number(document.getElementById("task-days")?.value) || 5));

    const topicInfo = catalog[topicKey] || catalog.ansiedad;
    const exercise = topicInfo[levelKey] || topicInfo.basico;

    const rows = Array.from({ length: days }, (_, idx) => {
      const dayNum = idx + 1;
      return `
        <tr>
          <td>Dia ${dayNum}</td>
          <td>${escapeHtml(exercise)}</td>
          <td>[ ] Realizado / [ ] Ajuste</td>
        </tr>
      `;
    }).join("");

    const jsonSample = JSON.stringify(
      {
        modulo: "tareas_entre_sesiones",
        tema: topicInfo.label,
        nivel: levelKey,
        duracion_dias: days,
        ejercicio_base: exercise
      },
      null,
      2
    );

    output.innerHTML = `
      <p class="result-heading">Plan: ${escapeHtml(topicInfo.label)} (${escapeHtml(levelKey)}, ${days} dias)</p>
      <p class="run-note">${escapeHtml(exercise)}</p>
      <div class="table-wrap">
        <table class="plan-table">
          <thead>
            <tr>
              <th>Jornada</th>
              <th>Ejercicio propuesto</th>
              <th>Registro diario</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <pre class="json-preview">${escapeHtml(jsonSample)}</pre>
    `;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPlan();
  });

  renderPlan();
}

function setupAgentSandbox() {
  const form = document.getElementById("agent-form");
  const input = document.getElementById("agent-input");
  const output = document.getElementById("agent-output");
  const chips = Array.from(document.querySelectorAll(".chip-btn"));
  if (!form || !input || !output) return;

  const routeNeed = (query) => {
    const q = query.toLowerCase();
    let chosen = {
      tool: "herramientas/notas_sesion.py",
      name: "Notas de sesion",
      missing: "Apuntes o frases de la consulta y etiquetas manuales si deseas forzar S:, O:, A: o P:."
    };

    if (/consent|encuadre|confidencial|derecho|acuerdo|ingreso/.test(q)) {
      chosen = {
        tool: "herramientas/consentimiento_informado.py",
        name: "Consentimiento informado",
        missing: "Nombre del profesional, datos de contacto/registro y condiciones del encuadre."
      };
    } else if (/tarea|ejercicio|sueno|ansiedad|enojo|habito|dia|dias|sesion/.test(q) && !/soap|nota/.test(q)) {
      chosen = {
        tool: "herramientas/tareas_entre_sesiones.py",
        name: "Tareas entre sesiones",
        missing: "Tema (ansiedad, sueno, manejo del enojo o habitos saludables), nivel (basico/intermedio) y duracion (3 a 7 dias)."
      };
    }

    output.innerHTML = `
      <p class="result-heading">Decision de <code>agente/agente.py</code></p>
      <ul class="result-list">
        <li><strong>Herramienta seleccionada:</strong> ${escapeHtml(chosen.name)} (<code>${escapeHtml(chosen.tool)}</code>).</li>
        <li><strong>Datos que solicita el agente si faltan:</strong> ${escapeHtml(chosen.missing)}</li>
        <li><strong>Apoyo de skills:</strong> Aplica criterios de <code>etica-confidencialidad</code>, <code>lenguaje-empatico</code> y <code>redaccion-profesional</code> de forma local.</li>
      </ul>
    `;
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const promptText = chip.getAttribute("data-prompt") || "";
      input.value = promptText;
      routeNeed(promptText);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) {
      output.innerHTML = "<p class=\"result-heading\">Escribe que necesitas resolver en consulta.</p>";
      return;
    }
    routeNeed(value);
  });

  if (input.value.trim()) {
    routeNeed(input.value.trim());
  }
}
