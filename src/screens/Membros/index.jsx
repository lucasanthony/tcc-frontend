import React, { useEffect, useState } from "react";
import { Card, Button, Badge, Modal } from "react-bootstrap";
import { findAll } from "../../services/membros";
import "./styles.css";

export default function Membros(props) {
  const [membros, setMembros] = useState([]);
  const [membroSelecionado, setMembroSelecionado] = useState({});
  const [show, setShow] = useState(false);

  const salvarEdicao = () => {
    // TODO salvar membroSelecionado com as alterações feitas
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (membroEscolhido) => {
    setMembroSelecionado(membroEscolhido);
    setShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await findAll();
      setMembros(response.data);
      setMembroSelecionado(response.data[0]);
    };

    fetchData();
  }, []);

  return (
    <div id="membrosContainer">
      <h3 id="titleRelatorios">Membros</h3>
      <div id="membrosCards">
        {membros.map((membro, index) => (
          <Card className="text-center">
            <Card.Header>
              <b>{membro.name}</b> | {membro.email}
            </Card.Header>
            {/* <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
            </Card.Body> */}
            <Card.Footer className="text-muted" id="cardFooter">
              <div id="badges">
                <Badge bg="primary" className="badgeItem">
                  Backend
                </Badge>
                <Badge bg="success" className="badgeItem">
                  Frontent
                </Badge>
                <Badge bg="danger" className="badgeItem">
                  Projetos
                </Badge>
                <Badge bg="warning" className="badgeItem">
                  Scrum
                </Badge>
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  handleShow(membro);
                }}
              >
                Detalhes
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{membroSelecionado.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={salvarEdicao}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
