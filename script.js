// Year
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLightbox(); });

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.job, section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Video autoplay on viewport (optimized)
const videoStates = new WeakMap();

function getVideoState(video) {
  if (!videoStates.has(video)) {
    videoStates.set(video, { isPlaying: false, lastTime: 0 });
  }
  return videoStates.get(video);
}

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    const state = getVideoState(video);

    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      if (!state.isPlaying && video.paused) {
        state.isPlaying = true;
        video.play().catch(() => { state.isPlaying = false; });
      }
    } else {
      if (state.isPlaying && !video.paused) {
        state.lastTime = video.currentTime;
        video.pause();
        state.isPlaying = false;
      }
    }
  });
}, { threshold: [0, 0.5, 1], rootMargin: '0px' });

document.querySelectorAll('video').forEach(video => {
  video.muted = true;
  video.playsInline = true;
  video.preload = 'metadata';
  videoObserver.observe(video);
});
