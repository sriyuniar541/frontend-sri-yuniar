import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPelabuhanData } from "../reducer/pelabuhanReducer";
import { Dropdown } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function PelabuhanList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const idNegara = searchParams.get('idNegara') || '';
  const dispatch = useDispatch();
  const pelabuhanData = useSelector((state) => state.pelabuhan.data);
  const pelabuhanStatus = useSelector((state) => state.pelabuhan.status);
  const pelabuhanError = useSelector((state) => state.pelabuhan.error);
  const [selectedPelabuhan, setSelectedPelabuhan] = useState("Pelabuhan list");

  useEffect(() => {
    if (idNegara) {
      dispatch(fetchPelabuhanData(idNegara));
    }
  }, [dispatch, idNegara]);

  if (pelabuhanStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (pelabuhanStatus === "failed") {
    return <div>Error: {pelabuhanError}</div>;
  }

  const handleSelect = (nama_pelabuhan, id_negara) => {
    setSelectedPelabuhan(nama_pelabuhan);
    setSearchParams({ idNegara: id_negara });
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
              onClick={() => handleSelect(pelabuhan.nama_pelabuhan, pelabuhan.id_negara)}
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
