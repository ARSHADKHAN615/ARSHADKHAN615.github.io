
// Fetch All Projects
const projectsContainer = document.querySelector(".project__content");

const getProjects = async () => {
  const res = await fetch("https://combative-jay-girdle.cyclic.app/api/dekhojara725177");
  const data = await res.json();
  return data;
};

const showProjects = async () => {
  const projects = await getProjects();
  // console.log(projects?.frontEnd);
  const childCards = projectsContainer.children;
  for (let i = 0; i < childCards.length; i++) {
    const childCard = childCards[i];
    childCard.querySelector(".card__title").innerHTML = projects?.frontEnd[i]?.name;   
    childCard.querySelector(".actions_btn a:nth-child(1)").href = projects?.frontEnd[i]?.liveLink;
    childCard.querySelector(".actions_btn a:nth-child(2)").href = projects?.frontEnd[i]?.githubLink;
    childCard.querySelector(".card__description").innerHTML = projects?.frontEnd[i]?.description;
  }
};
showProjects();
// SWEET SCROLL
new SweetScroll({
  trigger: '[data-scroll]',
  easing: 'easeInOutExpo',
});

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 2,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const moveTitle = document.querySelector(".move-title");
const moveTitle2 = document.querySelector(".move-title-2");
const shape1 = document.querySelector(".background-shape:nth-child(1)");
const shape2 = document.querySelector(".background-shape:nth-child(2)");
const shape3 = document.querySelector(".background-shape:nth-child(3)");
lenis.on("scroll", ({ scroll }) => {
  // title.style.transform = `scaleX(${1 + scroll * 0.005})`;
  shape1.style.transform = `rotate(${scroll * 0.5}deg)`;
  shape2.style.transform = `translateX(${-scroll * 0.5}px) scale(${1 + scroll * 0.0005})`;
  shape3.style.transform = `translateX(${scroll * 0.5}px)  `;
  moveTitle.style.transform = `translateX(${-scroll}px)`;
  moveTitle2.style.transform = `translateX(${scroll}px)`;
});

// Text animation with GSAP and Textify
new Textify({
  el: '.section__title',
  observer: {
    repeat: true,
    threshold: 0,
  },
  animation: {
    stagger: 0.025,
    duration: 0.7,
    ease: 'expo.inOut',
    animateProps: {"opacity":0,"scale":0}
  }
},gsap)

new Textify({
  el: '.home__title',
  observer: {
    repeat: true,
    threshold: 0,
  },
  animation: {
    stagger: 0.15,
    duration: 0.7,
    ease: 'expo.inOut',
    animateProps: {"opacity":0,"scale":0}
  }
},gsap)


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== PROJECTS ===============*/
// VanillaTilt.init(document.querySelector(".project__card:nth-child(3)"), {
//   max: 25,
//   speed: 400,
//   glare: true,
//   "max-glare": 0.5,
// });

const projects = document.getElementById("projects");
let box_items = gsap.utils.toArray(".project__card");

gsap.to(box_items, {
  xPercent: -100 * (box_items.length - 1),
  ease: "sin.inOut",
  delay: 10,
  velocity: 1,
  scrollTrigger: {
    trigger: projects,
    pin: true,
    scrub: 3,
    snap: 1 / (box_items.length - 1),
    end: "+=" + projects.offsetWidth
  }
});


/*=============== EMAIL JS ===============*/
// const Phone = document.getElementById("Phone").value;

const contactMessage = document.getElementById("contact-message");
const contactForm = document.getElementById("contact-form");
const Name = document.getElementById("contact-name");
const Email = document.getElementById("contact-email");
const Message = document.getElementById("contact-project");

const sendEmail = (e) => {
  e.preventDefault();
  var response = grecaptcha.getResponse();

  if (response.length == 0) {
    contactMessage.classList.add("color-red");
    contactMessage.classList.remove("color-blue");
    // show error
    contactMessage.textContent = "Please Verify Captcha 🙏";
    return;
  }

  if (Name.value == "" || Email.value == "" || Message.value == "") {
    contactMessage.classList.add("color-red");
    contactMessage.classList.remove("color-blue");
    // show error
    contactMessage.textContent = "All Felid Are Required 🙏";
  } else {
    contactMessage.classList.remove("color-red");
    contactMessage.classList.add("color-blue");
    // show success
    contactMessage.textContent = "Sending...";
    // send email
    emailjs
      .sendForm(
        'service_2w6qgjk', 'template_g1tmf1j',"#contact-form","user_fGYmwExcLu4ssQkjoFTDK"
      )
      .then(
        (result) => {
          console.log(result.text);
          contactMessage.textContent = "Thank You For Contact Me 🙏";
        },
        (error) => {
          console.log(error.text);
          alert(error.text)
          contactMessage.textContent = "Some Issue Please Try Again 🙏";
        }
      );
  }
}
contactForm.addEventListener("submit", sendEmail);


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link')
    } else {
      sectionsClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up')
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header')
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this.scrollY >= 50 ? header.classList.add('bg-header')
    : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 200,
})

sr.reveal(`.home__data,.footer__container`)
sr.reveal(`.contact__content:nth-child(1)`, { origin: 'left' })
sr.reveal(`.contact__content:nth-child(2)`, { origin: 'right' })
sr.reveal(`.home__info div`, { delay: 600 ,origin: 'bottom',interval: 100 });
sr.reveal(`.nav__item`, { delay: 600 ,origin: 'bottom',interval: 100 });
sr.reveal(`.skill__card`, { delay: 0 ,origin: 'bottom',interval: 400 });



/*=============== BACKGROUNDS ICONS ANIMATION ===============*/
// var balls = [];
// var images = [
//   "../assets/img/html3d.png",
//   "../assets/img/css3d.png",
//   "../assets/img/c++3d.png",
//   "../assets/img/javascript3d.png",
//   "../assets/img/react.png",
//   "../assets/img/nodejs.png",
//   "../assets/img/github.png",
//   "../assets/img/mongodb.png",
//   "../assets/img/firebase.png",
//   "../assets/img/git.png",
//   "../assets/img/php.png",
//   "../assets/img/laravel.png",
//   "../assets/img/mysql.png",
//   "../assets/img/expressjs.png",
// ];

// // Set the number of balls to create
// var numBalls = 0;

// // Set the starting position for the balls
// var startingPosition = {
//   x: Math.random() * window.innerWidth,
//   y: Math.random() * window.innerHeight,
// };

// // Create the balls and add them to the page
// for (var i = 0; i < numBalls; i++) {
//   // Create a new div element with the class "ball"
//   var ball = document.createElement("div");
//   var img = document.createElement("img");
//   ball.classList.add("ball");
//   // add background image
//   img.src = images[i];
//   img.style.objectFit = "cover";
//   img.style.width = "100%";
//   img.style.height = "100%";

//   ball.appendChild(img);

//   // Set the initial position for the ball randomly with Math.random()
//   // covert this two line into translate property

//   ball.style.left = Math.random() * 100 + startingPosition.x + "px";
//   ball.style.top = Math.random() * 100 + startingPosition.y + "px";


//   // Generate a random velocity for the ball
//   ball.velocity = {
//     x: Math.random() * 12 - 5,
//     y: Math.random() * 12 - 5,
//   };

//   // Add the ball to the page
//   document.getElementById("icon-container").appendChild(ball);

//   // Add the ball to the array
//   balls.push(ball);
// }

// // Initialize the animation loop
// function animate() {
//   // Loop through all the balls
//   for (var i = 0; i < balls.length; i++) {
//     // Get the current ball
//     var ball = balls[i];

//     // Get the current position of the ball
//     var currentPosition = {
//       x: parseInt(ball.style.left),
//       y: parseInt(ball.style.top),
//     };

//     // Calculate the new position of the ball
//     var newPosition = {
//       x: currentPosition.x + ball.velocity.x,
//       y: currentPosition.y + ball.velocity.y,
//     };

//     // Check if the new position would be outside the viewport
//     if (
//       newPosition.x < 0 ||
//       newPosition.x + ball.offsetWidth > window.innerWidth
//     ) {
//       ball.velocity.x = -ball.velocity.x;
//     }
//     if (
//       newPosition.y < 0 ||
//       newPosition.y + ball.offsetHeight > window.innerHeight
//     ) {
//       ball.velocity.y = -ball.velocity.y;
//     }

//     // Update the position of the ball
//     ball.style.left = newPosition.x + "px";
//     ball.style.top = newPosition.y + "px";
//   }

//   requestAnimationFrame(animate);
// }
// animate();

/*=============== FIREFLY ANIMATION ===============*/
let WIDTH;
let HEIGHT;
let canvas;
let con;
let g;
let pxs = new Array();
let rint = 50;

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;
const container = document.getElementById("fire-fly-container");
// container.style.width = WIDTH + "px";
// container.style.height = "100vh";
container.style.position = "fixed";

canvas = document.getElementById("pixie");
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
con = canvas.getContext('2d');
for (let i = 0; i < 200; i++) {
  pxs[i] = new Circle();
  pxs[i].reset();
}
setInterval(draw, rint);


function draw() {
  con.clearRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < pxs.length; i++) {
    pxs[i].fade();
    pxs[i].move();
    pxs[i].draw();
  }
}

function Circle() {
  this.s = {
    ttl: 8000,
    xmax: 5,
    ymax: 2,
    rmax: 10,
    rt: 1,
    xdef: 960,
    ydef: 540,
    xdrift: 4,
    ydrift: 4,
    random: true,
    blink: true
  };

  this.reset = function () {
    this.x = this.s.random ? WIDTH * Math.random() : this.s.xdef;
    this.y = this.s.random ? HEIGHT * Math.random() : this.s.ydef;
    this.r = (this.s.rmax - 1) * Math.random() + 1;
    this.dx = Math.random() * this.s.xmax * (Math.random() < 0.5 ? -1 : 1);
    this.dy = Math.random() * this.s.ymax * (Math.random() < 0.5 ? -1 : 1);
    this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
    this.rt = Math.random() * this.hl;
    this.s.rt = Math.random() + 1;
    this.stop = Math.random() * 0.2 + 0.4;
    this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
  };

  this.fade = function () {
    this.rt += this.s.rt;
  };

  this.draw = function () {
    if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl))
      this.s.rt = this.s.rt * -1;
    else if (this.rt >= this.hl) this.reset();
    let newo = 1 - this.rt / this.hl;
    con.beginPath();
    con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    con.closePath();
    let cr = this.r * newo;
    g = con.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      cr <= 0 ? 1 : cr
    );
    g.addColorStop(0.0, "rgba(108,172,224," + newo + ")"); //203,255,12
    g.addColorStop(this.stop, "rgba(108,172,224," + newo * 0.2 + ")");
    g.addColorStop(1.0, "rgba(238,180,28,0)");
    con.fillStyle = g;
    con.fill();
  };

  this.move = function () {
    this.x += (this.rt / this.hl) * this.dx;
    this.y += (this.rt / this.hl) * this.dy;
    if (this.x > WIDTH || this.x < 0) this.dx *= -1;
    if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
  };

  this.getX = function () {
    return this.x;
  };
  this.getY = function () {
    return this.y;
  };
}

