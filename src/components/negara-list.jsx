import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNegaraData } from '../reducer/negaraReducer';
import Dropdown from 'react-bootstrap/Dropdown';
import { fetchPelabuhanData } from '../reducer/pelabuhanReducer';

function NegaraList() {
  const dispatch = useDispatch();
  const negaraData = useSelector((state) => state.negara.data);
  const negaraStatus = useSelector((state) => state.negara.status);
  const negaraError = useSelector((state) => state.negara.error);
  const [selectedNegara, setSelectedNegara] = useState('Negara list');
  const [idNegara, setIdNegara] = useState('1')

  useEffect(() => {
    dispatch(fetchNegaraData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPelabuhanData(idNegara));
  }, [dispatch, idNegara]);


  if (negaraStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (negaraStatus === 'failed') {
    return <div>Error: {negaraError}</div>;
  }

  const handleSelect = (nama_negara, id_negara) => {
    setSelectedNegara(nama_negara);
    setIdNegara(idNegara)
    localStorage.setItem('id_Negara', id_negara.toString());
  };

  return (
    <div>
      <h5>Negara List</h5>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedNegara}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {negaraData.map((negara) => (
            <Dropdown.Item
              key={negara.id_negara}
              onClick={() => handleSelect(negara.nama_negara, negara.id_negara)}
            >
              {negara.nama_negara}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NegaraList;
