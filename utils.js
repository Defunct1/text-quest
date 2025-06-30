export function getStatColor(value, isStress = false) {
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
export function isAtLeast18(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const ageDiff = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    return (
      ageDiff > 18 ||
      (ageDiff === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    );
}