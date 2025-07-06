// scenes.js

export const scenes = {
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
      text: "Обери свою долю!",
      choices: [
        { text: "Хочу вибрати інше", stats: { health: -2, reputation: -1, stress: 3 }, npcEffect: { id: "captain", happiness: -10 }, next: "fate_punish" },
        { text: "Прийняти свою долю", next: "journal" }
      ]
    },
    fate_punish: {
      npcId: "captain",
      text: "Нічого змінити не можна, кінь тобі копитом в грудь! Три наряди поза чергою!",
      choices: [
        { text: "Слухаюсь", next: "journal" }
      ]
    },
    journal: {
      npcId: "captain",
      text: "Заповни журнал, солдат! Треба внести свої дані.",
      choices: []
    },
    retreatEscapePunish : {
      npcId: "shkaralupa",
      text: "Стій, куди, бляха пішов по помитому? Ти що, думаєш, що втечеш від армії? Три наряди поза чергою!",
      choices: [
        { text: "Слухаюсь, відставити!", next: "intro" }
      ]
    }    
  };
  
  