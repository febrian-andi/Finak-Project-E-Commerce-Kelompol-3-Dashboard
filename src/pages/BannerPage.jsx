import React, { useState } from 'react';
import trashIcon from '../assets/banner/trash.svg';
import pencilIcon from '../assets/banner/pencil.svg';
import eyeIcon from '../assets/banner/eye.svg';
import filterIcon from '../assets/banner/filter.svg';
import bannerImage from '../assets/banner/bannerImage.png';
import { Link } from 'react-router-dom';

const BannerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  // Sample data
  const [banners, setBanners] = useState([
    {
      id: 1,
      picture: bannerImage,
      name: 'Promo Akhir Tahun',
      targetUrl: 'www.e-commerce.com',
      releaseDate: '09/11/2024',
      endDate: '12/11/2024',
      published: false,
    },
    {
      id: 2,
      picture: bannerImage,
      name: 'Produk Baru',
      targetUrl: 'www.e-commerce.com',
      releaseDate: '08/11/2024',
      endDate: '11/11/2024',
      published: true,
    },
    {
      id: 3,
      picture: bannerImage,
      name: 'Diskon 30%',
      targetUrl: 'www.e-commerce.com',
      releaseDate: '07/11/2024',
      endDate: '10/11/2024',
      published: false,
    },
    {
      id: 4,
      picture: bannerImage,
      name: 'Giveaway',
      targetUrl: 'www.e-commerce.com',
      releaseDate: '03/11/2024',
      endDate: '09/11/2024',
      published: false,
    },
  ]);

  // Modal handlers
  const handleAddNew = () => {
    setModalMode('add');
    setSelectedBanner(null);
    setIsModalOpen(true);
  };

  const handleEdit = (banner) => {
    setModalMode('edit');
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setBanners(banners.filter((banner) => banner.id !== id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBanner(null);
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to data
  const sortedBanners = [...banners].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortConfig.key.includes('Date')) {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination calculations
  const totalItems = sortedBanners.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentItems = sortedBanners.slice(startIndex, endIndex);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-semibold'>Banner Management</h1>
            <div className='text-sm text-gray-500'>
              <span className='text-red-500'>Home</span> / Banner Management
            </div>
          </div>
          <Link onClick={handleAddNew} to={'/banner/add'} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'>
            Add New Banner
          </Link>
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='text-left py-4 px-4'>Banner Picture</th>
                <th className='text-left py-4 px-4'>
                  <div className='flex items-center cursor-pointer' onClick={() => handleSort('name')}>
                    Banner Name
                    <img src={filterIcon} alt='filter' className={`inline-block ml-1 transition-transform duration-200 ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                  </div>
                </th>
                <th className='text-left py-4 px-4'>
                  <div className='flex items-center cursor-pointer' onClick={() => handleSort('targetUrl')}>
                    Target URL
                    <img src={filterIcon} alt='filter' className={`inline-block ml-1 transition-transform duration-200 ${sortConfig.key === 'targetUrl' && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                  </div>
                </th>
                <th className='text-left py-4 px-4'>
                  <div className='flex items-center cursor-pointer' onClick={() => handleSort('releaseDate')}>
                    Release Date
                    <img src={filterIcon} alt='filter' className={`inline-block ml-1 transition-transform duration-200 ${sortConfig.key === 'releaseDate' && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                  </div>
                </th>
                <th className='text-left py-4 px-4'>
                  <div className='flex items-center cursor-pointer' onClick={() => handleSort('endDate')}>
                    End Date
                    <img src={filterIcon} alt='filter' className={`inline-block ml-1 transition-transform duration-200 ${sortConfig.key === 'endDate' && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                  </div>
                </th>
                <th className='text-left py-4 px-4'>
                  <div className='flex items-center cursor-pointer' onClick={() => handleSort('published')}>
                    Published
                    <img src={filterIcon} alt='filter' className={`inline-block ml-1 transition-transform duration-200 ${sortConfig.key === 'published' && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
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
                        setBanners(banners.map((item) => (item.id === banner.id ? { ...item, published: !item.published } : item)));
                      }}>
                      <div className={`w-full h-full rounded-full transition-colors duration-200 ease-in-out ${banner.published ? 'bg-red-500' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1/2 -mt-2.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${banner.published ? 'right-0.5' : 'left-0.5'}`} />
                      </div>
                    </button>
                  </td>
                  <td className='py-4 px-4'>
                    <div className='flex space-x-2'>
                      <Link to={`/banner/detail/${banner.id}`} className='p-1 hover:bg-gray-100 rounded'>
                        <img src={eyeIcon} alt='View' className='w-5 h-5' />
                      </Link>
                      <Link to={`/banner/edit/${banner.id}`} className='p-1 hover:bg-gray-100 rounded'>
                        <img src={pencilIcon} alt='Edit' className='w-5 h-5' />
                      </Link>
                      <button className='p-1 hover:bg-gray-100 rounded' onClick={() => handleDelete(banner.id)}>
                        <img src={trashIcon} alt='Delete' className='w-5 h-5' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex justify-between items-center mt-4 px-4'>
          <div className='text-sm text-gray-600'>{`${startIndex + 1}-${endIndex} of ${totalItems}`}</div>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              <span className='mr-2 text-sm text-gray-600'>Rows per page:</span>
              <select
                className='border rounded p-1'
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className='flex items-center space-x-1'>
              <button onClick={prevPage} disabled={currentPage === 1} className={`p-1 rounded hover:bg-gray-100 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600'}`}>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
              </button>
              <span className='px-2'>{`${currentPage}/${totalPages}`}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages} className={`p-1 rounded hover:bg-gray-100 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600'}`}>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPage;
