export function loadFavorites(): Set<string> {
  const raw = localStorage.getItem("favorites");
  return raw ? new Set(JSON.parse(raw)) : new Set();
}

export function saveFavorites(favs: Set<string>) {
  localStorage.setItem("favorites", JSON.stringify(Array.from(favs)));
}
