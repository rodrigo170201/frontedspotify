import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [albumList, setAlbumList] = useState([]);
    const [validated, setValidated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getListaAlbums();
        if (id) {
            getCancionById();
        }
    }, [id]);

    // Obtener la lista de álbumes
    const getListaAlbums = () => {
        axios.get('http://localhost:3000/albums')
            .then(res => {
                setAlbumList(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Obtener los datos de la canción por id
    const getCancionById = () => {
        axios.get(`http://localhost:3000/canciones/${id}`)
            .then(res => {
                const cancion = res.data;
                setTitulo(cancion.titulo);
                setAlbumId(cancion.albumId);
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

        const cancion = {
            titulo,
            albumId
        };

        if (id) {
            editCancion(cancion);
        } else {
            insertCancion(cancion);
        }
    };

    const editCancion = (cancion) => {
        axios.put(`http://localhost:3000/canciones/${id}`, cancion)
            .then(res => {
                console.log(res.data);
                navigate('/canciones/admin');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const insertCancion = (cancion) => {
        axios.post('http://localhost:3000/canciones', cancion)
            .then(res => {
                console.log(res.data);
                navigate('/canciones/admin');
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
                                placeholder="Buscar Álbum"
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
                                    <h2>{id ? 'Actualizar' : 'Registrar'} Canción</h2>
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
                                            Por favor ingresa un título para la canción.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Álbum:</Form.Label>
                                        <Form.Select
                                            required
                                            value={albumId}
                                            onChange={(e) => setAlbumId(e.target.value)}
                                        >
                                            <option value="">Selecciona un álbum</option>
                                            {albumList
                                                .filter(album => album.titulo && album.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map(album => (
                                                    <option key={"album-" + album.id} value={album.id}>
                                                        {album.titulo}
                                                    </option>
                                                ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor selecciona un álbum.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? 'Actualizar' : 'Guardar'} Canción</Button>
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

export default FormCancion;
