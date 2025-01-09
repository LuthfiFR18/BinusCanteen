import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping, faStore, faReceipt} from '@fortawesome/free-solid-svg-icons';
import Headeradmin from '../components/Headeradmin';
import '../style/AdminTransaction.css'

function AdminTransaction() {

    const navigate = useNavigate();

  return (
    <div className="admintransaction-container">
        <Headeradmin/>
        <nav className='menu-admin'>
            <ul>
                <li>
                    <a href="#" onClick={()=>navigate('/adminbuyer')}>
                    <FontAwesomeIcon icon={faCartShopping} size='4x' />
                    <p className='namenavbar'>All User</p>
                    </a>
                </li>

                <li>
                    <a href="#" onClick={()=>navigate('/adminseller')}>
                    <FontAwesomeIcon icon={faStore} size='4x'/>
                    <p className='namenavbar'>Booth&Seller</p>
                    </a>
                </li>

                <li>
                    <a href="#" className='activenav'>
                    <FontAwesomeIcon icon={faReceipt} size='4x' />
                    <p className='namenavbar'>Transaction</p>
                    </a>
                </li>
            </ul>
        </nav>

        <table className='transaction-table'>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>No Transcation</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>payment Method</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Soto Mie Bogor</td>
                    <td>2</td>
                    <td>Rp.20000</td>
                    <td>01</td>
                    <td>Lala</td>
                    <td>19/12/2024</td>
                    <td>BCA</td>
                </tr>
            </tbody>

        </table>
        {/* table isinya item, quantity, total price, no transaction, User, date*/}
    </div>
  )
}

export default AdminTransaction;