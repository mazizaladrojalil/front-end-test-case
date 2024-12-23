import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "./DaftarLaporan.css";

const DaftarLaporan = ({ isAdmin }) => {
  const [laporan, setLaporan] = useState([]);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(
        "https://node-js-test-case-backend-production.up.railway.app/api/programs"
      )
      .then((response) => {
        setLaporan(response.data);
      })
      .catch((error) => {
        console.error("Error fetching programs:", error);
      });
  }, []);

  // Handle approve action
  const handleApprove = (id) => {
    setLaporan(
      laporan.map((item) =>
        item.id === id ? { ...item, status: "Disetujui" } : item
      )
    );
  };

  // Handle reject action
  const handleReject = (id) => {
    if (!reason.trim()) {
      alert("Harap isi alasan penolakan.");
      return;
    }
    setLaporan(
      laporan.map((item) =>
        item.id === id ? { ...item, status: "Ditolak", alasan: reason } : item
      )
    );
    setReason("");
    setShowModal(false);
  };

  // Open reject modal for editing
  const handleRejectModal = (id) => {
    setSelectedLaporan(id);
    setShowModal(true);
  };

  // Handle edit action
  const handleEdit = (id) => {
    const laporanToEdit = laporan.find((item) => item.id === id);
    setSelectedLaporan(laporanToEdit);
    setShowModal(true);
  };

  // Handle save (update) action
  const handleSave = () => {
    axios
      .put(
        `https://node-js-test-case-backend-production.up.railway.app/api/programs/${selectedLaporan.id}`,
        selectedLaporan
      )
      .then((response) => {
        // Update local state with the updated program
        setLaporan(
          laporan.map((item) =>
            item.id === selectedLaporan.id ? selectedLaporan : item
          )
        );
        setShowModal(false);
        setSelectedLaporan(null);
      })
      .catch((error) => {
        console.error("Error updating program:", error);
      });
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      axios
        .delete(
          `https://node-js-test-case-backend-production.up.railway.app/api/programs/${id}`
        )
        .then(() => {
          // Remove the deleted item from the local state
          setLaporan(laporan.filter((item) => item.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting program:", error);
        });
    }
  };

  // Handle form input changes (for editing)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedLaporan({ ...selectedLaporan, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="table-responsive">
        <Table striped bordered hover className="mobile-table">
          <thead>
            <tr>
              <th>Nama Program</th>
              <th>Wilayah</th>
              <th>Jumlah Penerima</th>
              {isAdmin && <th>Tanggal Penyaluran</th>}
              {isAdmin && <th>Bukti Penyaluran</th>}
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporan.map((item) => (
              <tr key={item.id}>
                <td>{item.nama_program}</td>
                <td>{item.wilayah_provinsi}</td>
                <td>{item.jumlah_penerima_bantuan}</td>
                {isAdmin && <td>{item.tanggal_penyaluran}</td>}
                {isAdmin && (
                  <td>
                    <a href={item.buktiPenyaluran} download>
                      Unduh
                    </a>
                  </td>
                )}
                <td>{item.status}</td>
                <td>
                  {item.status === "Pending" && (
                    <>
                      {isAdmin ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            className="mb-2"
                            onClick={() => handleApprove(item.id)}
                          >
                            Setujui
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="mb-2"
                            onClick={() => handleRejectModal(item.id)}
                          >
                            Tolak
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            className="mb-2"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            Hapus
                          </Button>
                        </>
                      )}
                    </>
                  )}
                  {item.status !== "Pending" && <span>-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedLaporan && selectedLaporan.status === "Pending"
              ? "Edit Laporan"
              : "Alasan Penolakan"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLaporan && selectedLaporan.status === "Pending" ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama Program</Form.Label>
                <Form.Control
                  type="text"
                  name="namaProgram"
                  value={selectedLaporan.namaProgram}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jumlah Penerima</Form.Label>
                <Form.Control
                  type="number"
                  name="jumlahPenerima"
                  value={selectedLaporan.jumlahPenerima}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wilayah</Form.Label>
                <Form.Control
                  type="text"
                  name="wilayah"
                  value={selectedLaporan.wilayah}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Masukkan alasan penolakan</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          {selectedLaporan && selectedLaporan.status === "Pending" ? (
            <Button variant="primary" onClick={handleSave}>
              Simpan
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => handleReject(selectedLaporan)}
            >
              Tolak
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DaftarLaporan;
