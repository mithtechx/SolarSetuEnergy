const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
window.addEventListener('load',()=>{setTimeout(()=>$('.loader')?.classList.add('hide'),450)});
const navbar=$('#navbar');const onScroll=()=>{navbar?.classList.toggle('scrolled',window.scrollY>30)};window.addEventListener('scroll',onScroll);onScroll();
const menuToggle=$('#menuToggle'),navLinks=$('#navLinks');menuToggle?.addEventListener('click',()=>navLinks.classList.toggle('open'));$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks?.classList.remove('open')));
const io=new IntersectionObserver((entries)=>{entries.forEach((e)=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})},{threshold:.14,rootMargin:'0px 0px -40px 0px'});$$('.reveal').forEach(el=>io.observe(el));
function openWhatsApp(data){const msg=`Name: ${data.name||''}\nPhone: ${data.phone||''}\nCity: ${data.city||''}\nBill Amount: ${data.bill||''}\nMessage: ${data.message||''}`;window.open(`https://wa.me/919922016004?text=${encodeURIComponent(msg)}`,'_blank')}
$('#quoteForm')?.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget);openWhatsApp(Object.fromEntries(fd.entries()))});
$('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const d=Object.fromEntries(fd.entries());openWhatsApp({name:d.name,phone:d.phone,city:'Contact Form',bill:'Not provided',message:d.message})});
document.addEventListener('mousemove',e=>{const x=e.clientX/window.innerWidth-.5,y=e.clientY/window.innerHeight-.5;$$('.float-card,.sun').forEach((el,i)=>{el.style.transform=`translate(${x*(8+i*2)}px,${y*(8+i*2)}px)`})});
