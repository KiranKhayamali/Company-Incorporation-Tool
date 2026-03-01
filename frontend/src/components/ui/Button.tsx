interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success";
}

const Button = ({
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  const base =
    "block w-full md:w-[30%] mx-auto py-3 rounded-lg text-white transition font-medium";

  const styles =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-green-600 hover:bg-green-700";

  return (
    <button {...props} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};

export default Button;