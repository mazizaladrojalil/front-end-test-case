import React from "react";
import Navbar from "../components/navbar";
import DaftarLaporan from "../components/DaftarLaporan";

export default function DaftarLaporanPage(params) {
    return(
        <div className="screen">
            <Navbar/>
            <DaftarLaporan />
        </div>
    )
};
