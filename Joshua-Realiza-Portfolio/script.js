"use strict";
const certificateData = [{"id": "dict-data-privacy", "title": "Introduction to Data Privacy (8 hours)", "issuer": "Department of Information and Communications Technology (DICT) · Digital Workforce Hub", "image": "dict-introduction-to-data-privacy-preview.jpg", "file": "dict-introduction-to-data-privacy.png"}, {"id": "agentic-ai", "title": "Agentic AI", "issuer": "Northeastern College · 10th IT Week", "image": "nc-agentic-ai.jpg", "file": "nc-agentic-ai.jpg"}, {"id": "programming-fundamentals", "title": "Programming Fundamentals", "issuer": "Northeastern College · 10th IT Week", "image": "nc-programming-fundamentals.jpg", "file": "nc-programming-fundamentals.jpg"}, {"id": "iot-capstone", "title": "Integrating IoT in Capstone Project", "issuer": "Northeastern College · 10th IT Week", "image": "nc-iot-capstone.jpg", "file": "nc-iot-capstone.jpg"}, {"id": "video-editing", "title": "Video Editing Tips & Tricks", "issuer": "Northeastern College · 10th IT Week", "image": "nc-video-editing.jpg", "file": "nc-video-editing.jpg"}, {"id": "modern-it", "title": "Modern IT Management and Development", "issuer": "Ethel Programming Computer Programming Services", "image": "ethel-it-management.jpg", "file": "ethel-it-management.jpg"}, {"id": "ai-productivity", "title": "AI & Digital Tools for Office Productivity", "issuer": "Adal Pilipinas / CYLC", "image": "adal-ai-digital-tools.jpg", "file": "adal-ai-digital-tools.jpg"}, {"id": "cisco-hardware", "title": "Computer Hardware Basics", "issuer": "Cisco Networking Academy", "image": "cisco-hardware-basics.png", "file": "cisco-hardware-basics.pdf"}, {"id": "cisco-packet", "title": "Getting Started with Cisco Packet Tracer", "issuer": "Cisco Networking Academy", "image": "cisco-packet-tracer.png", "file": "cisco-packet-tracer.pdf"}, {"id": "ms-first-code", "title": "Write Your First C# Code", "issuer": "Microsoft", "image": "ms-first-csharp-code.png", "file": "ms-first-csharp-code.png"}, {"id": "ms-variables", "title": "Store Data with Variables in C#", "issuer": "Microsoft", "image": "ms-csharp-variables.png", "file": "ms-csharp-variables.png"}, {"id": "ms-strings", "title": "Perform Basic String Formatting in C#", "issuer": "Microsoft", "image": "ms-csharp-strings.png", "file": "ms-csharp-strings.png"}, {"id": "ms-numbers", "title": "Perform Basic Operations on Numbers in C#", "issuer": "Microsoft", "image": "ms-csharp-numbers.png", "file": "ms-csharp-numbers.png"}, {"id": "ms-gpa", "title": "Guided Project: Calculate Final GPA", "issuer": "Microsoft", "image": "ms-final-gpa.png", "file": "ms-final-gpa.png"}, {"id": "ms-grades", "title": "Guided Project: Calculate & Print Student Grades", "issuer": "Microsoft", "image": "ms-student-grades.png", "file": "ms-student-grades.png"}];
const certCards = [...document.querySelectorAll('.cert-card')];
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const searchInput = document.getElementById('certSearch');
let currentFilter = 'all';
function updateCertificates() {
 const term = searchInput.value.toLocaleLowerCase().trim(); let visible=0;
 for (const card of certCards) {
  const matched = (currentFilter==='all'||card.dataset.category===currentFilter)&&card.dataset.title.includes(term);
  card.hidden=!matched; if(matched)visible++;
 }
 document.getElementById('noResults').style.display=visible?'none':'block';
}
filterButtons.forEach(button=>button.addEventListener('click',()=>{
 currentFilter=button.dataset.filter;
 filterButtons.forEach(other=>{const selected=other===button;other.classList.toggle('active',selected);other.setAttribute('aria-pressed',String(selected));});
 updateCertificates();
}));
searchInput.addEventListener('input',updateCertificates);
const modal=document.getElementById('certModal'),modalImage=document.getElementById('modalImage');
const modalClose=document.getElementById('closeModal');
let previousFocus=null;
function showCertificate(id){
 const cert=certificateData.find(item=>item.id===id);if(!cert)return;
 previousFocus=document.activeElement;
 document.getElementById('modalTitle').textContent=cert.title;
 document.getElementById('modalSubtitle').textContent=cert.issuer;
 modalImage.src='assets/certificates/'+cert.image;
 modalImage.alt=cert.title+' certificate';
 const file='assets/certificates/'+cert.file;
 document.getElementById('modalDownload').href=file;
 document.getElementById('modalOpen').href=file;
 modal.hidden=false;document.body.classList.add('modal-open');modalClose.focus();
}
function closeCertificate(){
 if(modal.hidden)return;
 modal.hidden=true;modalImage.removeAttribute('src');document.body.classList.remove('modal-open');
 if(previousFocus)previousFocus.focus();
}
document.querySelectorAll('.cert-view').forEach(button=>button.addEventListener('click',()=>showCertificate(button.dataset.id)));
modalClose.addEventListener('click',closeCertificate);
modal.addEventListener('click',e=>{if(e.target===modal)closeCertificate();});
document.addEventListener('keydown',e=>{
 if(modal.hidden)return;
 if(e.key==='Escape')closeCertificate();
 if(e.key==='Tab') {
  const focusables=[...modal.querySelectorAll('button,a[href]')]; const first=focusables[0],last=focusables[focusables.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
});
const menuToggle=document.getElementById('menuToggle'),nav=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}));
