/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Navbar, NavDropdown, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListaCancionAdmin = () => {
    const [listaCanciones, setListaCanciones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getListaCanciones();
        document.title = "Administración | Artista";
    }, []);

    const getListaCanciones = () => {
        axios.get('http://localhost:3000/canciones')
            .then(res => {
                setListaCanciones(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el album?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/canciones/${id}`)
            .then(res => {
                getListaCanciones();  // Refresca la lista tras eliminar
            }).catch(error => {
                console.log(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow w-100" fixed="top">
            <Container fluid>
                    <Navbar.Brand as={Link} to="/">Spotify | Administracion</Navbar.Brand>
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
                        {/* Campo de búsqueda */}
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Buscar Album"
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

            <Container className="mt-3 mb-3" >
                <Row>
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    <h2>Catálogo de canciones</h2>
                                    <Link className="btn btn-primary" to="/canciones/create">+</Link> {/* Botón para añadir género */}
                                </Card.Title>
                                <Table striped bordered hover responsive className="mt-3">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Imagen</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaCanciones
                                            .filter(cancion =>
                                                cancion.titulo.toLowerCase().includes(searchTerm.toLowerCase())
                                            )
                                            .map(cancion => (
                                                <tr key={cancion.id}>
                                                    <td>{cancion.id}</td>
                                                    <td>{cancion.titulo}</td>
                                                    <td>
                                                        <img
                                                            src={`http://localhost:3000/uploads/cancionfotos/${cancion.id}.jpg`} // Asumiendo que tienes la URL de la imagen
                                                            alt={cancion.nombre}
                                                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10%" }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <Link className="btn btn-primary btn-sm" to={`/canciones/${cancion.id}`}>Editar</Link>
                                                            <Button variant="danger" size="sm" onClick={() => eliminar(cancion.id)}>Eliminar</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ListaCancionAdmin;
