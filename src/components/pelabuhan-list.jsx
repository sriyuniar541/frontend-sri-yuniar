import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPelabuhanData } from "../reducer/pelabuhanReducer";
import { Dropdown } from "react-bootstrap";
// import { Dropdown } from "bootstrap";

function PelabuhanList() {
  const dispatch = useDispatch();
  const pelabuhanData = useSelector((state) => state.pelabuhan.data);
  const pelabuhanStatus = useSelector((state) => state.pelabuhan.status);
  const pelabuhanError = useSelector((state) => state.pelabuhan.error);
  const [selectedPelabuhan, setSelectedPelabuhan] = useState('Pelabuhan list');
  

  const idNegara = localStorage.getItem('selectedIdNegara') || 1; 
  useEffect(() => {
    dispatch(fetchPelabuhanData(idNegara)); 
  }, [dispatch, idNegara]); 

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
      <h2>Pelabuhan List</h2>
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
