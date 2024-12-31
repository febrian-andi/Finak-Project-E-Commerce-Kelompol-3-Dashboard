import React from 'react';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';

const HeaderStock = ({ title, breadcrumbs, onAddStock }) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <div>
        <h1 className='text-2xl font-semibold mb-1'>{title}</h1>
        <div className='flex items-center text-sm space-x-2'>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <span className='text-red-500'>{breadcrumb}</span>
              {index < breadcrumbs.length - 1 && <span className='text-red-500'>{'>'}</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Link className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded' onClick={onAddStock} to='/stock/add'>
        Add New Stock
      </Link>
    </div>
  );
};

HeaderStock.propTypes = {
  title: PropsTypes.string,
  breadcrumbs: PropsTypes.array,
  onAddStock: PropsTypes.func,
};


export default HeaderStock;
