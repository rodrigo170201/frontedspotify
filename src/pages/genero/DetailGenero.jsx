import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, NavDropdown, Nav, Form, FormControl, Button, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { FaSearch, FaCog } from "react-icons/fa";

const DetailGenero = () => {
    const { id } = useParams();
    const [genero, setGenero] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getGeneroById(id);
    }, [id]);

    const getGeneroById = async (generoId) => {
        try {
            const res = await axios.get(`http://localhost:3000/generos/${generoId}/detail`);
            setGenero(res.data);
        } catch (error) {
            console.log("Error fetching Genero details", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (!genero) return <div>Loading...</div>;

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
                        
                        <Nav>
                            <Nav.Link href="#">
                                <FaCog size={20} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{ paddingTop: '80px' }}></div>

            <Container fluid style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '20%', padding: '20px', borderBottom: '1px solid #ddd' }}>
                    <h3>{genero.nombre}</h3>
                    <p>ID: {genero.id}</p>
                </div>
                
                <div style={{ height: '80%', padding: '20px', overflowY: 'auto' }}>
                    <Row>
                        {genero.artistas
                            .filter(artista =>
                                artista.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(artista => {
                                // Construir la URL de la imagen basada en el ID del artista
                                const artistaImageUrl = `http://localhost:3000/uploads/artistasfotos/${artista.id}.jpg`;

                                return (
                                    <Col key={artista.id} md={4} className="mb-4">
                                        <Link to={`/artista/${artista.id}/detail`} style={{ textDecoration: 'none' }}>
                                            <Card
                                                className="shadow-sm text-white"
                                                style={{
                                                    borderRadius: "10px",
                                                    backgroundColor: "#34495E",
                                                    width: "180px",
                                                    height: "240px",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: "15px"
                                                }}
                                            >
                                                {/* Imagen centrada y cuadrada */}
                                                <div
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        borderRadius: "50%",
                                                        backgroundImage: `url(${artistaImageUrl})`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        marginBottom: "10px"
                                                    }}
                                                ></div>

                                                <Card.Body className="d-flex flex-column justify-content-end" style={{ padding: '0', display: 'flex', justifyContent: 'center' }}>
                                                    <Card.Title className="fw-bold" style={{ fontSize: '1rem', textAlign: 'center' }}>
                                                        {artista.nombre}
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                );
                            })}
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default DetailGenero;
