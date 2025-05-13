document.addEventListener('DOMContentLoaded', function() {
    // Music controls
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let musicPlaying = false;

    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', function() {
            if (musicPlaying) {
                backgroundMusic.pause();
                musicToggle.textContent = '♪ Play Music';
            } else {
                backgroundMusic.play();
                musicToggle.textContent = '♪ Pause Music';
            }
            musicPlaying = !musicPlaying;
        });
    }

    // Memory reveal functionality
    const revealButtons = document.querySelectorAll('.reveal-btn');
    revealButtons.forEach(button => {
        button.addEventListener('click', function() {
            const hiddenContent = this.nextElementSibling;
            if (hiddenContent.style.display === 'block') {
                hiddenContent.style.display = 'none';
                this.textContent = this.getAttribute('data-original-text') || 'Reveal Memory';
            } else {
                // Store original button text if not already stored
                if (!this.getAttribute('data-original-text')) {
                    this.setAttribute('data-original-text', this.textContent);
                }
                hiddenContent.style.display = 'block';
                this.textContent = 'Hide Memory';
            }
        });
    });

    // Image lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const fullImg = document.createElement('img');
            fullImg.src = this.src;
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('lightbox-close');
            closeBtn.innerHTML = '&times;';
            
            lightbox.appendChild(closeBtn);
            lightbox.appendChild(fullImg);
            document.body.appendChild(lightbox);
            
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });

    // Save scroll position for navigation
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    // Restore scroll position on page load
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition));
        localStorage.removeItem('scrollPosition');
    }
});