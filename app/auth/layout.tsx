import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full container mx-auto flex flex-col items-center justify-center w-full md:w-9/12 lg:w-1/2">
      {children}
    </div>
  );
};

export default AuthLayout;
