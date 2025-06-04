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

const galleryImages = Array.from(document.querySelectorAll('.gallery-container img'));
let currentIndex = 0;

// Open lightbox on image click
galleryImages.forEach((img, idx) => {
  img.addEventListener('click', function () {
    currentIndex = idx;
    showLightboxImage();
    document.getElementById('lightbox').style.display = 'flex';
  });
});

function showLightboxImage() {
  const img = galleryImages[currentIndex];
  const lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;

  // Show/hide arrows
  const prevArrow = document.getElementById('lightboxPrev');
  const nextArrow = document.getElementById('lightboxNext');
  if (prevArrow) prevArrow.style.display = currentIndex === 0 ? 'none' : 'block';
  if (nextArrow) nextArrow.style.display = currentIndex === galleryImages.length - 1 ? 'none' : 'block';
}

// Arrow navigation
document.getElementById('lightboxPrev').onclick = function (e) {
  e.stopPropagation();
  if (currentIndex > 0) {
    currentIndex--;
    showLightboxImage();
  }
};
document.getElementById('lightboxNext').onclick = function (e) {
  e.stopPropagation();
  if (currentIndex < galleryImages.length - 1) {
    currentIndex++;
    showLightboxImage();
  }
};

// Close lightbox
document.getElementById('lightboxClose').onclick = function () {
  document.getElementById('lightbox').style.display = 'none';
  document.getElementById('lightboxImg').src = '';
};
document.getElementById('lightbox').onclick = function (e) {
  if (e.target === this) {
    this.style.display = 'none';
    document.getElementById('lightboxImg').src = '';
  }
};

// Swipe support for mobile
let startX = 0;
let endX = 0;
const lightboxImg = document.getElementById('lightboxImg');
lightboxImg.addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX;
});
lightboxImg.addEventListener('touchmove', function (e) {
  endX = e.touches[0].clientX;
});
lightboxImg.addEventListener('touchend', function () {
  if (startX - endX > 50 && currentIndex < galleryImages.length - 1) {
    // Swipe left, next image
    currentIndex++;
    showLightboxImage();
  } else if (endX - startX > 50 && currentIndex > 0) {
    // Swipe right, previous image
    currentIndex--;
    showLightboxImage();
  }
  startX = endX = 0;
});