import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Relatorios from '../screens/Relatorios';
import Membros from '../screens/Membros';
import React from 'react';

const routes = props => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/relatorios" />} />
      <Route path="relatorios" element={<Relatorios />} />
      <Route path="membros" element={<Membros />} />
      {/* <Route path="invoices" element={<Invoices />}>
        <Route path=":invoice" element={<Invoice />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
)

export default routes;