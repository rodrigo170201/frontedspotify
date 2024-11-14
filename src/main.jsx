import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaGeneros from './pages/genero/ListaGeneros.jsx'; // Importa el componente de géneros
import ListaGeneroAdmin from './pages/genero/ListaGeneroAdmin.jsx'; // Importa el componente de administración de géneros
import ListaAlbumAdmin from './pages/album/ListaAlbumAdmin.jsx';
import ListaArtistaAdmin from './pages/artista/ListaArtistaAdmin.jsx';
import ListaCancionAdmin from './pages/cancion/ListaCancionAdmin.jsx';
import FormGenero from './pages/genero/FormGenero.jsx';
import DetailGenero from './pages/genero/DetailGenero.jsx';
import FormAlbum from './pages/album/FormAlbum.jsx';
import FormArtista from './pages/artista/FormArtista.jsx';
import FormCancion from './pages/cancion/FormCancion.jsx';
import DetailArtista from './pages/artista/DetailArtista.jsx';
import FotoArtista from './pages/artista/FotoArtista.jsx';
import FotoAlbum from './pages/album/FotoAlbum.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListaGeneros />, 
  },
  {
    path: "/generos", 
    element: <ListaGeneros />,
  },
  {
    path: "/generos/admin", 
    element: <ListaGeneroAdmin />,
  },
  {
    path: "/albums/admin", 
    element: <ListaAlbumAdmin />, 
  },
  {
    path: "/artistas/admin", 
    element: <ListaArtistaAdmin />, 
  },
  {
    path:"/canciones/admin",
    element: <ListaCancionAdmin/>
  },
  {
    path: "/generos/create", 
    element: <FormGenero /> 
  },
  {
    path: "/generos/:id", 
    element: <FormGenero /> 
  },
  {
    path: "/generos/:id/detail",
    element: <DetailGenero /> 
  },
  {
    path: "/albums/create", 
    element: <FormAlbum /> 
  },
  {
    path: "/albums/:id", 
    element: <FormAlbum /> 
  },
  {
    path: "/artistas/create", 
    element: <FormArtista /> 
  },
  {
    path: "/artistas/:id", 
    element: <FormArtista /> 
  },
  {
    path: "/canciones/create", 
    element: <FormCancion /> 
  },
  {
    path: "/canciones/:id", 
    element: <FormCancion /> 
  },
  {
    path:"/artista/:id/detail",
    element: <DetailArtista/>
  },
  {
    path: "/artistas/:id/fotoartista",
    element: <FotoArtista /> 
  },
  {
    path: "/albums/:id/fotoalbum",  
    element: <FotoAlbum /> 
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
