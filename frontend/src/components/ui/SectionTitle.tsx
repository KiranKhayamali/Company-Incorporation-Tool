const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-2xl font-bold mb-6 text-center">
      {children}
    </h2>
  );
};

export default SectionTitle;