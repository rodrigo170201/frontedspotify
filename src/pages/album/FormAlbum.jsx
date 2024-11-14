import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [artistaId, setArtistaId] = useState('');
    const [artistaList, setArtistaList] = useState([]);
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getListaArtistas();
        if (id) {
            getAlbumById();
        }
    }, [id]);

    // Obtener la lista de artistas
    const getListaArtistas = () => {
        axios.get('http://localhost:3000/artistas')
            .then(res => {
                setArtistaList(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Obtener los datos del álbum por id
    const getAlbumById = () => {
        axios.get(`http://localhost:3000/albums/${id}`)
            .then(res => {
                const album = res.data;
                setTitulo(album.titulo);
                setArtistaId(album.artistaId);
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

        const album = {
            titulo,
            artistaId
        };

        if (id) {
            editAlbum(album);
        } else {
            insertAlbum(album);
        }
    };

    const editAlbum = (album) => {
        axios.put(`http://localhost:3000/albums/${id}`, album)
            .then(res => {
                console.log(res.data);
                navigate('/albums/admin');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const insertAlbum = (album) => {
        axios.post('http://localhost:3000/albums', album)
            .then(res => {
                console.log(res.data);
                navigate('/albums/admin');
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
                                placeholder="Buscar Artista"
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
                                    <h2>{id ? 'Actualizar' : 'Registrar'} Álbum</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Título:</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingresa un título para el álbum.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Artista:</Form.Label>
                                        <Form.Select
                                            required
                                            value={artistaId}
                                            onChange={(e) => setArtistaId(e.target.value)}
                                        >
                                            <option value="">Selecciona un artista</option>
                                            {artistaList
                                                .filter(artista => artista.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map(artista => (
                                                    <option key={"artista-" + artista.id} value={artista.id}>
                                                        {artista.nombre}
                                                    </option>
                                                ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor selecciona un artista.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? 'Actualizar' : 'Guardar'} Álbum</Button>
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

export default FormAlbum;
