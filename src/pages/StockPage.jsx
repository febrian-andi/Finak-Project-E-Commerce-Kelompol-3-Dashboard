import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PaginationStock from '../components/stock/PaginationStock';
import TableStock from '../components/stock/TableStock';
import ControlsStock from '../components/stock/ControlsStock';
import HeaderStock from '../components/stock/HeaderStock';
import StockForm from '../components/stock/StockForm';

const StockPage = () => {
  // Table states
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedStock, setSelectedStock] = useState(null);

  // Get current route and params
  const location = useLocation();
  const { id } = useParams();

  // Reset current page when search or date filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDate]);

  // Data stok - Format variant disesuaikan dengan productOptions
  const [stocks, setStocks] = useState([
    {
      id: 1,
      name: 'Laptop HP',
      variant: 'Warna Hitam',
      quantity: 5,
      date: new Date('2024-12-01'), // Format YYYY-MM-DD
    },
    {
      id: 2,
      name: 'Laptop Lenovo',
      variant: 'Warna Silver',
      quantity: 8,
      date: new Date('2024-12-05'),
    },
    {
      id: 3,
      name: 'Mouse Logitech',
      variant: 'Warna Hitam',
      quantity: 5,
      date: new Date('2024-12-10'),
    },
    {
      id: 4,
      name: 'Keyboard Razer',
      variant: 'Warna RGB',
      quantity: 3,
      date: new Date('2024-12-15'),
    },
    {
      id: 5,
      name: 'Keyboard Razer',
      variant: 'Warna RGB',
      quantity: 3,
      date: new Date('2024-12-20'),
    },
  ]);

  // Effect to set selected stock when ID changes
  useEffect(() => {
    if (id) {
      const stock = stocks.find((s) => s.id === parseInt(id));
      if (stock) {
        setSelectedStock(stock);
      }
    } else {
      setSelectedStock(null);
    }
  }, [id, stocks]);

  // Custom handlers for search and date
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setCurrentPage(1); // Reset to page 1 when date changes
  };

  // CRUD operations
  const handleAddStock = (newStock) => {
    const stockWithId = {
      ...newStock,
      id: stocks.length + 1,
      date: new Date(),
    };
    setStocks([...stocks, stockWithId]);
    setCurrentPage(1); // Reset to page 1 when adding new stock
  };

  const handleUpdateStock = (updatedStock) => {
    setStocks((prevStocks) => prevStocks.map((stock) => (stock.id === updatedStock.id ? updatedStock : stock)));
  };

  const handleDeleteStock = async (stockId) => {
    try {
      setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== stockId));
      // Check if after deletion we need to adjust current page
      const remainingItems = stocks.length - 1;
      const maxPages = Math.ceil(remainingItems / rowsPerPage);
      if (currentPage > maxPages) {
        setCurrentPage(Math.max(1, maxPages));
      }
      return true;
    } catch (error) {
      console.error('Error deleting stock:', error);
      return false;
    }
  };

  const handleViewDetail = (stock) => {
    setSelectedStock(stock);
  };

  // Filter function
  const getFilteredStocks = () => {
    return stocks.filter((stock) => {
      const searchLower = searchQuery.toLowerCase().trim();
      const nameMatch = stock.name.toLowerCase().includes(searchLower);
      const variantMatch = stock.variant.toLowerCase().includes(searchLower);
      const matchesSearch = searchLower === '' || nameMatch || variantMatch;

      let matchesDate = true;
      if (selectedDate) {
        const stockDate = stock.date.toISOString().split('T')[0];
        matchesDate = stockDate === selectedDate;
      }

      return matchesSearch && matchesDate;
    });
  };

  // Get filtered and paginated data
  const filteredStocks = getFilteredStocks();
  const totalItems = filteredStocks.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentItems = filteredStocks.slice(startIndex, endIndex);

  // Determine if we should show the form based on the current route
  const shouldShowForm = location.pathname !== '/stock';

  // If we're on a form route (add/edit/detail), render the StockForm
  if (shouldShowForm) {
    return <StockForm stocks={stocks} selectedStock={selectedStock} onAdd={handleAddStock} onUpdate={handleUpdateStock} />;
  }

  // Otherwise, render the stock list view
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        <HeaderStock title='Stock' breadcrumbs={['Home', 'Stock']} />

        <ControlsStock 
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          selectedDate={selectedDate}
          setSelectedDate={handleDateChange}
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          totalItems={totalItems}
        />

        <TableStock 
          currentItems={currentItems}
          onDelete={handleDeleteStock}
          onViewDetail={handleViewDetail}
          searchQuery={searchQuery}
          selectedDate={selectedDate}
        />

        {totalItems > 0 && (
          <PaginationStock
            startIndex={startIndex + 1}
            endIndex={endIndex}
            totalItems={totalItems}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default StockPage;