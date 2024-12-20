import React from 'react';
import trashIcon from '../../assets/stock/trash.svg';
import pencilIcon from '../../assets/stock/pencil.svg';
import eyeIcon from '../../assets/stock/eye.svg';
import { Link } from 'react-router-dom';

const TableStock = ({ currentItems }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left px-6 py-4 bg-gray-50'>Product Name</th>
            <th className='text-left px-6 py-4 bg-gray-50'>Varian Product</th>
            <th className='text-left px-6 py-4 bg-gray-50'>Quantity</th>
            <th className='text-left px-6 py-4 bg-gray-50'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className='table-row'>
              <td className='px-6 py-4'>{item.name}</td>
              <td className='px-6 py-4'>{item.variant}</td>
              <td className='px-6 py-4'>
                <span className={item.quantity > 2 ? 'text-green-600' : 'text-red-500'}>{item.quantity}</span>
              </td>
              <td className='px-6 py-4'>
                <div className='flex gap-2'>
                  {/* View Action */}
                  <Link className='hover:bg-gray-100 p-2 rounded-md' to={`/stock/detail`}>
                    <img src={eyeIcon} alt='' />
                  </Link>
                  {/* Edit Action */}
                  <Link className='hover:bg-gray-100 p-2 rounded-md' to={`/stock/edit`}>
                    <img src={pencilIcon} alt='' />
                  </Link>
                  {/* Delete Action */}
                  <Link className='hover:bg-gray-100 p-2 rounded-md'>
                    <img src={trashIcon} alt='' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableStock;
