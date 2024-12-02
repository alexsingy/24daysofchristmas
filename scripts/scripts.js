document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('.calendar');
    const videoModal = document.getElementById('video-modal');
    const dayVideo = document.getElementById('day-video');
    const closeModal = document.querySelector('.close');


    // Fixed order of days
    const fixedDays = [19, 24, 7, 23, 5, 17, 20, 6, 10, 22, 13, 2, 14, 11, 12, 3, 8, 16, 18, 15, 1, 4, 21, 9];

    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = January, 11 = December
    const today = now.getDate();

    // Load flipped days from localStorage (if any)

    let flippedDays = JSON.parse(localStorage.getItem('flippedDays')) || [];

    // Generate the day blocks
    for (let i = 0; i < fixedDays.length; i++) {
        const day = fixedDays[i];
        const dayBlock = document.createElement('div');
        dayBlock.classList.add('day-block');
        dayBlock.textContent = day;

        // Add classes for varying sizes (Large, Small, Default)
        if (i % 6 === 0) {
            dayBlock.classList.add('large');  // Example: Every 6th block is large
        } else if (i % 3 === 0) {
            dayBlock.classList.add('small');  // Example: Every 5th block is small
        }

        // Check if the current date is in December and the day is eligible
        const isDecember = currentMonth === 11;
        if (!isDecember || day > today) {
            dayBlock.classList.add('locked'); // Add a "locked" style for days not yet eligible
        }

        // If the day was flipped previously, keep it flipped
        if (flippedDays.includes(day)) {
            dayBlock.style.backgroundImage = `url(images/day${day}.jpg)`;
            dayBlock.style.backgroundSize = "cover";
            dayBlock.style.backgroundPosition = "center";
            dayBlock.textContent = '';
        }

        // Add click functionality for eligible days
        dayBlock.addEventListener('click', () => {
            if (isDecember && day <= today) {
                // Flip effect: reveal image
                dayBlock.style.backgroundImage = `url(images/day${day}.jpg)`;
                dayBlock.style.backgroundSize = "cover";
                dayBlock.style.backgroundPosition = "center";
                dayBlock.textContent = '';
                
                // Remember the day as flipped
             //   if (!flippedDays.includes(day)) {
               //     flippedDays.push(day);
                 //   localStorage.setItem('flippedDays', JSON.stringify(flippedDays));
               // }
                
                // Show video in modal
                dayVideo.src = `Videos_2024/day${day}.mp4`;
                videoModal.style.display = 'flex';
            }
        });

        calendar.appendChild(dayBlock);
    }

    // Modal close functionality
    closeModal.addEventListener('click', () => {
        videoModal.style.display = 'none';
        dayVideo.pause();
        dayVideo.src = ''; // Clear the video source
    });

    // Close modal when clicking outside content
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            dayVideo.pause();
            dayVideo.src = ''; // Clear the video source
        }
    });
});
