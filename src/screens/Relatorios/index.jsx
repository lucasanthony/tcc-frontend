import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { lastSubmissions } from "../../services/relatorios";
import "./styles.css";

export default function Relatorios(props) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await lastSubmissions();
      setSubmissions(response.data.result);
    };

    fetchData();
  }, []);

  return (
    <div id="relatoriosContainer">
      <h3 id="aaaaaaaa">Membros da EJ</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Última submissão</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.name}</td>
              <td>{submission.last_submission}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
