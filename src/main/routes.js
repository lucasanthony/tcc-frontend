import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Relatorios from '../screens/Relatorios';
import React from 'react';

const routes = props => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/relatorios" />} />
      <Route path="relatorios" element={<Relatorios />}>
        {/* <Route path="invoices" element={<Invoices />}>
        <Route path=":invoice" element={<Invoice />} />
      </Route> */}
      </Route>
    </Routes>
  </BrowserRouter>
)

export default routes;