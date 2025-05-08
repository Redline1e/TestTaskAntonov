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
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState<Seat[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getFlightById(id);
        setFlight(data);
        setSeats(generateSeats());
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
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
            disabled={s.occupied}
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
