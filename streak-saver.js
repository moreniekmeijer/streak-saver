let taskCounter = 0;
let totalFreezes = 1;
let lastClickDate = null;

function isNewDay(lastDate) {
    const now = new Date();

    if (!lastDate) {
        console.log("No previous date, so it's a new day.");
        return true; // Eerste keer klikken, beschouw als nieuwe dag
    }

    const diffInMs = now - lastDate; // Verschil in milliseconden
    const diffInMinutes = diffInMs / (1000 * 5); // Omgerekend naar minuten

    return diffInMinutes >= 1; // Nieuwe dag (of minuut voor testdoeleinden)
}

function addTaskDone() {
    const today = new Date();

    // Controleer of een nieuwe dag is begonnen
    if (isNewDay(lastClickDate)) {
        taskCounter++;
        lastClickDate = today;
        document.getElementById("task-done-text").innerHTML = "Good job! You've got a " + taskCounter + " day(s) streak.";

        if (taskCounter === 5) {
            totalFreezes += generateFreezes();
            console.log(totalFreezes);
            if (generateFreezes() > 0) {
                document.getElementById("freeze-amount").innerHTML = "Nice, you've gained " + taskCounter + " freezes.";
            }
        }
    } else {
        console.log("Already done today!");
        document.getElementById("task-done-text").innerHTML = "Already done for today!";
    }
    console.log("freezeAmount: " + totalFreezes);
}

function generateFreezes() {
    let randomFreezesList = [2, 3, 4, 5, 6];
    return randomFreezesList[Math.floor(Math.random() * randomFreezesList.length)];
}

console.log(generateFreezes());