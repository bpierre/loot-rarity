/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import type { ReactNode } from "react";

export function Option({
  checked,
  enabled,
  label,
  onToggle,
}: {
  checked: boolean;
  enabled: boolean;
  label: ReactNode;
  onToggle: () => void;
}) {
  return (
    <div
      css={css`
        white-space: nowrap;
        opacity: ${enabled ? 1 : 0.5};
        label {
          display: flex;
          align-items: center;
          margin: 5px 0;
          cursor: pointer;
        }
        input {
          margin-right: 8px;
          margin-left: 0;
        }
      `}
    >
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
