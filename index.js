// ---- Load Components ----
async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    // Agar ye header hai, to uske load hone ke baad navbar code run karo
    if (id === 'header') initHeaderScripts();

    // Agar ye footer hai, aur tumhare footer me koi JS chahiye ho to wo yahan call karo
    if (id === 'footer') initFooterScripts();
}

loadComponent('header', '/partials/header.html');
loadComponent('footer', '/partials/footer.html');

// ---- HEADER JS (only runs after header is loaded) ----
function initHeaderScripts() {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const icon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        const isOpen = sideMenu.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-times', isOpen);
    });
}



// ---- SLIDER ----
const track = document.querySelector(".slider-track"),
    slides = [...document.querySelectorAll(".slide")],
    dotsBox = document.querySelector(".slider-dots");

let perView = window.innerWidth < 768 ? 1 : 2, index = 0;
slides.forEach(s => track.appendChild(s.cloneNode(true))); // clone for infinite loop

const total = slides.length;
for (let i = 0; i < total; i++) {
    let dot = document.createElement("div");
    dot.className = "dot" + (i ? "" : " active");
    dot.onclick = () => go(i);
    dotsBox.appendChild(dot);
}
const dots = document.querySelectorAll(".dot");

function go(i) {
    index = i;
    track.style.transition = ".6s ease";
    track.style.transform = `translateX(-${i * (100 / perView)}%)`;
    dots.forEach((d, n) => d.classList.toggle("active", n == i % total));
}

function next() {
    index++;
    track.style.transition = ".6s ease";
    track.style.transform = `translateX(-${index * (100 / perView)}%)`;
    if (index >= total) {
        setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = "translateX(0)";
        }, 600);
    }
    dots.forEach((d, n) => d.classList.toggle("active", n == index % total));
}

setInterval(next, 4000);
window.addEventListener("resize", () => perView = window.innerWidth < 768 ? 1 : 2);

// ---- VIDEO ----
const playBtn = document.getElementById("playBtn");
const video = document.getElementById("heroVideo");
const thumbnail = document.querySelector(".video-thumbnail");

if (playBtn) {
    playBtn.addEventListener("click", () => {
        playBtn.style.display = "none";
        thumbnail.style.display = "none";
        video.classList.remove("d-none");
        video.play();
    });
}
