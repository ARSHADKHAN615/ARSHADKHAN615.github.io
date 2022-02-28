const icon = document.querySelector("#menu-toggle-icon");
const scrolltop = document.querySelector(".scrolltop");
const nav = document.querySelector(".menu");
const duration = document.getElementById("duration");

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    let year = Math.floor(months / 12);
    let finalMonth = months - (12 * year);
    if (months > 11) {
        return year + " Year " + finalMonth + " Months";
    } else {
        return months + " Months";
    }
}
var diff = monthDiff(new Date(2021, 4, 27), new Date());
duration.innerHTML = diff;


function showMenu() {
    nav.classList.toggle("show");
    icon.classList.toggle("bx-x-circle");
}


const navLink = document.querySelectorAll(".nav-link")
navLink.forEach(function (elem) {
    elem.addEventListener("click", linkAction);

})

function linkAction() {
    // linkAction 
    icon.classList.remove("bx-x-circle")
    navLink.forEach(function (elem) {
        elem.classList.remove("active");
    })
    this.classList.add("active");
    nav.classList.remove("show")
}



// SCROLLTOP 
scrolltop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

const showBtn = () => {
    nav.classList.remove("show")
    icon.classList.remove("bx-x-circle")
    this.scrollY > 100 ? scrolltop.style.bottom = "5rem" : scrolltop.style.bottom = "-50rem";
}

window.addEventListener("scroll", showBtn)


// SWEET SCROLL
new SweetScroll({
    trigger: '[data-scroll]',
    easing: 'easeInOutExpo',
});


// THEME CHANGE     
const themeButton = document.querySelector('.mode-icon')

const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}



document.getElementById('mode-toggle').addEventListener("click", () => {
    document.querySelector(".mode-icon").classList.toggle('bxs-sun');
    document.body.classList.toggle("dark-theme");
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})




// PDF GENERATOR 
const opt = {
    margin: 0,
    filename: 'ArshadResume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    enableLinks: true,
    html2canvas: { scale: 5 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
};


const areaCV = document.querySelector(".resume")
const scaleCV = () => {
    document.body.classList.add("scale-cv");
}
const removeScaleCV = () => {
    document.body.classList.remove("scale-cv");
}
const generateResume = () => {
    html2pdf(areaCV, opt)
}

document.getElementById("pdf-generate").addEventListener("click", () => {
    scaleCV();
    generateResume();
})