const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function closeMenu() {
  navToggle?.setAttribute('aria-expanded', 'false');
  navMenu?.classList.remove('open');
}

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navMenu?.classList.toggle('open', !isOpen);
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) closeMenu();
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const reviewCards = [...document.querySelectorAll('.review-card')];
let activeReview = 0;

function showReview(index) {
  if (!reviewCards.length) return;
  activeReview = (index + reviewCards.length) % reviewCards.length;
  reviewCards.forEach((card, cardIndex) => {
    card.classList.toggle('active', cardIndex === activeReview);
  });
}

document.querySelector('.review-prev')?.addEventListener('click', () => showReview(activeReview - 1));
document.querySelector('.review-next')?.addEventListener('click', () => showReview(activeReview + 1));

const bookingForm = document.querySelector('#booking-form');
const formStatus = document.querySelector('#form-status');

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const values = Object.fromEntries(formData.entries());
  const whatsappNumber = '919930096422';

  const message = [
    'Hello Shraddha, I would like to enquire about makeup services.',
    '',
    `Name: ${values.name || ''}`,
    `Phone: ${values.phone || ''}`,
    `Event: ${values.event || ''}`,
    `Date: ${values.date || ''}`,
    `Location: ${values.location || ''}`,
    `Preferred look: ${values.message || 'Not specified'}`
  ].join('\n');

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  if (formStatus) {
    formStatus.textContent = 'Opening WhatsApp with your enquiry…';
  }

  const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  if (!newWindow) {
    window.location.href = whatsappUrl;
  }
});

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
