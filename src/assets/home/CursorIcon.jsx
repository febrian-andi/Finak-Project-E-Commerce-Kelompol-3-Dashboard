import React from "react";

const CursorIcon = ({ color = "black" }) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.75 10.9913L9.40075 11.6722L11.9455 16.86L9.61225 18L7.0525 12.7635L4 15.5018V3.609L13.75 10.9913ZM4.156 2.8125L3.3745 3.20175L2.2225 0.8865L3.00475 0.49725L4.156 2.8125ZM6.10525 0.12975L5.24125 0L4.8565 2.55675L5.7205 2.6865L6.10525 0.12975ZM2.521 4.51575L2.93875 3.7485L0.66775 2.5125L0.25 3.27975L2.521 4.51575Z"
        fill={color}
      />
    </svg>
  );
};

export default CursorIcon;
