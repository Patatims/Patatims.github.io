document.addEventListener("DOMContentLoaded", function () {
    const guideWrappers = document.querySelectorAll(".guide-wrapper");
    const modal = document.getElementById("cybercrime-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalGrid = document.getElementById("modal-grid");
    const secondModal = document.getElementById("cybercrime-second-modal");

    // Remove the close button (if it exists)
    document.querySelectorAll(".close-second-modal").forEach(btn => btn.remove());

    // 🔹 All Cybercrime Categories and Their Sub-Crimes
    const cybercrimeData = {
        personal: {
            title: "Personal Cybercrimes",
            description: "Cybercrimes that target individuals, affecting their privacy, finances, and security.",
            crimes: [
                { type: "scams-online-fraud", name: "Scams & Online Fraud" },
                { type: "financial-fraud", name: "Financial Fraud" },
                { type: "identity-theft", name: "Identity Theft" },
                { type: "phishing-attacks", name: "Phishing Attacks" },
                { type: "ransomware-malware-attacks", name: "Ransomware & Malware" },
                { type: "hacking-unauthorized-account-access", name: "Hacking & Unauthorized Access" },
                { type: "cyberstalking-online-harassment", name: "Cyberstalking & Online Harassment" },
                { type: "sextortion-revenge-porn", name: "Sextortion & Revenge Porn" },
                { type: "online-shopping-fraud", name: "Online Shopping Fraud" },
                { type: "fake-social-media-profiles-catfishing", name: "Fake Social Media Profiles & Catfishing" },
                { type: "online-defamation-doxxing", name: "Online Defamation & Doxxing" },
                { type: "child-exploitation-grooming", name: "Child Exploitation & Grooming" }
            ]
        }
    };

    // 🔹 First Modal (Cybercrime List)
    guideWrappers.forEach(wrapper => {
        wrapper.addEventListener("click", function () {
            const type = this.dataset.type;
            if (cybercrimeData[type]) {
                openModal(cybercrimeData[type]);
            }
        });
    });

    function openModal(data) {
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalGrid.innerHTML = ""; // Clear previous items

        data.crimes.forEach(crime => {
            const card = document.createElement("div");
            card.classList.add("cybercrime-card");
            card.setAttribute("data-type", crime.type);
            card.innerHTML = `<h3>${crime.name}</h3>`;
            modalGrid.appendChild(card);
        });

        modal.classList.add("active");
        document.body.classList.add("modal-open");

        document.querySelectorAll(".cybercrime-card").forEach(card => {
            card.addEventListener("click", function () {
                openSecondModal(this.dataset.type);
            });
        });
    }

    // 🔹 Open Second Modal (Hardcoded HTML Sections)
    function openSecondModal(crimeType) {
        document.querySelectorAll(".cybercrime-details").forEach(detail => {
            detail.style.display = "none"; // Hide all crime details
        });

        const selectedCrime = document.getElementById(crimeType);
        if (selectedCrime) {
            selectedCrime.style.display = "block";
            secondModal.classList.add("active");
        }
    }

    // 🔹 Close Modals on Background Click
    secondModal.addEventListener("click", function (event) {
        if (!event.target.closest(".second-modal-content")) {
            secondModal.classList.remove("active");
        }
    });

    modal.addEventListener("click", function (event) {
        if (!event.target.closest(".modal-content")) {
            modal.classList.remove("active");
            document.body.classList.remove("modal-open");
        }
    });
});
