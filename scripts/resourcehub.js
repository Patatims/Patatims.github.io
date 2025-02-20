document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".menu-btn");
    const title = document.getElementById("content-title");
    const text = document.getElementById("content-text");

    // Content Data for Each Section
    const contentData = {
        about: { title: "About", text: "Learn more about ClickSmart and our mission to combat cybercrime." },
        offline: { title: "Offline Resources", text: "Download guides, legal references, and reports for offline access." },
        news: { title: "Cybercrime News", text: "Stay updated with the latest cybercrime incidents and awareness campaigns." },
        articles: { title: "Educational Articles", text: "Read expert insights, cybersecurity tips, and fraud prevention techniques." },
        projects: { title: "Cybercrime Prevention Projects", text: "Explore initiatives focused on preventing financial fraud and online scams." },
        "pnp-acg": { title: "PNP-ACG Branches", text: "Find Philippine National Police Anti-Cybercrime Group branches near you." }
    };

    // Event Listener for Buttons
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedContent = contentData[this.dataset.content];
            title.textContent = selectedContent.title;
            text.textContent = selectedContent.text;
        });
    });
});
