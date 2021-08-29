import React, { useState } from "react";
import { randomBagId, useBag } from "./hooks";

function App() {
  const [bagId, setBagId] = useState(randomBagId());
  const bag = useBag(bagId);

  return (
    <div>
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
      {bag && (
        <ul>
          {bag.items.map(
            ({ color = "#ffffff", name, description = "…" }, index) => {
              return (
                <li key={name + index} style={{ color }}>
                  {name} ({description})
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
