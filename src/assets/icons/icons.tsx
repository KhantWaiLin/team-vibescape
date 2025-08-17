import typeIcon from "./type.svg";
import paragraphIcon from "./paragraph.svg";
import radioIcon from "./check-circle.svg";
import checkboxIcon from "./check-square.svg";
import dropdownIcon from "./chevron-down.svg";
import dateIcon from "./calendar.svg";
import numberIcon from "./hash.svg";
import emailIcon from "./email.svg";
import timeIcon from "./clock.svg";
import fileUploadIcon from "./cloud_upload.svg";
import pinIcon from "./pin.svg";
import dividerIcon from "./divider.svg";
import searchIcon from "./search.svg";
import requireIcon from "./require.svg";
import userGroupIcon from "./user-group.svg";
import eyeIcon from "./eye.svg";


const trashIcon = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99963 11.5L10.4441 16.1667M13.9996 11.5L13.5552 16.1667M4.34961 7.92453H6.16088M6.16088 7.92453C10.8766 7.92453 19.6334 7.92453 19.6334 7.92453M6.16088 7.92453L6.80569 17.2079C6.91491 18.7803 8.2223 20 9.79848 20H14.2229C15.79 20 17.093 18.7939 17.214 17.2316L17.9345 7.92453C17.9345 7.92453 10.2872 7.92453 6.16088 7.92453ZM8.87791 7.92453V6C8.87791 4.89543 9.77334 4 10.8779 4H13.2175C14.3221 4 15.2175 4.89543 15.2175 6V7.92453"
        stroke={isActive ? "#006738" : "#5D6F67"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const fileIcon = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.966 7.69068L15.6433 5.36668C15.2109 4.93211 14.6966 4.58757 14.1301 4.35299C13.5637 4.11841 12.9564 3.99844 12.3433 4.00002H9.33333C8.4496 4.00107 7.60237 4.3526 6.97748 4.9775C6.35259 5.60239 6.00106 6.44962 6 7.33335V16.6667C6.00106 17.5504 6.35259 18.3976 6.97748 19.0225C7.60237 19.6474 8.4496 19.999 9.33333 20H16C16.8837 19.999 17.731 19.6474 18.3559 19.0225C18.9807 18.3976 19.3323 17.5504 19.3333 16.6667V10.99C19.335 10.377 19.215 9.76968 18.9803 9.20333C18.7456 8.63699 18.4008 8.12284 17.966 7.69068ZM17.0233 8.63335C17.2269 8.84278 17.402 9.07814 17.544 9.33335H14.6667C14.4899 9.33335 14.3203 9.26311 14.1953 9.13809C14.0702 9.01306 14 8.84349 14 8.66668V5.78935C14.2553 5.9313 14.4909 6.10612 14.7007 6.30935L17.0233 8.63335ZM18 16.6667C18 17.1971 17.7893 17.7058 17.4142 18.0809C17.0391 18.456 16.5304 18.6667 16 18.6667H9.33333C8.8029 18.6667 8.29419 18.456 7.91912 18.0809C7.54405 17.7058 7.33333 17.1971 7.33333 16.6667V7.33335C7.33333 6.80292 7.54405 6.29421 7.91912 5.91914C8.29419 5.54406 8.8029 5.33335 9.33333 5.33335H12.3433C12.4527 5.33335 12.5587 5.35468 12.6667 5.36468V8.66668C12.6667 9.19711 12.8774 9.70582 13.2525 10.0809C13.6275 10.456 14.1362 10.6667 14.6667 10.6667H17.9687C17.9787 10.7747 18 10.88 18 10.99V16.6667Z"
        fill={isActive ? "#006738" : "#5D6F67"}
      />
    </svg>
  );
};

const inboxIcon = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.04837 13H7.67157C8.202 13 8.71071 13.2107 9.08578 13.5858L9.91421 14.4142C10.2893 14.7893 10.798 15 11.3284 15H12.6716C13.202 15 13.7107 14.7893 14.0858 14.4142L14.9142 13.5858C15.2893 13.2107 15.798 13 16.3284 13H19.9516M4.00001 12.3693L4 17C4 18.6569 5.34314 20 7 20H17C18.6569 20 20 18.6569 20 17V12.3693C20 12.124 19.9699 11.8797 19.9104 11.6417L18.5681 6.27239C18.2342 4.93689 17.0343 4 15.6577 4H8.34234C6.96573 4 5.76578 4.93689 5.43191 6.27239L4.08958 11.6417C4.03009 11.8797 4.00001 12.124 4.00001 12.3693Z"
        stroke={isActive ? "#006738" : "#5D6F67"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

const layerIcon = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 16L10.6584 19.3292C11.5029 19.7515 12.4971 19.7515 13.3416 19.3292L20 16M4 12L10.6584 15.3292C11.5029 15.7515 12.4971 15.7515 13.3416 15.3292L20 12M4 7.99999L10.6584 4.67081C11.5029 4.24852 12.4971 4.24852 13.3416 4.67081L20 7.99999L13.3416 11.3292C12.4971 11.7515 11.5029 11.7515 10.6584 11.3292L4 7.99999Z"
        stroke={isActive ? "#006738" : "#5D6F67"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const submissionIcon = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6569 9.87879L17.6577 17.4763C17.6587 17.5951 17.6115 17.7023 17.5343 17.7795M9.87868 17.657L17.231 17.9029C17.3499 17.904 17.4571 17.8567 17.5343 17.7795M17.5343 17.7795L6.22058 6.46582"
        stroke={isActive ? "#006738" : "#5D6F67"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const homeIcon = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.00001 11C4.00001 10.3705 4.2964 9.77771 4.80001 9.4L10.8 4.9C11.5111 4.36667 12.4889 4.36667 13.2 4.9L19.2 9.4C19.7036 9.77771 20 10.3705 20 11V17C20 18.6569 18.6569 20 17 20H7C5.34314 20 4 18.6569 4 17L4.00001 11Z"
        stroke="url(#paint0_linear_21_452)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_21_452"
          x1="4"
          y1="12.25"
          x2="20"
          y2="12.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={isActive ? "#006738" : "#5D6F67"} />
          <stop offset="1" stopColor={isActive ? "#007A43" : "#5D6F67"} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const floatingButtonIcon = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dd_21_470)">
        <rect
          x="20"
          y="16"
          width="80"
          height="80"
          rx="40"
          fill="url(#paint0_linear_21_470)"
        />
        <g filter="url(#filter1_dd_21_470)">
          <path
            d="M60.5 42L61.4125 55.5875L75 56.5L61.4125 57.4125L60.5 71L59.5875 57.4125L46 56.5L59.5875 55.5875L60.5 42Z"
            fill="white"
          />
        </g>
        <g filter="url(#filter2_dd_21_470)">
          <path
            d="M75 64L75.4405 70.5595L82 71L75.4405 71.4405L75 78L74.5595 71.4405L68 71L74.5595 70.5595L75 64Z"
            fill="white"
          />
        </g>
        <g filter="url(#filter3_dd_21_470)">
          <path
            d="M46 40L46.3147 44.6853L51 45L46.3147 45.3147L46 50L45.6853 45.3147L41 45L45.6853 44.6853L46 40Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_dd_21_470"
          x="0"
          y="0"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_21_470"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_21_470"
            result="effect2_dropShadow_21_470"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_21_470"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_dd_21_470"
          x="41.71"
          y="36.71"
          width="37.58"
          height="40.01"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2.145" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.980392 0 0 0 0 0.533333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_21_470"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.86" />
          <feGaussianBlur stdDeviation="1.43" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_21_470"
            result="effect2_dropShadow_21_470"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_21_470"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_dd_21_470"
          x="63.71"
          y="58.71"
          width="22.58"
          height="25.01"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2.145" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.980392 0 0 0 0 0.533333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_21_470"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.86" />
          <feGaussianBlur stdDeviation="1.43" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_21_470"
            result="effect2_dropShadow_21_470"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_21_470"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_dd_21_470"
          x="36.71"
          y="34.71"
          width="18.58"
          height="21.01"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2.145" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.980392 0 0 0 0 0.533333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_21_470"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.86" />
          <feGaussianBlur stdDeviation="1.43" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_21_470"
            result="effect2_dropShadow_21_470"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_21_470"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_21_470"
          x1="20"
          y1="56"
          x2="100"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#006738" />
          <stop offset="1" stopColor="#007A43" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Export all imported icons
export {
  typeIcon,
  paragraphIcon,
  radioIcon,
  checkboxIcon,
  dropdownIcon,
  dateIcon,
  numberIcon,
  emailIcon,
  timeIcon,
  fileUploadIcon,
  pinIcon,
  dividerIcon,
  searchIcon,
  requireIcon,
  userGroupIcon,
  eyeIcon,
  trashIcon,
  fileIcon,
  inboxIcon,
  layerIcon,
  submissionIcon,
  homeIcon,
  floatingButtonIcon,
};