/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Fragment, useMemo, useState } from "react";
import { randomBagId } from "./utils";
import { useBag } from "./hooks";
import { AppLayout } from "./AppLayout";
import { ColorsSummary } from "./ColorsSummary";
import { GlobalStyles } from "./GlobalStyles";
import { Option } from "./Option";
import guilds from "./guilds";

import type { ReactNode } from "react";

type Option = {
  label: ReactNode;
  checked: boolean;
  toggle: () => void;
};

function App() {
  const [bagId, setBagId] = useState(randomBagId());

  const [activeGuilds, setActiveGuilds] = useState<boolean[]>(
    Object.keys(guilds).map(() => false)
  );

  const [displayColors, setDisplayColors] = useState(true);
  const [displayLevels, setDisplayLevels] = useState(false);

  const guildOptions = useMemo<Option[]>(
    () =>
      guilds.map((guild, index) => ({
        ...guild,
        label: (
          <span style={{ color: guild.color }}>
            {guild.emoji} {guild.special}
          </span>
        ),
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
        label: "colors",
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

  const colorDescriptions = displayColors
    ? guilds.filter((_, index) => activeGuilds[index])
    : [];

  return (
    <Fragment>
      <GlobalStyles />
      <AppLayout
        title="Loot Rarity"
        secondary={
          <div
            css={css`
              display: flex;
              align-items: center;
              input[type="text"] {
                height: 30px;
                width: 55px;
                font-size: 20px;
                font-family: inherit;
                text-align: center;
                color: #ccc;
                border: 0;
                background: transparent;
                margin-right: 20px;
                margin-left: 4px;
                border: 2px solid #888;
              }
              input[type="text"]:focus {
                border-color: #fff;
                outline: 0;
              }
            `}
          >
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
          </div>
        }
        lootImage={bag?.image && <img src={bag?.image} alt="" />}
        options={
          <Fragment>
            <h1>options</h1>
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
            <Option
              label={<span>🌈 all</span>}
              checked={colorDescriptions.length === guilds.length}
              onToggle={() => {
                const allChecked = colorDescriptions.length === guilds.length;
                setActiveGuilds((activeGuilds) =>
                  activeGuilds.map((_) => !allChecked)
                );
              }}
              indeterminate={
                colorDescriptions.length !== guilds.length &&
                colorDescriptions.length > 0
              }
              enabled={displayColors}
            />
            {guildOptions.map(({ label, checked, toggle }, index) => (
              <Option
                key={index}
                label={label}
                checked={checked}
                onToggle={toggle}
                enabled={displayColors}
              />
            ))}
          </Fragment>
        }
        footer={<ColorsSummary colorDescriptions={colorDescriptions} />}
      />
    </Fragment>
  );
}

export default App;
