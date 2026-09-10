import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';

// Retain the header node while refreshing route-dependent links and labels.
document.addEventListener('astro:before-swap', (event) => {
  const { newDocument } = event as TransitionBeforeSwapEvent;
  const current = document.querySelector('.site-header');
  const next = newDocument.querySelector('.site-header');
  if (!current || !next) return;
  const currentItems = current.querySelectorAll('a, button, nav');
  const nextItems = next.querySelectorAll('a, button, nav');
  currentItems.forEach((item, index) => {
    const incoming = nextItems[index];
    if (!incoming) return;
    for (const attribute of [
      'href',
      'aria-label',
      'aria-current',
      'title',
      'lang',
    ]) {
      const value = incoming.getAttribute(attribute);
      if (value === null) item.removeAttribute(attribute);
      else item.setAttribute(attribute, value);
    }
    if (item.classList.contains('language-switcher')) {
      item.textContent = incoming.textContent;
    }
  });
});
