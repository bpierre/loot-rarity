import React, { useState } from "react";
import { randomBagId, useBag } from "./hooks";

function App() {
  const [bagId, setBagId] = useState(randomBagId());
  const bag = useBag(bagId);

  return (
    <div className="app">
      <div className="header">
        <h1>Loot Rarity Check</h1>
        <h2>
          <label htmlFor="bag-input">Bag #</label>

          <input
            id="bag-input"
            value={bagId ?? ""}
            onChange={(event) => {
              const value = event.currentTarget.value.trim();
              if (value === "") {
                setBagId("");
                return;
              }
              const numId = Number(value);
              if (!isNaN(numId) && numId > 0 && numId <= 8000) {
                setBagId(value);
              }
            }}
          />
          <button onClick={() => setBagId(randomBagId())}>random</button>
        </h2>
      </div>
      {bag && (
        <ul className="bag">
          {bag.items.map(
            ({ color = "#ffffff", name, description = "…" }, index) => {
              return (
                <li key={name + index} style={{ color }}>
                  {name} ({description.slice(0, 1)})
                </li>
              );
            }
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
