import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/homepage";
import FormulirPage from "./pages/formulirpage";
import DaftarLaporanPage from "./pages/daftarlaporanpage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/formulir-laporan" element={<FormulirPage />}></Route>
        <Route path="/daftar-laporan" element={<DaftarLaporanPage />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
