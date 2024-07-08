import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchPelabuhanData } from "../reducer/pelabuhanReducer";
import { Dropdown } from "react-bootstrap";

function PelabuhanList() {
  const dispatch = useDispatch();
  const pelabuhanData = useSelector((state) => state.pelabuhan.data);
  const pelabuhanStatus = useSelector((state) => state.pelabuhan.status);
  const pelabuhanError = useSelector((state) => state.pelabuhan.error);
  const [selectedPelabuhan, setSelectedPelabuhan] = useState("Pelabuhan list");
  
  if (pelabuhanStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (pelabuhanStatus === "failed") {
    return <div>Error: {pelabuhanError}</div>;
  }

  const handleSelect = (nama_pelabuhan) => {
    setSelectedPelabuhan(nama_pelabuhan);
  };

  return (
    <div>
      <h5>Pelabuhan List</h5>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedPelabuhan}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {pelabuhanData.map((pelabuhan) => (
            <Dropdown.Item
              key={pelabuhan.id_pelabuhan}
              onClick={() => handleSelect(pelabuhan.nama_pelabuhan)}
            >
              {pelabuhan.nama_pelabuhan}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default PelabuhanList;
