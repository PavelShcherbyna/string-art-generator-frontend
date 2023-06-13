import React from 'react';

const IconHighContrast = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
      <mask id="path-2-inside-1_97_120" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0V24Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0V24Z"
        fill="black"
      />
      <path
        d="M12 24H14V26H12V24ZM12 0V-2H14V0H12ZM2 12C2 17.5228 6.47715 22 12 22V26C4.26801 26 -2 19.732 -2 12H2ZM12 2C6.47715 2 2 6.47715 2 12H-2C-2 4.26801 4.26801 -2 12 -2V2ZM14 0V24H10V0H14Z"
        fill="black"
        mask="url(#path-2-inside-1_97_120)"
      />
    </svg>
  );
};

export default IconHighContrast;
