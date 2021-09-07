/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useRef } from "react";

import type { ReactNode } from "react";

export function Option({
  checked,
  checkedColor = "inherit",
  enabled,
  indeterminate,
  label,
  onToggle,
}: {
  checked: boolean;
  checkedColor?: string;
  enabled: boolean;
  indeterminate?: boolean;
  label: ReactNode;
  onToggle: () => void;
}) {
  const checkbox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (indeterminate !== undefined && checkbox.current) {
      checkbox.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

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
          color: ${checked ? checkedColor : "inherit"};
        }
        input {
          margin-right: 8px;
          margin-left: 0;
        }
      `}
    >
      <label>
        <input
          ref={checkbox}
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
