  // function toggleMobileLinks() {
  //   var mobileLinks = document.querySelector('.mobile-links');
  //   mobileLinks.style.display = (mobileLinks.style.display === 'flex') ? 'none' : 'flex';
  // }


  function toggleMobileLinks() {
    var mobileLinks = document.querySelector('.mobile-links');
    mobileLinks.style.display = (mobileLinks.style.display === 'flex') ? 'none' : 'flex';
}

// Add an event listener to each navbar link
var navbarLinks = document.querySelectorAll('.mobile-links a');
navbarLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        var mobileLinks = document.querySelector('.mobile-links');
        mobileLinks.style.display = 'none'; // Hide mobile links when a link is clicked
    });
});

function showCV(){
    
}
