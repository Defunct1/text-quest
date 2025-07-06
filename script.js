import { player } from "./player.js";
import { scenes } from "./scenes.js";
import { getStatColor, isAtLeast18 } from "./utils.js";
import { updateStats, showScene } from "./ui.js";
import { startTimer, waitRandomTime } from "./timer.js";
import { applySpecialtyBonus } from "./bonuses.js";

let npcs = []; // Завантажиться з npc.json
const form = document.getElementById("militaryForm");
const soldiers = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value;
  const specialty = document.getElementById("specialty").value;
  const maritalStatus = document.getElementById("maritalStatus").value;
  const hobbies = document.getElementById("hobbies").value.trim();

  const namePattern = /^[А-ЯІЄҐа-яієґ'\- ]{3,50}$/;
  const hobbyPattern = /^.{3,100}$/;

  if (!namePattern.test(name)) {
    alert("Тобі в іноземний легіон треба. Це в сусідню палатку");
    return;
  }

  if (!isAtLeast18(dob)) {
    alert("Вибач, солдате, але тобі має бути щонайменше 18 років.");
    return;
  }

  if (!hobbyPattern.test(hobbies)) {
    alert("Питань нема, ти фахівець, але давай по суті");
    return;
  }

  const newSoldier = {
    name,
    dob,
    specialty,
    maritalStatus,
    hobbies
  };

  soldiers.push(newSoldier);
  console.log("Новобранець доданий:", newSoldier);

  player.name = name;
  player.specialty = specialty;
  applySpecialtyBonus(specialty, player.stats);

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

  document.querySelector(".welcome-message").style.display = "block";
  document.querySelector(".form").style.display = "none";
  document.getElementById("choices").innerHTML = "";

  setTimeout(() => {
    const retreatButton = document.getElementById("retreat");
  
    if (!retreatButton) {
      console.warn("Кнопка 'Рота відбій' не знайдена в DOM!");
      return;
    }
  
    retreatButton.onclick = () => {
      startTimer();
  
      // 👇 Задаємо сцени ПЕРЕД викликом showScene
      scenes.journal.choices = [
        {
          text: "Взяти папірці і втекти",
          onclick: async () => {
            document.getElementById("text").textContent = "Ти вирішив втекти з армії, але це не так просто...";
            await waitRandomTime(2000, 5000);
            player.currentScene = "retreatEscapePunish";
            updateStats();
            showScene("retreatEscapePunish", npcs);
          }
        }
      ];
  
      // ✅ Відображення сцени після налаштування
      showScene("journal", npcs);
    };
  }, 0);
  
});
// Додаємо сцени вручну
scenes.training = {
  npcId: "captain",
  text: "Вітаю, солдат! Час тренуватися!",
  choices: [{ text: "Почати тренування", next: "intro" }]
};

scenes.escape = {
  text: "Ти втік, але армія тебе наздожене!",
  choices: [{ text: "Спробувати ще раз", next: "intro" }]
};

// Завантаження NPC з JSON
document.addEventListener("DOMContentLoaded", () => {
  fetch("npc.json")
    .then(response => response.json())
    .then(data => {
      npcs.length = 0;
      npcs.push(...data); // Модифікуємо вже існуючий масив
      showScene(player.currentScene, npcs);
      updateStats();
    })
    .catch(error => console.error("Помилка завантаження npc.json:", error));
});	
