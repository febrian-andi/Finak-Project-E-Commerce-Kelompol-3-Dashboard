import React from "react";

const BoxIcon = ({  color = "black", width = "30", height = "30"  }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3219_7817)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.9062 15.5116V29.9766L1.21875 23.2063V8.90563L13.9062 15.5116ZM27.8033 23.2063L15.1146 29.9753V15.514L27.8033 8.98417V23.2063ZM7.39575 4.85651L20.215 11.5313L14.5128 14.4652L1.85796 7.87613L7.39575 4.85651ZM27.1665 7.95347L21.5308 10.8535L8.67296 4.1593L14.5104 0.975342L27.1665 7.95347Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_3219_7817">
          <rect
            width="29"
            height="29"
            fill={color}
            transform="translate(0.0117188 0.975342)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BoxIcon;
