import React from "react";
import "./styles.css";
import logo from "../../assets/logo.png";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

export default function Sidebar(props) {
  return (
    <div id="sidebar">
      <img src={logo} alt="logo da codex" id="logoSidebar" />
      <h3 id="relatorios">
        <HiOutlineDocumentReport />
        Relatórios
      </h3>
      <h3 id="membros">
        <BsPeople />
        Membros
      </h3>
      <h3 id="projetos">
        <AiOutlineFundProjectionScreen />
        Projetos
      </h3>
    </div>
  );
}
