import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNegaraData } from "../reducer/negaraReducer";
import Dropdown from "react-bootstrap/Dropdown";

function NegaraList() {
  const dispatch = useDispatch();
  const negaraData = useSelector((state) => state.negara.data);
  const negaraStatus = useSelector((state) => state.negara.status);
  const negaraError = useSelector((state) => state.negara.error);  
  const [selectedNegara, setSelectedNegara] = useState('Negara list');
  const [selectedIdNegara, setSelectedIdNegara] = useState('1');


  useEffect(() => {
    localStorage.setItem('selectedIdNegara', selectedIdNegara.toString());
  }, [selectedIdNegara]);
  

  useEffect(() => {
    dispatch(fetchNegaraData());
  }, [dispatch]);

  if (negaraStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (negaraStatus === "failed") {
    return <div>Error: {negaraError}</div>;
  }

  const handleSelect = (nama_negara, id_negara) => {
    setSelectedNegara(nama_negara);
    setSelectedIdNegara(id_negara);
    
  };

  return (
    <div>
      <h2>Negara List</h2>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedNegara}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {negaraData.map((negara) => (
            <Dropdown.Item key={negara.id_negara} onClick={() => handleSelect(negara.nama_negara, negara.id_negara)}>
              {negara.nama_negara}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NegaraList;
