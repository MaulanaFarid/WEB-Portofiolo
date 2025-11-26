// Theme toggle
const toggle = document.getElementById('themeToggle');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

function setTheme(theme){
  if(theme === 'light') document.body.classList.add('light');
  else document.body.classList.remove('light');
  localStorage.setItem('theme', theme);
}

toggle.addEventListener('click', ()=>{
  const isLight = document.body.classList.contains('light');
  setTheme(isLight ? 'dark' : 'light');
  toggle.textContent = isLight ? '🌙' : '☀️';
});

// Initialize
const saved = localStorage.getItem('theme') || 'dark';
setTheme(saved);
if(saved === 'light') toggle.textContent = '☀️'; else toggle.textContent = '🌙';
