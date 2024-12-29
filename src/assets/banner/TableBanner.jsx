import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShortIcon from '../assets/banner/filter.svg';
import PencilIcon from '../assets/banner/PencilIcon';
import TrashIcon from '../assets/banner/TrashIcon';
import EyeIcon from '../assets/banner/EyeIcon';

const TableBanner = ({ 
  currentItems, 
  sortConfig, 
  handleSort, 
  handleDelete, 
  setBanners,
  banners 
}) => {
  const navigate = useNavigate();

  const handleViewDetail = (banner) => {
    navigate(`/banner/detail/${banner.id}`);
  };

  const handleEdit = (banner) => {
    navigate(`/banner/edit/${banner.id}`);
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-4 px-4'>Banner Picture</th>
            <th className='text-left py-4 px-4'>
              <div className='flex items-center cursor-pointer' onClick={() => handleSort('name')}>
                Banner Name
                <img 
                  src={ShortIcon} 
                  alt='filter' 
                  className={`inline-block ml-1 transition-transform duration-200 ${
                    sortConfig.key === 'name' && sortConfig.direction === 'desc' 
                      ? 'transform rotate-180' 
                      : ''
                  }`} 
                />
              </div>
            </th>
            <th className='text-left py-4 px-4'>
              <div className='flex items-center cursor-pointer' onClick={() => handleSort('targetUrl')}>
                Target URL
                <img 
                  src={filterIcon} 
                  alt='filter' 
                  className={`inline-block ml-1 transition-transform duration-200 ${
                    sortConfig.key === 'targetUrl' && sortConfig.direction === 'desc' 
                      ? 'transform rotate-180' 
                      : ''
                  }`} 
                />
              </div>
            </th>
            <th className='text-left py-4 px-4'>
              <div className='flex items-center cursor-pointer' onClick={() => handleSort('releaseDate')}>
                Release Date
                <img 
                  src={filterIcon} 
                  alt='filter' 
                  className={`inline-block ml-1 transition-transform duration-200 ${
                    sortConfig.key === 'releaseDate' && sortConfig.direction === 'desc' 
                      ? 'transform rotate-180' 
                      : ''
                  }`} 
                />
              </div>
            </th>
            <th className='text-left py-4 px-4'>
              <div className='flex items-center cursor-pointer' onClick={() => handleSort('endDate')}>
                End Date
                <img 
                  src={filterIcon} 
                  alt='filter' 
                  className={`inline-block ml-1 transition-transform duration-200 ${
                    sortConfig.key === 'endDate' && sortConfig.direction === 'desc' 
                      ? 'transform rotate-180' 
                      : ''
                  }`} 
                />
              </div>
            </th>
            <th className='text-left py-4 px-4'>
              <div className='flex items-center cursor-pointer' onClick={() => handleSort('published')}>
                Published
                <img 
                  src={filterIcon} 
                  alt='filter' 
                  className={`inline-block ml-1 transition-transform duration-200 ${
                    sortConfig.key === 'published' && sortConfig.direction === 'desc' 
                      ? 'transform rotate-180' 
                      : ''
                  }`} 
                />
              </div>
            </th>
            <th className='text-left py-4 px-4'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((banner) => (
            <tr key={banner.id} className='border-b hover:bg-gray-50'>
              <td className='py-4 px-4'>
                <img src={banner.picture} alt={banner.name} className='w-16 h-16 object-cover' />
              </td>
              <td className='py-4 px-4 text-gray-600'>{banner.name}</td>
              <td className='py-4 px-4 text-gray-600'>{banner.targetUrl}</td>
              <td className='py-4 px-4 text-gray-600'>{banner.releaseDate}</td>
              <td className='py-4 px-4 text-gray-600'>{banner.endDate}</td>
              <td className='py-4 px-4'>
                <button
                  className='relative inline-block w-12 h-6'
                  onClick={() => {
                    setBanners(banners.map((item) => (
                      item.id === banner.id 
                        ? { ...item, published: !item.published } 
                        : item
                    )));
                  }}>
                  <div className={`w-full h-full rounded-full transition-colors duration-200 ease-in-out ${
                    banner.published ? 'bg-red-500' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-1/2 -mt-2.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                      banner.published ? 'right-0.5' : 'left-0.5'
                    }`} />
                  </div>
                </button>
              </td>
              <td className='px-6 py-4'>
                <div className="flex gap-2">
                  <button 
                    className="hover:bg-gray-100 p-2 rounded-md transition-colors"
                    onClick={() => handleViewDetail(banner)}
                    title="View Details"
                  >
                    <EyeIcon />
                  </button>
                  <button 
                    className="hover:bg-gray-100 p-2 rounded-md transition-colors"
                    onClick={() => handleEdit(banner)}
                    title="Edit Banner"
                  >
                    <PencilIcon />
                  </button>
                  <button 
                    className="hover:bg-gray-100 p-2 rounded-md transition-colors"
                    onClick={() => handleDelete(banner.id)}
                    title="Delete Banner"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBanner;