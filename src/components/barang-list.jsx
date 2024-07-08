import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetcBarangData } from "../reducer/barangReducer";
import { Card, Dropdown } from "react-bootstrap";

function BarangList() {
  const dispatch = useDispatch();
  const barangData = useSelector((state) => state.barang.data);
  const barangStatus = useSelector((state) => state.barang.status);
  const barangError = useSelector((state) => state.barang.error);
  const [selectedBarang, setSelectedBarang] = useState("Barang list");
  const [diskon, setDiskon] = useState("0");
  const [harga, setHarga] = useState("0");
  const [desc, setDesc] = useState("........");

  useEffect(() => {
    dispatch(fetcBarangData());
  }, [dispatch]);

  if (barangStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (barangStatus === "failed") {
    return <div>Error: {barangError}</div>;
  }

  const handleSelect = (nama_barang, diskon, harga, description) => {
    setSelectedBarang(nama_barang);
    // diskon
    setDiskon(diskon);
    // harga
    setHarga(((100 - diskon) / 100) * harga);
    setDesc(description);
  };

  // Format Rupiah
  const formattedHarga = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(harga);

  return (
    <div>
      <h2>Barang List</h2>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedBarang}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {barangData.map((barang) => (
            <Dropdown.Item
              key={barang.id_barang}
              onClick={() =>
                handleSelect(
                  barang.nama_barang,
                  barang.diskon,
                  barang.harga,
                  barang.description
                )
              }
            >
              {barang.nama_barang}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <h5>Deskripsi barang</h5>
      <Card className="bg-light">
        <Card.Body>{desc}</Card.Body>
      </Card>

      <h5>Diskon</h5>
      <Card className="bg-light">
        <Card.Body>{diskon} %</Card.Body>
      </Card>
      <h5>Harga</h5>
      <Card className="bg-light">
        <Card.Body>{formattedHarga}</Card.Body>
      </Card>
    </div>
  );
}

export default BarangList;
