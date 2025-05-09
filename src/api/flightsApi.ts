import axios from "axios";
import type { Flight } from "../types/flight";

// Базовий URL для запитів до API рейсів
const API_BASE =
  "https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights";

//  Отримати всі рейси
export async function getFlights(): Promise<Flight[]> {
  const response = await axios.get<Flight[]>(API_BASE);
  return response.data;
}

//  Отримати деталі конкретного рейсу за ID
export async function getFlightById(id: string): Promise<Flight> {
  const response = await axios.get<Flight>(`${API_BASE}/${id}`);
  return response.data;
}
