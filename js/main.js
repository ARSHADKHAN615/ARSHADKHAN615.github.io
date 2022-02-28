const toggle = document.querySelector(".toggle");
const main = document.querySelector("#load-page");
const toggleIcon = document.querySelector(".toggle i");
const navMenu = document.querySelector(".nav_menu");
const navigation = document.querySelector(".navigation");
const menu_link = document.querySelectorAll(".menu_link");
const section = document.querySelectorAll("section[id]");
const scrollTop = document.querySelector(".scroll-top");
const pre = document.querySelector(".preloader");

$(window).on('load', function() {
    $('.preloader').delay(20).fadeOut(500);
    main.style = "display: block";
});


// MOBILE MENU
toggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    toggleIcon.classList.toggle("bx-x");
})


// NAVIGATION SCROLL EFFECT
window.addEventListener("scroll", () => {
    navMenu.classList.toggle("bgChange", scrollY > 100);
    navigation.classList.toggle("bgChange", scrollY > 100);
})


// SCROLL-TOP SHOW AND HIDE 
$(window).on("scroll", function() {
    if ($(this).scrollTop() > 600) {
        $('.scroll-top').fadeIn(200)
        $('.scroll-top').css("display", "flex")
    } else {
        $('.scroll-top').fadeOut(200)
    }
})





// SCROLL ACTIVE LINKS
function scrollActive() {
    const scrollY = window.pageYOffset;
    section.forEach(e => {
        const sectionHeight = e.offsetHeight;
        const sectionTop = e.offsetTop - 50;
        sectionId = e.getAttribute("id");
        // console.log(sectionHeight);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav_menu a[href*=" + sectionId + "]").classList.add("active");
            navMenu.classList.remove("show");
            toggleIcon.classList.remove("bx-x");

        } else {
            document.querySelector(".nav_menu a[href*=" + sectionId + "]").classList.remove("active");

        }
    })
}

window.addEventListener("scroll", scrollActive);




// MIXFITER
var mixer = mixitup(".portfolio_card_container", {
    selectors: {
        target: '.portfolio_card'
    },
    animation: {
        duration: 300
    }
});

const portfolio_links = document.querySelectorAll(".portfolio_item");
portfolio_links.forEach(l =>
    l.addEventListener("click", (e) => {
        portfolio_links.forEach(l => l.classList.remove("portfolio_active"));
        e.target.classList.add("portfolio_active");
    })
)



// SLIDER 
const mySwiper = new Swiper('.testimonial_container', {
    observer: true,
    observeParents: true,
    spaceBetween: 16,
    grabCursor: true,
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,

    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        800: {
            slidesPerView: 3,
        },
        640: {
            slidesPerView: 2,
        }

    }

})



// TEXT ANIMATION 
$(function() {
    $('.tlt').textillate({
        loop: false,

    });
})


// GSAP AND REVEL ANIMATION 
// const sr = ScrollReveal({
//     origin: "bottom",
//     distance: "80px",
//     duration: 2000,
//     reset: true
// })

gsap.from(".hero_img", {
    opacity: 0,
    duration: 2,
    delay: 0.5,
    x: 100
});
gsap.from(".hero-text h3,.hero-text h2,.hero-text button", {
    opacity: 0,
    duration: 2,
    delay: 0.8,
    y: 100,
    ease: "expo.out",
    stagger: 0.2
});
gsap.from(".menu_item", {
    opacity: 0,
    duration: 2,
    delay: 1,
    y: 25,
    ease: "expo.out",
    stagger: 0.2
});

// sr.reveal(".h_social_icons", {
//     delay: 100,
//     interval: 200
// });




// SWEET SCROLL
new SweetScroll({
    trigger: '[data-scroll]',
    easing: 'easeInOutExpo',
});




// MAIL SCRIPT 
function SendMail(captchaValue) {
    const Form_Mess = document.getElementById("Form-Mess");
    const Name = document.getElementById("Name").value;
    const Phone = document.getElementById("Phone").value;
    const Email = document.getElementById("Email").value;
    const Message = document.getElementById("Message").value;

    if (Name == "" || Phone == "" || Email == "" || Message == "") {
        alert("All Felid Are Required")

    } else {
        const details = {
            from_name: Name,
            phone: Phone,
            email: Email,
            message: Message,
            'g-recaptcha-response': captchaValue,
        }

        Form_Mess.innerHTML = ` <div style="display: flex; justify-content: center;">
                                <div class="lds-dual-ring Form_Mess"></div>
                            </div>`;

        emailjs.send('service_41brdmq', 'template_5ri3vqi', details)
            .then(function(res) {
                console.log("success", res.status);
                if (res.status == 200) {
                    Form_Mess.innerHTML = "<h1 class='Form_Mess'>Thank You For Contact Me 🙏</h1>"
                }
            }, function(error) {
                console.log('FAILED...', error);
                Form_Mess.innerHTML = "<h1 class='Form_Mess' style='color:red'>Some Issue Please Try Again 🙏</h1>"
            })
    }
}