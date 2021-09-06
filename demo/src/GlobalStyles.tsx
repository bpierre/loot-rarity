/** @jsx jsx */
import { Global, css, jsx } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }
        html {
          overflow-y: scroll;
        }
        body {
          position: relative;
          margin: 0;
          font: 16px/1.5 "Source Serif Pro", serif;
          color: #ccc;
          background: #000;
          min-width: 720px;
        }
        a {
          color: inherit;
        }
        button {
          height: 30px;
          padding: 0 6px;
          color: #ccc;
          background: #000;
          border: 2px solid;
          border-color: #fff #888 #888 #fff;
          cursor: pointer;
          outline: 0;
        }
        button:active:not(:disabled) {
          border: 2px solid;
          border-color: #888 #fff #fff #888;
        }
        button:disabled {
          color: #aaa;
          border-color: #888;
          cursor: default;
        }
        button:focus-visible {
          border-color: transparent;
          outline: 2px solid #ccc;
        }
      `}
    />
  );
}
