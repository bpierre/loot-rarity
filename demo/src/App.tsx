import React, { useState } from "react";
import { randomBagId, useBag } from "./hooks";

function App() {
  const [bagId, setBagId] = useState(randomBagId());
  const [svgMode, setSvgMode] = useState(false);
  const bag = useBag(bagId);
  return (
    <div className="app">
      <div className="header">
        <h1>Loot Rarity Demo</h1>
        <h2>
          <label htmlFor="bag-input">Bag #</label>

          <input
            id="bag-input"
            type="text"
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
        <div className="svg-mode">
          <label>
            svg mode
            <input
              type="checkbox"
              checked={svgMode}
              onChange={() => setSvgMode((v) => !v)}
            />
          </label>
        </div>
      </div>
      {bag &&
        (svgMode ? (
          <div className="bag">
            <img src={bag.image} alt="" />
          </div>
        ) : (
          <ul className="bag">
            {bag?.items.map(({ color = "#ffffff", name }, index) => {
              return (
                <li key={name + index} style={{ color }}>
                  {name}
                </li>
              );
            })}
          </ul>
        ))}
      <footer>
        <p>
          {/*Custom colors: <span style={{ color: "cyan" }}>divine</span> items,{" "}
          <span style={{ color: "crimson" }}>divine robes</span>.*/}
        </p>
        <p>
          <a href="https://github.com/bpierre/loot-rarity" target="_blank">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
