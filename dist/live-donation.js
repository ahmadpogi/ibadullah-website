const translations = {
  en: {
    notice:'Secure checkout · Amounts are charged in Philippine pesos (PHP). International cards may be used where supported by PayMongo.',
    name:'Your full name', email:'Email for your receipt', anonymous:'Keep my name private in public reports',
    consent:'I have read the privacy and donation policies.', submit:'Continue to secure checkout',
    unavailable:'Checkout could not start. Please try again later.', processing:'Opening secure checkout…',
    aside:'Your payment will be completed on PayMongo’s hosted checkout. A donation is confirmed only after its payment status is verified.',
    currency:'One-time donation · PHP', privacy:'Privacy', donations:'Donations'
  },
  ar: {
    notice:'دفع آمن · تُخصم المبالغ بالبيزو الفلبيني. قد تُقبل البطاقات الدولية وفقاً لخدمة PayMongo.',
    name:'الاسم الكامل', email:'البريد الإلكتروني للإيصال', anonymous:'إخفاء اسمي في التقارير العامة',
    consent:'قرأت سياسة الخصوصية وسياسة التبرع.', submit:'المتابعة إلى صفحة الدفع الآمن',
    unavailable:'تعذر بدء الدفع. يرجى المحاولة لاحقاً.', processing:'جارٍ فتح صفحة الدفع الآمن…',
    aside:'سيُستكمل الدفع على صفحة PayMongo الآمنة. يُؤكد التبرع بعد التحقق من حالة الدفع.',
    currency:'تبرع لمرة واحدة · PHP', privacy:'الخصوصية', donations:'التبرعات'
  }
};
const selected = new URLSearchParams(location.search).get('project');
let active = false;
async function mount() {
  if (!active || document.body.dataset.page !== 'donate') return;
  const card = document.querySelector('.donation-card');
  if (!card || card.querySelector('#live-donation')) return;
  const language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const c = translations[language];
  const existing = document.querySelector('#project');
  const options = existing.innerHTML;
  card.innerHTML = `<div class="donation-alert"><span class="alert-dot"></span>${c.notice}</div>
    <form id="live-donation">
      <div class="form-field"><label for="project">${existing.previousElementSibling.textContent}</label><select id="project" name="project">${options}</select></div>
      <div class="form-field"><label for="amount">${language==='ar'?'مبلغ التبرع':'Donation amount'}</label><div class="amount-control"><span>₱</span><input id="amount" name="amount" type="number" min="100" max="1000000" step="0.01" value="1000" inputmode="decimal" required></div><small>${c.currency}</small></div>
      <div class="form-field"><label for="donor-name">${c.name}</label><input id="donor-name" name="name" autocomplete="name" minlength="2" maxlength="100" required></div>
      <div class="form-field"><label for="donor-email">${c.email}</label><input id="donor-email" name="email" type="email" autocomplete="email" required></div>
      <label class="check-option"><input name="anonymous" type="checkbox"> ${c.anonymous}</label>
      <label class="check-option"><input name="acceptedPolicies" type="checkbox" required> ${c.consent} <a href="/privacy.html" target="_blank">${c.privacy}</a> · <a href="/donation-policy.html" target="_blank">${c.donations}</a></label>
      <p id="checkout-error" class="form-error" role="alert" hidden></p>
      <button class="button button-dark button-full" type="submit">${c.submit}</button>
    </form>`;
  document.querySelector('#project').value = selected && [...document.querySelector('#project').options].some(o => o.value === selected) ? selected : document.querySelector('#project').value;
  document.querySelector('#project').addEventListener('change', () => window.dispatchEvent(new Event('ibadullah:donation-project-ready')));
  window.dispatchEvent(new Event('ibadullah:donation-project-ready'));
  document.querySelector('.donation-aside p').textContent = c.aside;
  document.querySelector('.footer-bottom span:last-child').textContent = language === 'ar' ? 'تُؤكد التبرعات بعد التحقق من الدفع.' : 'Donations are confirmed after payment verification.';
  const form = document.querySelector('#live-donation');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button[type=submit]'), error = form.querySelector('#checkout-error');
    button.disabled = true; button.textContent = c.processing; error.hidden = true;
    const values = new FormData(form);
    try {
      const response = await fetch('/api/checkout', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ projectId:values.get('project'), amount:values.get('amount'), name:values.get('name'),
          email:values.get('email'), anonymous:values.has('anonymous'), acceptedPolicies:values.has('acceptedPolicies') })
      });
      const result = await response.json();
      if (!response.ok || !/^https:\/\//.test(result.checkoutUrl || '')) throw new Error(result.error || c.unavailable);
      location.assign(result.checkoutUrl);
    } catch (failure) {
      error.textContent = failure.message || c.unavailable;
      error.hidden = false; button.disabled = false; button.textContent = c.submit;
    }
  });
}
fetch('/api/config').then(response => response.json()).then(config => {
  active = config.donationsEnabled === true;
  if (!active) return;
  mount();
  const app = document.querySelector('#app');
  new MutationObserver(() => { if (!document.querySelector('#live-donation')) mount(); }).observe(app, { childList:true });
}).catch(() => {});
