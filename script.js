
// Simple translation and analytics + chatbot + EmailJS skeleton
const translations = {
  en: { welcome: "Welcome to Change-Agent Educators", quickAccess: "Quick Access", connect: "Connect With Us", contactWhatsApp: "Message Us on WhatsApp" },
  fr: { welcome: "Bienvenue chez Change-Agent Educators", quickAccess: "Accès rapide", connect: "Connectez-vous avec nous", contactWhatsApp: "Envoyez-nous un message sur WhatsApp" },
  de: { welcome: "Willkommen bei Change-Agent Educators", quickAccess: "Schnellzugriff", connect: "Verbinden Sie sich mit uns", contactWhatsApp: "Senden Sie uns eine Nachricht auf WhatsApp" },
  ar: { welcome: "مرحبا بكم في Change-Agent Educators", quickAccess: "الوصول السريع", connect: "تواصل معنا", contactWhatsApp: "أرسل لنا رسالة على واتساب" }
};
function applyTranslations(lang){
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  const els = document.querySelectorAll('[data-i18n]');
  els.forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
  if(lang === 'ar') document.body.classList.add('rtl'); else document.body.classList.remove('rtl');
}
document.addEventListener('DOMContentLoaded', ()=>{
  const sel = document.getElementById('langSelect');
  if(sel){ sel.addEventListener('change', (e)=> applyTranslations(e.target.value)); }
  applyTranslations('en');
  // analytics
  try{
    const key = 'cae_visits';
    let total = parseInt(localStorage.getItem(key) || '0', 10); total += 1; localStorage.setItem(key, String(total));
    const page = location.pathname || 'index';
    const pagesKey = 'cae_pages';
    const pages = JSON.parse(localStorage.getItem(pagesKey) || '{}');
    pages[page] = (pages[page]||0) + 1;
    localStorage.setItem(pagesKey, JSON.stringify(pages));
    const ua = navigator.userAgent; const device = /Mobi|Android/i.test(ua) ? 'mobile' : 'desktop'; localStorage.setItem('cae_last_device', device);
  }catch(e){ console.warn('analytics error', e) }
});
// chatbot
function sendMessage(){
  let input = document.getElementById('chat-input').value.trim();
  let log = document.getElementById('chat-log');
  if(!input) return;
  log.innerHTML += "<br><strong>You:</strong> " + input;
  let reply = "Thank you for your message. Change-Agent Educators will respond soon.";
  const msg = input.toLowerCase();
  if(msg.includes('hello')||msg.includes('hi')) reply = "Hello! How can we assist you today?";
  if(msg.includes('mission')) reply = "Our mission is to empower individuals and communities through education, leadership, and social transformation.";
  if(msg.includes('contact')) reply = "You can reach us via Email: adamfusheini53@gmail.com or WhatsApp: 0535892605";
  log.innerHTML += "<br><strong>Bot:</strong> " + reply;
  log.scrollTop = log.scrollHeight;
  document.getElementById('chat-input').value = '';
}
// EmailJS skeleton for contact form
document.addEventListener('submit', function(e){
  if(e.target && e.target.id === 'contactForm'){ e.preventDefault();
    document.getElementById('formStatus').textContent = 'Sending...';
    const name = document.getElementById('name').value; const email = document.getElementById('email').value; const message = document.getElementById('message').value;
    const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'; const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID'; const USER_ID = 'YOUR_EMAILJS_PUBLIC_KEY';
    fetch('https://api.emailjs.com/api/v1.0/email/send', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ service_id: SERVICE_ID, template_id: TEMPLATE_ID, user_id: USER_ID, template_params: { from_name:name, from_email:email, message:message } }) })
    .then(res=>{ document.getElementById('formStatus').textContent = 'Message sent — thank you!'; e.target.reset(); })
    .catch(err=>{ document.getElementById('formStatus').textContent = 'Error sending message. Try again later.'; console.error(err); });
  }
}, true);
