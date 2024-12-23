import React from "react";
import Button from "../components/button";

export default function Home(params) {
  return (
    <div className="screen d-flex justify-content-center align-items-center">
      <div className="action-menu p-2 d-grid gap-2">
        <h2 className="mb-5">Menu Layanan Bansos</h2>
        <Button label="Formulir Laporan" href="/formulir-laporan"></Button>
        <Button label="Daftar Laporan" href="/daftar-laporan"></Button>
      </div>
    </div>
  );
}
