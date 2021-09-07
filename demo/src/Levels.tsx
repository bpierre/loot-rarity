/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { rarityDescription, rarityColor, RarityLevel } from "../..";
import diamonds from "./diamonds";

export function Levels() {
  return (
    <div
      css={css`
        display: flex;
        padding-top: 20px;
        font-size: 14px;
        justify-content: space-between;
      `}
    >
      {diamonds.map((diamond, index) => {
        const level = (index + 1) as RarityLevel;
        return (
          <div
            key={level}
            css={css`
              display: flex;
              padding-left: 15px;
              color: ${rarityColor(level)};
              background: url(${diamond}) no-repeat -4px 50%;
              background-size: 20px;
            `}
          >
            {rarityDescription(level)}
          </div>
        );
      })}
    </div>
  );
}
