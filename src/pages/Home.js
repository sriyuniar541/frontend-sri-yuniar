import React from 'react';
import { useSelector } from 'react-redux';
import NegaraList from '../components/negara-list';
import PelabuhanList from '../components/pelabuhan-list';
import BarangList from '../components/barang-list';

export default function Home() {
  const negara = useSelector((state) => state.negara);
  const pelabuhan = useSelector((state) => state.pelabuhan)
  const barang = useSelector((state) => state.barang)

  return (
    <div className='container'>
      <NegaraList negaraData={negara.data} />
      <PelabuhanList pelabuhanData={pelabuhan.data}/>
      <BarangList barangData={barang.data}/>
    </div>
  );
}
