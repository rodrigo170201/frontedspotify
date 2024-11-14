import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Navbar, NavDropdown, Nav, Form, FormControl, Button, Accordion } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { FaSearch, FaCog } from "react-icons/fa";

const DetailArtista = () => {
    const { id } = useParams();
    const [artista, setArtista] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [cancionesPorAlbum, setCancionesPorAlbum] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getArtistaById(id);
        getAlbumsByArtistaId(id);
    }, [id]);

    const getArtistaById = async (artistaId) => {
        try {
            const res = await axios.get(`http://localhost:3000/artistas/${artistaId}`);
            setArtista(res.data);
        } catch (error) {
            console.log("Error fetching Artista details", error);
        }
    };

    const getAlbumsByArtistaId = async (artistaId) => {
        try {
            const res = await axios.get(`http://localhost:3000/albums/artista/${artistaId}`);
            setAlbums(res.data || []);
        } catch (error) {
            console.log("Error fetching Albums", error);
        }
    };

    const getCancionesByAlbumId = async (albumId) => {
        try {
            const res = await axios.get(`http://localhost:3000/canciones/album/${albumId}`);
            setCancionesPorAlbum((prevCancionesPorAlbum) => ({
                ...prevCancionesPorAlbum,
                [albumId]: res.data || []
            }));
        } catch (error) {
            console.log("Error fetching Canciones", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (!artista) return <div>Loading...</div>;

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
                    <h3>{artista.nombre}</h3>
                    <p>ID: {artista.id}</p>
                </div>
                
                <div style={{ height: '80%', padding: '20px', overflowY: 'auto' }}>
                    <Row>
                        <Accordion>
                            {albums
                                .filter(album => album.titulo && album.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(album => (
                                    <Accordion.Item
                                        eventKey={album.id}
                                        key={album.id}
                                        onClick={() => getCancionesByAlbumId(album.id)}
                                    >
                                        <Accordion.Header>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <div style={{ width: '80px', height: '80px', paddingRight: '10px', overflow: 'hidden' }}>
                                                    <img
                                                        src={`http://localhost:3000/uploads/albumfotos/${album.id}.jpg`}
                                                        alt={album.titulo}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',  // Asegura que la imagen ocupe todo el espacio sin distorsionarse
                                                            borderRadius: '5px'  // Da un borde redondeado a las esquinas si deseas
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ flexGrow: 1 }}>
                                                    {album.titulo}
                                                </div>
                                            </div>
                                        </Accordion.Header>

                                        <Accordion.Body>
                                            <ul>
                                                {cancionesPorAlbum[album.id] && cancionesPorAlbum[album.id].map(cancion => (
                                                    <li key={cancion.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ width: '75%' }}>{cancion.titulo}</div>
                                                        <div style={{ width: '25%' }}>
                                                            <audio controls style={{ width: '100%' }}>
                                                                <source src={`http://localhost:3000/uploads/cancionesmp3/${cancion.id}.mp3`} type="audio/mp3" />
                                                                Your browser does not support the audio element.
                                                            </audio>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Accordion.Body>

                                    </Accordion.Item>
                                ))}
                        </Accordion>
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default DetailArtista;
