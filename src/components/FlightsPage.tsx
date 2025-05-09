import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Flight } from "../types/flight";
import { getFlights } from "../api/flightsApi";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { formatDate } from "../utils/dateUtils";

const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Сортування за ціною: true = зростання, false = спадання
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Завантажуємо всі рейси
        const data = await getFlights();
        setFlights(data);
      } catch {
        setError("Не вдалося завантажити рейси");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Зміна порядку сортування за ціною
  const handleSort = () => {
    setFlights((prev) =>
      [...prev].sort((a, b) =>
        sortAsc ? a.price - b.price : b.price - a.price
      )
    );
    setSortAsc(!sortAsc);
  };

  // Додавання/видалення рейсу в улюблені
  const toggleFav = () => {};

  // Показ спінера або помилки
  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Доступні рейси
      </Typography>
      {/* Кнопка сортування */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button variant="contained" onClick={handleSort} sx={{ px: 3 }}>
          Сортувати за ціною ({sortAsc ? "зростання" : "спадання"})
        </Button>
      </Box>
      {/* Контейнер карток */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {flights.map((f) => (
          <Card
            key={f.id}
            sx={{
              width: 300,
              cursor: "pointer",
              position: "relative",
              "&:hover": { boxShadow: 6 },
            }}
          >
            {/* Кнопка улюблених */}
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => toggleFav()}
            >
              <StarBorderIcon />
            </IconButton>
            {/* Переходить до деталей при кліку */}
            <CardContent onClick={() => navigate(`/flights/${f.id}`)}>
              <Typography variant="h6" gutterBottom>
                {f.airline}
              </Typography>
              <Typography>
                {f.from} → {f.to}
              </Typography>
              <Typography>Відпр.: {formatDate(f.departureTime)}</Typography>
              <Typography>Приб.: {formatDate(f.arrivalTime)}</Typography>
              <Typography sx={{ mt: 1 }}>Ціна: ${f.price}</Typography>
              <Typography>
                Терм.: {f.terminal} | Gate {f.gate}
              </Typography>
              <Typography>
                Квитків: {f.tickets?.remaining ?? 0}/{f.tickets?.total ?? 0}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FlightsPage;
