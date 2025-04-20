const tasks = [
    { question: "Du hast deinen Hausschlüssel verloren.", answer: "..., wenn du deinen Hausschlüssel verloren hast?" },
    { question: "Dein Auto ist kaputt.", answer: "..., wenn dein Auto kaputt ist?" },
    { question: "Du hast deine Monatsfahrkarte vergessen.", answer: "..., wenn du deine Monatsfahrkarte vergessen hast?" },
    { question: "Du brauchst Geld.", answer: "..., wenn du Geld brauchst?" },
    { question: "Du triffst deinen Lieblingssänger auf der Straße.", answer: "..., wenn du deinen Lieblingssänger auf der Straße triffst?" },
    { question: "Dir ist kalt.", answer: "..., wenn dir kalt ist?" },
    { question: "Du bist müde.", answer: "..., wenn du müde bist?" },
    { question: "Du kannst nicht einschlafen.", answer: "..., wenn du nicht einschlafen kannst?" },
    { question: "Du vermisst deine Familie in der Heimat.", answer: "..., wenn du deine Familie in der Heimat vermisst?" },
    { question: "Du hast Zahnschmerzen.", answer: "..., wenn du Zahnschmerzen hast?" },
    { question: "Du hast dich verlaufen.", answer: "..., wenn du dich verlaufen hast?" },
    { question: "Du hast den Bus verpasst.", answer: "..., wenn du den Bus verpasst hast?" },
    { question: "Du brauchst Arbeit.", answer: "..., wenn du Arbeit brauchst?" },
    { question: "Du hast keine Lust auf Gemüse.", answer: "..., wenn du keine Lust auf Gemüse hast?" },
    { question: "Du bist traurig.", answer: "..., wenn du traurig bist?" },
    { question: "Du brauchst Hilfe bei der Hausaufgabe.", answer: "..., wenn du Hilfe bei der Hausaufgabe brauchst?" },
    { question: "Du hast 5000 Euro gewonnen.", answer: "..., wenn du 5000 Euro gewonnen hast?" },
    { question: "Du brauchst ein neues Sofa.", answer: "..., wenn du ein neues Sofa brauchst?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);