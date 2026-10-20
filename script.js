// Current Language State Engine
let currentLang = 'km';

// DOM Elements
const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const calcSalary = document.getElementById('calc-salary');
const calcCount = document.getElementById('calc-count');
const calcTier = document.getElementById('calc-tier');
const calcTotal = document.getElementById('calc-total');

// Modal Elements
const modal = document.getElementById('service-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalServiceName = document.getElementById('modal-service-name');
const serviceInquiryForm = document.getElementById('service-inquiry-form');

// Language Switcher Function
langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'km' ? 'en' : 'km';
    langText.textContent = currentLang === 'km' ? 'English' : 'ភាសាខ្មែរ';
    
    updateStaticTranslations();
});

function updateStaticTranslations() {
    document.querySelectorAll('[data-km]').forEach(elem => {
        const text = elem.getAttribute(`data-${currentLang}`);
        if (text) {
            elem.innerHTML = text;
        }
    });
}

// Interactive Recruitment Fee Estimator Logic
function calculateFee() {
    const salary = parseFloat(calcSalary.value) || 0;
    const count = parseInt(calcCount.value, 10) || 1;
    const tier = calcTier.value;

    const rate = tier === 'executive' ? 0.80 : 0.50;
    const total = salary * rate * count;

    calcTotal.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

calcSalary.addEventListener('input', calculateFee);
calcCount.addEventListener('input', calculateFee);
calcTier.addEventListener('change', calculateFee);

// Modal Functions
window.openServiceModal = function(serviceTitle) {
    modalServiceName.textContent = `${serviceTitle} - ${currentLang === 'km' ? 'សាកសួរព័ត៌មាន' : 'Service Inquiry'}`;
    modal.style.display = 'flex';
};

closeModalBtn.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

serviceInquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'km' ? 'សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ! យើងខ្ញុំនឹងទាក់ទងទៅវិញក្នុងពេលឆាប់ៗ' : 'Your inquiry has been submitted! Our team will reach out shortly.');
    modal.style.display = 'none';
    serviceInquiryForm.reset();
});

// Initial Setup
updateStaticTranslations();
calculateFee();
