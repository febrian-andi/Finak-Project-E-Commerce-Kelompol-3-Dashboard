import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import bannerImage from '../assets/banner/bannerImage.png';
import HeaderBanner from '../components/banner/HeaderBanner';
import PaginationBanner from '../components/banner/PaginationBanner';
import TableBanner from '../components/banner/TableBanner';
import BannerForm from '../components/banner/BannerForm';
import AlertDialog from '../components/sweetalert/AlertDialog';

const BannerPage = () => {
  // State Management
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get current route and params
  const location = useLocation();
  const { id } = useParams();

  // Sample Banner Data
  const [banners, setBanners] = useState([
    {
      id: 1,
      picture: bannerImage,
      name: 'Promo Akhir Tahun',
      targetUrl: 'www.e-commerce.com',
      releaseDate: '2024-11-09',
      endDate: '2024-11-12',
      published: false,
      bannerType: 'main'
    },
    {
      id: 2,
      picture: bannerImage,
      name: 'Produk Baru',
      targetUrl: 'www.e-commerce.com',
      releaseDate: '2024-11-08',
      endDate: '2024-11-11',
      published: true,
      bannerType: 'side'
    },
    {
      id: 3,
      picture: bannerImage,
      name: 'Diskon 30%',
      targetUrl: 'www.e-commerce.com',
      releaseDate: '2024-11-07',
      endDate: '2024-11-10',
      published: false,
      bannerType: 'popup'
    },
    {
      id: 4,
      picture: bannerImage,
      name: 'Giveaway',
      targetUrl: 'www.e-commerce.com',
      releaseDate: '2024-11-03',
      endDate: '2024-11-09',
      published: false,
      bannerType: 'main'
    },
  ]);

  // Effect to set selected banner when ID changes
  useEffect(() => {
    if (id) {
      const banner = banners.find((b) => b.id === parseInt(id));
      if (banner) {
        setSelectedBanner(banner);
      }
    } else {
      setSelectedBanner(null);
    }
  }, [id, banners]);

  // CRUD Operations
  const handleAddNew = (newBanner) => {
    const bannerWithId = {
      ...newBanner,
      id: banners.length + 1,
      published: false
    };
    setBanners([...banners, bannerWithId]);
    setCurrentPage(1);
    return true;
  };

  const handleUpdateBanner = (updatedBanner) => {
    setBanners(banners.map(banner => 
      banner.id === updatedBanner.id ? updatedBanner : banner
    ));
    return true;
  };

  const handleDeleteInitiate = (id) => {
    const banner = banners.find(b => b.id === id);
    setBannerToDelete(banner);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (bannerToDelete && !isDeleting) {
      setIsDeleting(true);
      try {
        setBanners((prevBanners) => {
          const filteredBanners = prevBanners.filter((banner) => banner.id !== bannerToDelete.id);
          const remainingItems = filteredBanners.length;
          const maxPages = Math.ceil(remainingItems / rowsPerPage);
          if (currentPage > maxPages) {
            setCurrentPage(Math.max(1, maxPages));
          }
          return filteredBanners;
        });
        setIsAlertOpen(false);
        setBannerToDelete(null);
        return true;
      } catch (error) {
        console.error('Error deleting banner:', error);
        return false;
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sorting Logic
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

  // Pagination Logic
  const totalItems = sortedBanners.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentItems = sortedBanners.slice(startIndex, endIndex);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log(banners);
  

  // Determine if we should show the form based on the current route
  const shouldShowForm = location.pathname !== '/banner';

  // If we're on a form route (add/edit/detail), render the BannerForm
  if (shouldShowForm) {
    return (
      <BannerForm 
        banners={banners}
        selectedBanner={selectedBanner}
        onAdd={handleAddNew}
        onUpdate={handleUpdateBanner}
      />
    );
  }

  console.log(banners);
  

  // Otherwise, render the banner list view
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        {/* Header Component */}
        <HeaderBanner />
        
        {/* Table Component */}
        <TableBanner 
          currentItems={currentItems}
          sortConfig={sortConfig}
          handleSort={handleSort}
          handleDelete={handleDeleteInitiate}
          setBanners={setBanners}
          banners={banners}
        />

        {/* Pagination Component */}
        {totalItems > 0 && (
          <PaginationBanner
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={setCurrentPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}

        {/* Alert Dialog for Delete Confirmation */}
        <AlertDialog 
          isOpen={isAlertOpen} 
          onClose={() => !isDeleting && setIsAlertOpen(false)} 
          onConfirm={handleConfirmDelete}
          title="Delete Banner?"
          message={`Are you sure want to delete "${bannerToDelete?.name}"?`}
          icon="trash"
          disabled={isDeleting}
          confirmText={isDeleting ? "Deleting..." : "Delete"}
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default BannerPage;