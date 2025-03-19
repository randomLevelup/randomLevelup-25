// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Cursor glow effect for section borders
document.addEventListener('mousemove', (e) => {
  const sections = document.querySelectorAll('.section');
  const cursor = { x: e.clientX, y: e.clientY };

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const distanceToBox = getDistanceToBorder(cursor, rect);
    
    if (distanceToBox < 100) {
      const intensity = 1 - (distanceToBox / 100);
      const yellow = `rgba(255, 215, 0, ${intensity})`;
      section.style.borderColor = yellow;
    } else {
      section.style.borderColor = 'rgba(184, 134, 11, 0.2)';
    }
  });
});

function getDistanceToBorder(point, rect) {
  const dx = Math.max(rect.left - point.x, 0, point.x - rect.right);
  const dy = Math.max(rect.top - point.y, 0, point.y - rect.bottom);
  return Math.sqrt(dx * dx + dy * dy);
}

// Gallery auto-scroll functionality
document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('.gallery-container');
  const SCROLL_SPEED = 60; // pixels per second
  
  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-image');
    let totalWidth = 0;
    
    images.forEach(img => {
      totalWidth += img.width;
    });
    
    let position = 0;
    let cloneScheduled = false;
    let lastTimestamp = 0;
    
    function animateGallery(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      
      // Calculate time elapsed since last frame in seconds
      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      
      const images = gallery.querySelectorAll('.gallery-image');
      let totalWidth = 0;
      images.forEach(img => {
          totalWidth += img.width;
      });

      // Move based on elapsed time and pixels per second
      position -= SCROLL_SPEED * deltaTime;
      
      if (-position > totalWidth / 2 && !cloneScheduled) {
        cloneScheduled = true;
        requestAnimationFrame(() => {
          for (let i = 0; i < images.length; i++) {
            const clone = images[i].cloneNode(true);
            gallery.appendChild(clone);
          }
          cloneScheduled = false;
        });
      }
      
      gallery.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animateGallery);
    }
    
    requestAnimationFrame(animateGallery);
  });
});
