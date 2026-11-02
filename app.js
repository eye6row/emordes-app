(function(){
var N=[11,22,14,26,12,24,21,15,23,10,25,16,9,13,27,28,36,38,39,183].map(function(n){return String(n).padStart(3,"0")});
var grid=document.getElementById("grid");
N.forEach(function(n,i){var b=document.createElement("button");b.setAttribute("aria-label","Open photo "+(i+1));var im=new Image();im.loading="lazy";im.alt="Sirko at FAHM FEST, photo "+(i+1)+". Captured by Jewels.";im.src="img/t/"+n+".webp";im.onload=function(){im.classList.add("ld")};b.appendChild(im);b.onclick=function(){open(i)};grid.appendChild(b)});
var lb=document.getElementById("lb"),lbi=document.getElementById("lbi"),lbc=document.getElementById("lbc"),cur=0;
function show(){lbi.src="img/f/"+N[cur]+".webp";lbi.alt="Sirko at FAHM FEST, photo "+(cur+1);lbc.textContent="Sirko / "+(cur+1)+" of "+N.length+" / Captured by Jewels"}
function open(i){cur=i;show();lb.hidden=false}
function step(d){cur=(cur+d+N.length)%N.length;show()}
document.getElementById("lbx").onclick=function(){lb.hidden=true};
document.getElementById("lbp").onclick=function(){step(-1)};
document.getElementById("lbnx").onclick=function(){step(1)};
var sx=0;lb.addEventListener("touchstart",function(e){sx=e.touches[0].clientX},{passive:true});
lb.addEventListener("touchend",function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)step(d<0?1:-1)});
document.addEventListener("keydown",function(e){if(lb.hidden)return;if(e.key==="Escape")lb.hidden=true;if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1)});
function go(id){if(!document.getElementById(id))id="home";document.querySelectorAll(".view").forEach(function(v){v.classList.toggle("active",v.id===id)});document.querySelectorAll(".tabs button").forEach(function(b){b.classList.toggle("on",b.dataset.go===id)});window.scrollTo(0,0);if(location.hash!=="#"+id)history.replaceState(null,"","#"+id)}
document.querySelectorAll("[data-go]").forEach(function(el){el.addEventListener("click",function(e){e.preventDefault();go(el.dataset.go)})});
go(location.hash.slice(1)||"home");
var standalone=window.navigator.standalone||matchMedia("(display-mode: standalone)").matches;
var box=document.getElementById("install"),txt=document.getElementById("installText"),btn=document.getElementById("installBtn"),dp=null;
var dismissed=false;try{dismissed=localStorage.getItem("emx")==="1"}catch(e){}
var ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
if(!standalone&&!dismissed){
 if(ios){txt.textContent="Add to your home screen. Tap the Share button in Safari, then Add to Home Screen.";box.hidden=false}
 window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();dp=e;txt.textContent="Install Emordes on your phone.";btn.hidden=false;box.hidden=false});
}
btn.onclick=function(){if(dp){dp.prompt();box.hidden=true}};
document.getElementById("installX").onclick=function(){box.hidden=true;try{localStorage.setItem("emx","1")}catch(e){}};
if("serviceWorker" in navigator)window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js")});
})();