const makeTimestamp = (dayOffset = 0, hour = 12) => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString();
};

const makeDate = (dayOffset = 0) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const APP_DATA = {
  users: [
    { id: 'usr-nova', name: 'Carlos Mendoza', email: 'carlos.mendoza@example.test', organization: 'NovaTech Solutions', plan: 'Enterprise', status: 'active', createdAt: makeDate(-420), country: 'España', role: 'Director de Operaciones' },
    { id: 'usr-data', name: 'Elena Ruiz', email: 'elena.ruiz@example.test', organization: 'DataPulse Analytics', plan: 'Pro', status: 'invited', createdAt: makeDate(-260), country: 'México', role: 'Administradora' },
    { id: 'usr-krypton', name: 'Andrés Valdés', email: 'andres.valdes@example.test', organization: 'Krypton Health AI', plan: 'Enterprise', status: 'active', createdAt: makeDate(-180), country: 'Chile', role: 'Responsable de Tecnología' },
    { id: 'usr-vanguard', name: 'Mariana Soria', email: 'mariana.soria@example.test', organization: 'Vanguard FinTech', plan: 'Starter', status: 'suspended', createdAt: makeDate(-90), country: 'Argentina', role: 'Analista de Cumplimiento' },
    { id: 'usr-summit', name: 'Lucía Herrera', email: 'lucia.herrera@example.test', organization: 'Summit Works', plan: 'Starter', status: 'active', createdAt: makeDate(-35), country: 'Colombia', role: 'Coordinadora de Operaciones' }
  ],
  skills: [
    { id: 'sk-web', name: 'Navegación web', shortDescription: 'Consulta y navegación de sitios web.', description: 'Permite buscar, consultar y resumir información disponible en sitios web públicos.', limitations: 'No inicia sesión en sitios ni realiza acciones de compra.', category: 'Exploración', version: '2.4', listPrice: 120, currency: 'USD' },
    { id: 'sk-docs', name: 'Análisis de documentos', shortDescription: 'Lectura y extracción de información de documentos.', description: 'Extrae y resume información de documentos PDF y texto para apoyar flujos de análisis.', limitations: 'El prototipo no carga archivos reales; el límite de tamaño no aplica a los datos de muestra.', category: 'Procesamiento', version: '1.8', listPrice: 180, currency: 'USD' },
    { id: 'sk-calendar', name: 'Gestión de calendarios', shortDescription: 'Organización de eventos y disponibilidad.', description: 'Ayuda a coordinar eventos, revisar disponibilidad y organizar agendas de trabajo.', limitations: 'No crea, actualiza ni invita participantes en calendarios externos.', category: 'Productividad', version: '3.1', listPrice: 90, currency: 'USD' },
    { id: 'sk-data', name: 'Procesamiento de datos', shortDescription: 'Transformación y validación de datos estructurados.', description: 'Normaliza, valida y resume conjuntos de datos estructurados para tareas de negocio.', limitations: 'Solo procesa registros ficticios incluidos en el prototipo.', category: 'Procesamiento', version: '2.0', listPrice: 150, currency: 'USD' }
  ],
  agents: [
    { id: 'agt-sentinel', name: 'SentinelBot Pro', ownerUserId: 'usr-nova', enabled: true, systemPrompt: 'Eres SentinelBot Pro. Revisa datos operativos ficticios, identifica patrones relevantes y redacta resúmenes claros. No ejecutes acciones externas ni afirmes que has cambiado sistemas.', skillIds: ['sk-web', 'sk-docs'], createdAt: makeDate(-120) },
    { id: 'agt-scraper', name: 'DataScraper Alpha', ownerUserId: 'usr-data', enabled: true, systemPrompt: 'Eres DataScraper Alpha. Organiza información pública proporcionada por el usuario y devuelve resultados estructurados. No realices solicitudes externas en este prototipo.', skillIds: ['sk-web', 'sk-data'], createdAt: makeDate(-100) },
    { id: 'agt-calendar', name: 'CalendarGenius', ownerUserId: 'usr-krypton', enabled: true, systemPrompt: 'Eres CalendarGenius. Ayuda a ordenar eventos y sugerir horarios a partir de datos ficticios. No envíes invitaciones ni modifiques calendarios reales.', skillIds: ['sk-calendar', 'sk-docs'], createdAt: makeDate(-70) },
    { id: 'agt-reviewer', name: 'Compliance Reviewer', ownerUserId: 'usr-vanguard', enabled: false, systemPrompt: 'Eres Compliance Reviewer. Resume los datos de ejemplo y señala posibles inconsistencias. No emitas decisiones legales ni cambies registros.', skillIds: ['sk-docs', 'sk-data'], createdAt: makeDate(-60) },
    { id: 'agt-support', name: 'SupportGenie', ownerUserId: 'usr-nova', enabled: true, systemPrompt: 'Eres SupportGenie. Clasifica solicitudes de soporte ficticias y propone respuestas breves, claras y respetuosas.', skillIds: ['sk-docs', 'sk-calendar'], createdAt: makeDate(-45) }
  ],
  contracts: [
    {
      id: 'CTR-2026-101', clientUserId: 'usr-nova', agentId: 'agt-sentinel', status: 'active', startDate: makeDate(-12), endDate: null, billingPeriod: 'monthly', currency: 'USD', basePrice: 1200,
      skillLines: [{ skillId: 'sk-web', nameSnapshot: 'Navegación web', price: 120 }, { skillId: 'sk-docs', nameSnapshot: 'Análisis de documentos', price: 180 }],
      subtotal: 1500, discountAmount: 150, taxAmount: 0, totalPaid: 1350,
      payments: [{ id: 'PAY-101', paidAt: makeTimestamp(-1), subtotal: 1500, discountAmount: 150, taxAmount: 0, amountPaid: 1350, status: 'paid' }]
    },
    {
      id: 'CTR-2026-087', clientUserId: 'usr-data', agentId: 'agt-scraper', status: 'completed', startDate: makeDate(-42), endDate: makeDate(-13), billingPeriod: 'monthly', currency: 'USD', basePrice: 950,
      skillLines: [{ skillId: 'sk-web', nameSnapshot: 'Navegación web', price: 120 }],
      subtotal: 1070, discountAmount: 0, taxAmount: 0, totalPaid: 1070,
      payments: [{ id: 'PAY-087', paidAt: makeTimestamp(-5), subtotal: 1070, discountAmount: 0, taxAmount: 0, amountPaid: 1070, status: 'paid' }]
    },
    {
      id: 'CTR-2026-112', clientUserId: 'usr-krypton', agentId: 'agt-calendar', status: 'active', startDate: makeDate(-8), endDate: null, billingPeriod: 'monthly', currency: 'USD', basePrice: 2100,
      skillLines: [{ skillId: 'sk-docs', nameSnapshot: 'Análisis de documentos', price: 180 }, { skillId: 'sk-calendar', nameSnapshot: 'Gestión de calendarios', price: 90 }],
      subtotal: 2370, discountAmount: 237, taxAmount: 0, totalPaid: 2133,
      payments: [{ id: 'PAY-112', paidAt: makeTimestamp(-3), subtotal: 2370, discountAmount: 237, taxAmount: 0, amountPaid: 2133, status: 'paid' }]
    },
    {
      id: 'CTR-2026-063', clientUserId: 'usr-vanguard', agentId: 'agt-reviewer', status: 'cancelled', startDate: makeDate(-35), endDate: makeDate(-28), billingPeriod: 'monthly', currency: 'USD', basePrice: 800,
      skillLines: [{ skillId: 'sk-data', nameSnapshot: 'Procesamiento de datos', price: 150 }],
      subtotal: 950, discountAmount: 0, taxAmount: 0, totalPaid: 950,
      payments: [{ id: 'PAY-063', paidAt: makeTimestamp(-29), subtotal: 950, discountAmount: 0, taxAmount: 0, amountPaid: 950, status: 'paid' }]
    }
  ],
  errorLogs: [
    { id: 'ERR-4101', agentId: 'agt-support', occurredAt: makeTimestamp(-1, 10), type: 'ConnectionTimeout', severity: 'critical', shortDescription: 'Tiempo de espera agotado al procesar una tarea de ejemplo.', description: 'La tarea simulada superó el límite de tiempo configurado. No se realizó ninguna llamada externa.', stackTrace: 'Error: simulated task timeout\n    at processSampleTask (support.js:42:8)\n    at async runDemo (support.js:18:3)', context: 'Tarea local de demostración; sin datos de cliente.', status: 'unresolved', resolvedAt: null },
    { id: 'ERR-4102', agentId: 'agt-scraper', occurredAt: makeTimestamp(-2, 14), type: 'RateLimitExceeded', severity: 'error', shortDescription: 'Límite local de intentos de demostración alcanzado.', description: 'El fixture representa una respuesta de límite de frecuencia. No se contactó ningún proveedor.', stackTrace: 'Error: simulated rate limit\n    at collectSample (scraper.js:31:5)', context: 'Proveedor ficticio: Example Data Source.', status: 'unresolved', resolvedAt: null },
    { id: 'ERR-4098', agentId: 'agt-calendar', occurredAt: makeTimestamp(-3, 9), type: 'CalendarConflict', severity: 'warning', shortDescription: 'Dos eventos de ejemplo coinciden en el horario propuesto.', description: 'La sugerencia requiere revisión manual antes de considerarse válida.', stackTrace: 'Warning: overlapping sample events\n    at suggestSlot (calendar.js:56:2)', context: 'Calendario de demostración.', status: 'unresolved', resolvedAt: null },
    { id: 'ERR-4070', agentId: 'agt-sentinel', occurredAt: makeTimestamp(-6, 11), type: 'OptionalFieldMissing', severity: 'info', shortDescription: 'Un campo opcional no estaba presente en el registro de muestra.', description: 'El registro se procesó con valores opcionales ausentes.', stackTrace: 'Info: optional field omitted\n    at parseSample (sentinel.js:19:1)', context: 'Datos ficticios.', status: 'resolved', resolvedAt: makeTimestamp(-6, 12) },
    { id: 'ERR-4022', agentId: 'agt-reviewer', occurredAt: makeTimestamp(-20, 15), type: 'DisabledAgentNotice', severity: 'error', shortDescription: 'El agente se encontraba inactivo al registrar este evento histórico.', description: 'Evento conservado como historial; no afecta al estado actual del agente.', stackTrace: 'Error: sample agent disabled\n    at checkAvailability (reviewer.js:12:1)', context: 'El agente está deshabilitado.', status: 'resolved', resolvedAt: makeTimestamp(-19, 9) },
    { id: 'ERR-4008', agentId: 'agt-sentinel', occurredAt: makeTimestamp(-12, 14), type: 'OptionalMetadataNotice', severity: 'warning', shortDescription: 'Falta un metadato opcional en una ejecución de ejemplo.', description: 'El evento se conserva como advertencia informativa y no bloquea la operación del agente.', stackTrace: 'Warning: optional metadata omitted\n    at parseMetadata (sentinel.js:28:3)', context: 'Registro de muestra local.', status: 'unresolved', resolvedAt: null }
  ]
};

let appState = JSON.parse(JSON.stringify(APP_DATA));
let appState_UI = { activeSection: 'dashboard', lastDeleted: null };
