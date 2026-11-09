const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.skill-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.skill-tab').forEach((item) => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.skill-panel').forEach((panel) => {
    const active = panel.id === tab.dataset.tab;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  });
}));

const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 500), { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const cursor = document.querySelector('.cursor-pixel');
window.addEventListener('pointermove', (event) => {
  cursor.style.transform = `translate(${event.clientX - 6}px, ${event.clientY - 6}px)`;
}, { passive: true });

let clicks = 0;
const character = document.querySelector('.pixel-character');
const toast = document.querySelector('.toast');
character.addEventListener('click', () => {
  clicks += 1;
  character.animate([{ transform: 'translateY(-12px) rotate(-2deg)' }, { transform: 'translateY(0) rotate(0)' }], { duration: 350 });
  if (clicks === 3) {
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2600);
    clicks = 0;
  }
});
