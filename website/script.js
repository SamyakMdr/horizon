
document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");

    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        autoScrollId;

    // Start Dragging
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
        clearInterval(autoScrollId); // Stop auto-scrolling while dragging
    };

    // Dragging in Progress
    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    // Stop Dragging
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
        startAutoScroll(); // Restart auto-scrolling after dragging
    };

    // Auto-scroll function
    const startAutoScroll = () => {
        clearInterval(autoScrollId); // Clear existing interval
        autoScrollId = setInterval(() => {
            if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
                carousel.scrollLeft = 0; // Loop back to the start
            } else {
                carousel.scrollLeft += firstCardWidth; // Scroll by one card width
            }
        }, 3500);
    };

    // Arrow Button Click Event
    arrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            clearInterval(autoScrollId); // Stop auto-scroll on manual navigation
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
            startAutoScroll(); // Restart auto-scrolling after clicking
        });
    });

    // Mouse Events to Stop & Resume Auto-Scroll
    wrapper.addEventListener("mouseenter", () => clearInterval(autoScrollId));
    wrapper.addEventListener("mouseleave", startAutoScroll);

    // Event Listeners for Dragging
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    startAutoScroll(); // Start auto-scrolling when the page loads
});






