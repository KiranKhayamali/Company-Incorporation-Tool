const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8">
      {children}
    </div>
  );
};

export default Card;