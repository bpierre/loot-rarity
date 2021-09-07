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
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          gap: 10px;
        `}
      >
        {!about && (
          <a
            href="https://github.com/bpierre/loot-rarity"
            target="_blank"
            className="button"
          >
            GitHub{" "}
            <span
              css={css`
                display: flex;
                margin-left: 4px;
                font-size: 12px;
              `}
            >
              ⭐️
            </span>
          </a>
        )}
        <button
          onClick={() => setAbout((v) => !v)}
          css={css`
            appearance: none;
            width: 55px;
          `}
        >
          {about ? "Close" : "About"}
        </button>
      </div>
      {about && (
        <p
          css={css`
            width: 300px;
            margin: 15px;
            padding: 20px;
            color: #fff;
            background: #000;
            border: 2px solid #fff;
          `}
        >
          This is a demo for{" "}
          <a href="https://github.com/bpierre/loot-rarity" target="_blank">
            Loot Rarity
          </a>
          , a JavaScript library for Node and browsers which allows to represent
          the rarity levels of{" "}
          <a href="https://www.lootproject.com/" target="_blank">
            Loot
          </a>{" "}
          items.
        </p>
      )}
    </aside>
  );
}
