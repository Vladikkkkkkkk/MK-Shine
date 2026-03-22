const translations = {
    en: {
        hero_title: "Carpet & Upholstery<br>Cleaning Experts",
        hero_subtitle: "Deep Steam Cleaning",
        benefit_1: "Pet Stain & Odor Removal",
        benefit_2: "Safe for Kids & Pets",
        benefit_3: "Deep Carpet Cleaning",
        cta_btn: "Call for a Free Quote!",
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
        cookie_decline: "Decline"
    },
    fr: {
        hero_title: "Experts en nettoyage<br>de tapis et meubles",
        hero_subtitle: "Nettoyage à la vapeur en profondeur",
        benefit_1: "Élimination des taches et odeurs d'animaux",
        benefit_2: "Sécuritaire pour enfants et animaux",
        benefit_3: "Nettoyage en profondeur des tapis",
        cta_btn: "Appelez pour un devis gratuit!",
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
        cookie_decline: "Refuser"
    }
};

const btnEn = document.getElementById('btn-en');
const btnFr = document.getElementById('btn-fr');
const allTextElements = document.querySelectorAll('[data-lang]');

function changeLanguage(lang) {
    allTextElements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
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

const sliders = document.querySelectorAll('.comparison-slider');

sliders.forEach(slider => {
    const input = slider.querySelector('.slider-input');
    const beforeImage = slider.querySelector('.before-image');
    const button = slider.querySelector('.slider-button');

    beforeImage.style.width = '50%';
    button.style.left = '50%';

    input.addEventListener('input', (e) => {
        const sliderValue = e.target.value; 
        beforeImage.style.width = `${sliderValue}%`;
        
        button.style.left = `${sliderValue}%`;
    });
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