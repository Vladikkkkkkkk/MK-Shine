const translations = {
    en: {
        hero_title: "Carpet & Upholstery<br>Cleaning Experts",
        hero_subtitle: "Deep Steam Cleaning",
        benefit_1: "Pet Stain & Odor Removal",
        benefit_2: "Safe for Kids & Pets",
        benefit_3: "Deep Carpet Cleaning",
        cta_btn: "Book now for a Free Quote!",
        discount: "OFF",
        gallery_title: "Our Work",
        label_before: "BEFORE",
        label_after: "AFTER",
        scan_text: "Move the slider to see our work!",
        contacts_title: "Contact Us",
        location: "Edmonton",
        guarantee: "100% Satisfaction Guaranteed",
        follow_us: "Follow Us",
        rights: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookie_text: "We use cookies to ensure you get the best experience on our website.",
        cookie_accept: "Accept",
        cookie_decline: "Decline",
        modal_title: "Not enough time? Get a free quote today!",
    ph_name: "John Doe",
    ph_email: "Enter your email",
    ph_phone: "Enter your Phone",
    service_carpet: "Carpet Cleaning",
    service_upholstery: "Upholstery Cleaning",
    service_both: "Both",
    ph_message: "When would you like us to contact you?",
    modal_btn: "Get a Free Quote",
    swipe_text: "Swipe to see more!",
    service_carpet: "Carpet Cleaning",
    service_pet: "Pet Urine & Odor Removal",
    service_stain: "Stain Removal Protection",
    service_tile: "Tile & Grout Cleaning",
    service_rug: "Rug Cleaning",
    service_upholstery: "Upholstery Cleaning",
    service_commercial: "Commercial Cleaning",
    service_other: "Other",
    success_title: "Thank You!",
    success_text: "Your request has been successfully sent. We will contact you shortly."
    },
    fr: {
        hero_title: "Experts en nettoyage<br>de tapis et meubles",
        hero_subtitle: "Nettoyage à la vapeur en profondeur",
        benefit_1: "Élimination des taches et odeurs d'animaux",
        benefit_2: "Sécuritaire pour enfants et animaux",
        benefit_3: "Nettoyage en profondeur des tapis",
        cta_btn: "Réservez maintenant pour un devis gratuit!",
        discount: "RABAIS",
        gallery_title: "Notre Travail",
        label_before: "AVANT",
        label_after: "APRÈS",
        scan_text: "Faites glisser le curseur pour voir notre travail!",
        contacts_title: "Contactez-nous",
        location: "Edmonton",
        guarantee: "Satisfaction garantie à 100%",
        follow_us: "Suivez-nous",
        rights: "Tous droits réservés.",
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
        cookie_text: "Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site.",
        cookie_accept: "Accepter",
        cookie_decline: "Refuser",
        modal_title: "Pas assez de temps ? Obtenez un devis gratuit aujourd'hui !",
    ph_name: "Jean Dupont",
    ph_email: "Entrez votre e-mail",
    ph_phone: "Entrez votre téléphone",
    service_carpet: "Nettoyage de tapis",
    service_upholstery: "Nettoyage de meubles",
    service_both: "Les deux",
    ph_message: "Quand souhaitez-vous que nous vous contactions ?",
    modal_btn: "Obtenir un devis gratuit",
    swipe_text: "Faites glisser pour en voir plus !",
    service_carpet: "Nettoyage de tapis",
    service_pet: "Élimination des odeurs et urine d'animaux",
    service_stain: "Protection contre les taches",
    service_tile: "Nettoyage de carrelage et joints",
    service_rug: "Nettoyage de carpettes",
    service_upholstery: "Nettoyage de meubles",
    service_commercial: "Nettoyage commercial",
    service_other: "Autre",
    success_title: "Merci !",
    success_text: "Votre demande a été envoyée avec succès. Nous vous contacterons sous peu."
    }
};

const btnEn = document.getElementById('btn-en');
const btnFr = document.getElementById('btn-fr');
const allTextElements = document.querySelectorAll('[data-lang]');

function changeLanguage(lang) {
    allTextElements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    if (lang === 'en') {
        btnEn.classList.add('active');
        btnFr.classList.remove('active');
    } else {
        btnFr.classList.add('active');
        btnEn.classList.remove('active');
    }
}

btnEn.addEventListener('click', () => changeLanguage('en'));
btnFr.addEventListener('click', () => changeLanguage('fr'));

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-indicator');
    targetDot.classList.add('current-indicator');
}

const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-indicator');
    const nextDot = currentDot.nextElementSibling;

    if (!nextSlide) return; 

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
});

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-indicator');
    const prevDot = currentDot.previousElementSibling;

    if (!prevSlide) return; 

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
});

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-indicator');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});

const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');
const declineBtn = document.getElementById('decline-cookies');

 if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 1000);
 }

function handleCookieAction(choice) {
    localStorage.setItem('cookieConsent', choice);
    cookieBanner.classList.remove('show');
}

acceptBtn.addEventListener('click', () => handleCookieAction('accepted'));
declineBtn.addEventListener('click', () => handleCookieAction('declined'));

const modal = document.getElementById('quote-modal');
const openModalBtns = document.querySelectorAll('.open-modal-btn'); 
const closeModalBtn = document.getElementById('close-modal');
const quoteForm = document.getElementById('quote-form');

const formContent = document.getElementById('form-content');
const successContent = document.getElementById('success-content');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        formContent.style.display = 'block';
        successContent.style.display = 'none';
        modal.classList.add('active');
    });
});

closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

const customSelect = document.querySelector('.custom-select');
const selectTrigger = document.querySelector('.custom-select-trigger');
const customOptions = document.querySelectorAll('.custom-option');
const hiddenInput = document.getElementById('service');

selectTrigger.addEventListener('click', () => {
    customSelect.classList.toggle('open');
});

customOptions.forEach(option => {
    option.addEventListener('click', function() {
        selectTrigger.textContent = this.textContent;
        hiddenInput.value = this.getAttribute('data-value');
        
        customOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        
        customSelect.classList.remove('open');
    });
});

window.addEventListener('click', function(e) {
    if (!customSelect.contains(e.target)) {
        customSelect.classList.remove('open');
    }
});

function validateForm() {
    let isValid = true;
    const isEn = btnEn.classList.contains('active');

    document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
    document.querySelectorAll('.quote-form input').forEach(el => el.classList.remove('invalid'));

    const name = document.getElementById('name');
    if (name.value.trim().length < 2) {
        name.classList.add('invalid');
        document.getElementById('name-error').innerText = isEn ? "Please enter your name" : "Veuillez entrer votre nom";
        isValid = false;
    }

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('invalid');
        document.getElementById('email-error').innerText = isEn ? "Please enter a valid email" : "Veuillez entrer un e-mail valide";
        isValid = false;
    }

    const phone = document.getElementById('phone');
    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        phone.classList.add('invalid');
        document.getElementById('phone-error').innerText = isEn ? "Please enter a valid phone number" : "Veuillez entrer un téléphone valide";
        isValid = false;
    }

    return isValid;
}

const TELEGRAM_BOT_TOKEN = '8644876129:AAGF9r2ccj-AFGPRGsw7GM_t1kNvj9OXBO0';
const TELEGRAM_CHAT_ID = '-5072209230';



quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    if (!validateForm()) return;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const messageText = document.getElementById('message').value;

    const text = `
🔥 <b>New Lead from MK Shine!</b>

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}
📞 <b>Phone:</b> ${phone}
🧽 <b>Service:</b> ${service}
💬 <b>Message:</b> ${messageText ? messageText : 'No message provided'}
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const submitBtn = quoteForm.querySelector('.modal-submit');
    const originalBtnText = submitBtn.innerText;
    
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            formContent.style.display = 'none';
            successContent.style.display = 'block';
            quoteForm.reset(); 
            
            setTimeout(() => {
                modal.classList.remove('active');
            }, 4000);
        } else {
            alert("Oops! Something went wrong.");
        }
    } catch (error) {
        alert("Network error. Please try again.");
    } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    }
});