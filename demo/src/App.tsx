import React from "react";
import { useItemRarity, useRandomBag } from "./hooks";

function App() {
  const [bag, newBag] = useRandomBag();
  const itemsWithRarities = useItemRarity(bag.items);
  return (
    <div>
      <button onClick={newBag}>try another bag</button>
      <h1 style={{ color: "#ffffff" }}>Bag #{bag.id}</h1>
      {itemsWithRarities.map(
        ({ color = "#ffffff", name, description = "…" }, index) => {
          return (
            <p key={name + index} style={{ color }}>
              {name} ({description})
            </p>
          );
        }
      )}
    </div>
  );
}

export default App;
