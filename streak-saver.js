let taskCounter = 0;
let totalFreezes = 0;
let lastClickDate = null;

// Opslaan in localStorage
function saveToLocalStorage() {
    localStorage.setItem("taskCounter", taskCounter);
    localStorage.setItem("totalFreezes", totalFreezes);
    localStorage.setItem("lastClickDate", lastClickDate ? lastClickDate.toISOString() : null);
}

// Laden vanuit localStorage
function loadFromLocalStorage() {
    taskCounter = parseInt(localStorage.getItem("taskCounter")) || 0;
    totalFreezes = parseInt(localStorage.getItem("totalFreezes")) || 0;
    lastClickDate = localStorage.getItem("lastClickDate") ? new Date(localStorage.getItem("lastClickDate")) : null;
}

// Check of het een nieuwe kalenderdag is
function isNewDay(lastDate) {
    const today = new Date().setHours(0, 0, 0, 0); // Huidige datum zonder tijd
    const lastDay = lastDate ? new Date(lastDate).setHours(0, 0, 0, 0) : null; // Laatste klikdatum zonder tijd

    return !lastDay || today > lastDay; // Nieuwe dag als vandaag na de laatste klikdatum is
}

// Check op nieuwe dag en update indien nodig
function handleNewDay() {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastDay = lastClickDate ? new Date(lastClickDate).setHours(0, 0, 0, 0) : null;

    // Check of dagen zijn gemist
    if (!lastDay || today > lastDay) {
        const missedDays = Math.floor((today - lastDay) / (1000 * 60 * 60 * 24)) || 1; // Aantal gemiste dagen
        totalFreezes = Math.max(0, totalFreezes - missedDays);
        lastClickDate = null; // Geen geldige klik vandaag
    }

    // Controleer of freezes op zijn
    if (totalFreezes === 0) {
        taskCounter = 0; // Reset streak
        lastClickDate = null; // Reset laatste klikdatum
        console.log("No freezes left. Streak and freezes reset!");
    }

    saveToLocalStorage(); // Sla wijzigingen op
    updateUI(); // Werk de interface bij
}

// Actie bij klikken op de knop
function addTaskDone() {
    const today = new Date();

    // Controleer of het een nieuwe dag is
    if (isNewDay(lastClickDate)) {
        taskCounter++;
        lastClickDate = today;

        // Voeg onder voorwaarde freezes toe om de 5 dagen
        if (taskCounter % 5 === 0) {
            if (totalFreezes < 3) totalFreezes += generateFreezes();
        }

        document.getElementById("task-done-text").innerHTML = `Good job! Streak: ${taskCounter} day(s).`;
    } else {
        document.getElementById("task-done-text").innerHTML = "Already done for today!";
    }

    saveToLocalStorage();
    updateUI();
}

// Update de gebruikersinterface
function updateUI() {
    document.getElementById("freeze-amount").innerHTML = `Freezes: ${totalFreezes}`;
    document.getElementById("streak-amount").innerHTML = `Streak: ${taskCounter} day(s).`;
}

// Bij het laden van de pagina
window.onload = function () {
    loadFromLocalStorage();
    handleNewDay();
    updateUI();
};

let difficulty = "easy"; // Standaard moeilijkheidsgraad

// Functie om de moeilijkheidsgraad bij te werken
function updateDifficulty() {
    difficulty = document.getElementById("difficulty").value; // Werk de globale moeilijkheidsgraad bij
    console.log(`Difficulty set to: ${difficulty}`);
}

// Generate freezes op basis van de geselecteerde moeilijkheidsgraad
function generateFreezes() {
    let randomFreezesList = {
        easy: [1, 2, 3],
        medium: [0, 1, 2],
        hard: [0, 1]
    };

    const selectedList = randomFreezesList[difficulty];
    return selectedList[Math.floor(Math.random() * selectedList.length)];
}

function resetData() {
    // Reset alle waarden naar hun beginsituatie
    taskCounter = 0;
    totalFreezes = 1;
    lastClickDate = null;

    // Sla de reset-waarden op in localStorage
    saveToLocalStorage();

    // Werk de UI bij
    updateUI();

    // Geef feedback aan de gebruiker
    document.getElementById("task-done-text").innerHTML = "You started a new streak";
    document.getElementById("reset-text").innerHTML = "Data has been reset!";
    console.log("Streak and freezes have been reset.");
}

