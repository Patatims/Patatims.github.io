document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("cyberLawsModal");
    const openBtn = document.getElementById("openCyberLaws");
    const closeBtn = document.querySelector(".close-btn");
    const viewFullBtn = document.getElementById("viewFullLaws");

    // Open the modal when button is clicked
    openBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close modal when close button is clicked
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

});
