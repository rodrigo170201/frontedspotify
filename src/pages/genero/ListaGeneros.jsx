/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaCog } from 'react-icons/fa';

// Mapa de colores para cada género musical
const colorGeneros = {
    Rock: "#FF007F",
    Pop: "#F39C12",
    Jazz: "#1ABC9C",
    HipHop: "#8E44AD",
    // Agrega más colores para otros géneros aquí
};

const ListaGeneros = () => {
    const [listaGeneros, setListaGeneros] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getListaGeneros();
        document.title = "Spotify | Generos";
    }, []);

    const getListaGeneros = () => {
        axios.get('http://localhost:3000/generos')
            .then(res => {
                setListaGeneros(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el género?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/generos/${id}`)
            .then(res => {
                getListaGeneros();
            }).catch(error => {
                console.log(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            {/* Navbar que ocupa el ancho completo */}
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
                        
                        {/* Campo de búsqueda con icono de lupa */}
                        <Form className="d-flex me-2">
                            <FormControl
                                type="search"
                                placeholder="Buscar"
                                className="me-2"
                                aria-label="Buscar"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-light">
                                <FaSearch />
                            </Button>
                        </Form>
                        
                        {/* Icono de tuerca alineado a la derecha */}
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

            {/* Contenedor de Cards de Géneros */}
            <Container className="mt-4 mb-4">
                <Row>
                    {listaGeneros
                        .filter(genero =>
                            genero.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(genero => (
                            <Col key={genero.id} md={4} className="mb-4">
                                <Card
                                    className="shadow-sm h-100 text-white"
                                    style={{
                                        borderRadius: "10px",
                                        backgroundColor: colorGeneros[genero.nombre] || "#34495E",
                                        position: "relative",
                                        overflow: "hidden"
                                    }}
                                >
                                    {/* Imagen diagonal */}
                                    <div style={{
                                        position: "absolute",
                                        top: "-20px",
                                        right: "-20px",
                                        transform: "rotate(15deg)",
                                        width: "100px",
                                        height: "100px",
                                        background: `url(${genero.imagen})`,
                                        backgroundSize: "cover"
                                    }}></div>

                                    <Card.Body className="d-flex flex-column justify-content-end">
                                        <Card.Title className="fw-bold">{genero.nombre}</Card.Title>
                                        <Link to={`/generos/${genero.id}/detail`}>
                                            <Button variant="light" className="mt-2">
                                                Explorar {genero.nombre}
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    );
}

export default ListaGeneros;
