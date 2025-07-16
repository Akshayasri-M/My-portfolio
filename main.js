// main.js
// Handles contact form submission, popup, mobile menu, skill bar animation, and smooth scrolling

// Contact form submit handler (Node.js backend)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showPopup('Hey there, Got your message will get back to you soon!');
        contactForm.reset();
      } else {
        showPopup('Failed to send message. Please try again.');
      }
    })
    .catch(() => showPopup('Failed to send message. Please try again.'));
  });
}
// Popup function
function showPopup(msg) {
  let popup = document.createElement('div');
  popup.textContent = msg;
  popup.style.position = 'fixed';
  popup.style.top = '30px';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.background = '#22c55e';
  popup.style.color = '#fff';
  popup.style.padding = '16px 32px';
  popup.style.borderRadius = '8px';
  popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  popup.style.zIndex = '9999';
  document.body.appendChild(popup);
  setTimeout(() => { popup.remove(); }, 2500);
}
// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
    });
  });
}
// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
function animateSkillBars() {
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}
// Intersection Observer for scroll animations
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }
      entry.target.classList.add('animate-fadeIn');
    }
  });
}, observerOptions);
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
