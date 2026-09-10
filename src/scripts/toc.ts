let controller: AbortController | undefined;
let frame = 0;

function cleanup() {
  controller?.abort();
  window.cancelAnimationFrame(frame);
  frame = 0;
}

function setup() {
  cleanup();
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.toc a')];
  if (!links.length) return;
  controller = new AbortController();
  const headings = links
    .map((link) =>
      document.getElementById(decodeURIComponent(link.hash.slice(1))),
    )
    .filter((element): element is HTMLElement => element !== null);
  const update = () => {
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 140) current = heading;
    }
    links.forEach((link) => {
      if (decodeURIComponent(link.hash.slice(1)) === current?.id)
        link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    frame = 0;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    },
    { passive: true, signal: controller.signal },
  );
  update();
}

document.addEventListener('astro:before-swap', cleanup);
document.addEventListener('astro:page-load', setup);
setup();
