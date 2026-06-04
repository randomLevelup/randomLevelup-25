// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Gallery auto-scroll functionality
document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('.gallery-container');
  if (!galleries.length) return;

  const SCROLL_SPEED = 60; // pixels per second

  const galleryStates = Array.from(galleries).map(gallery => {
    const images = Array.from(gallery.querySelectorAll('.gallery-image'));

    // Clone only the original image set one time for seamless wrapping.
    images.forEach(img => {
      gallery.appendChild(img.cloneNode(true));
    });

    const state = {
      gallery,
      images,
      baseWidth: 0,
      position: 0,
      visible: false,
    };

    state.recalculateWidth = () => {
      state.baseWidth = state.images.reduce((sum, img) => sum + img.getBoundingClientRect().width, 0);
    };

    state.recalculateWidth();
    state.images.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', state.recalculateWidth, { once: true });
      }
    });

    return state;
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const state = galleryStates.find(item => item.gallery === entry.target);
        if (state) {
          state.visible = entry.isIntersecting;
        }
      });
    },
    { threshold: 0.1 }
  );

  galleryStates.forEach(state => observer.observe(state.gallery));

  window.addEventListener('resize', () => {
    galleryStates.forEach(state => state.recalculateWidth());
  });

  let lastTimestamp = 0;

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;

    if (!document.hidden) {
      galleryStates.forEach(state => {
        if (!state.visible || state.baseWidth <= 0) return;

        state.position -= SCROLL_SPEED * deltaTime;
        if (-state.position >= state.baseWidth) {
          state.position += state.baseWidth;
        }

        state.gallery.style.transform = `translateX(${state.position}px)`;
      });
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
