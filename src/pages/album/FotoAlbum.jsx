import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCog } from "react-icons/fa";


const FotoAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fotoAlbum, setFotoAlbum] = useState(null);
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const onChangeFoto = (e) => {
        setFotoAlbum(e.target.files[0]);
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const formData = new FormData();
        formData.append('fotoAlbum', fotoAlbum);

        axios.post(`http://localhost:3000/albums/${id}/fotoalbum`, formData)
            .then(res => {
                console.log(res.data);
                navigate(`/albums/admin`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow w-100" fixed="top">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">Spotify</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <NavDropdown title="Admin" id="admin-dropdown">
                                <Link className="dropdown-item" to={"/generos/admin"}>Generos</Link>
                                <Link className="dropdown-item" to="/albums/admin">Album</Link>
                                <Link className="dropdown-item" to="/artistas/admin">Artistas</Link>
                                <Link className="dropdown-item" to="/canciones/admin">Canciones</Link>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex me-2">
                            <FormControl
                                type="search"
                                placeholder="Buscar Album"
                                className="me-2"
                                aria-label="Buscar"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-light">Buscar</Button>
                        </Form>
                        <Nav>
                            <Nav.Link href="#">
                                <FaCog size={20} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Espacio superior para que el contenido no quede cubierto por el Navbar */}
            <div style={{ paddingTop: '80px' }}></div>

            <Container className="mt-3 mb-3">
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Subir Imagen del Álbum</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Seleccione una imagen:</Form.Label>
                                        <Form.Control required type="file" onChange={onChangeFoto} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Imagen</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FotoAlbum;
