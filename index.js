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
