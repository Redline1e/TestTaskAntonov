import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store";
import { removeTicket, clearCart } from "../store/cartSlice";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart: React.FC = () => {
  const tickets = useSelector((state: RootState) => state.cart.tickets);
  const dispatch = useDispatch();
  const total = tickets.reduce((sum, t) => sum + t.price, 0);

  if (!tickets.length) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Кошик порожній
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ваш кошик
      </Typography>
      <List>
        {tickets.map((t) => (
          <ListItem
            key={`${t.flightId}-${t.seat}`}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() =>
                  dispatch(removeTicket({ flightId: t.flightId, seat: t.seat }))
                }
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <Typography>
              Рейс {t.flightId} – місце {t.seat} – ${t.price}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Разом: ${total}
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => dispatch(clearCart())}
        sx={{ mt: 2 }}
      >
        Очистити кошик
      </Button>
    </Box>
  );
};

export default Cart;
