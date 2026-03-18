const state = {
  token: localStorage.getItem("token") || "",
  user: JSON.parse(localStorage.getItem("user") || "null"),
  periodos: [],
  materias: [],
  tareas: [],
  tareasPendientes: [],
  tareasVencidas: [],
  tareasCompletadas: [],
  horarios: [],
  selectedPeriodo: "all",
  calendarDate: new Date(),
  selectedTask: null,
  currentDashboardTab: "resumen",
  currentTheme: localStorage.getItem("dashboardTheme") || "light",
};

const themePalette = {
  light: {
    accent: "#1b2457",
    accent2: "#6b7cff",
    accent3: "#7bc6ff",
    dashboardBg: "#ffffff",
    dashboardSurface: "#ffffff",
    dashboardSurface2: "#f4f7ff",
    dashboardText: "#18213f",
    dashboardMuted: "#68708d",
    dashboardLine: "rgba(28, 41, 88, 0.12)",
  },
  indigo: {
    accent: "#1b2457",
    accent2: "#6978ff",
    accent3: "#7bc6ff",
    dashboardBg: "#121b31",
    dashboardSurface: "#19243d",
    dashboardSurface2: "#202d49",
    dashboardText: "#f1f5ff",
    dashboardMuted: "#96a5c7",
    dashboardLine: "rgba(160, 184, 255, 0.12)",
  },
  emerald: {
    accent: "#0f4f46",
    accent2: "#12b981",
    accent3: "#67e8f9",
    dashboardBg: "#0d221f",
    dashboardSurface: "#13322e",
    dashboardSurface2: "#1a433d",
    dashboardText: "#ebfffb",
    dashboardMuted: "#91bdb6",
    dashboardLine: "rgba(120, 231, 198, 0.12)",
  },
  sunset: {
    accent: "#67261a",
    accent2: "#f97316",
    accent3: "#fca5a5",
    dashboardBg: "#2a1611",
    dashboardSurface: "#41211b",
    dashboardSurface2: "#542920",
    dashboardText: "#fff5f2",
    dashboardMuted: "#d7aca2",
    dashboardLine: "rgba(255, 167, 121, 0.14)",
  },
  rose: {
    accent: "#5b1f4a",
    accent2: "#ec4899",
    accent3: "#c4b5fd",
    dashboardBg: "#241323",
    dashboardSurface: "#381d37",
    dashboardSurface2: "#4b2450",
    dashboardText: "#fff2fb",
    dashboardMuted: "#c9a2c0",
    dashboardLine: "rgba(236, 72, 153, 0.14)",
  },
};

const daysOfWeek = [
  { code: "Lun", label: "Lunes" },
  { code: "Mar", label: "Martes" },
  { code: "Mie", label: "Miercoles" },
  { code: "Jue", label: "Jueves" },
  { code: "Vie", label: "Viernes" },
  { code: "Sab", label: "Sabado" },
];
const colorPalette = ["#2f6fed", "#12664f", "#d85c39", "#7b4ce2", "#0096a8", "#b44a7a", "#af8a14"];

const elements = {
  authPanel: document.getElementById("authPanel"),
  dashboardPanel: document.getElementById("dashboardPanel"),
  authMessage: document.getElementById("authMessage"),
  dashboardMessage: document.getElementById("dashboardMessage"),
  heroStatus: document.getElementById("heroStatus"),
  welcomeTitle: document.getElementById("welcomeTitle"),
  summaryPeriodLabel: document.getElementById("summaryPeriodLabel"),
  summaryCalendarTitle: document.getElementById("summaryCalendarTitle"),
  summaryMiniWeekdays: document.getElementById("summaryMiniWeekdays"),
  summaryMiniCalendar: document.getElementById("summaryMiniCalendar"),
  summaryAgendaDate: document.getElementById("summaryAgendaDate"),
  summaryAgendaList: document.getElementById("summaryAgendaList"),
  periodFilter: document.getElementById("periodFilter"),
  statsGrid: document.getElementById("statsGrid"),
  periodosList: document.getElementById("periodosList"),
  materiasList: document.getElementById("materiasList"),
  tareasPendientesList: document.getElementById("tareasPendientesList"),
  tareasVencidasList: document.getElementById("tareasVencidasList"),
  tareasCompletadasList: document.getElementById("tareasCompletadasList"),
  horariosList: document.getElementById("horariosList"),
  calendarTitle: document.getElementById("calendarTitle"),
  calendarWeekdays: document.getElementById("calendarWeekdays"),
  calendarGrid: document.getElementById("calendarGrid"),
  taskDetail: document.getElementById("taskDetail"),
  scheduleGrid: document.getElementById("scheduleGrid"),
  loginForm: document.getElementById("loginForm"),
  registerForm: document.getElementById("registerForm"),
  periodoForm: document.getElementById("periodoForm"),
  materiaForm: document.getElementById("materiaForm"),
  tareaForm: document.getElementById("tareaForm"),
  horarioForm: document.getElementById("horarioForm"),
  logoutButton: document.getElementById("logoutButton"),
  cancelPeriodoEdit: document.getElementById("cancelPeriodoEdit"),
  cancelMateriaEdit: document.getElementById("cancelMateriaEdit"),
  cancelTareaEdit: document.getElementById("cancelTareaEdit"),
  cancelHorarioEdit: document.getElementById("cancelHorarioEdit"),
  prevMonth: document.getElementById("prevMonth"),
  nextMonth: document.getElementById("nextMonth"),
  emptyStateTemplate: document.getElementById("emptyStateTemplate"),
  dashboardTabs: document.querySelectorAll("[data-dashboard-tab]"),
  dashboardPanels: document.querySelectorAll("[data-dashboard-panel]"),
  themeSwatches: document.querySelectorAll("[data-theme]"),
};

document.querySelectorAll("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => switchAuthTab(button.dataset.authTab));
});

elements.dashboardTabs.forEach((button) => {
  button.addEventListener("click", () => switchDashboardTab(button.dataset.dashboardTab));
});

elements.themeSwatches.forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.theme));
});

elements.loginForm.addEventListener("submit", handleLogin);
elements.registerForm.addEventListener("submit", handleRegister);
elements.periodoForm.addEventListener("submit", handlePeriodoSubmit);
elements.materiaForm.addEventListener("submit", handleMateriaSubmit);
elements.tareaForm.addEventListener("submit", handleTareaSubmit);
elements.horarioForm.addEventListener("submit", handleHorarioSubmit);
elements.periodFilter.addEventListener("change", (event) => {
  state.selectedPeriodo = event.target.value;
  fillMateriaOptions(elements.tareaForm.elements.id_materia);
  fillMateriaOptions(elements.horarioForm.elements.id_materia);
  renderAll();
});
elements.logoutButton.addEventListener("click", logout);
elements.cancelPeriodoEdit.addEventListener("click", () => resetForm(elements.periodoForm, elements.cancelPeriodoEdit));
elements.cancelMateriaEdit.addEventListener("click", () => resetForm(elements.materiaForm, elements.cancelMateriaEdit));
elements.cancelTareaEdit.addEventListener("click", () => resetForm(elements.tareaForm, elements.cancelTareaEdit));
elements.cancelHorarioEdit.addEventListener("click", () => resetForm(elements.horarioForm, elements.cancelHorarioEdit));
elements.prevMonth.addEventListener("click", () => {
  state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() - 1, 1);
  renderCalendar();
});
elements.nextMonth.addEventListener("click", () => {
  state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + 1, 1);
  renderCalendar();
});

init();

function init() {
  applyTheme(state.currentTheme);
  renderCalendarWeekdays();
  renderSummaryWeekdays();
  switchDashboardTab(state.currentDashboardTab);
  if (state.token) {
    showDashboard();
    refreshData();
    return;
  }

  showAuth();
}

async function apiFetch(path, options = {}) {
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(path, config);
  let data = null;

  try {
    data = await response.json();
  } catch (_error) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Ocurrio un error inesperado");
  }

  return data;
}

async function handleRegister(event) {
  event.preventDefault();
  try {
    await apiFetch("/api/auth/register", {
      method: "POST",
      body: Object.fromEntries(new FormData(event.target).entries()),
    });
    setAuthMessage("Registro exitoso. Ahora inicia sesion.", true);
    event.target.reset();
    switchAuthTab("login");
  } catch (error) {
    setAuthMessage(error.message, false);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  try {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: Object.fromEntries(new FormData(event.target).entries()),
    });

    state.token = data.token;
    state.user = data.usuario;
    localStorage.setItem("token", state.token);
    localStorage.setItem("user", JSON.stringify(state.user));
    showDashboard();
    setAuthMessage("Login exitoso.", true);
    await refreshData();
  } catch (error) {
    setAuthMessage(error.message, false);
  }
}

async function refreshData() {
  try {
    const [periodos, materias, tareas, horarios, pendientes, vencidas, completadas] = await Promise.all([
      apiFetch("/api/periodos"),
      apiFetch("/api/materias"),
      apiFetch("/api/tareas"),
      apiFetch("/api/horarios"),
      apiFetch("/api/tareas/estado/pendientes"),
      apiFetch("/api/tareas/estado/vencidas"),
      apiFetch("/api/tareas/estado/completadas"),
    ]);

    state.periodos = periodos;
    state.materias = materias;
    state.tareas = tareas;
    state.horarios = horarios;
    state.tareasPendientes = pendientes;
    state.tareasVencidas = vencidas;
    state.tareasCompletadas = completadas;

    if (state.selectedPeriodo !== "all" && !state.periodos.some((periodo) => String(periodo.id_periodo) === String(state.selectedPeriodo))) {
      state.selectedPeriodo = "all";
    }

    fillSelects();
    renderAll();
  } catch (error) {
    if (error.message.toLowerCase().includes("token")) {
      logout();
      return;
    }
    setAuthMessage(error.message, false);
  }
}

function fillSelects() {
  fillPeriodoOptions(elements.periodFilter, true);
  fillPeriodoOptions(elements.materiaForm.elements.id_periodo, false);
  fillMateriaOptions(elements.tareaForm.elements.id_materia);
  fillMateriaOptions(elements.horarioForm.elements.id_materia);
}

function fillPeriodoOptions(select, includeAll) {
  const currentValue = select.value;
  const options = [];

  if (includeAll) {
    options.push('<option value="all">Todos los periodos</option>');
  }

  options.push(...state.periodos.map((periodo) => `<option value="${periodo.id_periodo}">${periodo.nombre}</option>`));
  select.innerHTML = options.join("");

  if (includeAll) {
    select.value = state.selectedPeriodo;
  } else if (state.periodos.length) {
    select.value = currentValue || String(state.periodos[0].id_periodo);
  }
}

function fillMateriaOptions(select) {
  const currentValue = select.value;
  const materias = getMateriasFiltradas();
  select.innerHTML = materias.map((materia) => `<option value="${materia.id_materia}">${materia.nombre}</option>`).join("");

  if (materias.length) {
    select.value = materias.some((materia) => String(materia.id_materia) === String(currentValue))
      ? currentValue
      : String(materias[0].id_materia);
  }
}

function renderAll() {
  updateHeroStatus();
  renderStats();
  renderSummaryBoard();
  renderPeriodos();
  renderMaterias();
  renderTareas();
  renderCalendar();
  renderTaskDetail();
  renderHorarios();
}

function renderStats() {
  const cards = [
    {
      label: "Total tareas",
      value: getTareasFiltradas().length,
      icon: "TA",
      note: "Actividades visibles en el filtro actual.",
    },
    {
      label: "Pendientes",
      value: filterTasksByPeriodo(state.tareasPendientes).length,
      icon: "PD",
      note: "Trabajos por terminar o entregar.",
      tone: "pending",
    },
    {
      label: "Completadas",
      value: filterTasksByPeriodo(state.tareasCompletadas).length,
      icon: "OK",
      note: "Tareas que ya marcaste como hechas.",
      tone: "completed",
    },
    {
      label: "Vencidas",
      value: filterTasksByPeriodo(state.tareasVencidas).length,
      icon: "VE",
      note: "Actividades que pasaron su fecha limite.",
      tone: "overdue",
    },
  ];

  elements.summaryPeriodLabel.textContent = state.selectedPeriodo === "all"
    ? "Todos los periodos"
    : getPeriodoNombre(state.selectedPeriodo);

  elements.statsGrid.innerHTML = cards
    .map(
      (card) => `
        <div class="stats-card ${card.tone || ""}">
          <div class="stats-card-top">
            <div>
              <span class="muted">${card.label}</span>
              <strong>${card.value}</strong>
            </div>
            <span class="stats-icon">${card.icon}</span>
          </div>
          <p>${card.note}</p>
        </div>
      `
    )
    .join("");
}

function renderSummaryWeekdays() {
  elements.summaryMiniWeekdays.innerHTML = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]
    .map((day) => `<div>${day}</div>`)
    .join("");
}

function renderSummaryBoard() {
  renderSummaryMiniCalendar();
  renderSummaryAgenda();
}

function renderSummaryMiniCalendar() {
  const current = state.calendarDate;
  const title = current.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
  elements.summaryCalendarTitle.textContent = title.charAt(0).toUpperCase() + title.slice(1);

  const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
  const jsDay = firstDay.getDay();
  const mondayOffset = jsDay === 0 ? 6 : jsDay - 1;
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - mondayOffset);

  const today = toISODate(new Date());
  const tasks = getTareasFiltradas();
  const cells = [];

  for (let index = 0; index < 35; index += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const iso = toISODate(date);
    const count = tasks.filter((task) => normalizeDate(task.fecha_entrega) === iso).length;
    const classes = [
      "summary-mini-day",
      date.getMonth() !== current.getMonth() ? "outside" : "",
      iso === today ? "today" : "",
    ].join(" ");

    cells.push(`
      <div class="${classes}">
        <span class="summary-mini-number">${date.getDate()}</span>
        ${count ? `<span class="summary-mini-count">${count} tarea${count === 1 ? "" : "s"}</span>` : ""}
      </div>
    `);
  }

  elements.summaryMiniCalendar.innerHTML = cells.join("");
}

function renderSummaryAgenda() {
  const today = toISODate(new Date());
  const tasksToday = getTareasFiltradas()
    .filter((task) => normalizeDate(task.fecha_entrega) === today)
    .sort((a, b) => String(a.titulo).localeCompare(String(b.titulo)));

  elements.summaryAgendaDate.textContent = new Date(today).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (!tasksToday.length) {
    elements.summaryAgendaList.innerHTML = `
      <div class="summary-empty">
        <p>No tienes tareas para hoy en el periodo seleccionado.</p>
      </div>
    `;
    return;
  }

  elements.summaryAgendaList.innerHTML = tasksToday
    .map((task) => {
      const status = getTaskStatus(task);
      return `
        <article class="summary-agenda-card">
          <div class="summary-agenda-top">
            <span class="summary-agenda-time">Hoy</span>
            <span class="pill ${status.className}">${status.label}</span>
          </div>
          <div>
            <h5>${task.titulo}</h5>
            <p>${task.descripcion || "Sin descripcion registrada."}</p>
          </div>
          <div class="summary-agenda-meta">
            <span class="muted">${getMateriaNombre(task.id_materia)}</span>
            <span class="muted">Entrega: ${formatDate(task.fecha_entrega)}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPeriodos() {
  renderList(elements.periodosList, state.periodos, (periodo) => `
    <article class="entity-card">
      <div class="entity-head">
        <div>
          <h4>${periodo.nombre}</h4>
          <p class="muted">${formatDate(periodo.fecha_inicio)} al ${formatDate(periodo.fecha_fin)}</p>
        </div>
        <div class="task-actions">
          <button class="ghost-button" onclick="editPeriodo('${periodo.id_periodo}')">Editar</button>
          <button class="secondary-button" onclick="deletePeriodo('${periodo.id_periodo}')">Eliminar</button>
        </div>
      </div>
    </article>
  `);
}

function renderMaterias() {
  renderList(elements.materiasList, getMateriasFiltradas(), (materia) => `
    <article class="entity-card">
      <div class="entity-head">
        <div>
          <h4>${materia.nombre}</h4>
          <p class="muted">${materia.profesor || "Profesor sin registrar"}</p>
        </div>
        <div class="badge-row">
          <span class="pill">${getPeriodoNombre(materia.id_periodo)}</span>
          <div class="task-actions">
            <button class="ghost-button" onclick="editMateria('${materia.id_materia}')">Editar</button>
            <button class="secondary-button" onclick="deleteMateria('${materia.id_materia}')">Eliminar</button>
          </div>
        </div>
      </div>
    </article>
  `);
}

function renderTareas() {
  renderTaskList(elements.tareasPendientesList, filterTasksByPeriodo(state.tareasPendientes), false);
  renderTaskList(elements.tareasVencidasList, filterTasksByPeriodo(state.tareasVencidas), false);
  renderTaskList(elements.tareasCompletadasList, filterTasksByPeriodo(state.tareasCompletadas), true);
}

function renderTaskList(container, tasks, completedList) {
  renderList(container, tasks, (task) => {
    const status = getTaskStatus(task);
    return `
      <article class="task-card">
        <div class="task-head">
          <h4>${task.titulo}</h4>
          <span class="pill ${status.className}">${status.label}</span>
        </div>
        <p class="muted">${task.descripcion || "Sin descripcion"}</p>
        <div class="task-meta">
          <span>${task.materia || getMateriaNombre(task.id_materia)}</span>
          <span>${formatDate(task.fecha_entrega)}</span>
        </div>
        <div class="task-actions">
          <button class="ghost-button" onclick="selectTask('${task.id_tarea}')">Ver detalle</button>
          <button class="ghost-button" onclick="editTarea('${task.id_tarea}')">Editar</button>
          ${completedList ? "" : `<button class="primary-button" onclick="completeTask('${task.id_tarea}')">Marcar entregada</button>`}
          <button class="secondary-button" onclick="deleteTarea('${task.id_tarea}')">Eliminar</button>
        </div>
      </article>
    `;
  });
}

function renderCalendarWeekdays() {
  elements.calendarWeekdays.innerHTML = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map((day) => `<div>${day}</div>`).join("");
}

function renderCalendar() {
  const current = state.calendarDate;
  const monthName = current.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
  elements.calendarTitle.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());
  const tasks = getTareasFiltradas();
  const today = toISODate(new Date());
  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const iso = toISODate(date);
    const dayTasks = tasks.filter((task) => normalizeDate(task.fecha_entrega) === iso);
    const classes = ["calendar-day", date.getMonth() !== current.getMonth() ? "outside" : "", iso === today ? "today" : ""].join(" ");

    cells.push(`
      <div class="${classes}">
        <div class="calendar-number">${date.getDate()}</div>
        ${dayTasks
          .map((task) => {
            const status = getTaskStatus(task);
            return `<button class="calendar-task ${status.className}" onclick="selectTask('${task.id_tarea}')">${task.titulo}</button>`;
          })
          .join("")}
      </div>
    `);
  }

  elements.calendarGrid.innerHTML = cells.join("");
}

function renderTaskDetail() {
  if (!state.selectedTask) {
    elements.taskDetail.innerHTML = `
      <h4>Detalle de la tarea</h4>
      <p>Selecciona una tarea del calendario para ver su informacion.</p>
    `;
    return;
  }

  const task = state.tareas.find((item) => String(item.id_tarea) === String(state.selectedTask));
  if (!task) {
    state.selectedTask = null;
    renderTaskDetail();
    return;
  }

  const status = getTaskStatus(task);
  elements.taskDetail.innerHTML = `
    <h4>${task.titulo}</h4>
    <p class="muted">${task.descripcion || "Sin descripcion"}</p>
    <div class="badge-row">
      <span class="pill ${status.className}">${status.label}</span>
      <span class="pill">${getMateriaNombre(task.id_materia)}</span>
      <span class="pill">${getPeriodoNombreByMateria(task.id_materia)}</span>
    </div>
    <p><strong>Fecha de entrega:</strong> ${formatDate(task.fecha_entrega)}</p>
    <div class="task-actions">
      <button class="ghost-button" onclick="editTarea('${task.id_tarea}')">Editar tarea</button>
      ${task.completada ? "" : `<button class="primary-button" onclick="completeTask('${task.id_tarea}')">Marcar entregada</button>`}
    </div>
  `;
}

function renderHorarios() {
  const horarios = getHorariosFiltrados();
  renderList(elements.horariosList, horarios, (horario) => `
    <article class="entity-card">
      <div class="entity-head">
        <div>
          <h4>${horario.materia || getMateriaNombre(horario.id_materia)}</h4>
          <p class="muted">${getDayLabel(horario.dia_semana)} - ${formatTime(horario.hora_inicio)} - ${formatTime(horario.hora_fin)}</p>
        </div>
        <div class="task-actions">
          <button class="ghost-button" onclick="editHorario('${horario.id_horario}')">Editar</button>
          <button class="secondary-button" onclick="deleteHorario('${horario.id_horario}')">Eliminar</button>
        </div>
      </div>
    </article>
  `);

  const grid = ['<div class="schedule-cell header">Hora</div>'];
  daysOfWeek.forEach((day) => grid.push(`<div class="schedule-cell header">${day.label}</div>`));

  const hours = [...new Set(horarios.map((item) => `${formatTime(item.hora_inicio)} - ${formatTime(item.hora_fin)}`))].sort();
  hours.forEach((range) => {
    grid.push(`<div class="schedule-cell"><strong>${range}</strong></div>`);
    daysOfWeek.forEach((day) => {
      const entries = horarios.filter(
        (item) => getDayCode(item.dia_semana) === day.code && `${formatTime(item.hora_inicio)} - ${formatTime(item.hora_fin)}` === range
      );
      const content = entries
        .map((entry) => {
          const color = getMateriaColor(entry.id_materia);
          return `
            <div class="schedule-entry" style="background:${color}">
              <strong>${entry.materia || getMateriaNombre(entry.id_materia)}</strong>
              <div>${formatTime(entry.hora_inicio)} - ${formatTime(entry.hora_fin)}</div>
            </div>
          `;
        })
        .join("");
      grid.push(`<div class="schedule-cell">${content || '<span class="muted">Libre</span>'}</div>`);
    });
  });

  elements.scheduleGrid.innerHTML = grid.join("");
}

function renderList(container, items, renderer) {
  container.innerHTML = items.length ? items.map(renderer).join("") : elements.emptyStateTemplate.innerHTML;
}

async function handlePeriodoSubmit(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.target).entries());
  const id = payload.id;
  delete payload.id;
  await submitEntity(id, "/api/periodos", payload, elements.periodoForm, elements.cancelPeriodoEdit, "Periodo guardado correctamente.");
}

async function handleMateriaSubmit(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.target).entries());
  const id = payload.id;
  delete payload.id;
  await submitEntity(id, "/api/materias", payload, elements.materiaForm, elements.cancelMateriaEdit, "Materia guardada correctamente.");
}

async function handleTareaSubmit(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.target).entries());
  const id = payload.id;
  delete payload.id;
  await submitEntity(id, "/api/tareas", payload, elements.tareaForm, elements.cancelTareaEdit, "Tarea guardada correctamente.");
}

async function handleHorarioSubmit(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(event.target).entries());
  const id = payload.id;
  delete payload.id;
  if (id) {
    delete payload.id_materia;
  }
  await submitEntity(id, "/api/horarios", payload, elements.horarioForm, elements.cancelHorarioEdit, "Horario guardado correctamente.");
}

async function submitEntity(id, path, payload, form, cancelButton, message) {
  try {
    await apiFetch(id ? `${path}/${id}` : path, {
      method: id ? "PUT" : "POST",
      body: payload,
    });
    setAuthMessage(message, true);
    resetForm(form, cancelButton);
    await refreshData();
  } catch (error) {
    setAuthMessage(error.message, false);
  }
}

function editPeriodo(id) {
  const periodo = state.periodos.find((item) => String(item.id_periodo) === String(id));
  if (!periodo) return;
  switchDashboardTab("periodos");
  elements.periodoForm.elements.id.value = periodo.id_periodo;
  elements.periodoForm.elements.nombre.value = periodo.nombre;
  elements.periodoForm.elements.fecha_inicio.value = normalizeDate(periodo.fecha_inicio);
  elements.periodoForm.elements.fecha_fin.value = normalizeDate(periodo.fecha_fin);
  elements.cancelPeriodoEdit.classList.remove("hidden");
}

function editMateria(id) {
  const materia = state.materias.find((item) => String(item.id_materia) === String(id));
  if (!materia) return;
  switchDashboardTab("materias");
  elements.materiaForm.elements.id.value = materia.id_materia;
  elements.materiaForm.elements.nombre.value = materia.nombre;
  elements.materiaForm.elements.profesor.value = materia.profesor || "";
  elements.materiaForm.elements.id_periodo.value = materia.id_periodo;
  elements.cancelMateriaEdit.classList.remove("hidden");
}

function editTarea(id) {
  const tarea = state.tareas.find((item) => String(item.id_tarea) === String(id));
  if (!tarea) return;
  switchDashboardTab("tareas");
  elements.tareaForm.elements.id.value = tarea.id_tarea;
  elements.tareaForm.elements.titulo.value = tarea.titulo;
  elements.tareaForm.elements.descripcion.value = tarea.descripcion || "";
  elements.tareaForm.elements.fecha_entrega.value = normalizeDate(tarea.fecha_entrega);
  elements.tareaForm.elements.id_materia.value = tarea.id_materia;
  elements.cancelTareaEdit.classList.remove("hidden");
}

function editHorario(id) {
  const horario = state.horarios.find((item) => String(item.id_horario) === String(id));
  if (!horario) return;
  switchDashboardTab("horario");
  elements.horarioForm.elements.id.value = horario.id_horario;
  elements.horarioForm.elements.dia_semana.value = getDayCode(horario.dia_semana);
  elements.horarioForm.elements.hora_inicio.value = sliceTime(horario.hora_inicio);
  elements.horarioForm.elements.hora_fin.value = sliceTime(horario.hora_fin);
  elements.horarioForm.elements.id_materia.value = horario.id_materia;
  elements.cancelHorarioEdit.classList.remove("hidden");
}

async function deletePeriodo(id) {
  if (!window.confirm("Se eliminara el periodo seleccionado.")) return;
  await deleteEntity(`/api/periodos/${id}`);
}

async function deleteMateria(id) {
  if (!window.confirm("Se eliminara la materia seleccionada.")) return;
  await deleteEntity(`/api/materias/${id}`);
}

async function deleteTarea(id) {
  if (!window.confirm("Se eliminara la tarea seleccionada.")) return;
  await deleteEntity(`/api/tareas/${id}`);
}

async function deleteHorario(id) {
  if (!window.confirm("Se eliminara el horario seleccionado.")) return;
  await deleteEntity(`/api/horarios/${id}`);
}

async function deleteEntity(path) {
  try {
    await apiFetch(path, { method: "DELETE" });
    setAuthMessage("Registro eliminado correctamente.", true);
    await refreshData();
  } catch (error) {
    setAuthMessage(error.message, false);
  }
}

async function completeTask(id) {
  try {
    await apiFetch(`/api/tareas/${id}/completar`, { method: "PATCH" });
    setAuthMessage("La tarea fue marcada como entregada.", true);
    await refreshData();
  } catch (error) {
    setAuthMessage(error.message, false);
  }
}

function selectTask(id) {
  state.selectedTask = id;
  switchDashboardTab("calendario");
  renderTaskDetail();
}

function resetForm(form, cancelButton) {
  form.reset();
  if (form.elements.id) {
    form.elements.id.value = "";
  }
  cancelButton.classList.add("hidden");
  fillSelects();
}

function switchAuthTab(tab) {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authTab === tab);
  });
  elements.loginForm.classList.toggle("hidden", tab !== "login");
  elements.registerForm.classList.toggle("hidden", tab !== "register");
}

function switchDashboardTab(tab) {
  state.currentDashboardTab = tab;
  elements.dashboardTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.dashboardTab === tab);
  });
  elements.dashboardPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.dashboardPanel === tab);
  });
}

function applyTheme(themeName) {
  const theme = themePalette[themeName] || themePalette.light;
  state.currentTheme = themeName in themePalette ? themeName : "light";
  const root = document.documentElement;

  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-2", theme.accent2);
  root.style.setProperty("--accent-3", theme.accent3);
  root.style.setProperty("--dashboard-bg", theme.dashboardBg);
  root.style.setProperty("--dashboard-surface", theme.dashboardSurface);
  root.style.setProperty("--dashboard-surface-2", theme.dashboardSurface2);
  root.style.setProperty("--dashboard-text", theme.dashboardText);
  root.style.setProperty("--dashboard-muted", theme.dashboardMuted);
  root.style.setProperty("--dashboard-line", theme.dashboardLine);

  localStorage.setItem("dashboardTheme", state.currentTheme);
  elements.themeSwatches.forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === state.currentTheme);
  });
}

function showDashboard() {
  elements.authPanel.classList.add("hidden");
  elements.dashboardPanel.classList.remove("hidden");
  elements.welcomeTitle.textContent = state.user ? `Hola, ${state.user.nombre}` : "Bienvenido";
  switchDashboardTab(state.currentDashboardTab);
  updateHeroStatus();
}

function showAuth() {
  elements.authPanel.classList.remove("hidden");
  elements.dashboardPanel.classList.add("hidden");
  updateHeroStatus();
}

function logout() {
  state.token = "";
  state.user = null;
  state.selectedTask = null;
  state.currentDashboardTab = "resumen";
  state.periodos = [];
  state.materias = [];
  state.tareas = [];
  state.tareasPendientes = [];
  state.tareasVencidas = [];
  state.tareasCompletadas = [];
  state.horarios = [];
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showAuth();
}

function updateHeroStatus() {
  const connected = Boolean(state.token && state.user);
  elements.heroStatus.innerHTML = connected
    ? `<span class="status-dot" style="background:var(--accent); box-shadow:0 0 0 5px rgba(27,36,87,.16)"></span><span>Sesion activa de ${state.user.nombre}</span>`
    : '<span class="status-dot"></span><span>Conecta tu cuenta para comenzar</span>';
}

function setAuthMessage(message, success) {
  elements.authMessage.textContent = message;
  elements.authMessage.classList.toggle("success", success);
  elements.dashboardMessage.textContent = message;
  elements.dashboardMessage.classList.toggle("success", success);
}

function getMateriasFiltradas() {
  return state.selectedPeriodo === "all"
    ? state.materias
    : state.materias.filter((materia) => String(materia.id_periodo) === String(state.selectedPeriodo));
}

function getTareasFiltradas() {
  return filterTasksByPeriodo(state.tareas);
}

function filterTasksByPeriodo(tasks) {
  if (state.selectedPeriodo === "all") {
    return tasks;
  }
  const materiasIds = new Set(getMateriasFiltradas().map((materia) => String(materia.id_materia)));
  return tasks.filter((task) => materiasIds.has(String(task.id_materia)));
}

function getHorariosFiltrados() {
  if (state.selectedPeriodo === "all") {
    return state.horarios;
  }
  return state.horarios.filter((horario) => {
    const materia = state.materias.find((item) => String(item.id_materia) === String(horario.id_materia));
    return materia && String(materia.id_periodo) === String(state.selectedPeriodo);
  });
}

function getTaskStatus(task) {
  if (task.completada) {
    return { label: "Realizada", className: "completed" };
  }
  const due = new Date(normalizeDate(task.fecha_entrega));
  const today = new Date();
  const limit = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return due < limit ? { label: "Vencida", className: "overdue" } : { label: "Pendiente", className: "pending" };
}

function getMateriaNombre(idMateria) {
  return state.materias.find((materia) => String(materia.id_materia) === String(idMateria))?.nombre || "Materia";
}

function getPeriodoNombre(idPeriodo) {
  return state.periodos.find((periodo) => String(periodo.id_periodo) === String(idPeriodo))?.nombre || "Periodo";
}

function getPeriodoNombreByMateria(idMateria) {
  const materia = state.materias.find((item) => String(item.id_materia) === String(idMateria));
  return materia ? getPeriodoNombre(materia.id_periodo) : "Periodo";
}

function getMateriaColor(idMateria) {
  const index = state.materias.findIndex((materia) => String(materia.id_materia) === String(idMateria));
  return colorPalette[(index >= 0 ? index : 0) % colorPalette.length];
}

function formatDate(value) {
  return new Date(normalizeDate(value)).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value) {
  return sliceTime(value);
}

function sliceTime(value) {
  return String(value).slice(0, 5);
}

function normalizeDate(value) {
  return String(value).slice(0, 10);
}

function toISODate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeDay(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getDayCode(value) {
  const normalized = normalizeDay(value);
  const match = daysOfWeek.find((day) => normalizeDay(day.code) === normalized || normalizeDay(day.label) === normalized);
  return match ? match.code : "Lun";
}

function getDayLabel(value) {
  const normalized = normalizeDay(value);
  const match = daysOfWeek.find((day) => normalizeDay(day.code) === normalized || normalizeDay(day.label) === normalized);
  return match ? match.label : value;
}

window.editPeriodo = editPeriodo;
window.editMateria = editMateria;
window.editTarea = editTarea;
window.editHorario = editHorario;
window.deletePeriodo = deletePeriodo;
window.deleteMateria = deleteMateria;
window.deleteTarea = deleteTarea;
window.deleteHorario = deleteHorario;
window.completeTask = completeTask;
window.selectTask = selectTask;
