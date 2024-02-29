

export default function RightArrow({ className }: {className:string}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} h-4 w-4`}
      role="img"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"
      ></path>
    </svg>
  );
}
