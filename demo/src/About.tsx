/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";

export function About() {
  const [about, setAbout] = useState(false);
  return (
    <aside
      css={css`
        position: fixed;
        top: 10px;
        right: 10px;
        button {
          appearance: none;
          position: absolute;
          top: 0;
          right: 0;
          width: 55px;
        }
        p {
          width: 400px;
          margin: 15px;
          padding: 20px;
          color: #fff;
          background: #000;
          border: 2px solid #fff;
        }
      `}
    >
      <button onClick={() => setAbout((v) => !v)}>
        {about ? "close" : "about"}
      </button>
      {about && (
        <p>
          This is a demo app for{" "}
          <a href="https://github.com/bpierre/loot-rarity" target="_blank">
            Loot Rarity
          </a>
          , a library which allows to represent the rarity levels of{" "}
          <a href="https://www.lootproject.com/" target="_blank">
            Loot
          </a>{" "}
          items.
        </p>
      )}
    </aside>
  );
}
