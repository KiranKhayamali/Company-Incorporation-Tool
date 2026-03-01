interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg p-3 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 transition mb-4"
    />
  );
};

export default Input;