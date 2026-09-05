const INSTAGRAM = "https://www.instagram.com/rivaera_/";

/*
  CONTENT SETUP
  Put your own permitted Instagram photos into assets/images/
  and your own permitted reels/videos into assets/reels/.
  Then edit the filenames below.
*/
const content = {
  gallery: [
    {src:"assets/images/post1.jpg", label:"Editorial 01", instagramUrl:INSTAGRAM},
    {src:"assets/images/post2.jpg", label:"Editorial 02", instagramUrl:INSTAGRAM},
    {src:"assets/images/post3.jpg", label:"Editorial 03", instagramUrl:INSTAGRAM},
    {src:"assets/images/post4.jpg", label:"Editorial 04", instagramUrl:INSTAGRAM}
  ],
  reels: [
    {src:"assets/reels/reel1.mp4", label:"Motion 01", instagramUrl:INSTAGRAM},
    {src:"assets/reels/reel2.mp4", label:"Motion 02", instagramUrl:INSTAGRAM},
    {src:"assets/reels/reel3.mp4", label:"Motion 03", instagramUrl:INSTAGRAM}
  ]
};

const gallery = document.querySelector("#gallery-grid");
content.gallery.forEach((item,i)=>{
  const card=document.createElement("article");
  card.className="gallery-item magnetic";
  card.innerHTML=`<img src="${item.src}" alt="${item.label}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('missing')">
  <div class="gallery-meta"><span>${String(i+1).padStart(2,"0")} / ${String(content.gallery.length).padStart(2,"0")}</span><span>${item.label}</span></div>`;
  card.addEventListener("click",()=>openLightbox(item.src,"image",item.instagramUrl));
  gallery.appendChild(card);
});

const reelTrack=document.querySelector("#reel-track");
content.reels.forEach((item,i)=>{
  const card=document.createElement("article");
  card.className="reel magnetic";
  card.innerHTML=`<video src="${item.src}" muted loop playsinline preload="metadata"></video>`;
  const v=card.querySelector("video");
  v.addEventListener("mouseenter",()=>v.play().catch(()=>{}));
  v.addEventListener("mouseleave",()=>v.pause());
  card.addEventListener("click",()=>openLightbox(item.src,"video",item.instagramUrl));
  reelTrack.appendChild(card);
});

/* Horizontal drag */
let down=false,startX,scrollLeft;
reelTrack.addEventListener("pointerdown",e=>{down=true;startX=e.pageX-reelTrack.offsetLeft;scrollLeft=reelTrack.scrollLeft;reelTrack.setPointerCapture(e.pointerId)});
reelTrack.addEventListener("pointerup",()=>down=false);
reelTrack.addEventListener("pointercancel",()=>down=false);
reelTrack.addEventListener("pointermove",e=>{
  if(!down)return;
  e.preventDefault();
  const x=e.pageX-reelTrack.offsetLeft;
  reelTrack.scrollLeft=scrollLeft-(x-startX)*1.4;
});

/* Lightbox */
const lightbox=document.querySelector("#lightbox");
function openLightbox(src,type,ig){
  const box=document.querySelector(".lightbox-content");
  box.innerHTML=type==="video"
    ? `<video src="${src}" controls autoplay loop playsinline></video><a class="lightbox-ig" href="${ig}" target="_blank">View on Instagram ↗</a>`
    : `<img src="${src}" alt=""><a class="lightbox-ig" href="${ig}" target="_blank">View on Instagram ↗</a>`;
  lightbox.classList.add("active");
}
function closeLightbox(){lightbox.classList.remove("active");document.querySelector(".lightbox-content").innerHTML=""}
document.querySelector(".close").onclick=closeLightbox;
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});

/* Magnetic buttons + cursor */
const cursor=document.querySelector(".cursor"), cursorLabel=document.querySelector(".cursor-label");
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
document.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY});
function cursorLoop(){
  cx+=(mx-cx)*.18;cy+=(my-cy)*.18;
  cursor.style.left=cx+"px";cursor.style.top=cy+"px";
  cursorLabel.style.left=cx+"px";cursorLabel.style.top=cy+"px";
  requestAnimationFrame(cursorLoop);
}
cursorLoop();
document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mouseenter",()=>cursor.classList.add("hover"));
  el.addEventListener("mouseleave",()=>{cursor.classList.remove("hover");el.style.transform=""});
  el.addEventListener("mousemove",e=>{
    const r=el.getBoundingClientRect(), x=(e.clientX-r.left-r.width/2)*.12, y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
});

/* 3D tilt */
document.querySelectorAll("[data-tilt]").forEach(el=>{
  el.addEventListener("mousemove",e=>{
    const r=el.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
    const rx=(y/r.height-.5)*-8, ry=(x/r.width-.5)*8;
    el.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(2deg)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="rotate(5deg)");
});

/* Three.js subtle background geometry */
if(window.THREE){
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,100);
  camera.position.z=5;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setSize(innerWidth,innerHeight);
  renderer.domElement.style.cssText="position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.35";
  document.body.prepend(renderer.domElement);
  const geo=new THREE.IcosahedronGeometry(1.25,1);
  const mat=new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.16});
  const mesh=new THREE.Mesh(geo,mat);scene.add(mesh);
  function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x+=.0015;mesh.rotation.y+=.002;
    mesh.position.x=(mx/innerWidth-.5)*.5;
    mesh.position.y=-(my/innerHeight-.5)*.3;
    renderer.render(scene,camera);
  }
  animate();
  addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
}

/* loader */
window.addEventListener("load",()=>setTimeout(()=>document.querySelector("#loader").style.display="none",850));
