document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.querySelector(".chatbot-widget");
    const chatbox = document.getElementById("chatbox");
    const chatboxMessages = document.getElementById("chatbox-messages");
    const sendMessageButton = document.querySelector(".chatbox-footer button");
    const userInput = document.getElementById("user-input");

    let chatbotData = {};
    let datasetLoaded = false;

    // 🔹 Load Chatbot Data from JSON
    fetch("scripts/chatbot_dataset.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load chatbot dataset.");
            }
            return response.json();
        })
        .then(data => {
            chatbotData = data;
            datasetLoaded = true;
            console.log("✅ Chatbot dataset successfully loaded!");
        })
        .catch(error => {
            console.error("❌ Error loading chatbot dataset:", error);
            chatbotMessages.innerHTML += `<p><strong>Chatbot:</strong> Error loading chatbot data. Please try again later.</p>`;
        });

    function toggleChatbox() {
        chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
    }

    function sendMessage() {
        let userQuestion = userInput.value.trim();
        if (userQuestion === "") return;

        // Clear input field after sending
        userInput.value = "";

        // Ensure dataset is loaded before responding
        if (!datasetLoaded) {
            chatboxMessages.innerHTML += `<p><strong>Chatbot:</strong> Please wait... I am still loading my knowledge. Try again in a moment.</p>`;
            return;
        }

        // Display user's message
        chatboxMessages.innerHTML += `<p><strong>You:</strong> ${userQuestion}</p>`;

        // Typing Animation
        chatboxMessages.innerHTML += `<p id="typing-animation"><em>Chatbot is typing...</em></p>`;
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

        setTimeout(() => {
            document.getElementById("typing-animation").remove(); // Remove typing animation

            // 🔹 Get best match from dataset
            let botResponse = getBestMatch(userQuestion) || chatbotData["default"] || "Hmm... I didn't quite get that. Could you rephrase it? 😊";

            // Display chatbot response
            chatboxMessages.innerHTML += `<p><strong>Chatbot:</strong> ${botResponse}</p>`;
            chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
        }, Math.floor(Math.random() * 1000) + 1000); // Random delay (1s - 2s) to feel more human
    }

    function getBestMatch(input) {
        input = input.toLowerCase().trim();
        console.log("🔍 Searching for:", input);

        if (!datasetLoaded) return null;

        // 🔹 Direct Match Check
        if (chatbotData[input]) {
            return chatbotData[input];
        }

        // 🔹 Fuzzy Match Check
        let bestMatch = null;
        let highestScore = 0;
        Object.keys(chatbotData).forEach(question => {
            let questionLower = question.toLowerCase();
            let score = similarityScore(input, questionLower);
            if (score > highestScore) {
                highestScore = score;
                bestMatch = question;
            }
        });

        console.log("🔹 Best Match Found:", bestMatch, "with score:", highestScore);
        return highestScore > 0.55 ? chatbotData[bestMatch] : null;
    }

    function similarityScore(str1, str2) {
        let longer = str1.length > str2.length ? str1 : str2;
        let shorter = str1.length > str2.length ? str2 : str1;
        let longerLength = longer.length;

        if (longerLength === 0) return 1.0;

        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        let costs = new Array();
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    sendMessageButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
