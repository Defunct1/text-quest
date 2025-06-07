let player = {
    id: "user123",
    stats: { health: 0, money: 0, reputation: 0, aura: 0, kinism: 0, stress: 0 },
    currentScene: "intro"
};

let npcs = [];

const scenes = {
    intro: {
        text: "Як ти потрапив у армію?",
        choices: [
            { text: "Йшов, перечепився і опинився в частині", stats: { health: -5, money: -50, kinism: 10, stress: 5 }, next: "fate" },
            { text: "Мобілізували", stats: { health: -2, money: -20, reputation: 5, aura: -2, kinism: 5, stress: 10 }, next: "fate" },
            { text: "Сам прийшов", stats: { health: 5, reputation: 10, aura: 5 }, next: "fate" },
            { text: "Не сам прийшов", stats: { health: -3, money: -10, reputation: -5, aura: -3, kinism: 7, stress: 7 }, next: "fate" },
            { text: "Знайомий сказав, що безкоштовно годують і одягають", stats: { health: 3, money: -5, reputation: -2, aura: 2, kinism: 3, stress: 3 }, next: "fate" },
            { text: "Прийшов, побачив, почав служити", stats: { health: 7, money: 10, reputation: 7, aura: 3, kinism: -5, stress: -2 }, next: "fate" },
            { text: "Потяг поїхав не туди", stats: { health: -4, money: -30, reputation: -3, kinism: 10, stress: 10 }, next: "fate" },
            { text: "Всі зірки направили в частину, коли заблукав в лісі", stats: { health: 2, money: -10, reputation: 5, aura: 10, kinism: -2 }, next: "fate" },
            { text: "Наслідник давнього клану воїнів", stats: { health: 10, money: 20, reputation: 15, aura: 8, kinism: -5, stress: -5 }, next: "fate" },
            { text: "Прийшов навчитись військовій справі, аби боронити країну", stats: { health: 8, reputation: 12, aura: 7, kinism: -3, stress: -3 }, next: "fate" }
        ]
    },
    fate: {
        npcId: "captain",
        text: "Обери свою долю, солдат!",
        choices: [
            { text: "Хочу вибрати інше", stats: { health: -2, reputation: -1, stress: 3 }, npcEffect: { id: "captain", happiness: -10 }, next: "fate_punish" },
            { text: "Прийняти свою долю", next: "journal" }
        ]
    },
    fate_punish: {
        npcId: "captain",
        text: "Нічого змінити не можна, кінь тобі копитом в грудь! Три наряди поза чергою!",
        choices: [{ text: "Прийняти свою долю", next: "journal" }]
    },
    journal: {
        npcId: "captain",
        text: "Заповни журнал, солдат! Треба внести свої дані.",
        choices: []
    }
};

function getStatColor(value, isStress = false) {
    const max = 50; // Максимум при 50
    const intensity = Math.min(Math.abs(value) / max, 1);
    const sign = value >= 0 ? 1 : -1;

    if (value === 0) {
        return `rgb(128, 128, 128)`;
    }

    if (isStress) {
        // Стрес: червоний (50), зелений (-50)
        const red = Math.floor(128 + (sign === 1 ? 127 : -128) * intensity);
        const green = Math.floor(128 + (sign === 1 ? -128 : 127) * intensity);
        const blue = 128;
        return `rgb(${red}, ${green}, ${blue})`;
    } else {
        // Інші: зелений (50), червоний (-50)
        const red = Math.floor(128 + (sign === 1 ? -128 : 127) * intensity);
        const green = Math.floor(128 + (sign === 1 ? 127 : -128) * intensity);
        const blue = 128;
        return `rgb(${red}, ${green}, ${blue})`;
    }
}

function updateStats() {
    const statElements = {
        health: document.getElementById("health"),
        money: document.getElementById("money"),
        reputation: document.getElementById("reputation"),
        aura: document.getElementById("aura"),
        kinism: document.getElementById("kinism"),
        stress: document.getElementById("stress")
    };

    Object.keys(player.stats).forEach(key => {
        statElements[key].textContent = player.stats[key];
        statElements[key].style.color = getStatColor(player.stats[key], key === "stress");
    });
}

function showScene(sceneId) {
    console.log("Showing scene:", sceneId);
    const scene = scenes[sceneId];
    if (!scene) {
        console.error("Scene not found:", sceneId);
        return;
    }

    const npcIcon = document.getElementById("npc-icon");
    const npcName = document.getElementById("npc-name");
    const text = document.getElementById("text");
    const choices = document.getElementById("choices");
    const journal = document.querySelector(".journal");

    text.textContent = scene.text;
    npcIcon.innerHTML = "";
    npcName.textContent = "";
    choices.innerHTML = "";
    journal.style.display = sceneId === "journal" ? "block" : "none";

    if (scene.npcId) {
        const npc = npcs.find(n => n.id === scene.npcId);
        if (npc) {
            npcIcon.innerHTML = `<img src="${npc.icon}" alt="icon" width="32">`;
            npcName.textContent = npc.name;
        }
    }

    scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => {
            console.log("Button clicked, next:", choice.next);
            if (choice.stats) {
                Object.keys(choice.stats).forEach(key => {
                    player.stats[key] += choice.stats[key];
                });
            }
            if (choice.npcEffect) {
                const npc = npcs.find(n => n.id === choice.npcEffect.id);
                if (npc) npc.happiness += choice.npcEffect.happiness;
            }
            console.log(player.stats);
            player.currentScene = choice.next;
            updateStats();
            showScene(choice.next);
        };
        choices.appendChild(button);
    });
}

function startTimer() {
    const timerElement = document.querySelector(".timer");
    function updateTimer() {
        const now = new Date();
        const tommorow = new Date(now);
        tommorow.setDate(now.getDate(+1));
        tommorow.setHours(6, 0, 0, 0);

        if (timeLeft <= 0) {
            timerElement.textContent = "РОТА ПІДЙОМ, ШИКУВАННЯ ЧЕРЕЗ 2 СЕКУНДИ";
            return
        }
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        timerElement.textContent = `До підйому залишилось: ${hours} год ${minutes} хв ${seconds} сек`
        setTimeout(updateTimer, 1000);
    }
}

// Обробка форми журналу
document.getElementById("militaryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const specialty = document.getElementById("specialty").value;
    const maritalStatus = document.getElementById("maritalStatus").value;
    const hobbies = document.getElementById("hobbies").value;

    const entry = document.createElement("div");
    entry.className = "entry";
    entry.innerHTML = `<p><strong>${name}</strong>, ${dob}, ${specialty}, ${maritalStatus}, ${hobbies}</p>`;
    document.querySelector(".entries").appendChild(entry);

    player.name = name;
    player.specialty = specialty;

    // Зміна статів залежно від спеціальності
    const tbody = document.querySelector(".entries tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${dob}</td>
        <td>${specialty}</td>
        <td>${maritalStatus}</td>
        <td>${hobbies}</td>
    `;
    tbody.appendChild(row);


switch (specialty) {
    case "Хакер":
        player.stats.reputation += 8;
        player.stats.aura += 3;
        player.stats.stress += 4;
        player.stats.money += 15; // Хакери заробляють
        break;
    case "Сатаніст":
        player.stats.aura += 10;
        player.stats.reputation -= 5;
        player.stats.stress += 3;
        player.stats.kinism += 7;
        break;
    case "Механік":
        player.stats.health += 7;
        player.stats.reputation += 5;
        player.stats.stress += 3;
        player.stats.money += 10;
        break;
    case "Різноробочий":
        player.stats.health += 5;
        player.stats.stress += 5;
        player.stats.pohuism += 10;
        player.stats.money += 5;
        break;
    case "Работяга":
        player.stats.health += 8;
        player.stats.stress += 7;
        player.stats.reputation += 3;
        player.stats.money += 8;
        break;
    case "Штучний інтелект":
        player.stats.aura += 15;
        player.stats.reputation += 10;
        player.stats.stress -= 10; // Без стресу
        player.stats.kinism += 5;
        break;
    case "Боксер":
        player.stats.health += 12;
        player.stats.reputation += 7;
        player.stats.stress += 6;
        player.stats.kinism += 8;
        break;
    case "Спиртяга":
        player.stats.health -= 5;
        player.stats.stress -= 3; // Алкоголь знімає стрес
        player.stats.pohuism += 15;
        player.stats.reputation -= 3;
        break;
    case "ФОП":
        player.stats.money += 20;
        player.stats.stress += 10;
        player.stats.reputation += 2;
        player.stats.health -= 3;
        break;
    case "Студент":
        player.stats.reputation += 3;
        player.stats.stress += 8;
        player.stats.money -= 10;
        player.stats.aura += 2;
        break;
    case "Фельдшер":
        player.stats.health += 10;
        player.stats.aura += 5;
        player.stats.stress += 5;
        player.stats.reputation += 7;
        break;
    case "Вчитель":
        player.stats.reputation += 8;
        player.stats.aura += 7;
        player.stats.stress += 12;
        player.stats.money += 5;
        break;
    case "Ентузіаст":
        player.stats.aura += 10;
        player.stats.reputation += 5;
        player.stats.stress -= 2;
        player.stats.health += 3;
        break;
    case "HR":
        player.stats.reputation += 5;
        player.stats.stress += 15;
        player.stats.money += 12;
        player.stats.health -= 2;
        break;
    case "Снайпер":
        player.stats.health += 5;
        player.stats.reputation += 10;
        player.stats.stress += 5;
        break;
    case "Медик":
        player.stats.health += 10;
        player.stats.aura += 5;
        player.stats.stress += 2;
        break;
    case "Драконоборець":
        player.stats.kinism += 10;
        player.stats.stress += 5;
        player.stats.reputation += 5;
        break;
    case "Фізик":
        player.stats.reputation += 10;
        player.stats.aura += 5;
        player.stats.stress += 2;
        break;
    case "Сапер":
        player.stats.health += 5;
        player.stats.kinism += 5;
        player.stats.stress += 5;
        break;
    default:
        player.stats.reputation += 5;
        player.stats.stress += 2;
}
// Показати привітання і кнопку "Рота відбій"
    const welcomeMessage = document.querySelector(".welcome-message");
    welcomeMessage.style.display = "block";
    document.getElementById("retreat").onclick = () => {
        startTimer();
        scenes.journal.choices = [
        { text: "Служити за спеціальністю", stats: { reputation: 10, stress: 5 }, next: "training" },
        { text: "Взяти папірці і втекти", stats: { kinism: 10, stress: 10, reputation: -5 }, next: "escape" }
    ];
    showScene("journal");
};

this.reset();
updateStats();
});

const training = {
    npcId: "captain",
    text: "Вітаю, солдат! Час тренуватися!",
    choices: [{ text: "Почати тренування", next: "intro" }]
};

const escape = {
    text: "Ти втік, але армія тебе наздожене!",
    choices: [{ text: "Спробувати ще раз", next: "intro" }]
};

scenes.training = training;
scenes.escape = escape;

document.addEventListener("DOMContentLoaded", () => {
    fetch("npc.json")
        .then(response => response.json())
        .then(data => {
            npcs = data;
            showScene(player.currentScene);
            updateStats();
        })
        .catch(error => console.error("Помилка завантаження npc.json:", error));
});