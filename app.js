(function(){
  'use strict';
  const qs = (s,sc)=> (sc||document).querySelector(s);
  const qsa = (s,sc)=> Array.from((sc||document).querySelectorAll(s));

  const y = qs('#year'); if(y) y.textContent = new Date().getFullYear();

  const filterBtn = qs('.filters');
  const filterPanel = qs('#filterPanel');
  if(filterBtn && filterPanel){
    filterBtn.addEventListener('click', ()=>{
      const open = filterPanel.hasAttribute('hidden') ? false : true;
      if(open){ filterPanel.setAttribute('hidden',''); filterBtn.setAttribute('aria-expanded','false'); }
      else { filterPanel.removeAttribute('hidden'); filterBtn.setAttribute('aria-expanded','true'); }
    });
  }

  const BASE_IDX_RESULTS_URL = 'https://your-idx-vendor.example/results'; // replace when ready
  const form = qs('#quickSearch');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const q = (data.get('q')||'').toString().trim();
      const min = (data.get('min')||'').toString().trim();
      const max = (data.get('max')||'').toString().trim();
      const safe = (s)=> s.replace(/[^\w\s,#\-]/g,'').slice(0,80);
      const params = new URLSearchParams();
      if(q) params.set('q', safe(q));
      if(min && !isNaN(+min)) params.set('min', String(Math.max(0, +min)));
      if(max && !isNaN(+max)) params.set('max', String(Math.max(0, +max)));
      const url = BASE_IDX_RESULTS_URL + (params.toString()? ('?' + params.toString()) : '');
      window.location.assign(url);
    });
  }

  qsa('[data-search]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      const term = (el.getAttribute('data-search')||'').trim();
      if(!term) return;
      const params = new URLSearchParams({ q: term });
      window.location.assign('https://your-idx-vendor.example/saved-search?' + params.toString());
    }, {passive:false});
  });

  const contact = qs('#contactForm');
  const msg = qs('#contactMsg');
  if(contact){
    contact.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(contact);
      const name = (data.get('name')||'').toString().trim();
      const email = (data.get('email')||'').toString().trim();
      const message = (data.get('message')||'').toString().trim();
      if(!name || !email || !message){
        if(msg) msg.textContent = 'Please complete the required fields.';
        return;
      }
      contact.reset();
      if(msg) msg.textContent = 'Thanks! We will follow up shortly.';
    });
  }
})();