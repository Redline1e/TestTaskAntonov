import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";
import MyAppBar from "./components/AppBar";
import FlightsPage from "./components/FlightsPage";
import FlightDetailsPage from "./components/FlightDetailsPage";
import Cart from "./components/Cart";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MyAppBar />
        <Routes>
          <Route path="/" element={<FlightsPage />} />
          <Route path="/flights/:id" element={<FlightDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
