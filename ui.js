// ui.js
import { player } from "./player.js";
import { scenes } from "./scenes.js";
import { getStatColor } from "./utils.js";

const npcIcon = document.getElementById("npc-icon");
const npcName = document.getElementById("npc-name");
const text = document.getElementById("text");
const choices = document.getElementById("choices");
const journal = document.querySelector(".journal");

export function showScene(sceneId, npcs) {
  console.log("Showing scene:", sceneId);
  const scene = scenes[sceneId];
  if (!scene) {
    console.error("Scene not found:", sceneId);
    return;
  }

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
        for (const key in choice.stats) {
          if (player.stats[key] !== undefined) {
            player.stats[key] += choice.stats[key];
          }
        }
      }
      if (choice.npcEffect) {
        const npc = npcs.find(n => n.id === choice.npcEffect.id);
        if (npc) npc.happiness += choice.npcEffect.happiness;
      }
      player.currentScene = choice.next;
      updateStats();
      showScene(choice.next, npcs); // <== передаємо npcs далі
    };
    choices.appendChild(button);
  });
}

export function updateStats() {
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
