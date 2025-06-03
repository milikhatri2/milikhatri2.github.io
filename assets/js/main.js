// Smooth scroll for in-page links (if you add any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    // if it’s no longer a hash, bail and let the browser navigate
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));
});

// Lightbox functionality for gallery images
document.querySelectorAll('.gallery-container img').forEach(img => {
  img.addEventListener('click', function () {
    document.getElementById('lightboxImg').src = this.src;
    document.getElementById('lightbox').style.display = 'flex';
  });
});
document.getElementById('lightboxClose').onclick = function () {
  document.getElementById('lightbox').style.display = 'none';
  document.getElementById('lightboxImg').src = '';
};
// Close lightbox when clicking outside the image
document.getElementById('lightbox').onclick = function (e) {
  if (e.target === this) {
    this.style.display = 'none';
    document.getElementById('lightboxImg').src = '';
  }
};