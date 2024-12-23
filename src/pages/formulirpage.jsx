import { React, useState } from "react";
import FormLaporanBantuan from "../components/FormLaporanBantuan.jsx";
import Navbar from "../components/navbar.jsx";

export default function FormulirPage(params) {
  return (
    <>
      <div className="screen">
        <Navbar />
        <FormLaporanBantuan />
      </div>
    </>
  );
}
