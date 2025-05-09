import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Flight } from "../types/flight";
import { getFlights } from "../api/flightsApi";
import StarIcon from "@mui/icons-material/Star";
import { formatDate } from "../utils/dateUtils";
import { loadFavorites } from "../utils/favorites";

const FavoritesPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const favorites = loadFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const all = await getFlights();
        // Фільтруємо лише ті рейси, що в улюблених
        setFlights(all.filter((f) => favorites.has(f.id)));
      } finally {
        setLoading(false);
      }
    })();
  }, [favorites]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (!flights.length)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Улюблених рейсів немає
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Улюблені рейси
      </Typography>
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
            sx={{ width: 300, cursor: "pointer", "&:hover": { boxShadow: 6 } }}
            onClick={() => navigate(`/flights/${f.id}`)}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <StarIcon color="warning" sx={{ verticalAlign: "middle" }} />{" "}
                {f.airline}
              </Typography>
              <Typography>
                {f.from} → {f.to}
              </Typography>
              <Typography>Відпр.: {formatDate(f.departureTime)}</Typography>
              <Typography>Приб.: {formatDate(f.arrivalTime)}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
