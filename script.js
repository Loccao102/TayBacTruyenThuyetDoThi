const spreads=[...document.querySelectorAll(".spread")];
const currentEl=document.querySelector("#pageCurrent"),progress=document.querySelector("#navProgress"),book=document.querySelector("#book"),toast=document.querySelector("#toast");
let page=0,isTurning=false;
const pad=n=>String(n).padStart(2,"0");
function render(next,dir=1){if(isTurning||next===page||next<0||next>=spreads.length)return;isTurning=true;const old=spreads[page],target=spreads[next];old.classList.remove("active");if(dir<0)old.classList.add("turn-out");target.classList.remove("turn-out");target.classList.add("active");page=next;currentEl.textContent=pad(Math.min(page+1,5));progress.style.width=(page/(spreads.length-1)*100)+"%";setTimeout(()=>{old.classList.remove("turn-out");isTurning=false},900)}
const next=()=>render(Math.min(page+1,spreads.length-1),1),prev=()=>render(Math.max(page-1,0),-1);
document.querySelector("#nextPage").addEventListener("click",next);document.querySelector("#prevPage").addEventListener("click",prev);document.querySelector("#openBook").addEventListener("click",next);document.querySelector("#turnStory").addEventListener("click",next);
document.querySelector("#discoverButton").addEventListener("click",()=>toastMsg("Chọn một dấu chấm trên bản đồ để mở câu chuyện."));
document.querySelectorAll("[data-action='home']").forEach(b=>b.addEventListener("click",()=>render(0,-1)));
document.querySelectorAll("[data-action='restart']").forEach(b=>b.addEventListener("click",()=>render(0,-1)));
const panel=document.querySelector("#menuPanel");
document.querySelector("#menuButton").addEventListener("click",()=>panel.classList.add("open"));document.querySelector("#menuClose").addEventListener("click",()=>panel.classList.remove("open"));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>{const n=Number(b.dataset.go);render(n,page<n?1:-1);panel.classList.remove("open")}));
function toastMsg(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
document.querySelectorAll(".map-pin").forEach(pin=>{const tooltip=document.querySelector("#mapTooltip");pin.addEventListener("mouseenter",()=>{tooltip.textContent=pin.dataset.place;tooltip.style.left=pin.offsetLeft+14+"px";tooltip.style.top=pin.offsetTop+"px";tooltip.style.opacity=1});pin.addEventListener("mouseleave",()=>tooltip.style.opacity=0);pin.addEventListener("click",()=>toastMsg(pin.dataset.place+" · câu chuyện sẽ được mở ở phiên bản tiếp theo."))});
window.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();next()}if(e.key==="ArrowLeft"){e.preventDefault();prev()}if(e.key==="Escape")panel.classList.remove("open")});
book.addEventListener("pointermove",e=>{const r=book.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;document.querySelectorAll(".cover-photo,.story-photo img").forEach(el=>el.style.transform="scale(1.05) translate("+(-x*8)+"px,"+(-y*6)+"px)")});
book.addEventListener("pointerleave",()=>document.querySelectorAll(".cover-photo,.story-photo img").forEach(el=>el.style.transform="scale(1.04)"));
document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>document.querySelector(".page-loader").classList.add("loaded"),1450);progress.style.width="0%"});