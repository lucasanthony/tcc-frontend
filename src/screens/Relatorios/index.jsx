import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { lastSubmissions } from "../../services/relatorios";
import "./styles.css";

export default function Relatorios(props) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await lastSubmissions();
      setSubmissions(response.data.data);
    };

    fetchData();
  }, []);

  return (
    <div id="relatoriosContainer">
      <h3 id="aaaaaaaa">Relatórios enviados</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Última submissão</th>
            <th>Data do envio</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.name}</td>
              <td>{submission.lastSubmission}</td>
              <td>{submission.sendDay}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
