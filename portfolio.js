const cvButton = document.querySelector('.cv');
const cvContainer = document.getElementById('cv-container');
const cvContainerMain = document.querySelector('.cv-container-main');
const year = document.getElementById('year');
function toggleMobileLinks() {
    var mobileLinks = document.querySelector('.mobile-links');
    mobileLinks.style.display = (mobileLinks.style.display === 'flex') ? 'none' : 'flex';
}
var navbarLinks = document.querySelectorAll('.mobile-links a');
navbarLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        var mobileLinks = document.querySelector('.mobile-links');
        mobileLinks.style.display = 'none'; 
    });

});
cvButton.addEventListener('click',()=>{
    if(cvContainerMain.style.display==="none"  || cvContainerMain.style.display === ""){
        cvContainerMain.style.display = "block";
    }
    else{
        cvContainerMain.style.display = "none";
    }
})
function hideCV(){
    if(cvContainerMain.style.display==="block"){
        cvContainerMain.style.display = "none"
    }
    else{
        cvContainerMain.style.display = "block"
    }
}
const d = new Date()
year.innerHTML = d.getFullYear();

//gsap animation starts
gsap.from('.navbar', { opacity: 0,y:-50,duration: 2, delay: 0.8, ease: 'bounce' });
gsap.from('.navbar .navbar-links', { opacity: 0,duration: 0.5, delay: 0.8,stagger: 0.4,scale:0.7 });
gsap.from('.mobile-links a', { opacity: 0,duration: 3, delay: 0.8,stagger: 0.5,scale:0.7 });
gsap.from('.image-container',{opacity:0,duration:2,delay:1.5,y:500,ease:'bounce'})
gsap.registerPlugin(ScrollTrigger);
gsap.from('.project1-container', {scrollTrigger:".project1-container",x:-500,duration:1,delay:0});
gsap.from('.skills', {scrollTrigger:".skills",x:500,duration:1,delay:0});
gsap.from('.contact-form',{scrollTrigger:".contact-form",x:-500,duration:1,delay:0,ease:"bounce"})
gsap.from('.social-media',{scrollTrigger:".social-media",x:500,duration:1,delay:0,ease:"bounce"})


// Defining the hover animation
const hoverTimeline = gsap.timeline({ paused: true });
hoverTimeline.to(cvButton, { background: "linear-gradient(to right, #3498db 100%, black 100%)", duration: 0.5 });

// Add event listeners for mouse enter and mouse leave
cvButton.addEventListener('mouseenter', () => {
  hoverTimeline.play();
});

cvButton.addEventListener('mouseleave', () => {
  hoverTimeline.reverse();
});






function playClickSound() {
    var clickSound = document.getElementById("clickSound");
    clickSound.volume = 0.5;
    clickSound.play();
}

// Add event listeners to all anchor tags
var anchorTags = document.querySelectorAll("a");
anchorTags.forEach(function(anchor) {
    anchor.addEventListener("click", playClickSound);
});

var buttonTags = document.querySelectorAll("button");
buttonTags.forEach(function(btn) {
    btn.addEventListener("click", playClickSound);
});