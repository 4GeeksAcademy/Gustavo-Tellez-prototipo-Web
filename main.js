const APP_PAGES = {
  dashboard: { title: 'Dashboard', description: 'Resumen económico y operativo de AgentHub.', href: 'index.html', icon: '01' },
  usuarios: { title: 'Usuarios', description: 'Cuentas cliente, planes y relaciones de la plataforma.', href: 'usuarios.html', icon: '02' },
  agentes: { title: 'Agentes', description: 'Agentes registrados, propietarios, capacidades y estado actual.', href: 'agentes.html', icon: '03' },
  skills: { title: 'Skills', description: 'Catálogo de capacidades modulares disponibles.', href: 'skills.html', icon: '04' },
  contrataciones: { title: 'Contrataciones', description: 'Contratos activos e históricos y su desglose económico.', href: 'contrataciones.html', icon: '05' },
  errores: { title: 'Log de errores', description: 'Incidentes ficticios de ejecución y su estado de resolución.', href: 'errores.html', icon: '06' }
};

let currentPage = document.body.dataset.page || 'dashboard';
let errorSeverityFilter = 'all';
let errorResolutionFilter = 'all';
const NAVIGATION_STATE_KEY = 'agenthub-navigation-state';

const TAILWIND_UTILITY_MAP = {
  'app-shell': 'min-h-screen bg-[#f8fafc] text-[#17212b] dark:bg-[#0b1326] dark:text-[#dae2fd] font-sans text-sm leading-6',
  sidebar: 'fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-[#d3dce5] bg-[#f1f5f9] transition-transform duration-200 dark:border-[#3d4947] dark:bg-[#131b2e] max-lg:-translate-x-full',
  'brand-row': 'flex h-14 items-center justify-between gap-3 border-b border-[#d3dce5] px-4 dark:border-[#3d4947]',
  'brand-name': 'flex items-center gap-2 text-base font-semibold no-underline text-[#17212b] dark:text-[#dae2fd]',
  'brand-mark': 'text-lg font-bold text-[#087f75] dark:text-[#6bd8cb]',
  'brand-version': 'font-mono text-[11px] text-[#526170] dark:text-[#bcc9c6]',
  'sidebar-nav': 'flex flex-1 flex-col gap-1 p-2',
  'nav-link': 'flex min-h-10 items-center gap-2.5 rounded px-3 py-2 text-[13px] text-[#526170] no-underline transition-colors hover:bg-[#e2e8f0] hover:text-[#17212b] dark:text-[#bcc9c6] dark:hover:bg-[#222a3d] dark:hover:text-[#dae2fd]',
  'nav-icon': 'w-[18px] shrink-0 text-center font-mono',
  'sidebar-note': 'm-2 rounded border border-[#d3dce5] p-3 text-xs text-[#526170] dark:border-[#3d4947] dark:text-[#bcc9c6]',
  'main-area': 'min-h-screen ml-60 max-lg:ml-0',
  topbar: 'sticky top-0 z-20 flex min-h-14 items-center justify-between gap-4 border-b border-[#d3dce5] bg-[#f8fafc]/95 px-6 py-2 backdrop-blur-xl dark:border-[#3d4947] dark:bg-[#0b1326]/95 max-sm:px-3',
  'topbar-context': 'text-[13px] text-[#526170] dark:text-[#bcc9c6] max-sm:hidden',
  'topbar-tools': 'flex items-center gap-2',
  'main-content': 'mx-auto w-full max-w-[1600px] p-6 max-md:p-[18px_16px] max-sm:p-[16px_12px]',
  'mobile-menu-button': 'hidden max-lg:inline-flex',
  'nav-backdrop': 'fixed inset-0 z-[25] hidden bg-black/50 max-lg:block',
  'page-heading': 'mb-6 flex items-end justify-between gap-5 max-md:items-start max-md:flex-col',
  'page-eyebrow': 'mb-1.5 font-mono text-[11px] uppercase tracking-wide text-[#087f75] dark:text-[#6bd8cb]',
  'page-description': 'mb-0 max-w-3xl text-[#526170] dark:text-[#bcc9c6]',
  button: 'inline-flex min-h-9 items-center justify-center gap-2 rounded border border-[#d3dce5] bg-white px-3 py-1.5 text-sm text-[#17212b] no-underline transition-colors hover:bg-[#e2e8f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087f75] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3d4947] dark:bg-[#171f33] dark:text-[#dae2fd] dark:hover:bg-[#222a3d] dark:focus-visible:outline-[#6bd8cb]',
  primary: 'border-[#06665f] bg-[#06665f] text-white hover:brightness-110 dark:border-[#29a195] dark:bg-[#29a195] dark:text-[#003732]',
  secondary: 'bg-white dark:bg-[#171f33]',
  danger: 'border-[#b42332] bg-[#b42332] text-white',
  'icon-button': 'inline-flex h-9 min-h-9 w-9 min-w-9 items-center justify-center rounded border border-[#d3dce5] bg-white p-0 text-lg text-[#17212b] transition-colors hover:bg-[#e2e8f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087f75] dark:border-[#3d4947] dark:bg-[#171f33] dark:text-[#dae2fd] dark:hover:bg-[#222a3d] dark:focus-visible:outline-[#6bd8cb]',
  'button-small': 'min-h-8 px-2.5 py-1 text-xs',
  'metric-grid': 'mb-5 grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1',
  'metric-card': 'min-w-0 rounded-md border border-[#d3dce5] bg-white p-4 dark:border-[#3d4947] dark:bg-[#171f33]',
  'metric-head': 'flex items-center gap-2',
  'metric-icon': 'grid h-[30px] w-[30px] shrink-0 place-items-center rounded border border-[#d3dce5] text-[15px] font-bold text-[#087f75] dark:border-[#3d4947] dark:text-[#6bd8cb]',
  'metric-label': 'text-xs text-[#526170] dark:text-[#bcc9c6]',
  'metric-value': 'my-2.5 mb-1 font-sans text-2xl font-semibold tabular-nums',
  'metric-note': 'text-xs text-[#526170] dark:text-[#bcc9c6]',
  panel: 'mb-[18px] rounded-md border border-[#d3dce5] bg-white dark:border-[#3d4947] dark:bg-[#171f33]',
  'panel-header': 'flex items-center justify-between gap-3 border-b border-[#d3dce5] p-4 dark:border-[#3d4947]',
  'panel-body': 'p-4',
  'info-banner': 'mb-[18px] flex items-start gap-3 border-l-[3px] border-[#087f75] bg-[#f1f5f9] p-4 dark:border-[#6bd8cb] dark:bg-[#131b2e]',
  toolbar: 'flex flex-wrap items-center justify-between gap-2.5 rounded-t-md border border-b-0 border-[#d3dce5] bg-[#f1f5f9] p-3 dark:border-[#3d4947] dark:bg-[#131b2e] max-md:items-stretch',
  'toolbar-group': 'flex flex-wrap items-center gap-2 max-md:w-full',
  'search-input': 'min-h-9 w-full max-w-[340px] rounded border border-[#d3dce5] bg-[#e9eef5] px-2.5 py-1.5 text-sm text-[#17212b] focus-visible:outline-2 focus-visible:outline-[#087f75] dark:border-[#3d4947] dark:bg-[#060e20] dark:text-[#dae2fd] dark:focus-visible:outline-[#6bd8cb] max-md:flex-1',
  'filter-select': 'min-h-9 rounded border border-[#d3dce5] bg-[#e9eef5] px-2.5 py-1.5 text-sm text-[#17212b] dark:border-[#3d4947] dark:bg-[#060e20] dark:text-[#dae2fd]',
  'table-wrap': 'w-full overflow-x-auto overscroll-x-contain rounded-b-md border border-[#d3dce5] bg-white [scrollbar-color:#758392_#f1f5f9] [scrollbar-width:thin] dark:border-[#3d4947] dark:bg-[#171f33] dark:[scrollbar-color:#879391_#131b2e]',
  'data-table': 'w-full border-collapse text-left',
  numeric: 'text-right tabular-nums whitespace-nowrap',
  'actions-cell': 'w-16 whitespace-nowrap text-right',
  'cell-title': 'block font-semibold',
  'cell-secondary': 'mt-0.5 block text-xs text-[#526170] dark:text-[#bcc9c6]',
  badge: 'inline-flex min-h-[22px] items-center gap-1.5 rounded border border-current px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap',
  'badge-active': 'bg-[#087a51]/10 text-[#087a51] dark:bg-[#4edea3]/10 dark:text-[#4edea3]',
  'badge-resolved': 'bg-[#087a51]/10 text-[#087a51] dark:bg-[#4edea3]/10 dark:text-[#4edea3]',
  'badge-inactive': 'bg-[#f1f5f9] text-[#526170] dark:bg-[#131b2e] dark:text-[#bcc9c6]',
  'badge-invited': 'bg-[#f1f5f9] text-[#526170] dark:bg-[#131b2e] dark:text-[#bcc9c6]',
  'badge-completed': 'bg-[#f1f5f9] text-[#526170] dark:bg-[#131b2e] dark:text-[#bcc9c6]',
  'badge-failing': 'bg-[#b42332]/10 text-[#b42332] dark:bg-[#ffb4ab]/10 dark:text-[#ffb4ab]',
  'badge-critical': 'bg-[#b42332]/10 text-[#b42332] dark:bg-[#ffb4ab]/10 dark:text-[#ffb4ab]',
  'badge-error': 'bg-[#b42332]/10 text-[#b42332] dark:bg-[#ffb4ab]/10 dark:text-[#ffb4ab]',
  'badge-suspended': 'bg-[#b42332]/10 text-[#b42332] dark:bg-[#ffb4ab]/10 dark:text-[#ffb4ab]',
  'badge-warning': 'bg-[#965d00]/10 text-[#965d00] dark:bg-[#fbbf24]/10 dark:text-[#fbbf24]',
  'badge-info': 'bg-[#255dad]/10 text-[#255dad] dark:bg-[#93c5fd]/10 dark:text-[#93c5fd]',
  'skill-list': 'flex flex-wrap gap-1.5',
  'skill-tag': 'inline-flex items-center rounded border border-[#d3dce5] bg-[#f1f5f9] px-2 py-1 text-[11px] text-[#526170] dark:border-[#3d4947] dark:bg-[#131b2e] dark:text-[#bcc9c6]',
  'skills-toggle': 'min-h-[30px] cursor-pointer rounded border border-[#d3dce5] bg-[#f1f5f9] px-2 py-1 text-xs dark:border-[#3d4947] dark:bg-[#131b2e]',
  'skills-panel': 'max-h-0 overflow-hidden opacity-0 transition-all duration-200 motion-reduce:transition-none',
  'action-menu': 'fixed right-4 top-16 z-[80] min-w-[180px] max-w-[min(280px,calc(100vw-16px))] rounded-md border border-[#d3dce5] bg-white p-1 shadow-xl dark:border-[#3d4947] dark:bg-[#171f33]',
  'action-menu-item': 'flex min-h-9 w-full cursor-pointer items-center rounded px-2.5 py-1.5 text-left text-[13px] text-[#17212b] hover:bg-[#e2e8f0] focus-visible:outline-2 focus-visible:outline-[#087f75] disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#dae2fd] dark:hover:bg-[#222a3d] dark:focus-visible:outline-[#6bd8cb]',
  'action-menu-divider': 'my-1 h-px border-0 bg-[#d3dce5] dark:bg-[#3d4947]',
  'empty-state': 'p-8 text-center text-[#526170] dark:text-[#bcc9c6]',
  'modal-backdrop': 'fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/70 p-5 max-sm:items-end max-sm:p-0',
  'modal-panel': 'flex max-h-[90vh] w-full max-w-[560px] flex-col rounded-lg border border-[#d3dce5] bg-white shadow-2xl dark:border-[#3d4947] dark:bg-[#171f33] max-sm:max-h-[94vh] max-sm:max-w-none max-sm:rounded-b-none',
  'modal-sm': 'max-w-[440px]',
  'modal-lg': 'max-w-[760px]',
  'modal-xl': 'max-w-[960px]',
  'modal-header': 'flex shrink-0 items-center justify-between gap-3 border-b border-[#d3dce5] p-3.5 dark:border-[#3d4947]',
  'modal-footer': 'flex shrink-0 justify-end gap-2 border-t border-[#d3dce5] p-3.5 dark:border-[#3d4947]',
  'modal-content': 'overflow-y-auto p-4',
  'detail-grid': 'grid grid-cols-2 gap-3 max-sm:grid-cols-1',
  'detail-item': 'min-w-0 rounded border border-[#d3dce5] bg-[#f1f5f9] px-3 py-2.5 dark:border-[#3d4947] dark:bg-[#131b2e]',
  'detail-label': 'mb-1 block text-[11px] text-[#526170] dark:text-[#bcc9c6]',
  'detail-value': 'font-medium break-words',
  'detail-section': 'mt-4',
  'prompt-block': 'max-h-80 overflow-auto whitespace-pre-wrap break-words rounded border border-[#d3dce5] bg-[#e9eef5] p-3 font-mono text-xs leading-relaxed dark:border-[#3d4947] dark:bg-[#060e20]',
  'prompt-editor': 'block min-h-[200px] w-full resize-y text-[#17212b] dark:text-[#dae2fd]',
  stacktrace: 'max-h-80 overflow-auto whitespace-pre rounded border border-[#d3dce5] bg-[#e9eef5] p-3 font-mono text-xs leading-relaxed dark:border-[#3d4947] dark:bg-[#060e20]',
  breakdown: 'w-full border-collapse',
  'toast-region': 'fixed bottom-4 right-4 z-[150] grid w-[min(420px,calc(100vw-32px))] gap-2',
  toast: 'flex items-center gap-2.5 rounded-md border border-[#d3dce5] border-l-[3px] border-l-[#087a51] bg-white p-3 shadow-xl dark:border-[#3d4947] dark:border-l-[#4edea3] dark:bg-[#171f33]',
  'toast-success': 'border-l-[#087a51] dark:border-l-[#4edea3]',
  'toast-error': 'border-l-[#b42332] dark:border-l-[#ffb4ab]',
  'toast-warning': 'border-l-[#965d00] dark:border-l-[#fbbf24]',
  'toast-undo': 'min-h-[30px] px-2 py-1 text-xs text-[#087f75] dark:text-[#6bd8cb]',
  'toast-dismiss': 'h-7 min-h-7 w-7 min-w-7 border-0',
  'chart-wrap': 'p-4',
  'chart-bars': 'grid h-[210px] grid-cols-7 items-end gap-2 border-b border-[#d3dce5] bg-[linear-gradient(to_bottom,transparent_0,transparent_51px,#d3dce5_52px)] dark:border-[#3d4947] dark:bg-[linear-gradient(to_bottom,transparent_0,transparent_51px,#3d4947_52px)]',
  'chart-day': 'flex h-full min-w-0 flex-col items-center justify-end gap-1.5',
  'chart-bar': 'min-h-[3px] w-9 max-w-[70%] rounded-t bg-[#06665f] dark:bg-[#29a195]',
  'chart-value': 'max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[10px] text-[#526170] dark:text-[#bcc9c6]',
  'chart-labels': 'grid grid-cols-7 gap-2 pt-2 text-center',
  'chart-summary': 'flex flex-wrap gap-6 pt-3.5 text-xs text-[#526170] dark:text-[#bcc9c6]'
};

function applyTailwindUtilities(root = document) {
  const elements = [];
  if (root.nodeType === 1 && root.hasAttribute('class')) elements.push(root);
  elements.push(...root.querySelectorAll('[class]'));
  elements.forEach(element => {
    [...element.classList].forEach(hook => {
      const utilities = TAILWIND_UTILITY_MAP[hook];
      if (utilities) element.classList.add(...utilities.split(/\s+/));
    });
    if (element.classList.contains('sidebar') && element.classList.contains('is-open')) element.classList.add('!translate-x-0');
    if (element.classList.contains('nav-link')) {
      const activeClasses = ['bg-[#e2e8f0]', 'font-semibold', 'text-[#087f75]', 'dark:bg-[#222a3d]', 'dark:text-[#6bd8cb]'];
      activeClasses.forEach(className => element.classList.toggle(className, element.getAttribute('aria-current') === 'page'));
    }
    if (element.classList.contains('metric-card') && element.classList.contains('is-danger')) {
      element.querySelector('.metric-value')?.classList.add('text-[#b42332]', 'dark:text-[#ffb4ab]');
    }
    if (element.classList.contains('action-menu-item') && element.classList.contains('is-danger')) element.classList.add('text-[#b42332]', 'dark:text-[#ffb4ab]');
    if (element.classList.contains('chart-day') && element.classList.contains('today')) element.querySelector('.chart-bar')?.classList.add('bg-[#087a51]', 'dark:bg-[#4edea3]');
    if (element.hasAttribute('data-expand-icon')) element.classList.add('inline-block', 'transition-transform', 'duration-150', 'motion-reduce:transition-none');
    if (element.matches('.sidebar-note strong')) element.classList.add('font-semibold', 'text-[#087a51]', 'dark:text-[#4edea3]');
    if (element.matches('.toast span')) element.classList.add('flex-1');
    if (element.matches('.data-table tbody tr:last-child td')) element.classList.add('border-b-0');
    if (element.matches('h1')) element.classList.add('mb-1', 'text-[26px]', 'font-semibold', 'leading-tight', 'max-sm:text-[23px]');
    if (element.matches('h2')) element.classList.add('text-lg', 'leading-snug');
    if (element.matches('h3')) element.classList.add('text-[15px]', 'leading-snug');
    if (element.matches('.data-table th')) element.classList.add('sticky', 'top-0', 'z-[1]', 'whitespace-nowrap', 'border-b', 'border-[#d3dce5]', 'bg-[#f1f5f9]', 'px-3', 'py-2.5', 'text-[11px]', 'font-semibold', 'uppercase', 'tracking-wide', 'text-[#526170]', 'dark:border-[#3d4947]', 'dark:bg-[#131b2e]', 'dark:text-[#bcc9c6]');
    if (element.matches('.data-table td')) element.classList.add('min-h-11', 'border-b', 'border-[#d3dce5]', 'px-3', 'py-2.5', 'align-middle', 'dark:border-[#3d4947]');
    if (element.matches('.data-table tbody tr')) element.classList.add('hover:bg-[#f8fafc]', 'dark:hover:bg-[#131b2e]');
    if (element.matches('.breakdown td')) element.classList.add('border-b', 'border-[#d3dce5]', 'py-2', 'dark:border-[#3d4947]');
    if (element.matches('.breakdown td:last-child')) element.classList.add('text-right', 'tabular-nums');
    if (element.matches('ul')) element.classList.add('list-disc', 'pl-5');
  });
}

function pageHeader(title, description, eyebrow = 'AgentHub / Consola') {
  return `<header class="page-heading">
    <div><div class="page-eyebrow">${escapeHTML(eyebrow)}</div><h1>${escapeHTML(title)}</h1><p class="page-description">${escapeHTML(description)}</p></div>
  </header>`;
}

function badge(label, kind = 'inactive') {
  return `<span class="badge badge-${escapeHTML(kind)}">${escapeHTML(label)}</span>`;
}

function emptyState(title, message) {
  return `<div class="empty-state"><strong>${escapeHTML(title)}</strong>${escapeHTML(message)}</div>`;
}

function renderShell() {
  const page = APP_PAGES[currentPage] || APP_PAGES.dashboard;
  document.title = `AgentHub | ${page.title}`;
  const navigation = Object.entries(APP_PAGES).map(([key, item]) => `
    <a class="nav-link" href="${item.href}" data-nav="${key}" ${key === currentPage ? 'aria-current="page"' : ''}>
      <span class="nav-icon" aria-hidden="true">${item.icon}</span><span>${item.title}</span>
    </a>`).join('');
  document.getElementById('app').innerHTML = `
    <div class="app-shell">
      <button class="nav-backdrop" id="nav-backdrop" type="button" aria-label="Cerrar navegación"></button>
      <aside class="sidebar" id="sidebar" aria-label="Navegación principal">
        <div class="brand-row"><a class="brand-name" href="index.html" data-nav="dashboard"><span class="brand-mark" aria-hidden="true">A</span> AgentHub</a><span class="brand-version">ADMIN</span></div>
        <nav class="sidebar-nav">${navigation}</nav>
        <div class="sidebar-note"><strong>Prototipo local</strong><br>Datos ficticios · Sin conexión externa</div>
      </aside>
      <div class="main-area">
        <header class="topbar">
          <div class="topbar-tools">
            <button class="icon-button mobile-menu-button" id="mobile-nav-toggle" type="button" aria-label="Abrir navegación" aria-expanded="false" aria-controls="sidebar">☰</button>
            <span class="topbar-context">AgentHub / ${page.title}</span>
          </div>
          <div class="topbar-tools">
            <button class="button button-small" id="theme-toggle" type="button" aria-pressed="false" aria-label="Activar modo oscuro"><span aria-hidden="true" id="theme-icon">◐</span><span id="theme-label">Modo oscuro</span></button>
          </div>
        </header>
        <main class="main-content" id="page-content" tabindex="-1"></main>
      </div>
    </div>`;
  applyTheme();
  bindNavigation();
  bindThemeToggle();
  bindMobileNavigation();
  setupExpandableSkills(document.getElementById('page-content'));
}

function applyTheme() {
  const button = document.getElementById('theme-toggle');
  const label = document.getElementById('theme-label');
  const icon = document.getElementById('theme-icon');
  const isDark = document.documentElement.classList.contains('dark');
  if (button) {
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  }
  if (label) label.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
  if (icon) icon.textContent = isDark ? '☼' : '◐';
}

function initializeTheme() {
  let preference = null;
  try { preference = localStorage.getItem('agenthub-theme'); } catch {}
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
  document.documentElement.classList.toggle('dark', preference ? preference === 'dark' : prefersDark);
}

function bindThemeToggle() {
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('agenthub-theme', isDark ? 'dark' : 'light'); } catch {}
    applyTheme();
  });
}

function bindMobileNavigation() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('mobile-nav-toggle');
  const backdrop = document.getElementById('nav-backdrop');
  const close = () => {
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir navegación');
  };
  toggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    backdrop.classList.toggle('is-visible', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar navegación' : 'Abrir navegación');
  });
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });
}

function saveNavigationState(targetHref) {
  try {
    sessionStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify({
      target: new URL(targetHref, window.location.href).pathname,
      snapshot: createStateSnapshot(),
      createdAt: Date.now()
    }));
  } catch {}
}

function consumeNavigationState() {
  try {
    const raw = sessionStorage.getItem(NAVIGATION_STATE_KEY);
    sessionStorage.removeItem(NAVIGATION_STATE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.target === window.location.pathname && Date.now() - saved.createdAt < 15000) restoreStateSnapshot(saved.snapshot);
  } catch {
    try { sessionStorage.removeItem(NAVIGATION_STATE_KEY); } catch {}
  }
}

function bindNavigation() {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-nav]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.dataset.nav !== currentPage) saveNavigationState(link.href);
  });
}

function renderDashboard(container) {
  const summary = getDashboardSummary();
  const monthLabel = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(new Date());
  const metrics = [
    { icon: '$', label: 'Ingresos del mes', value: money(summary.monthRevenue), note: `Pagos completados · ${monthLabel}` },
    { icon: '↓', label: 'Ingresos perdidos por descuentos', value: money(summary.monthDiscounts), note: 'Descuentos aplicados a pagos del mes' },
    { icon: '●', label: 'Agentes activos', value: String(summary.activeAgents), note: 'En todos los clientes' },
    { icon: '!', label: 'Agentes fallando', value: String(summary.failingAgents), note: 'Con errores críticos o errores abiertos', danger: true }
  ];
  const maximum = Math.max(...summary.weeklyActivity.map(day => day.amount), 1);
  const bars = summary.weeklyActivity.map(day => {
    const height = day.amount ? Math.max(5, (day.amount / maximum) * 100) : 2;
    return `<div class="chart-day ${getLocalDateKey(new Date()) === day.key ? 'today' : ''}" role="listitem" aria-label="${escapeHTML(day.fullLabel)}: ${money(day.amount)}, ${day.paymentCount} pagos">
      <span class="chart-value">${day.amount ? money(day.amount) : '—'}</span><div class="chart-bar" style="height:${height}%" aria-hidden="true"></div></div>`;
  }).join('');
  const labels = summary.weeklyActivity.map(day => `<span>${escapeHTML(day.label)}</span>`).join('');
  const recentPayments = getPaidPayments().sort((first, second) => new Date(second.paidAt) - new Date(first.paidAt)).slice(0, 4);
  const recentRows = recentPayments.map(payment => {
    const contract = getContractById(payment.contractId);
    const user = contract && getUserById(contract.clientUserId);
    const agent = contract && getAgentById(contract.agentId);
    return `<tr><td><span class="cell-title">${escapeHTML(user?.organization || 'Cliente eliminado')}</span><span class="cell-secondary">${escapeHTML(contract?.id || '')}</span></td><td>${escapeHTML(agent?.name || 'Agente eliminado')}</td><td>${formatDateTime(payment.paidAt)}</td><td class="numeric">${money(payment.amountPaid)}</td></tr>`;
  }).join('');

  container.innerHTML = `${pageHeader('Dashboard', 'Vista general de los ingresos y el estado de los agentes.', 'Resumen de plataforma')}
    <section class="metric-grid" aria-label="Métricas de plataforma">${metrics.map(metric => `<article class="metric-card ${metric.danger ? 'is-danger' : ''}"><div class="metric-head"><span class="metric-icon" aria-hidden="true">${metric.icon}</span><span class="metric-label">${metric.label}</span></div><div class="metric-value">${metric.value}</div><div class="metric-note">${metric.note}</div></article>`).join('')}</section>
    <section class="panel" aria-labelledby="activity-heading">
      <div class="panel-header"><div><h2 id="activity-heading">Actividad semanal</h2><span class="cell-secondary">Importe cobrado y número de pagos durante los últimos siete días</span></div><a class="button button-small secondary" href="contrataciones.html" data-nav="contrataciones">Ver contrataciones</a></div>
      <div class="chart-wrap"><div class="chart-bars" role="list" aria-label="Pagos por día durante los últimos siete días">${bars}</div><div class="chart-labels" aria-hidden="true">${labels}</div><div class="chart-summary"><span>Total semanal<strong>${money(summary.weeklyRevenue)}</strong></span><span>Pagos<strong>${summary.weeklyPaymentCount}</strong></span></div></div>
    </section>
    <section class="panel"><div class="panel-header"><h2>Pagos recientes</h2><a href="errores.html" data-nav="errores">Revisar log de errores</a></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Cliente / contrato</th><th>Agente</th><th>Fecha de pago</th><th class="numeric">Importe</th></tr></thead><tbody>${recentRows || `<tr><td colspan="4">${emptyState('Sin pagos recientes', 'Los pagos completados aparecerán aquí.')}</td></tr>`}</tbody></table></div>
    </section>`;
}

function renderUsers(container) {
  const users = getVisibleRecords('users').sort((first, second) => first.name.localeCompare(second.name, 'es'));
  const rows = users.map(user => {
    const ownedAgents = appState.agents.filter(agent => agent.ownerUserId === user.id && !agent.deletedAt).length;
    const contracts = appState.contracts.filter(contract => contract.clientUserId === user.id).length;
    return `<tr data-record-id="${escapeHTML(user.id)}">
      <td><span class="cell-title">${escapeHTML(user.name)}</span><span class="cell-secondary">${escapeHTML(user.role)}</span></td>
      <td><span class="cell-title">${escapeHTML(user.organization)}</span><span class="cell-secondary">${escapeHTML(user.email)}</span></td>
      <td>${escapeHTML(user.plan)}</td><td>${badge(({ active: 'Activo', invited: 'Invitado', suspended: 'Suspendido' })[user.status] || 'Desconocido', user.status)}</td>
      <td>${ownedAgents} agentes · ${contracts} contratos</td>
      <td class="actions-cell"><button class="icon-button action-trigger" type="button" aria-label="Acciones para ${escapeHTML(user.name)}" data-kind="user" data-id="${escapeHTML(user.id)}">⋮</button></td>
    </tr>`;
  }).join('');
  container.innerHTML = `${pageHeader('Usuarios', 'Consulta el registro de clientes y sus relaciones con agentes y contratos.', 'Gestión de usuarios')}
    <section class="panel"><div class="panel-header"><div><h2>Usuarios registrados</h2><span class="cell-secondary">${users.length} registros</span></div></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Nombre</th><th>Organización / email</th><th>Plan</th><th>Estado</th><th>Relaciones</th><th class="actions-cell">Acciones</th></tr></thead><tbody>${rows || `<tr><td colspan="6">${emptyState('No hay usuarios', 'No existen registros visibles en este momento.')}</td></tr>`}</tbody></table></div>
    </section>`;
  bindActionMenus(container);
}

function showUserDetails(userId) {
  const user = getUserById(userId);
  if (!user) return;
  const agents = appState.agents.filter(agent => agent.ownerUserId === user.id && !agent.deletedAt);
  const contracts = appState.contracts.filter(contract => contract.clientUserId === user.id);
  const contractRows = contracts.map(contract => `<li>${escapeHTML(contract.id)} · ${getContractStatusLabel(contract.status)} · ${money(contract.totalPaid)}</li>`).join('');
  const content = `<div class="detail-grid">
    ${detailField('ID', user.id)}${detailField('Nombre', user.name)}${detailField('Email', user.email)}${detailField('Organización', user.organization)}${detailField('Plan', user.plan)}${detailField('Estado', ({ active: 'Activo', invited: 'Invitado', suspended: 'Suspendido' })[user.status] || user.status)}${detailField('Fecha de alta', formatDate(user.createdAt))}${detailField('País', user.country)}${detailField('Rol', user.role)}
  </div><section class="detail-section"><h3>Agentes asociados (${agents.length})</h3>${agents.length ? `<ul>${agents.map(agent => `<li>${escapeHTML(agent.name)} · ${getAgentStatusLabel(getAgentStatus(agent.id))}</li>`).join('')}</ul>` : '<p>Sin agentes asociados.</p>'}</section>
  <section class="detail-section"><h3>Contrataciones (${contracts.length})</h3>${contractRows ? `<ul>${contractRows}</ul>` : '<p>Sin contrataciones registradas.</p>'}</section>`;
  createModal(`Detalle de usuario: ${user.name}`, content, { size: 'lg' });
}

function renderAgents(container) {
  const agents = getVisibleRecords('agents');
  const rows = agents.map(agent => {
    const owner = getUserById(agent.ownerUserId);
    const skills = agent.skillIds.map(getSkillById).filter(Boolean);
    const status = getAgentStatus(agent.id);
    return `<tr data-record-id="${escapeHTML(agent.id)}">
      <td><span class="cell-title">${escapeHTML(agent.name)}</span><span class="cell-secondary">${escapeHTML(agent.id)}</span></td>
      <td>${escapeHTML(owner && !owner.deletedAt ? owner.organization : 'Registro eliminado')}</td>
      <td>${badge(getAgentStatusLabel(status), status)}</td>
      <td><button class="skills-toggle" type="button" data-expand-skills aria-expanded="false" aria-controls="skills-${escapeHTML(agent.id)}"><span data-expand-label>Mostrar Skills</span> (${skills.length}) <span data-expand-icon aria-hidden="true">⌄</span></button><div class="skills-panel" id="skills-${escapeHTML(agent.id)}" hidden><div class="skill-list">${skills.map(skill => `<span class="skill-tag" title="${escapeHTML(skill.shortDescription)}">${escapeHTML(skill.name)}</span>`).join('') || '<span class="cell-secondary">Sin Skills</span>'}</div></div></td>
      <td class="actions-cell"><button class="icon-button action-trigger" type="button" aria-label="Acciones para ${escapeHTML(agent.name)}" data-kind="agent" data-id="${escapeHTML(agent.id)}">⋮</button></td>
    </tr>`;
  }).join('');
  container.innerHTML = `${pageHeader('Agentes', 'Supervisa estado, propietario y capacidades asignadas a cada agente.', 'Gestión de agentes')}
    <section class="panel"><div class="panel-header"><div><h2>Agentes registrados</h2><span class="cell-secondary">${agents.length} registros visibles · Estado operativo derivado de logs</span></div></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Agente</th><th>Propietario</th><th>Estado</th><th>Skills</th><th class="actions-cell">Acciones</th></tr></thead><tbody>${rows || `<tr><td colspan="5">${emptyState('No hay agentes', 'No existen agentes visibles en este momento.')}</td></tr>`}</tbody></table></div>
    </section>`;
  bindActionMenus(container);
}

function showAgentDetails(agentId) {
  const agent = getAgentById(agentId);
  if (!agent) return;
  const owner = getUserById(agent.ownerUserId);
  const skills = agent.skillIds.map(getSkillById).filter(Boolean);
  const promptId = `agent-prompt-${agent.id}`;
  const content = `<div class="detail-grid">${detailField('Agente', agent.name)}${detailField('Propietario', owner?.organization || 'Registro eliminado')}${detailField('Estado actual', getAgentStatusLabel(getAgentStatus(agent.id)))}${detailField('Creado', formatDate(agent.createdAt))}</div>
    <section class="detail-section"><label for="${promptId}"><h3>System prompt completo</h3></label><textarea class="prompt-block prompt-editor" id="${promptId}" aria-label="System prompt de ${escapeHTML(agent.name)}">${escapeHTML(agent.systemPrompt)}</textarea></section>
    <section class="detail-section"><h3>Skills asociadas</h3><div class="skill-list">${skills.map(skill => `<span class="skill-tag">${escapeHTML(skill.name)}</span>`).join('') || '<span>Sin Skills</span>'}</div></section>`;
  createModal(`Configurar agente: ${agent.name}`, content, {
    size: 'lg',
    actions: [{ label: 'Guardar cambios', variant: 'primary', onClick: () => {
      const prompt = document.getElementById(promptId)?.value;
      if (!prompt?.trim()) {
        showToast('El system prompt no puede quedar vacío.', 'error');
        return false;
      }
      agent.systemPrompt = prompt;
      showToast(`Prompt de ${agent.name} actualizado localmente.`, 'success');
      return true;
    } }]
  });
}

function renderSkills(container) {
  const skills = getVisibleRecords('skills').sort((first, second) => first.name.localeCompare(second.name, 'es'));
  const rows = skills.map(skill => `<tr data-record-id="${escapeHTML(skill.id)}">
    <td><span class="cell-title">${escapeHTML(skill.name)}</span><span class="cell-secondary">${escapeHTML(skill.category)} · v${escapeHTML(skill.version)}</span></td>
    <td>${escapeHTML(skill.shortDescription)}</td><td>${getSkillUsageCount(skill.id)} agentes</td><td class="numeric">${money(skill.listPrice)} / mes</td>
    <td class="actions-cell"><button class="icon-button action-trigger" type="button" aria-label="Acciones para ${escapeHTML(skill.name)}" data-kind="skill" data-id="${escapeHTML(skill.id)}">⋮</button></td>
  </tr>`).join('');
  container.innerHTML = `${pageHeader('Skills', 'Catálogo de capacidades modulares disponibles para los agentes.', 'Catálogo de Skills')}
    <section class="info-banner"><span aria-hidden="true">i</span><div><h2>¿Qué es una Skill?</h2><p>Una Skill es una capacidad modular que se puede incorporar a un agente para ampliar sus funcionalidades. Ejemplos: navegación web, análisis de documentos, gestión de calendarios y procesamiento de datos.</p></div></section>
    <section class="panel"><div class="panel-header"><div><h2>Catálogo disponible</h2><span class="cell-secondary">${skills.length} Skills · uso calculado sobre agentes no eliminados</span></div></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Skill</th><th>Descripción</th><th>Agentes que la usan</th><th class="numeric">Precio orientativo</th><th class="actions-cell">Acciones</th></tr></thead><tbody>${rows || `<tr><td colspan="5">${emptyState('No hay Skills disponibles', 'El catálogo no contiene registros visibles.')}</td></tr>`}</tbody></table></div>
    </section>`;
  bindActionMenus(container);
}

function showSkillDetails(skillId) {
  const skill = getSkillById(skillId);
  if (!skill) return;
  const agents = appState.agents.filter(agent => !agent.deletedAt && agent.skillIds.includes(skill.id));
  const content = `<div class="detail-grid">${detailField('ID', skill.id)}${detailField('Nombre', skill.name)}${detailField('Categoría', skill.category)}${detailField('Versión', skill.version)}${detailField('Precio de referencia', `${money(skill.listPrice)} / mes`)}${detailField('Agentes asociados', String(agents.length))}</div>
    <section class="detail-section"><h3>Descripción</h3><p>${escapeHTML(skill.description)}</p></section>
    <section class="detail-section"><h3>Requisitos y limitaciones</h3><p>${escapeHTML(skill.limitations || 'No especificados.')}</p></section>
    <section class="detail-section"><h3>Agentes asociados</h3>${agents.length ? `<ul>${agents.map(agent => `<li>${escapeHTML(agent.name)} · ${getAgentStatusLabel(getAgentStatus(agent.id))}</li>`).join('')}</ul>` : '<p>Sin agentes asociados.</p>'}</section>
    <p class="cell-secondary">El precio en los contratos existentes se conserva como snapshot y no cambia al archivar esta Skill.</p>`;
  createModal(`Detalle de Skill: ${skill.name}`, content, { size: 'lg' });
}

function renderContracts(container) {
  const contracts = [...appState.contracts].sort((first, second) => new Date(second.startDate) - new Date(first.startDate));
  const rows = contracts.map(contract => {
    const client = getUserById(contract.clientUserId);
    const agent = getAgentById(contract.agentId);
    const skillNames = contract.skillLines.map(line => line.nameSnapshot);
    return `<tr data-record-id="${escapeHTML(contract.id)}">
      <td><span class="cell-title">${escapeHTML(client?.organization || 'Cliente eliminado')}</span><span class="cell-secondary">${escapeHTML(contract.id)}</span></td>
      <td>${escapeHTML(agent?.name || 'Agente eliminado')}</td>
      <td>${skillNames.map(name => `<span class="skill-tag">${escapeHTML(name)}</span>`).join(' ') || 'Sin Skills'}</td>
      <td>${formatDate(contract.startDate)}<span class="cell-secondary">${formatDate(contract.endDate)}</span></td>
      <td>${badge(getContractStatusLabel(contract.status), contract.status === 'active' ? 'active' : 'completed')}</td>
      <td class="numeric">${money(contract.totalPaid, contract.currency)}</td>
      <td class="actions-cell"><button class="icon-button action-trigger" type="button" aria-label="Acciones para ${escapeHTML(contract.id)}" data-kind="contract" data-id="${escapeHTML(contract.id)}">⋮</button></td>
    </tr>`;
  }).join('');
  container.innerHTML = `${pageHeader('Contrataciones', 'Consulta vigencias, Skills contratadas y el cálculo de cada importe.', 'Contratos de alquiler')}
    <section class="panel"><div class="panel-header"><div><h2>Contratos</h2><span class="cell-secondary">${contracts.length} registros · activos e históricos</span></div></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Cliente</th><th>Agente</th><th>Skills contratadas</th><th>Inicio / fin</th><th>Estado</th><th class="numeric">Total pagado</th><th class="actions-cell">Acciones</th></tr></thead><tbody>${rows || `<tr><td colspan="7">${emptyState('No hay contratos', 'No existen contrataciones registradas.')}</td></tr>`}</tbody></table></div>
    </section>`;
  bindActionMenus(container);
}

function showContractDetails(contractId) {
  const contract = getContractById(contractId);
  const breakdown = getContractBreakdown(contractId);
  if (!contract || !breakdown) return;
  const client = getUserById(contract.clientUserId);
  const agent = getAgentById(contract.agentId);
  const owner = agent && getUserById(agent.ownerUserId);
  const duration = getContractDuration(contract);
  const skillRows = contract.skillLines.map(line => `<tr><td>${escapeHTML(line.nameSnapshot)}</td><td>${money(line.price, contract.currency)}</td></tr>`).join('');
  const content = `<div class="detail-grid">${detailField('Cliente', client?.organization || 'Registro eliminado')}${detailField('Contacto', client ? `${client.name} · ${client.email}` : 'No disponible')}${detailField('Agente', agent?.name || 'Registro eliminado')}${detailField('Propietario del agente', owner?.name || 'Registro eliminado')}${detailField('Estado', getContractStatusLabel(contract.status))}${detailField('Fecha de inicio', formatDate(contract.startDate))}${detailField('Fecha de finalización', formatDate(contract.endDate))}${detailField('Duración', duration ? `${duration} días naturales` : 'No calculable')}</div>
    <section class="detail-section"><h3>Skills contratadas y precios snapshot</h3><table class="breakdown"><tbody>${skillRows || '<tr><td>Sin Skills contratadas</td><td>$0.00</td></tr>'}</tbody></table></section>
    <section class="detail-section"><h3>Desglose económico</h3><table class="breakdown"><tbody>
      <tr><td>Tarifa base del agente</td><td>${money(breakdown.basePrice, contract.currency)}</td></tr>
      <tr><td>Skills</td><td>${money(breakdown.skillsTotal, contract.currency)}</td></tr>
      <tr><td>Subtotal</td><td>${money(breakdown.subtotal, contract.currency)}</td></tr>
      <tr><td>Descuento aplicado</td><td>−${money(breakdown.discountAmount, contract.currency)}</td></tr>
      <tr><td>Impuestos</td><td>${money(breakdown.taxAmount, contract.currency)}</td></tr>
      <tr><td>Total pagado (subtotal − descuento + impuestos)</td><td>${money(breakdown.calculatedTotal, contract.currency)}</td></tr>
    </tbody></table><p class="cell-secondary">${breakdown.isConsistent ? 'El total coincide con los pagos registrados.' : 'Advertencia: el fixture no coincide con su desglose.'}</p></section>`;
  createModal(`Detalle de contratación: ${contract.id}`, content, { size: 'lg' });
}

function renderErrors(container) {
  const logs = [...appState.errorLogs].sort((first, second) => new Date(second.occurredAt) - new Date(first.occurredAt));
  const visibleLogs = logs.filter(log =>
    (errorSeverityFilter === 'all' || log.severity === errorSeverityFilter) &&
    (errorResolutionFilter === 'all' || log.status === errorResolutionFilter)
  );
  const rows = visibleLogs.map(log => {
    const agent = getAgentById(log.agentId);
    const severityKind = ({ critical: 'critical', error: 'error', warning: 'warning', info: 'info' })[log.severity] || 'info';
    return `<tr data-record-id="${escapeHTML(log.id)}">
      <td>${formatDateTime(log.occurredAt)}</td><td>${escapeHTML(agent?.name || 'Agente eliminado')}</td><td>${escapeHTML(log.type)}</td><td>${escapeHTML(log.shortDescription)}</td>
      <td>${badge(getSeverityLabel(log.severity), severityKind)}</td><td>${badge(log.status === 'resolved' ? `Resuelto · ${formatDateTime(log.resolvedAt)}` : 'No resuelto', log.status === 'resolved' ? 'resolved' : 'failing')}</td>
      <td class="actions-cell"><button class="icon-button action-trigger" type="button" aria-label="Acciones para ${escapeHTML(log.id)}" data-kind="error" data-id="${escapeHTML(log.id)}">⋮</button></td>
    </tr>`;
  }).join('');
  container.innerHTML = `${pageHeader('Log de errores', 'Revisa errores ficticios y refleja su resolución en el estado del agente.', 'Supervisión de ejecución')}
    <div class="toolbar"><div class="toolbar-group"><label for="severity-filter">Gravedad</label><select class="filter-select" id="severity-filter"><option value="all">Todas</option><option value="critical">Crítico</option><option value="error">Error</option><option value="warning">Advertencia</option><option value="info">Información</option></select><label for="resolution-filter">Resolución</label><select class="filter-select" id="resolution-filter"><option value="all">Todos</option><option value="unresolved">No resueltos</option><option value="resolved">Resueltos</option></select></div><span class="cell-secondary">${visibleLogs.length} de ${logs.length} registros</span></div>
    <section class="table-wrap"><table class="data-table"><thead><tr><th>Fecha y hora</th><th>Agente</th><th>Tipo</th><th>Descripción</th><th>Gravedad</th><th>Resolución</th><th class="actions-cell">Acciones</th></tr></thead><tbody>${rows || `<tr><td colspan="7">${emptyState('Sin errores para mostrar', 'Prueba otro filtro o revisa los registros resueltos.')}</td></tr>`}</tbody></table></section>`;
  container.querySelector('#severity-filter').value = errorSeverityFilter;
  container.querySelector('#resolution-filter').value = errorResolutionFilter;
  container.querySelector('#severity-filter').addEventListener('change', event => { errorSeverityFilter = event.target.value; renderCurrentPage(); });
  container.querySelector('#resolution-filter').addEventListener('change', event => { errorResolutionFilter = event.target.value; renderCurrentPage(); });
  bindActionMenus(container);
}

function showErrorDetails(errorId) {
  const log = getErrorLogById(errorId);
  if (!log) return;
  const agent = getAgentById(log.agentId);
  const content = `<div class="detail-grid">${detailField('ID', log.id)}${detailField('Fecha y hora', formatDateTime(log.occurredAt))}${detailField('Agente', agent?.name || 'Registro eliminado')}${detailField('Tipo', log.type)}${detailField('Gravedad', getSeverityLabel(log.severity))}${detailField('Estado', log.status === 'resolved' ? `Resuelto · ${formatDateTime(log.resolvedAt)}` : 'No resuelto')}</div>
    <section class="detail-section"><h3>Descripción</h3><p>${escapeHTML(log.description)}</p><p class="cell-secondary">${escapeHTML(log.context)}</p></section>
    <section class="detail-section"><h3>Stack trace</h3><pre class="stacktrace">${escapeHTML(log.stackTrace || 'No hay stack trace disponible.')}</pre></section>`;
  const actions = log.status === 'unresolved' ? [{ label: 'Marcar como resuelto', variant: 'primary', onClick: async () => { resolveLog(log.id); return true; } }] : [];
  createModal(`Detalle del error: ${log.id}`, content, { size: 'lg', actions });
}

function detailField(label, value) {
  return `<div class="detail-item"><span class="detail-label">${escapeHTML(label)}</span><span class="detail-value">${escapeHTML(value || 'No disponible')}</span></div>`;
}

function bindActionMenus(container) {
  container.querySelectorAll('.action-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const { kind, id } = trigger.dataset;
      const options = getMenuOptions(kind, id);
      showDropdownMenu(trigger, options);
    });
  });
}

function getMenuOptions(kind, id) {
  if (kind === 'user') return [
    { label: 'Ver detalle', action: () => showUserDetails(id) },
    { divider: true },
    { label: 'Eliminar', danger: true, action: () => removeRecord('users', id, 'usuario') }
  ];
  if (kind === 'agent') return [
    { label: 'Configurar', action: () => showAgentDetails(id) },
    { divider: true },
    { label: 'Eliminar', danger: true, action: () => removeRecord('agents', id, 'agente') }
  ];
  if (kind === 'skill') return [
    { label: 'Ver detalle', action: () => showSkillDetails(id) },
    { divider: true },
    { label: 'Eliminar', danger: true, action: () => removeRecord('skills', id, 'Skill') }
  ];
  if (kind === 'contract') return [
    { label: 'Ver detalle', action: () => showContractDetails(id) }
  ];
  const log = getErrorLogById(id);
  return [
    { label: 'Ver detalle', action: () => showErrorDetails(id) },
    { divider: true },
    { label: log?.status === 'resolved' ? 'Ya resuelto' : 'Marcar como resuelto', disabled: log?.status === 'resolved', action: () => resolveLog(id) }
  ];
}

async function removeRecord(collectionName, id, entityLabel) {
  const record = (appState[collectionName] || []).find(item => item.id === id);
  if (!record) return;
  const displayName = record.name || record.id;
  let impact = 'Las relaciones y los registros históricos se conservarán.';
  if (collectionName === 'users') {
    const agents = appState.agents.filter(agent => agent.ownerUserId === id && !agent.deletedAt).length;
    const contracts = appState.contracts.filter(contract => contract.clientUserId === id).length;
    impact = `Se conservarán ${agents} agentes relacionados, ${contracts} contratos y los logs históricos.`;
  } else if (collectionName === 'agents') {
    const activeContracts = appState.contracts.filter(contract => contract.agentId === id && contract.status === 'active').length;
    impact = activeContracts ? `Tiene ${activeContracts} contrato(s) activo(s); el historial contractual y los logs se conservarán.` : 'Los contratos históricos y los logs relacionados se conservarán.';
  } else if (collectionName === 'skills') {
    impact = 'Los agentes y los precios snapshot de contratos no cambiarán.';
  }
  const confirmed = await showConfirmDialog(`Eliminar ${entityLabel}`, `¿Quieres eliminar ${displayName}? ${impact}`, `Eliminar ${entityLabel}`, 'Cancelar');
  if (!confirmed) return;
  const deleted = softDelete(collectionName, id);
  if (!deleted) return;
  renderCurrentPage();
  document.getElementById('page-content')?.focus();
  showToast(`${entityLabel} archivado localmente.`, 'success', 5000, () => {
    restoreRecord(collectionName, id);
    renderCurrentPage();
  });
}

function resolveLog(errorId) {
  const log = getErrorLogById(errorId);
  if (!log || !resolveErrorLog(errorId)) return;
  const agent = getAgentById(log.agentId);
  const status = getAgentStatus(log.agentId);
  renderCurrentPage();
  const updatedTrigger = [...document.querySelectorAll('.action-trigger')].find(button => button.dataset.kind === 'error' && button.dataset.id === errorId);
  (updatedTrigger || document.getElementById('page-content'))?.focus();
  showToast(`${log.id} marcado como resuelto. Estado del agente: ${getAgentStatusLabel(status)}.`, 'success');
}

function renderCurrentPage() {
  const container = document.getElementById('page-content');
  const renderers = {
    dashboard: renderDashboard,
    usuarios: renderUsers,
    agentes: renderAgents,
    skills: renderSkills,
    contrataciones: renderContracts,
    errores: renderErrors
  };
  (renderers[currentPage] || renderDashboard)(container);
  document.querySelectorAll('.nav-link[data-nav]').forEach(link => {
    if (link.dataset.nav === currentPage) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function initializeApp() {
  initializeTheme();
  currentPage = APP_PAGES[document.body.dataset.page] ? document.body.dataset.page : 'dashboard';
  consumeNavigationState();
  renderShell();
  renderCurrentPage();
}

document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
