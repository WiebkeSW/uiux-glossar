// Portierte Event-Delegation aus dem ursprünglichen vanilla app.js — steuert die
// klickbaren Mini-Demos (Drawer, Modal, Tabs per data-action-Attribute etc.).
// Wird einmalig auf document registriert, damit die Demo-HTML-Strings (per
// dangerouslySetInnerHTML gerendert) ohne React-Wrapper pro Demo funktionieren.
export function installDemoInteractions() {
  const onClick = (e) => {
    const toggleBtn = e.target.closest('[data-action="toggle"]');
    if (toggleBtn) {
      const card = toggleBtn.closest('.term-card, .flash-card');
      const target = card && card.querySelector(toggleBtn.dataset.target);
      if (target) target.classList.toggle('open');
      return;
    }
    const navBtn = e.target.closest('[data-action="select-nav"], [data-action="select-chip"]');
    if (navBtn) {
      e.preventDefault();
      const parent = navBtn.parentElement;
      parent.querySelectorAll('.active').forEach((el) => el.classList.remove('active'));
      navBtn.classList.add('active');
      return;
    }
    const rmChip = e.target.closest('[data-action="remove-chip"]');
    if (rmChip) { rmChip.closest('.chip-mini')?.remove(); return; }

    const dismissBtn = e.target.closest('[data-action="dismiss"]');
    if (dismissBtn) { dismissBtn.closest('.cookie-banner').style.display = 'none'; return; }

    const stepBtn = e.target.closest('[data-action="inc"], [data-action="dec"]');
    if (stepBtn) {
      const val = stepBtn.parentElement.querySelector('.stepper-val');
      let n = parseInt(val.textContent, 10);
      n = stepBtn.dataset.action === 'inc' ? n + 1 : Math.max(0, n - 1);
      val.textContent = n;
      return;
    }
    const toastBtn = e.target.closest('[data-action="show-toast"]');
    if (toastBtn) {
      const toast = toastBtn.parentElement.querySelector('.mini-toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1600);
      return;
    }
    const snackBtn = e.target.closest('[data-action="show-snackbar"]');
    if (snackBtn) {
      const snack = snackBtn.parentElement.querySelector('.mini-snackbar');
      snack.classList.add('show');
      setTimeout(() => snack.classList.remove('show'), 1800);
      return;
    }
    const bpBtn = e.target.closest('[data-action="bp-set"]');
    if (bpBtn) {
      const gridEl = bpBtn.closest('.demo-stage').querySelector('.bp-grid');
      gridEl.classList.remove('desktop-mode', 'mobile-mode');
      gridEl.classList.add(bpBtn.dataset.mode + '-mode');
      return;
    }
    const rippleBtn = e.target.closest('[data-action="ripple"]');
    if (rippleBtn) {
      const r = document.createElement('span');
      r.className = 'ripple-fx';
      const rect = rippleBtn.getBoundingClientRect();
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top = (e.clientY - rect.top) + 'px';
      rippleBtn.appendChild(r);
      setTimeout(() => r.remove(), 500);
      return;
    }
    const ieWrap = e.target.closest('[data-action="inline-edit"]');
    if (ieWrap && e.target.tagName !== 'INPUT') {
      const span = ieWrap.querySelector('.ie-display');
      if (!span) return;
      const inp = document.createElement('input');
      inp.className = 'mini-input inline-input';
      inp.value = span.textContent;
      ieWrap.replaceChild(inp, span);
      inp.focus(); inp.select();
      inp.addEventListener('blur', function () {
        const s = document.createElement('span');
        s.className = 'ie-display';
        s.textContent = inp.value || 'Ohne Titel';
        if (inp.parentElement) inp.parentElement.replaceChild(s, inp);
      }, { once: true });
      inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') inp.blur(); });
    }
  };

  const onFocusout = (e) => {
    if (e.target.matches && e.target.matches('[data-action="validate"]')) {
      const err = e.target.parentElement.querySelector('.mini-error');
      if (!err) return;
      const v = e.target.value.trim();
      err.style.display = (v !== '' && !v.includes('@')) ? 'block' : 'none';
    }
  };

  let dragEl = null;
  const onDragstart = (e) => {
    if (e.target.classList && e.target.classList.contains('drag-item')) { dragEl = e.target; e.target.classList.add('dragging'); }
  };
  const onDragend = (e) => {
    if (e.target.classList && e.target.classList.contains('drag-item')) { e.target.classList.remove('dragging'); dragEl = null; }
  };
  const onDragover = (e) => {
    e.preventDefault();
    const item = e.target.closest && e.target.closest('.drag-item');
    if (item && dragEl && item !== dragEl) {
      const list = item.parentElement;
      const items = [...list.children];
      if (items.indexOf(dragEl) < items.indexOf(item)) list.insertBefore(dragEl, item.nextSibling);
      else list.insertBefore(dragEl, item);
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('focusout', onFocusout);
  document.addEventListener('dragstart', onDragstart);
  document.addEventListener('dragend', onDragend);
  document.addEventListener('dragover', onDragover);

  return () => {
    document.removeEventListener('click', onClick);
    document.removeEventListener('focusout', onFocusout);
    document.removeEventListener('dragstart', onDragstart);
    document.removeEventListener('dragend', onDragend);
    document.removeEventListener('dragover', onDragover);
  };
}
