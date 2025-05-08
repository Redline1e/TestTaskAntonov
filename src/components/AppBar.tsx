import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";

const MyAppBar: React.FC = () => {
    
  const cartCount = useSelector(
    (state: RootState) => state.cart.tickets.length
  );

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          AviaTickets
        </Typography>
        <IconButton color="inherit" onClick={() => navigate("/favorites")}>
          <FavoriteIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
