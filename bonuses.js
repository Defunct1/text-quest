export function applySpecialtyBonus(specialty, stats) {
    switch (specialty) {
        case "Хакер":
            stats.reputation += 8;
            stats.aura += 3;
            stats.stress += 4;
            stats.money += 15;
            break;
        case "Сатаніст":
            stats.aura += 10;
            stats.reputation -= 5;
            stats.stress += 3;
            stats.kinism += 7;
            break;
        case "Механік":
          stats.health += 7;
          stats.reputation += 5;
          stats.stress += 3;
          stats.money += 10;
          break;
        case "Різноробочий":
            stats.health += 5;
            stats.stress += 5;
            stats.kinism += 10;
            stats.money += 5;
            break;
        case "Работяга":
            stats.health += 8;
            stats.stress += 7;
            stats.reputation += 3;
            stats.money += 8;
            break;
        case "Штучний інтелект":
            stats.aura += 15;
            stats.reputation += 10;
            stats.stress -= 10; // Без стресу
            stats.kinism += 5;
            break;
        case "Боксер":
            stats.health += 12;
            stats.reputation += 7;
            stats.stress += 6;
            stats.kinism += 8;
            break;
        case "Спиртяга":
            stats.health -= 5;
            stats.stress -= 3; // Алкоголь знімає стрес
            stats.kinism += 15;
            stats.reputation -= 3;
            break;
        case "ФОП":
            stats.money += 20;
            stats.stress += 10;
            stats.reputation += 2;
            stats.health -= 3;
            break;
        case "Студент":
            stats.reputation += 3;
            stats.stress += 8;
            stats.money -= 10;
            stats.aura += 2;
            break;
        case "Фельдшер":
            stats.health += 10;
            stats.aura += 5;
            stats.stress += 5;
            stats.reputation += 7;
            break;
        case "Вчитель":
            stats.reputation += 8;
            stats.aura += 7;
            stats.stress += 12;
            stats.money += 5;
            break;
        case "Ентузіаст":
            stats.aura += 10;
            stats.reputation += 5;
            stats.stress -= 2;
            stats.health += 3;
            break;
        case "HR":
            stats.reputation += 5;
            stats.stress += 15;
            stats.money += 12;
            stats.health -= 2;
            break;
        case "Снайпер":
            stats.health += 5;
            stats.reputation += 10;
            stats.stress += 5;
            break;
        case "Медик":
            stats.health += 10;
            stats.aura += 5;
            stats.stress += 2;
            break;
        case "Драконоборець":
            stats.kinism += 10;
            stats.stress += 5;
            stats.reputation += 5;
            break;
        case "Фізик":
            stats.reputation += 10;
            stats.aura += 5;
            stats.stress += 2;
            break;
        case "Сапер":
            stats.health += 5;
            stats.kinism += 5;
            stats.stress += 5;
            break;
        default:
          stats.reputation += 5;
          stats.stress += 2;
    }
}

  