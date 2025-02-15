document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".cybercriminal-card");
    const cybercriminalsSection = document.querySelector(".cybercriminals");

    cards.forEach(card => {
        card.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents bubbling

            // If the clicked card is already active, deselect it
            if (this.classList.contains("active")) {
                this.classList.remove("active");
                cybercriminalsSection.classList.remove("active-bg");
                cybercriminalsSection.style.minHeight = "100vh"; // Reset section height
                return;
            }

            // Remove active class from all cards first
            cards.forEach(c => c.classList.remove("active"));
            cybercriminalsSection.classList.add("active-bg");

            // Add active class to clicked card
            this.classList.add("active");

            // Ensure the parent section dynamically resizes
            setTimeout(() => {
                if (this.classList.contains("active")) {
                    const expandedCardHeight = this.scrollHeight + 150; // Get new height
                    cybercriminalsSection.style.minHeight = `${expandedCardHeight}px`;
                }
            }, 300); // Give animation time before adjusting height
        });
    });

    // Click outside to deselect
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".cybercriminal-card")) {
            cards.forEach(c => c.classList.remove("active"));
            cybercriminalsSection.classList.remove("active-bg");

            // Reset height smoothly
            setTimeout(() => {
                cybercriminalsSection.style.minHeight = "100vh";
            }, 300);
        }
    });
});