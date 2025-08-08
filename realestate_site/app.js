(function(){
  'use strict';
  const qs = (s,sc)=> (sc||document).querySelector(s);
  const y = qs('#year'); if(y) y.textContent = new Date().getFullYear();
  const BASE_IDX_RESULTS_URL = 'https://your-idx-vendor.example/results';
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
})();