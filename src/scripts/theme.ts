type Mode = 'light' | 'dark';

function readPreference(): Mode {
  try {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  } catch {
    return document.documentElement.dataset.themePreference === 'dark'
      ? 'dark'
      : 'light';
  }
}

let mode: Mode = readPreference();
let transitionTimer: number | undefined;

function apply(next: Mode) {
  mode = next;
  const root = document.documentElement;
  root.dataset.themePreference = next;
  root.classList.toggle('dark', next === 'dark');
  const english = root.lang === 'en';
  const label =
    next === 'dark'
      ? english
        ? 'Switch to light theme'
        : '切换到浅色模式'
      : english
        ? 'Switch to dark theme'
        : '切换到深色模式';
  const button = document.querySelector<HTMLButtonElement>('#theme-switcher');
  button?.setAttribute('aria-label', label);
  button?.setAttribute('title', label);
}

function endTransition() {
  window.clearTimeout(transitionTimer);
  document.documentElement.classList.remove('theme-changing');
}

// Delegate once to the document: Astro replaces page elements during navigation.
document.addEventListener('click', (event) => {
  if (
    !(event.target instanceof Element) ||
    !event.target.closest('#theme-switcher')
  )
    return;
  endTransition();
  const root = document.documentElement;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('theme-changing');
    // Resolve the starting colors before changing the palette.
    void root.offsetWidth;
    transitionTimer = window.setTimeout(endTransition, 380);
  }
  apply(mode === 'dark' ? 'light' : 'dark');
  try {
    localStorage.setItem('theme', mode);
  } catch {
    /* 本次浏览仍保留选择。 */
  }
  const announcement = document.querySelector('#theme-announcement');
  if (announcement)
    announcement.textContent =
      root.lang === 'en'
        ? `${mode === 'dark' ? 'Dark' : 'Light'} theme enabled`
        : `已切换为${mode === 'dark' ? '深色' : '浅色'}模式`;
});

// Apply the palette to the incoming document before the router paints it.
document.addEventListener('astro:before-swap', (event) => {
  endTransition();
  event.newDocument.documentElement.dataset.themePreference = mode;
  event.newDocument.documentElement.classList.toggle('dark', mode === 'dark');
});
document.addEventListener('astro:after-swap', () => apply(mode));
document.addEventListener('astro:page-load', () => apply(mode));
window.addEventListener('storage', (event) => {
  if (event.key === 'theme' || event.key === null) apply(readPreference());
});
apply(mode);
