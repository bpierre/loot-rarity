import React, { useMemo, useState } from "react";
import { useBag } from "./hooks";
import guilds from "./guilds";

type Option = {
  label: string;
  checked: boolean;
  toggle: () => void;
};

function randomBagId() {
  return String(Math.floor(Math.random() * 7999) + 1);
}

function App() {
  const [bagId, setBagId] = useState(randomBagId());

  const [activeGuilds, setActiveGuilds] = useState<boolean[]>(
    Object.keys(guilds).map(() => false)
  );

  const [about, setAbout] = useState(false);
  const [displayColors, setDisplayColors] = useState(true);
  const [displayLevels, setDisplayLevels] = useState(false);

  const guildOptions = useMemo<Option[]>(
    () =>
      guilds.map((guild, index) => ({
        ...guild,
        label: guild.emoji,
        checked: activeGuilds[index],
        toggle: () =>
          setActiveGuilds((activeGuilds) =>
            activeGuilds.map((checked, _index) =>
              _index === index ? !checked : checked
            )
          ),
      })),
    [activeGuilds]
  );

  const modesOptions = useMemo<Option[]>(
    () => [
      {
        label: "on",
        checked: displayColors,
        toggle: () => setDisplayColors((v) => !v),
      },
      {
        label: "labels",
        checked: displayLevels,
        toggle: () => setDisplayLevels((v) => !v),
      },
    ],
    [displayLevels, displayColors]
  );

  const bag = useBag(
    bagId,
    [...guilds].filter((_, index) => activeGuilds[index]),
    { displayColors, displayLevels }
  );

  const activeGuildsDescriptions = guilds.filter(
    (_, index) => activeGuilds[index]
  );

  return (
    <div className="app">
      <header>
        <h1>Loot Rarity</h1>
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
      </header>
      <div className="bag">{bag?.image && <img src={bag?.image} alt="" />}</div>
      <section className="options options-left"></section>
      <section className="options options-right">
        <h1>opts</h1>
        {modesOptions.map(({ label, checked, toggle }, index) => (
          <Option
            key={index}
            label={label}
            checked={checked}
            onToggle={toggle}
            enabled={index === 0 || displayColors}
          />
        ))}
        <h1>guilds</h1>
        {guildOptions.map(({ label, checked, toggle }, index) => (
          <Option
            key={index}
            label={label}
            checked={checked}
            onToggle={toggle}
            enabled={displayColors}
          />
        ))}
      </section>
      <div>
        <p>
          {displayColors && activeGuildsDescriptions.length > 0 && (
            <span>
              Special guild item:{" "}
              {activeGuildsDescriptions.map(({ special, color }, index) => (
                <span key={special + color}>
                  {index > 0 && <span>, </span>}
                  <span style={{ color }}>{special}</span>
                </span>
              ))}
              .
            </span>
          )}
        </p>
      </div>
      <aside>
        <button onClick={() => setAbout((v) => !v)}>
          {about ? "close" : "about"}
        </button>
        {about && (
          <p>
            This is a demo app for the{" "}
            <a href="https://github.com/bpierre/loot-rarity" target="_blank">
              Loot Rarity JS library
            </a>
            , which allows to represent the rarity levels of{" "}
            <a href="https://www.lootproject.com/" target="_blank">
              Loot
            </a>{" "}
            items.
          </p>
        )}
      </aside>
    </div>
  );
}

function Option({
  checked,
  enabled,
  label,
  onToggle,
}: {
  checked: boolean;
  enabled: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <div style={{ opacity: enabled ? 1 : 0.5 }}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          disabled={!enabled}
        />
        {label}
      </label>
    </div>
  );
}

export default App;
