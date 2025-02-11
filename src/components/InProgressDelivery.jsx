import React from 'react'
import '../style/InProgressDelivery.css'
function InProgressDelivery() {
  return (
    <div className="order-table-delivery">
    <table className='inprogress-table'>
      <thead>
        <tr>
          <th>Date & time</th>
          <th>No pemesanan</th>
          <th>Item</th>
          <th>Item Description</th>
          <th>Location</th>
          <th>Status</th>
        </tr>
      </thead>
      
      <tbody>
        <tr>
          <td>
            <div>19/09/2024</div>
            <div>08:50</div>
          </td>
          <td>BNS01</td>
          <td>
            <ul>
              <li>Ayam geprek (x2)</li>
              <li>Indomie geprek mozarela (x1)</li>
              <li>Es Teh Manis (x3)</li>
            </ul>
          </td>
          <td>Ayam geprek lvl 2</td>
          <td>Lt. 9</td>

          <td>
            <button className='button-status-delivery'>Done</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default InProgressDelivery;