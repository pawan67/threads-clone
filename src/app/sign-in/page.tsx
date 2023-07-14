import AuthenticationForm from "@/components/AuthenticationForm";
import React from "react";

function page() {
  return (
    <div className=" container">
      <div className=" flex justify-center text-center items-center min-h-screen">
        <AuthenticationForm />
      </div>
    </div>
  );
}

export default page;
