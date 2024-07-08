import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNegaraData } from "../reducer/negaraReducer";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchPelabuhanData } from "../reducer/pelabuhanReducer";
import { useLocation, useSearchParams } from "react-router-dom";

function NegaraList() {
  const dispatch = useDispatch();
  const negaraData = useSelector((state) => state.negara.data);
  const negaraStatus = useSelector((state) => state.negara.status);
  const negaraError = useSelector((state) => state.negara.error);
  const [searchParams, setSearchParams] = useSearchParams();
  const negara = searchParams.get("Negara") || "";
  const [selectedNegara, setSelectedNegara] = useState(negara) || "Negara List";

  useEffect(() => {
    dispatch(fetchNegaraData());
  }, [dispatch]);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialIdNegara = queryParams.get("idNegara") || "1";
  const [idNegara, setIdNegara] = useState(initialIdNegara);

  if (negaraStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (negaraStatus === "failed") {
    return <div>Error: {negaraError}</div>;
  }


  const handleSelect = (nama_negara, id_negara) => {
    setSelectedNegara(nama_negara);
    setIdNegara(id_negara.toString());
    queryParams.set("idNegara", id_negara.toString());
    queryParams.set("Negara", nama_negara);
    const newUrl = `${queryParams.toString()}`;
    window.location.search = newUrl;
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
