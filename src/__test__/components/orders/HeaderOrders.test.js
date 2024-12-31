import { render, screen, fireEvent } from '@testing-library/react';
import HeaderOrders from '../../../components/orders/HeaderOrders';  // Adjust the import path if necessary

describe('HeaderOrders', () => {
  const handleDownloadMock = jest.fn(); // Mock the handleDownload function

  const title = 'Order List';
  const breadcrumbs = ['Home', 'Orders'];

  beforeEach(() => {
    render(
      <HeaderOrders
        title={title}
        breadcrumbs={breadcrumbs}
        handleDownload={handleDownloadMock}
      />
    );
  });

  test('renders the title', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('renders breadcrumbs correctly', () => {
    breadcrumbs.forEach((breadcrumb, index) => {
      const breadcrumbElement = screen.getByText(breadcrumb);
      expect(breadcrumbElement).toBeInTheDocument();
      if (index < breadcrumbs.length - 1) {
        const arrowElement = screen.getByText('>');
        expect(arrowElement).toBeInTheDocument();
      }
    });
  });

  test('calls handleDownload when "Download All" button is clicked', () => {
    const downloadButton = screen.getByRole('button', { name: /download all/i });
    fireEvent.click(downloadButton);
    expect(handleDownloadMock).toHaveBeenCalledTimes(1);
  });
});
