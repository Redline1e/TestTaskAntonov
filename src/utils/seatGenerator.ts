export interface Seat {
  id: string;
  occupied: boolean;
}

//  Генерує масив Seat для візуалізації сітки
export function generateSeats(rows = 10, cols = 6): Seat[] {
  const seats: Seat[] = [];
  const letters = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r <= rows; r++) {
    for (let c = 0; c < cols; c++) {
      seats.push({
        id: `${r}${letters[c]}`,
        occupied: Math.random() < 0.3, // випадково зайняті місця з ймовірністю 30%
      });
    }
  }
  return seats;
}
