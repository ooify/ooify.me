import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';

let progressTimer: number | undefined;
let navigationId = 0;

function stopProgress() {
  window.clearTimeout(progressTimer);
  progressTimer = undefined;
  delete document.documentElement.dataset.navigationLoading;
}

document.addEventListener('astro:before-preparation', (event) => {
  stopProgress();
  const id = ++navigationId;
  const stopCurrentProgress = () => {
    if (id === navigationId) stopProgress();
  };
  if (event.signal.aborted) return;
  event.signal.addEventListener('abort', stopCurrentProgress, { once: true });
  progressTimer = window.setTimeout(() => {
    document.documentElement.dataset.navigationLoading = 'true';
  }, 120);
  // Clear feedback if fetching fails, as well as on a successful swap.
  const loader = event.loader;
  event.loader = async () => {
    try {
      await loader();
    } catch (error) {
      stopCurrentProgress();
      throw error;
    }
  };
});
document.addEventListener('astro:after-swap', stopProgress);
document.addEventListener('astro:page-load', stopProgress);
window.addEventListener('pagehide', stopProgress);

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
