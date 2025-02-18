document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("cyberLawsModal");
    const openBtn = document.getElementById("openCyberLaws");
    const closeBtn = document.querySelector(".close-btn");

    // Ensure modal is hidden on page load (fixes the issue when navigating back)
    modal.style.display = "none";

    // Open modal when clicking the button
    openBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Ensure modal is closed when navigating back to the page or refreshing
    window.addEventListener("pageshow", function () {
        modal.style.display = "none"; // Hide modal when coming back to this page
    });
});
