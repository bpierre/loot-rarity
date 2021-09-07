/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { About } from "./About";

import type { ReactNode } from "react";

export type AppLayoutProps = {
  title: ReactNode;
  secondary: ReactNode;
  lootImage: ReactNode;
  options: ReactNode;
  footer: ReactNode;
};

export function AppLayout({
  title,
  secondary,
  lootImage,
  options,
  footer,
}: AppLayoutProps) {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        width: 450px;
        padding: 80px 0 40px;
        margin: 0 auto;
        justify-content: center;
      `}
    >
      <About />
      <header
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 50px;
          padding-bottom: 20px;
        `}
      >
        <h1
          css={css`
            margin: 0;
            font-size: 20px;
            text-align: center;
          `}
        >
          {title}
        </h1>
        <div
          css={css`
            display: flex;
            align-items: center;
            margin: 0;
            font-size: 20px;
          `}
        >
          {secondary}
        </div>
      </header>
      <div
        css={css`
          height: 450px;
          padding: 0;
          margin: 0;
          border: 2px solid #ccc;
          img {
            width: 100%;
            height: 100%;
          }
        `}
      >
        {lootImage}
      </div>
      <section
        css={css`
          position: absolute;
          top: 80px;
          left: 100%;
          padding-left: 20px;
          user-select: none;
          display: flex;
          flex-direction: column;
          h1 {
            height: 30px;
            margin: 20px 0 0;
            font: inherit;
          }
          h1:first-of-type {
            margin-top: 50px;
          }
        `}
      >
        {options}
      </section>
      {footer}
    </div>
  );
}
