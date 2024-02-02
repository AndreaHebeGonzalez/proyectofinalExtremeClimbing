import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Contacto from './pages/Contacto'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Carrito from './pages/Carrito'
import Footer from './components/Footer'
import Administracion from './pages/Administracion'
import ProductosAdmin from './pages/ProductosAdmin'
import AgregarProducto from './pages/AgregarProducto'
import ModificarProducto from './pages/ModificarProducto'
import NoEncontrado from './pages/NoEncontrado'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Primer componente de la app */}
    <header>
      <Navbar /> {/* Importo navegador principal que será compartido por todas las paginas */}
    </header>
    <main>
      <Routes> 
          <Route path="/" element= {<Inicio />} /> {/* A este componente se le pasan dos props: path y element, en path va la ruta asociada al componente pages, y en element va el componente pages */}
          <Route path="/nosotros" element= {<Nosotros />} />
          <Route path="/productos" element= {<Productos />} />
          <Route path="/detalle-producto/:id" element= {<DetalleProducto />} />
          <Route path="/contacto" element= {<Contacto />} />
          <Route path="/registro" element= {<Registro />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/carrito" element= {<Carrito />} />
          <Route path="/administracion" element= {<Administracion />} />
          <Route path="/productos-admin" element= {<ProductosAdmin />} />
          <Route path="/agregar-producto" element= {<AgregarProducto />} />
          <Route path="/modificar-producto/:id" element= {<ModificarProducto />} />
          <Route path="*" element= {<NoEncontrado />} />
      </Routes>
    </main>
    <footer>
      <Footer />
    </footer>
  </BrowserRouter>,
)
