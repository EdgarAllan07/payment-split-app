"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
function Layout({ children }) {
  return (
    <>
      <Toaster toastOptions={{ duration: 5000 }}></Toaster>
      <div className="  h-screen p-10 text-white" style={{ background: "#1a1a2e" }}>
        {children}
      </div>
    </>
  );
}

export default Layout;
