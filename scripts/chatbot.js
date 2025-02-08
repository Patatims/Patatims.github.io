document.addEventListener("DOMContentLoaded", function () {
    const chatboxMessages = document.getElementById("chatbox-messages");
    const sendMessageButton = document.querySelector(".chatbox-footer button");
    const userInput = document.getElementById("user-input");
    
    let chatbotData = {};
    let datasetLoaded = false;

    // Load Chatbot Data from JSON
    fetch("scripts/chatbot_dataset.json")
        .then(response => response.json())
        .then(data => {
            chatbotData = data;
            datasetLoaded = true;
            console.log("✅ Chatbot dataset successfully loaded!");
        })
        .catch(error => {
            console.error("❌ Error loading chatbot dataset:", error);
            chatboxMessages.innerHTML += `<p><strong>Chatbot:</strong> Error loading chatbot data. Please try again later.</p>`;
        });

    function sendMessage() {
        let userQuestion = userInput.value.trim();
        if (userQuestion === "") return;

        chatboxMessages.innerHTML += `<p><strong>You:</strong> ${userQuestion}</p>`;
        userInput.value = "";

        chatboxMessages.innerHTML += `<p id="typing-animation"><em>Chatbot is typing...</em></p>`;
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

        setTimeout(() => {
            document.getElementById("typing-animation").remove();
            let botResponse = getBestMatch(userQuestion) || chatbotData["default"];
            botResponse = formatResponse(botResponse);
            chatboxMessages.innerHTML += `<p><strong>Chatbot:</strong><br>${botResponse.replace(/\n/g, "<br>")}</p>`;
            chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
        }, Math.floor(Math.random() * 1000) + 1000);
    }

    function getBestMatch(input) {
        input = input.toLowerCase().trim();
        if (!datasetLoaded) return null;

        let bestMatch = null;
        let highestScore = 0;
        Object.keys(chatbotData).forEach(question => {
            let score = similarityScore(input, question.toLowerCase());
            if (score > highestScore) {
                highestScore = score;
                bestMatch = question;
            }
        });

        return highestScore > 0.40 ? chatbotData[bestMatch] : findSimilarQuestion(input);
    }

    function findSimilarQuestion(input) {
        const helpResponses = [
            "I can assist you with cybercrime-related queries. Try asking about DDoS attacks, phishing, or online scams.",
            "Need help? You can ask about common scams, how to report cybercrime, or ways to stay safe online.",
            "I'm here to help! Ask me about online security, scam prevention, or digital safety tips.",
            "Cybersecurity is important! I can answer questions about fraud, identity theft, and hacking threats."
        ];
        
        if (input.includes("help") || input.includes("assist")) {
            return helpResponses[Math.floor(Math.random() * helpResponses.length)];
        }
        
        if (input.includes("example") || input.includes("like what")) {
            return "You can ask me things like 'What is phishing?', 'How do I report a scam?', or 'What are the signs of a fraudulent website?'";
        }
        
        return "❓ I'm not sure about that. Try asking something related to cybercrime, online scams, or security.";
    }

    function formatResponse(response) {
        return response
            .replace(/✅/g, "✅ ")
            .replace(/⚠️/g, "⚠️ ")
            .replace(/💡/g, "💡 ")
            .replace(/\n\n/g, "<br><br>") // Ensure line breaks render properly
            .replace(/\n/g, "<br>");
    }

    function similarityScore(str1, str2) {
        let longer = str1.length > str2.length ? str1 : str2;
        let shorter = str1.length > str2.length ? str2 : str1;
        let longerLength = longer.length;

        if (longerLength === 0) return 1.0;

        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
        let costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i == 0) costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0) costs[s2.length] = lastValue;
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
