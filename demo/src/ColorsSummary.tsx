/** @jsx jsx */
import { jsx } from "@emotion/react";

import type { Guild } from "./guilds";

export type ColorsSummaryProps = {
  colorDescriptions: Guild[];
};

export function ColorsSummary({ colorDescriptions }: ColorsSummaryProps) {
  return (
    <div>
      <p>
        {colorDescriptions.length > 0 && (
          <span>
            Special guild item{colorDescriptions.length > 1 ? "s" : ""}:{" "}
            {colorDescriptions.map(({ special, color }, index) => (
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
  );
}
