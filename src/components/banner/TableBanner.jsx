import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShortFilterIcon from '../../assets/banner/ShortFilterIcon';
import PencilIcon from '../../assets/banner/PencilIcon';
import TrashIcon from '../../assets/banner/TrashIcon';
import EyeIcon from '../../assets/banner/EyeIcon';
import ConfirmAlert from '../../assets/alert/ConfirmAlert';
import SuccessAlert from '../../components/sweetalert/SuccessAlert';
import PropTypes from 'prop-types';

const TableBanner = ({ currentItems, handleSort, handleDelete, setBanners, banners }) => {
  const navigate = useNavigate();
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleViewDetail = (banner) => {
    navigate(`/banner/detail/${banner.id}`);
  };

  const handleEdit = (banner) => {
    navigate(`/banner/edit/${banner.id}`);
  };

  const handlePublishClick = (banner) => {
    setSelectedBanner(banner);
    setShowPublishConfirm(true);
  };

  const handlePublishConfirm = () => {
    setBanners(banners.map((item) => (item.id === selectedBanner?.id ? { ...item, published: !item.published } : item)));
    setShowPublishConfirm(false);
    setShowSuccessAlert(true);
  };

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='text-left py-4 px-4'>Banner Picture</th>
              <th className='text-left py-4 px-4'>
                <div className='flex items-center cursor-pointer gap-2' onClick={() => handleSort('name')}>
                  Banner Name
                  <ShortFilterIcon />
                </div>
              </th>
              <th className='text-left py-4 px-4'>
                <div className='flex items-center cursor-pointer gap-2' onClick={() => handleSort('targetUrl')}>
                  Target URL
                  <ShortFilterIcon />
                </div>
              </th>
              <th className='text-left py-4 px-4'>
                <div className='flex items-center cursor-pointer gap-2' onClick={() => handleSort('releaseDate')}>
                  Release Date
                  <ShortFilterIcon />
                </div>
              </th>
              <th className='text-left py-4 px-4'>
                <div className='flex items-center cursor-pointer gap-2' onClick={() => handleSort('endDate')}>
                  End Date
                  <ShortFilterIcon />
                </div>
              </th>
              <th className='text-left py-4 px-4'>
                <div className='flex items-center cursor-pointer gap-2' onClick={() => handleSort('published')}>
                  Published
                  <ShortFilterIcon />
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
                  <button className='relative inline-block w-12 h-6' onClick={() => handlePublishClick(banner)}>
                    <div className={`w-full h-full rounded-full transition-colors duration-200 ease-in-out ${banner.published ? 'bg-red-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1/2 -mt-2.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${banner.published ? 'right-0.5' : 'left-0.5'}`} />
                    </div>
                  </button>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex gap-2'>
                    <button className='hover:bg-gray-100 p-2 rounded-md transition-colors' onClick={() => handleViewDetail(banner)} title='View Details'>
                      <EyeIcon />
                    </button>
                    <button className='hover:bg-gray-100 p-2 rounded-md transition-colors' onClick={() => handleEdit(banner)} title='Edit Banner'>
                      <PencilIcon />
                    </button>
                    <button className='hover:bg-gray-100 p-2 rounded-md transition-colors' onClick={() => handleDelete(banner.id)} title='Delete Banner'>
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showPublishConfirm && (
          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-screen items-center justify-center p-4'>
              <div className='fixed inset-0 bg-black bg-opacity-30' onClick={() => setShowPublishConfirm(false)}></div>

              <div className='relative bg-white rounded-lg p-8 max-w-sm w-full text-center'>
                <div className='w-12 h-12 flex items-center justify-center mx-auto mb-4'>
                  <ConfirmAlert />
                </div>

                <h3 className='text-xl font-semibold text-red-500 mb-2'>Confirmation</h3>

                <p className='text-[#424242] text-lg mb-8'>Are you sure want to {selectedBanner?.published ? 'unpublish' : 'publish'} this banner?</p>

                <div className='flex justify-center gap-4'>
                  <button onClick={() => setShowPublishConfirm(false)} className='px-16 py-2.5 border border-red-500 rounded-lg text-red-500 hover:bg-red-50 transition-colors'>
                    No
                  </button>
                  <button onClick={handlePublishConfirm} className='px-16 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Alert */}
        <SuccessAlert isOpen={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} message={`This banner was successfully ${selectedBanner?.published ? 'unpublished' : 'published'}`} duration={2000} />
      </div>
    </>
  );
};

TableBanner.propTypes = {
  currentItems: PropTypes.array.isRequired,
  handleSort: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setBanners: PropTypes.func.isRequired,
  banners: PropTypes.array.isRequired,
};

export default TableBanner;
