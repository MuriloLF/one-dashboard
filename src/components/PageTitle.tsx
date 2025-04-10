
import React from "react";
import Logo from "./Logo";

const PageTitle = () => {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="w-full flex justify-center mb-4">
        <Logo className="mx-auto" />
      </div>
      <p className="text-gray-600">
        Central de acesso aos dashboards de saúde
      </p>
    </div>
  );
};

export default PageTitle;
