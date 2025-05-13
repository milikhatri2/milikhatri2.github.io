// Smooth scroll for in-page links (if you add any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Mobile nav toggle (if you wire up .nav-toggle)
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  
// // Smooth parallax for hero background
// const hero = document.querySelector('.hero');
// let latestScroll = 0;
// let ticking = false;

// window.addEventListener('scroll', () => {
//   latestScroll = window.pageYOffset;
//   if (!ticking) {
//     window.requestAnimationFrame(() => {
//       // half speed = subtle effect
//       hero.style.backgroundPositionY = `${latestScroll * 0.1}px`;
//       ticking = false;
//     });
//     ticking = true;
//   }
// });
