import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormArtista = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [generoList, setGeneroList] = useState([]);
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getListaGeneros();
        if (id) {
            getArtistaById();
        }
    }, [id]);

    // Obtener la lista de géneros
    const getListaGeneros = () => {
        axios.get('http://localhost:3000/generos')
            .then(res => {
                setGeneroList(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Obtener los datos del artista por id
    const getArtistaById = () => {
        axios.get(`http://localhost:3000/artistas/${id}`)
            .then(res => {
                const artista = res.data;
                setNombre(artista.nombre);
                setGeneroId(artista.generoId);
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

        const artista = {
            nombre,
            generoId
        };

        if (id) {
            editArtista(artista);
        } else {
            insertArtista(artista);
        }
    };

    const editArtista = (artista) => {
        axios.put(`http://localhost:3000/artistas/${id}`, artista)
            .then(res => {
                console.log(res.data);
                navigate('/artistas/admin');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const insertArtista = (artista) => {
        axios.post('http://localhost:3000/artistas', artista)
            .then(res => {
                console.log(res.data);
                navigate('/artistas/admin');
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
                                <Link className="dropdown-item" to="/albums/admin">Álbumes</Link>
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
                                    <h2>{id ? 'Actualizar' : 'Registrar'} Artista</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingresa un nombre para el artista.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Género:</Form.Label>
                                        <Form.Select
                                            required
                                            value={generoId}
                                            onChange={(e) => setGeneroId(e.target.value)}
                                        >
                                            <option value="">Selecciona un género</option>
                                            {generoList
                                                .filter(genero => genero.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map(genero => (
                                                    <option key={"genero-" + genero.id} value={genero.id}>
                                                        {genero.nombre}
                                                    </option>
                                                ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor selecciona un género.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? 'Actualizar' : 'Guardar'} Artista</Button>
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

export default FormArtista;
