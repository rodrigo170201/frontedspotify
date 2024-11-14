/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormGenero = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (id) {
            getGeneroById();
        }
    }, [id]);

    const getGeneroById = () => {
        axios.get(`http://localhost:3000/generos/${id}`)
            .then(res => {
                const genero = res.data;
                setNombre(genero.nombre);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        setValidated(true);

        const genero = { nombre };

        if (id) {
            editGenero(genero);
        } else {
            insertGenero(genero);
        }
    };

    const editGenero = (genero) => {
        axios.put(`http://localhost:3000/generos/${id}`, genero)
            .then(res => {
                navigate('/generos/admin');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const insertGenero = (genero) => {
        axios.post('http://localhost:3000/generos', genero)
            .then(res => {
                navigate('/generos/admin');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow w-100" fixed="top">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">Spotify | Administración</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <NavDropdown title="Admin" id="admin-dropdown">
                                <Link className="dropdown-item" to="/generos/admin">Géneros</Link>
                                <Link className="dropdown-item" to="/albums/admin">Álbum</Link>
                                <Link className="dropdown-item" to="/artistas/admin">Artistas</Link>
                                <Link className="dropdown-item" to="/canciones/admin">Canciones</Link>
                            </NavDropdown>
                        </Nav>
                        {/* Campo de búsqueda */}
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Buscar Género"
                                className="me-2"
                                aria-label="Buscar"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-success">Buscar</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-5 pt-5">
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Formulario de Género</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control 
                                            required 
                                            value={nombre} 
                                            type="text" 
                                            onChange={(e) => setNombre(e.target.value)} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el nombre del género.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Género</Button>
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

export default FormGenero;
