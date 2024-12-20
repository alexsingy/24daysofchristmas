document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('.calendar');
    const videoModal = document.getElementById('video-modal');
    const dayVideo = document.getElementById('day-video');
    const closeModal = document.querySelector('.close');

    // Map day numbers to Vimeo video links
    const videoLinks = {
        1: "https://player.vimeo.com/video/1035141363?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        2: "https://player.vimeo.com/video/1035141463?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        3: "https://player.vimeo.com/video/1035160450?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        4: "https://player.vimeo.com/video/1035141766?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        5: "https://player.vimeo.com/video/1035141845?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        6: "https://player.vimeo.com/video/1035141948?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        7: "https://player.vimeo.com/video/1035160633?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        8: "https://player.vimeo.com/video/1037055524?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        9: "https://player.vimeo.com/video/1037057301?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        10: "https://player.vimeo.com/video/1037057651?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        11: "https://player.vimeo.com/video/1037058295?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        12: "https://player.vimeo.com/video/1037058766?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
        13: "https://player.vimeo.com/video/1037059047?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
    };

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
            dayBlock.style.backgroundImage = `url(Images/day${day}.jpeg)`;
            dayBlock.style.backgroundSize = "cover";
            dayBlock.style.backgroundPosition = "center";
            dayBlock.textContent = '';
        }

        // Add click functionality for eligible days
        dayBlock.addEventListener('click', () => {
            if (isDecember && day <= today) {
                // Flip effect: reveal image
                dayBlock.style.backgroundImage = `url(Images/day${day}.jpeg)`;
                dayBlock.style.backgroundSize = "cover";
                dayBlock.style.backgroundPosition = "center";
                dayBlock.textContent = '';
                
                // Remember the day as flipped
                if (!flippedDays.includes(day)) {
                    flippedDays.push(day);
                    localStorage.setItem('flippedDays', JSON.stringify(flippedDays));
                }
                
                // Show video in modal
                dayVideo.src = videoLinks[day]; // Use the link from the mapping
                videoModal.style.display = 'flex';
            }
        });

        calendar.appendChild(dayBlock);
    }

    // Modal close functionality (close button)
    closeModal.addEventListener('click', () => {
        videoModal.style.display = 'none';
        dayVideo.pause();
        dayVideo.src = ''; // Clear the video source
    });

    // Close modal when clicking outside of content
    videoModal.addEventListener('click', (e) => {
        // Close if clicking on the overlay outside of the video
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            dayVideo.pause();
            dayVideo.src = ''; // Clear the video source
        }
    });
});
