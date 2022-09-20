import Tooltip from "@mui/material/Tooltip";
import React from "react";

type Props = {
  text: String;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  tooltip?: String;
};

const SlideDeckButton: React.FC<Props> = ({
  text,
  disabled,
  size = "md",
  tooltip,
}) => {
  return (
    <Tooltip title={tooltip ? tooltip : ""}>
      <span>
        <button
          disabled={disabled}
          onClick={() => {}}
          className={`w-max ${
            size == "md" && "min-w-[183px]"
          } border-[1px] px-18 py-3 text-darkishRed rounded-100 border-darkGreen ${
            disabled
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          {text}
        </button>
      </span>
    </Tooltip>
  );
};

export default SlideDeckButton;
