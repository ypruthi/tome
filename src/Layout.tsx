import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/custom/header";   

export default function Layout() {
  return (
    <>
      <Header />                          
      <main className="pt-6 px-6">        
        <Outlet />        
      </main>
    </>
  );
}
