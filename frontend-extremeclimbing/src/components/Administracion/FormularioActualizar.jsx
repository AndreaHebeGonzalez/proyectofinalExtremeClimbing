import React, { useState } from 'react'
import './FormularioAdmin.css'

const FormularioActualizar = ({ productoAdmin, caract, agregarCaracteristica, quitarCaracteristica, handleModificaCaracteristica, nombre, marca, precio, cantidad, categoria, descripcion, handleNombre, handleMarca, handlePrecio, handleCantidad, handleCategoria, handleDescripcion, handleSubmit }) => {
    
    return (
        <div className="cont-formulario">
            <div>
                <p><span className="asterisco">*</span> Campo requerido</p>
            </div>

            <form id="admin-form" encType="multipart/form-data">
                {/* <!-- <div className="cont-error">
                    <small data-error="error-login">Email o contraseña incorrecto. Por favor vuelva a intentarlo.</small>
                </div> --> */}

                <div>
                    <label htmlFor="prod-nombre">Nombre <span className="asterisco">* </span></label>
                    <div className="cont-obligatorio">
                        <input className="obligatorio" type="text" name="nombre" id="prod-nombre" value={nombre} placeholder={productoAdmin.nombre} onChange={(e) => handleNombre(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="prod-marca">Marca <span className="asterisco">* </span></label>
                    <div className="cont-obligatorio">
                        <input className="obligatorio" type="text" name="marca" id="prod-marca" value={marca} placeholder={productoAdmin.marca} onChange={(e) => handleMarca(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="prod-precio">Precio <span className="asterisco">* </span></label>
                    <div className="cont-obligatorio">
                        <input className="obligatorio" type="number" name="precio" id="prod-precio" value={precio} placeholder={productoAdmin.precio} onChange={(e) => handlePrecio(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="prod-cantidad">Cantidad <span className="asterisco">* </span></label>
                    <div className="cont-obligatorio">
                        <input className="obligatorio" type="number" name="cantidad" id="prod-cantidad" value={cantidad} placeholder={productoAdmin.cantidad} onChange={(e) => handleCantidad(e.target.value)}/>
                    </div>
                </div>

                
                <div>
                    <label htmlFor="prod-categoria">Seleccione una categoria <span className="asterisco">* </span></label>
                    <div className="cont-obligatorio">
                        <select className="obligatorio" name="categoria" id="prod-categoria" value={categoria || "" } onChange={(e) => handleCategoria(e.target.value)}>
                            <option value="">Elije una categoría</option>
                            <option value="camping">Camping</option>
                            <option value="montañismo">Montañismo</option>
                            <option value="escalada">Escalada</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="prod-subcategoria_1">Subcategoría 1</label>
                    <input className="no-obligatorio" type="text" name="subcategoriaUno" id="prod-subcategoria_1" placeholder="Ingrese subcategoria 1" disabled/>
                </div>
                
                <div>
                    <label htmlFor="prod-subcategoria_2">Subcategoría 2</label>
                    <input className="no-obligatorio" type="text" name="subcategoriaDos" id="prod-subcategoria_2" placeholder="Ingrese subcategoria 2" disabled/>
                </div>

                <div>
                    <label htmlFor="prod-subcategoria_3">Subcategoría 3</label>
                    <input className="no-obligatorio" type="text" name="subcategoriaTres" id="prod-subcategoria_3" placeholder="Ingrese subcategoria 3" disabled/>
                </div>

                <div>
                    <label htmlFor="prod-descripcion">Descripción</label>
                    <textarea className="no-obligatorio" type="text" name="descripcion" id="prod-descripcion" value={descripcion} placeholder={productoAdmin.descripcion} onChange={(e) => handleDescripcion(e.target.value)}></textarea>
                </div>

                <div className='contenedor-caracteristicas'>
                    <label htmlFor="caracteristicas">Características:</label>
                    <div className="cont-lista">
                        <ul id="lista-caracteristicas">
                            {caract.map((caracteristica) => {
                                const idCaracteristica = caracteristica.id; 
                                return (
                                <li key={caracteristica.id}>
                                    <input
                                    type="text"
                                    name="caracteristicas"
                                    placeholder="Ingrese caracteristica" /* Deberia poder modificar cada caracteristica individualmente, agregarla o quitarla */
                                    value={caracteristica.valor}
                                    onChange={(e) => handleModificaCaracteristica(idCaracteristica, e.target.value)}
                                    />
                                </li>
                                );
                            })}
                        </ul>
                        <div className="cont-botones">
                            <button id="agregar-caracteristica" onClick={(e) => {
                                e.preventDefault();
                                agregarCaracteristica();
                                console.log(caract.length)
                                }} disabled={caract.length >= 15}>Agregar Característica</button>
                            <button id="quitar-caracteristica" onClick={(e) => {
                                e.preventDefault();
                                console.log(caract.length)
                                const idUltimaCaracteristica = caract[caract.length - 1]?.id;
                                quitarCaracteristica(idUltimaCaracteristica);
                                }} disabled={caract.length <= 1}>Quitar Característica</button>
                        </div>     
                    </div> 
                </div>
                
                <div>
                    <label htmlFor="info-tecnica">Información técnica</label>
                    <input className="no-obligatorio" type="text" name="info-tecnica" id="info-tecnica" placeholder="Ingrese informacion tecnica" disabled/>
                </div>

                <div>
                    <label htmlFor="imagenes">Imagenes:</label> 
                    <input type="file" name="imagenes" id="imagenes" accept="image/jpeg,image/png" multiple/>                            
                </div>
                

                <div className="btns-form">
                    <button id="agregar-producto-btn" type="submit" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        Agregar producto
                    </button>
                </div>

            </form>
        </div>
    )
}

export default FormularioActualizar