import axios from "axios";
import type { Flight } from "../types/flight";

const API_BASE =
  "https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights";

export async function getFlights(): Promise<Flight[]> {
  const response = await axios.get<Flight[]>(API_BASE);
  return response.data;
}

export async function getFlightById(id: string): Promise<Flight> {
  const response = await axios.get<Flight>(`${API_BASE}/${id}`);
  return response.data;
}
