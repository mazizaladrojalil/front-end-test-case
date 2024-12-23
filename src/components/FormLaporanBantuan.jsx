import React, { useState } from "react";
import "./FormLaporanBantuan.css";
import axios from "axios";

const FormLaporanBantuan = () => {
  const [formData, setFormData] = useState({
    nama_program: "",
    jumlah_penerima_bantuan: "",
    wilayah_provinsi: "",
    wilayah_kabupaten: "",
    wilayah_kecamatan: "",
    tanggal_penyaluran: "",
    bukti_penyaluran: "",
    catatanTambahan: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");

  const wilayahData = {
    "Jawa Barat": {
      Bandung: ["Cimahi", "Cicalengka", "Rancaekek"],
      Bogor: ["Cibinong", "Cileungsi", "Gunung Putri"],
    },
    "Jawa Tengah": {
      Semarang: ["Ungaran", "Tembalang", "Pedurungan"],
      Solo: ["Laweyan", "Banjarsari", "Jebres"],
    },
    "Jawa Timur": {
      Surabaya: ["Rungkut", "Tandes", "Tegalsari"],
      Malang: ["Lowokwaru", "Blimbing", "Kedungkandang"],
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (name === "wilayah_provinsi") {
        return {
          ...prevState,
          wilayah_provinsi: value,
          wilayah_kabupaten: "",
          wilayah_kecamatan: "",
        };
      }
      if (name === "wilayah_kabupaten") {
        return {
          ...prevState,
          wilayah_kabupaten: value,
          wilayah_kecamatan: "",
        };
      }
      return { ...prevState, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, bukti_penyaluran: e.target.files[0] });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.nama_program)
      formErrors.nama_program = "Nama Program harus diisi";
    if (!formData.jumlah_penerima_bantuan)
      formErrors.jumlah_penerima_bantuan =
        "Jumlah Penerima Bantuan harus diisi";
    if (!formData.tanggal_penyaluran)
      formErrors.tanggal_penyaluran = "Tanggal Penyaluran harus diisi";
    if (
      formData.bukti_penyaluran &&
      !["image/jpeg", "image/png", "application/pdf"].includes(
        formData.bukti_penyaluran.type
      )
    ) {
      formErrors.bukti_penyaluran = "File harus berformat JPG, PNG, atau PDF";
    }
    if (
      formData.bukti_penyaluran &&
      formData.bukti_penyaluran.size > 2 * 1024 * 1024
    ) {
      formErrors.bukti_penyaluran = "File tidak boleh lebih dari 2MB";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      formData.bukti_penyaluran = formData.bukti_penyaluran.name;
      console.log("Form data:", formData);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/programs`, formData)
        .then((response) => {
          console.log("Form submitted successfully:", response);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
  };

  const availableKabupaten = formData.wilayah_provinsi
    ? Object.keys(wilayahData[formData.wilayah_provinsi])
    : [];
  const availableKecamatan = formData.wilayah_kabupaten
    ? wilayahData[formData.wilayah_provinsi][formData.wilayah_kabupaten]
    : [];

  return (
    <div className="d-flex mt-5 justify-content-center align-items-center bg-white">
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="group-1">
          <div className="mb-3">
            <label htmlFor="nama_program" className="form-label">
              Nama Program
            </label>
            <select
              id="nama_program"
              name="nama_program"
              className="form-select"
              value={formData.nama_program}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Program</option>
              <option value="PKH">PKH</option>
              <option value="BLT">BLT</option>
              <option value="Bansos">Bansos</option>
            </select>
            {errors.nama_program && (
              <div className="text-danger">{errors.nama_program}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="jumlah_penerima_bantuan" className="form-label">
              Jumlah Penerima Bantuan
            </label>
            <input
              type="number"
              id="jumlah_penerima_bantuan"
              name="jumlah_penerima_bantuan"
              className="form-control"
              value={formData.jumlah_penerima_bantuan}
              onChange={handleInputChange}
              required
            />
            {errors.jumlah_penerima_bantuan && (
              <div className="text-danger">
                {errors.jumlah_penerima_bantuan}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="wilayah_provinsi" className="form-label">
              Provinsi
            </label>
            <select
              id="wilayah_provinsi"
              name="wilayah_provinsi"
              className="form-select"
              value={formData.wilayah_provinsi}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Provinsi</option>
              {Object.keys(wilayahData).map((provinsi) => (
                <option key={provinsi} value={provinsi}>
                  {provinsi}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="wilayah_kabupaten" className="form-label">
              Kabupaten
            </label>
            <select
              id="wilayah_kabupaten"
              name="wilayah_kabupaten"
              className="form-select"
              value={formData.wilayah_kabupaten}
              onChange={handleInputChange}
              disabled={!formData.wilayah_provinsi}
              required
            >
              <option value="">Pilih Kabupaten</option>
              {availableKabupaten.map((kabupaten) => (
                <option key={kabupaten} value={kabupaten}>
                  {kabupaten}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="wilayah_kecamatan" className="form-label">
              Kecamatan
            </label>
            <select
              id="wilayah_kecamatan"
              name="wilayah_kecamatan"
              className="form-select"
              value={formData.wilayah_kecamatan}
              onChange={handleInputChange}
              disabled={!formData.wilayah_kabupaten}
              required
            >
              <option value="">Pilih Kecamatan</option>
              {availableKecamatan.map((kecamatan) => (
                <option key={kecamatan} value={kecamatan}>
                  {kecamatan}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="group-2">
          <div className="mb-3">
            <label htmlFor="tanggal_penyaluran" className="form-label">
              Tanggal Penyaluran
            </label>
            <input
              type="date"
              id="tanggal_penyaluran"
              name="tanggal_penyaluran"
              className="form-control"
              value={formData.tanggal_penyaluran}
              onChange={handleInputChange}
              required
            />
            {errors.tanggal_penyaluran && (
              <div className="text-danger">{errors.tanggal_penyaluran}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="bukti_penyaluran" className="form-label">
              Bukti Penyaluran (JPG/PNG/PDF)
            </label>
            <input
              type="file"
              id="bukti_penyaluran"
              name="bukti_penyaluran"
              className="form-control"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />
            {errors.bukti_penyaluran && (
              <div className="text-danger">{errors.bukti_penyaluran}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="catatanTambahan" className="form-label">
              Catatan Tambahan
            </label>
            <textarea
              id="catatanTambahan"
              name="catatanTambahan"
              className="form-control"
              value={formData.catatanTambahan}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={handleSubmit}
          >
            Kirim
          </button>
        </div>
      </form>
      {notification && (
        <div className="alert alert-success mt-3" role="alert">
          {notification}
        </div>
      )}
    </div>
  );
};

export default FormLaporanBantuan;
