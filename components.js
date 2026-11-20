let activeDropdown = null;
let toastTimer = null;
const expandableContainers = new WeakSet();

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function createModal(title, content, options = {}) {
  const previousFocus = document.activeElement;
  const modalId = `dialog-${Math.random().toString(36).slice(2, 10)}`;
  const headingId = `${modalId}-title`;
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop';
  overlay.setAttribute('data-modal-backdrop', '');
  overlay.innerHTML = `
    <section class="modal-panel modal-${escapeHTML(options.size || 'md')}" role="dialog" aria-modal="true" aria-labelledby="${headingId}" id="${modalId}">
      <header class="modal-header">
        <h2 id="${headingId}">${escapeHTML(title)}</h2>
        <button class="icon-button" type="button" data-modal-close aria-label="Cerrar diálogo" title="Cerrar">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="modal-content">${content}</div>
      ${options.actions?.length ? `<footer class="modal-footer">${options.actions.map((action, index) => `<button type="button" class="button ${escapeHTML(action.variant || 'secondary')}" data-modal-action="${index}" ${action.disabled ? 'disabled' : ''}>${escapeHTML(action.label)}</button>`).join('')}</footer>` : ''}
    </section>`;
  document.body.append(overlay);
  document.body.classList.add('has-modal');

  const panel = overlay.querySelector('[role="dialog"]');
  const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let isClosed = false;

  const close = () => {
    if (isClosed) return;
    isClosed = true;
    document.removeEventListener('keydown', onKeydown);
    overlay.removeEventListener('click', onBackdropClick);
    overlay.remove();
    if (!document.querySelector('[data-modal-backdrop]')) document.body.classList.remove('has-modal');
    if (previousFocus?.isConnected) previousFocus.focus();
    options.onClose?.();
  };

  const onBackdropClick = event => {
    if (event.target === overlay) close();
  };

  const onKeydown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll(focusableSelector)];
    if (!focusable.length) {
      event.preventDefault();
      panel.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  overlay.querySelector('[data-modal-close]').addEventListener('click', close);
  overlay.addEventListener('click', onBackdropClick);
  overlay.querySelectorAll('[data-modal-action]').forEach(button => {
    const action = options.actions[Number(button.dataset.modalAction)];
    button.addEventListener('click', async () => {
      button.disabled = true;
      try {
        const shouldClose = await action.onClick?.();
        if (shouldClose !== false) close();
      } finally {
        if (!isClosed) button.disabled = false;
      }
    });
  });
  document.addEventListener('keydown', onKeydown);
  requestAnimationFrame(() => {
    const initialFocus = panel.querySelector('[data-modal-initial-focus]') || panel.querySelector('[autofocus]') || panel.querySelector('button:not([disabled])') || panel;
    if (initialFocus === panel) panel.tabIndex = -1;
    initialFocus.focus();
  });
  return { overlay, panel, close };
}

function showConfirmDialog(title, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', options = {}) {
  return new Promise(resolve => {
    let settled = false;
    const settle = result => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    const modal = createModal(title, `<p>${escapeHTML(message)}</p>`, {
      size: 'sm',
      onClose: () => settle(false),
      actions: [
        { label: cancelLabel, variant: 'secondary', onClick: () => { settle(false); return true; } },
        { label: confirmLabel, variant: 'danger', onClick: async () => { await options.onConfirm?.(); settle(true); return true; } }
      ]
    });
    modal.panel.querySelector('[data-modal-action="0"]').setAttribute('data-modal-initial-focus', '');
  });
}

function ensureToastRegion() {
  let region = document.getElementById('toast-region');
  if (!region) {
    region = document.createElement('div');
    region.id = 'toast-region';
    region.className = 'toast-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    document.body.append(region);
  }
  return region;
}

function showToast(message, type = 'success', duration = 5000, undoAction = null) {
  const region = ensureToastRegion();
  if (toastTimer) clearTimeout(toastTimer);
  region.replaceChildren();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const text = document.createElement('span');
  text.textContent = message;
  toast.append(text);
  if (undoAction) {
    const undo = document.createElement('button');
    undo.className = 'button toast-undo';
    undo.type = 'button';
    undo.textContent = 'Deshacer';
    undo.addEventListener('click', () => {
      clearTimeout(toastTimer);
      undoAction();
      region.replaceChildren();
    }, { once: true });
    toast.append(undo);
  }
  const dismiss = document.createElement('button');
  dismiss.className = 'icon-button toast-dismiss';
  dismiss.type = 'button';
  dismiss.setAttribute('aria-label', 'Cerrar notificación');
  dismiss.textContent = '×';
  dismiss.addEventListener('click', () => {
    clearTimeout(toastTimer);
    region.replaceChildren();
  }, { once: true });
  toast.append(dismiss);
  region.append(toast);
  toastTimer = setTimeout(() => region.replaceChildren(), duration);
}

function closeDropdown(restoreFocus = false) {
  if (!activeDropdown) return;
  const { menu, trigger, onKeydown } = activeDropdown;
  document.removeEventListener('pointerdown', activeDropdown.onOutsidePointer);
  document.removeEventListener('keydown', onKeydown);
  menu.remove();
  trigger.setAttribute('aria-expanded', 'false');
  activeDropdown = null;
  if (restoreFocus && trigger.isConnected) trigger.focus();
}

function showDropdownMenu(trigger, options) {
  if (activeDropdown?.trigger === trigger) {
    closeDropdown();
    return;
  }
  closeDropdown();
  const menu = document.createElement('div');
  menu.className = 'action-menu';
  menu.setAttribute('role', 'menu');
  menu.id = `menu-${Math.random().toString(36).slice(2, 10)}`;
  const triggerId = trigger.id || `menu-trigger-${Math.random().toString(36).slice(2, 10)}`;
  trigger.id = triggerId;
  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.setAttribute('aria-controls', menu.id);
  trigger.setAttribute('aria-expanded', 'true');
  options.forEach(option => {
    if (option.divider) {
      const divider = document.createElement('hr');
      divider.className = 'action-menu-divider';
      menu.append(divider);
      return;
    }
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `action-menu-item${option.danger ? ' is-danger' : ''}`;
    item.setAttribute('role', 'menuitem');
    item.textContent = option.label;
    item.disabled = Boolean(option.disabled);
    item.addEventListener('click', async () => {
      closeDropdown(true);
      await option.action?.();
    });
    menu.append(item);
  });
  document.body.append(menu);
  const rect = trigger.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const left = Math.max(8, Math.min(rect.right - menuRect.width, window.innerWidth - menuRect.width - 8));
  const top = rect.bottom + menuRect.height + 8 > window.innerHeight ? Math.max(8, rect.top - menuRect.height - 4) : rect.bottom + 4;
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  const onOutsidePointer = event => {
    if (!menu.contains(event.target) && !trigger.contains(event.target)) closeDropdown();
  };
  const onKeydown = event => {
    const items = [...menu.querySelectorAll('[role="menuitem"]:not(:disabled)')];
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDropdown(true);
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const currentIndex = items.indexOf(document.activeElement);
      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (currentIndex + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length;
      items[nextIndex]?.focus();
    }
  };
  activeDropdown = { menu, trigger, onKeydown, onOutsidePointer };
  document.addEventListener('pointerdown', onOutsidePointer);
  document.addEventListener('keydown', onKeydown);
  menu.querySelector('[role="menuitem"]:not(:disabled)')?.focus();
}

function setupExpandableSkills(container = document) {
  if (expandableContainers.has(container)) return;
  expandableContainers.add(container);
  container.addEventListener('click', event => {
    const button = event.target.closest('[data-expand-skills]');
    if (!button || !container.contains(button)) return;
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      panel.classList.remove('is-open');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        panel.hidden = true;
      } else {
        setTimeout(() => {
          if (button.getAttribute('aria-expanded') === 'false') panel.hidden = true;
        }, 180);
      }
    } else {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('is-open'));
    }
    button.querySelector('[data-expand-label]')?.replaceChildren(document.createTextNode(expanded ? 'Mostrar Skills' : 'Ocultar Skills'));
    button.querySelector('[data-expand-icon]')?.classList.toggle('is-rotated', !expanded);
  });
}
