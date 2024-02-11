import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Inicio from './pages/Inicio/Inicio'
import Nosotros from './pages/Nosotros/Nosotros'
import Productos from './pages/Productos/Productos'
import DetalleProducto from './pages/DetalleProducto/DetalleProducto'
import Contacto from './pages/Contacto/Contacto'
import Registro from './pages/LoginRegistro/Registro'
import Login from './pages/LoginRegistro/Login'
import ProcesarCompra from './pages/ProcesarCompra/ProcesarCompra'
import Footer from './components/Footer/Footer'
import Administracion from './pages/Administracion/Administracion'
import ProductosAdmin from './pages/Administracion/ProductosAdmin'
import AgregarProducto from './pages/Administracion/AgregarProducto'
import ModificarProducto from './pages/Administracion/ModificarProducto'
import NoEncontrado from './pages/NoEncontrado/NoEncontrado'
import Cart from './components/Cart/Cart'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Primer componente de la app */}
    <header>
      <Navbar /> {/* Importo navegador principal que será compartido por todas las paginas */}
    </header>
    <main>
    <Cart />
      <Routes> 
          <Route path="/" element= {<Inicio />} /> {/* A este componente se le pasan dos props: path y element, en path va la ruta asociada al componente pages, y en element va el componente pages */}
          <Route path="/nosotros" element= {<Nosotros />} />
          <Route path="/productos" element= {<Productos />} />
          <Route path="/detalle-producto/:id" element= {<DetalleProducto />} />
          <Route path="/contacto" element= {<Contacto />} />
          <Route path="/registro" element= {<Registro />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/procesar-compra" element= {<ProcesarCompra />} />
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
