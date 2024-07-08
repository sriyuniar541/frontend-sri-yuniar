import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPelabuhanData } from "../reducer/pelabuhanReducer";
import { Dropdown } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";

function PelabuhanList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const idNegara = searchParams.get('idNegara') || '';
  const pelabuhan = searchParams.get('Pelabuhan') || '';
  const dispatch = useDispatch();
  const pelabuhanData = useSelector((state) => state.pelabuhan.data);
  const pelabuhanStatus = useSelector((state) => state.pelabuhan.status);
  const pelabuhanError = useSelector((state) => state.pelabuhan.error);
  const [selectedPelabuhan, setSelectedPelabuhan] = useState(pelabuhan) || '';

  useEffect(() => {
    if (idNegara) {
      dispatch(fetchPelabuhanData(idNegara));
    }
  }, [dispatch, idNegara]);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialIdNegara = queryParams.get("idNegara") || "1";

  if (pelabuhanStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (pelabuhanStatus === "failed") {
    return <div>Error: {pelabuhanError}</div>;
  }

  const handleSelect = (nama_pelabuhan, id_pelabuhan) => {
    setSelectedPelabuhan(nama_pelabuhan);
    setSearchParams({ idNegara });
    queryParams.set("idPelabuhan", id_pelabuhan.toString());
    queryParams.set("Pelabuhan", nama_pelabuhan);
    const newUrl = `${queryParams.toString()}`;
    window.location.search = newUrl;
  };

  return (
    <div>
      <h5>Pelabuhan List</h5>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedPelabuhan ? selectedPelabuhan : 'Pelabuhan List'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {pelabuhanData.map((pelabuhan) => (
            <Dropdown.Item
              key={pelabuhan.id_pelabuhan}
              onClick={() => handleSelect(pelabuhan.nama_pelabuhan, pelabuhan.id_pelabuhan)}
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
