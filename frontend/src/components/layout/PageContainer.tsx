const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4"> 
      {children}
    </div>
  );
};

export default PageContainer;