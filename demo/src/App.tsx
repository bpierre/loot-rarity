/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Fragment, useMemo, useState } from "react";
import { rarityColor } from "../..";
import { useBag } from "./hooks";
import { AppLayout } from "./AppLayout";
import { GlobalStyles } from "./GlobalStyles";
import { Option } from "./Option";
import { Levels } from "./Levels";
import guilds from "./guilds";

import type { ReactNode } from "react";

type Option = {
  label: ReactNode;
  checked: boolean;
  toggle: () => void;
};

function App() {
  const [activeGuilds, setActiveGuilds] = useState<boolean[]>(
    Object.keys(guilds).map(() => false)
  );

  const [displayColors, setDisplayColors] = useState(true);
  const [displayItemLevels, setDisplayItemLevels] = useState(false);
  const [displayLootLevel, setDisplayLootLevel] = useState(true);

  const guildOptions = useMemo<Option[]>(
    () =>
      guilds.map((guild, index) => ({
        ...guild,
        label: `${guild.emoji} ${guild.special}`,
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
        label: "loot level",
        checked: displayLootLevel,
        toggle: () => {
          setDisplayLootLevel((v) => !v);
        },
      },
      {
        label: "item levels",
        checked: displayItemLevels,
        toggle: () => setDisplayItemLevels((v) => !v),
      },
    ],
    [displayColors, displayItemLevels, displayLootLevel]
  );

  const [bag, updateBag] = useBag(
    [...guilds].filter((_, index) => activeGuilds[index]),
    { displayColors, displayItemLevels, displayLootLevel }
  );

  const activeGuildsCount = [...guilds].filter(
    (_, index) => activeGuilds[index]
  ).length;

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
                width: 60px;
                padding: 0 4px;
                font-size: 20px;
                font-family: inherit;
                text-align: center;
                color: #ccc;
                border: 0;
                background: transparent;
                margin-right: 20px;
                border: 2px solid #888;
              }
              input[type="text"]:focus {
                border-color: #fff;
                outline: 0;
              }
              label {
                display: flex;
                align-items: center;
                height: 30px;
                padding: 0 4px;
                border: 2px solid #888;
                border-right: 0;
              }
            `}
          >
            <label htmlFor="bag-input">#</label>
            <input
              id="bag-input"
              type="text"
              value={bag?.id ?? ""}
              onChange={(event) => {
                const value = event.currentTarget.value.trim();
                if (value === "") {
                  updateBag("");
                  return;
                }
                const numId = Number(value);
                if (!isNaN(numId) && numId > 0 && numId <= 8000) {
                  updateBag(value);
                }
              }}
            />
            <button onClick={() => updateBag(true)}>random</button>
          </div>
        }
        lootImage={bag?.image && <img src={bag?.image} alt="" />}
        lootImageBorderColor={
          bag && displayLootLevel && displayColors
            ? rarityColor(bag.lootRarity)
            : undefined
        }
        options={
          <Fragment>
            <h1>Options</h1>
            {modesOptions.map(({ label, checked, toggle }, index) => (
              <Option
                key={index}
                label={label}
                checked={checked}
                onToggle={toggle}
                enabled={index === 0 || displayColors}
              />
            ))}

            <h1>Guilds</h1>
            <Option
              label={<span>🌈 all</span>}
              checked={activeGuildsCount === guilds.length}
              onToggle={() => {
                const allChecked = activeGuildsCount === guilds.length;
                setActiveGuilds((activeGuilds) =>
                  activeGuilds.map((_) => !allChecked)
                );
              }}
              indeterminate={
                activeGuildsCount > 0 && activeGuildsCount < guilds.length
              }
              enabled={displayColors}
            />
            {guildOptions.map(({ label, checked, toggle }, index) => (
              <Option
                key={index}
                checked={checked}
                checkedColor="cyan"
                enabled={displayColors}
                label={label}
                onToggle={toggle}
              />
            ))}
          </Fragment>
        }
        footer={<Levels />}
      />
    </Fragment>
  );
}

export default App;
