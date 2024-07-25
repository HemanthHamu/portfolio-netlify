const cvButton = document.querySelector('.cv');
const cvContainer = document.getElementById('cv-container');
const cvContainerMain = document.querySelector('.cv-container-main');
const socialMedia = document.querySelector('.media');
const year = document.getElementById('year');
//ANIMATION FOR NAME: HEMANTH
const myName = document.querySelector('.name');
const nameText = myName.textContent;
const splitText = nameText.split("");
var initial = "";
splitText.forEach((elem) => {
    initial = initial + `<span class="single-char">${elem}</span>`
})
myName.innerHTML = initial;
gsap.from('.single-char',{
    opacity:0,
    x:-100,
    stagger:0.4,
    delay:2,
    duration:0.3
})

// FUNCTION TO DISPLAY SIDEBAR FOR MOBILE SCREENS
function toggleMobileLinks() {
    var mobileLinks = document.querySelector('.mobile-links');
    mobileLinks.style.display = (mobileLinks.style.display === 'flex') ? 'none' : 'flex';
}
//ADDED EVENT LISTENERS FOR ALL ANCHOR TAGS FOR MOBILES
var navbarLinks = document.querySelectorAll('.mobile-links a');
navbarLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        var mobileLinks = document.querySelector('.mobile-links');
        mobileLinks.style.display = 'none'; 
    });

});
// ADDED EVENTLISTENER FOR CVBUTTON
cvButton.addEventListener('click',()=>{
    if(cvContainerMain.style.display==="none"  || cvContainerMain.style.display === ""){
        cvContainerMain.style.display = "block";
    }
    else{
        cvContainerMain.style.display = "none";
    }
})
// FUNCTION FOR HIDING THE CV
function hideCV(){
    if(cvContainerMain.style.display==="block"){
        cvContainerMain.style.display = "none"
    }
    else{
        cvContainerMain.style.display = "block"
    }
}
// DISPLAY DATE
const d = new Date()
year.innerHTML = d.getFullYear();

//gsap animation starts
// gsap.from('.navbar', { opacity: 0,y:-50,duration: 2, delay: 0.8, ease: 'bounce' });
// gsap.from('.navbar .navbar-links', { opacity: 0,duration: 0.5, delay: 0.8,stagger: 1,scale:0,rotate:720,y:-100 });
gsap.from('header', { opacity: 0,y:100,duration: 1, ease: 'elastic' });
gsap.from('.navbar',{opacity:0})
gsap.from('.navbar .navbar-links', { opacity: 0,duration: 1.4,stagger: 0.2,x:-100 });
gsap.from('.navbar span', { opacity: 0,x:-100,duration: 5, delay: 1,rotate:360,stagger:0.5 });
// gsap.from('.cv',{opacity:0,duration:1,y:-100,ease:"bounce"})
gsap.from('.mobile-links a', { opacity: 0,duration: 3, delay: 0.8,stagger: 0.5,scale:0.7 });
gsap.from('.image-container',{opacity:0,duration:2,delay:1.5,y:500,ease:'bounce'});
gsap.registerPlugin(ScrollTrigger);
gsap.from('.project1-container', {scrollTrigger:".project1-container",y:300,duration:2,stagger:2,opacity:0});
gsap.from('.skills', {scrollTrigger:".skills",y:300,duration:1});
gsap.from('.contact-form',{scrollTrigger:".contact-form",y:100,duration:2,rotate:720,delay:0,ease:"bounce"});
gsap.from('.social-media-links', {scrollTrigger:".social-media-links",duration:2,stagger:0.5,opacity:0});

// ANIMATION FOR CV BUTTON AFTER HOVERS ON IT
const hoverTimeline = gsap.timeline({ paused: true });
hoverTimeline.to(cvButton, { background: "linear-gradient(to right, #3498db 100%, black 100%)", duration: 0.5 });

// Add event listeners for mouse enter and mouse leave
cvButton.addEventListener('mouseenter', () => {
  hoverTimeline.play();
});

cvButton.addEventListener('mouseleave', () => {
  hoverTimeline.reverse();
});

//FUNCTION FOR PLAYING THE AUDIO EFFECT
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
// Add event listeners to all button tags
var buttonTags = document.querySelectorAll("button");
buttonTags.forEach(function(btn) {
    btn.addEventListener("click", playClickSound);
});

//Function to check whether user internet connection is enabled or not

function updateOnlineStatus(){
    const internetConnection = document.getElementById('no-internet-connection');
    if(navigator.onLine){
        internetConnection.style.display = 'none'
    }
    else{
        internetConnection.style.display = 'block';
    }
}
window.addEventListener('online',updateOnlineStatus)
window.addEventListener('offline',updateOnlineStatus)

updateOnlineStatus();


// scripts.js
function showLoadingBar() {
    const loadingBar = document.querySelector('.loading-line');
    loadingBar.style.transform = 'scaleX(1)';
}

function hideLoadingBar() {
    const loadingBar = document.querySelector('.loading-line');
    loadingBar.style.transform = 'scaleX(0)';
}

const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', showLoadingBar)
});







let shareButton = document.querySelectorAll('.share-button');
    shareButton.forEach(button => {
      const hoverTimeline = gsap.timeline({ paused: true });
      hoverTimeline.to(button, { background: "linear-gradient(180deg, #2a7eb5 100%, rgb(192, 242, 253) 100% )", duration: 1 });
      button.addEventListener('mouseenter', () => {
          hoverTimeline.play();
      });
      button.addEventListener('mouseleave', () => {
          hoverTimeline.reverse();
      });
      button.addEventListener('click',()=>{
        let projectLink = button.previousElementSibling.getAttribute('href');
        let encodedLink = encodeURIComponent(projectLink);
        let whatsappURL = `whatsapp://send?text=${encodedLink}`;
        window.location.href = whatsappURL;
      })
  });

  const heartButtons = document.querySelectorAll('.fa-heart');
  const likeCounts = document.querySelectorAll('.like-count');
  //function to check whether the post is liked or not and to check the count of likes
  function checkLikedAndCount(heartButton, index) {
    const localStorageKey = `isLiked_${index}`; // Unique key for each heart icon;
    const isLiked = localStorage.getItem(localStorageKey);

    // Get the current like count from localStorage or default to 0
    let currentLikeCount = parseInt(localStorage.getItem(`likeCount_${index}`)) || 0;

    if (isLiked === 'true') {
        heartButton.classList.add('liked');
    }
    heartButton.addEventListener('click', () => {
        if (heartButton.classList.contains('liked')) {
            heartButton.classList.remove('liked');
            localStorage.setItem(localStorageKey, 'false');
            currentLikeCount--; // Decrease like count if not liked
        } else {
            heartButton.classList.add('liked');
            localStorage.setItem(localStorageKey, 'true');
            currentLikeCount++; // Increase like count if like
        }

        // Update the like count display
        likeCounts[index].textContent = currentLikeCount;

        // Store the updated like count in localStorage
        localStorage.setItem(`likeCount_${index}`, currentLikeCount);
    });

    // Initialize like count from localStorage on page load
    likeCounts[index].textContent = currentLikeCount;
}

// Call the checkLikedAndCount function for each heart button
heartButtons.forEach(checkLikedAndCount);

function playAudio(){
    const thankYou = document.getElementById('thank-you');
    thankYou.volume = 0.5
    thankYou.play()
}
heartButtons.forEach((heart) => {
    heart.addEventListener('click',playAudio)
})
