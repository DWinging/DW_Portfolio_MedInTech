(() => {
  const links = Array.from(document.querySelectorAll('.side-navigation__link'));
  const sections = links
    .map((link) => {
      const id = link.getAttribute('data-section');
      const section = id ? document.getElementById(id) : null;
      return section ? { id, link, section } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('data-section') === id);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target.id);
  }, {
    root: null,
    rootMargin: '-20% 0px -55% 0px',
    threshold: [0.08, 0.18, 0.32, 0.5],
  });

  sections.forEach(({ section }) => observer.observe(section));

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('data-section');
      if (id) setActive(id);
    });
  });
})();
