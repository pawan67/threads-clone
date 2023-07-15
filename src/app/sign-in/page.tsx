import AuthenticationForm from "@/components/AuthenticationForm";
import React from "react";

function page() {
  return (
    <div className=" -mt-5 container">
      <div className=" flex justify-center text-center items-center min-h-screen">
        <AuthenticationForm />
      </div>
    </div>
  );
}

export default page;
