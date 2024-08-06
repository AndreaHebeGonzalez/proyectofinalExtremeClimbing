import React from 'react'

const OrdenesDeCompra = () => {
  return (
    <>
      <h2>Ordenes de compra</h2>
      <table>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Fecha</th>
            <th>Precio final</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
            {
              OrdenesDeCompra.map(()=> (
                <tr>
                  <td>Orden1</td>
                  <td>Fecha1</td>
                  <td>PrecioFinal1</td>
                  <td>Estado1</td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </>
  )
}

export default OrdenesDeCompra