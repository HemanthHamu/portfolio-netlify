let shareButton = document.querySelectorAll('.share-button');
    shareButton.forEach(button => {
      const hoverTimeline = gsap.timeline({ paused: true });
      hoverTimeline.to(button, { background: "linear-gradient(180deg, #242323 100%, black 100% )", duration: 1 });
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

  
  