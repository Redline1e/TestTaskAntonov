import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress, IconButton } from "@mui/material";
import { green, red } from "@mui/material/colors";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useDispatch } from "react-redux";
import { addTicket } from "../store/cartSlice";
import type { Flight } from "../types/flight";
import { getFlightById } from "../api/flightsApi";
import type { Seat } from "../utils/seatGenerator";
import { generateSeats } from "../utils/seatGenerator";
import { formatDate } from "../utils/dateUtils";

const FlightDetailsPage: React.FC = () => {
  // Отримуємо параметр id з URL
  const { id } = useParams<{ id: string }>();

  // Стан для збереження даних рейсу
  const [flight, setFlight] = useState<Flight | null>(null);
  // Стан для індикатора завантаження
  const [loading, setLoading] = useState(true);
  // Стан для згенерованих місць
  const [seats, setSeats] = useState<Seat[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        // Завантажуємо дані рейсу за ID
        const data = await getFlightById(id);
        setFlight(data);
        // Генеруємо сітку місць
        setSeats(generateSeats());
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Показуємо спінер під час завантаження
  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  // Якщо рейс не знайдено
  if (!flight)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Рейс не знайдено
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {flight.airline} – {flight.id}
      </Typography>
      <Typography align="center">
        {flight.from} → {flight.to}
      </Typography>
      <Typography align="center">
        Відпр.: {formatDate(flight.departureTime)} | Приб.:{" "}
        {formatDate(flight.arrivalTime)}
      </Typography>
      <Typography align="center">Ціна: ${flight.price}</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 1,
          mt: 3,
        }}
      >
        {seats.map((s) => (
          <IconButton
            key={s.id}
            // Заборонити клік, якщо місце зайняте
            disabled={s.occupied}
            // При кліку додаємо квиток у корзину
            onClick={() =>
              dispatch(
                addTicket({
                  flightId: flight.id,
                  seat: s.id,
                  price: flight.price,
                })
              )
            }
            sx={{
              // Колір іконки залежить від зайнятості
              color: s.occupied ? red[500] : green[500],
              flexDirection: "column",
            }}
          >
            <EventSeatIcon />
            <Typography variant="caption">{s.id}</Typography>
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default FlightDetailsPage;
