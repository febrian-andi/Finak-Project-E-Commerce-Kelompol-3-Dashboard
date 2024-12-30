import React from 'react';
import { render, screen } from '@testing-library/react';
import BestItemCard from '../../../components/home/BestItemCard';

// Mock icons to prevent rendering issues
jest.mock('../../../assets/home/BoxIcon', () => () => <div data-testid="box-icon" />);
jest.mock('../../../assets/home/ArrowRightIcon', () => () => <div data-testid="arrow-right-icon" />);

describe('BestItemCard Component', () => {
  it('should render the component without crashing', () => {
    render(<BestItemCard />);
    expect(screen.getByText(/Best Item Sales/i)).toBeInTheDocument();
  });

  it('should render the correct number of items', () => {
    render(<BestItemCard />);
    const items = screen.getAllByText(/Toys|Fashion/i);
    expect(items).toHaveLength(3); // Ensure all 3 items are rendered
  });

  it('should render item details correctly', () => {
    render(<BestItemCard />);
    const firstItemName = screen.getByText('Lamp');
    const firstItemCategory = screen.getByText('Electronics');
    expect(firstItemName).toBeInTheDocument();
    expect(firstItemCategory).toBeInTheDocument();
  });

  it('should render BoxIcon for each item', () => {
    render(<BestItemCard />);
    const boxIcons = screen.getAllByTestId('box-icon');
    expect(boxIcons).toHaveLength(3); // 3 items, all should have BoxIcon
  });

  it('should render ArrowRightIcon for each item', () => {
    render(<BestItemCard />);
    const arrowIcons = screen.getAllByTestId('arrow-right-icon');
    expect(arrowIcons).toHaveLength(3); // 3 items, all should have ArrowRightIcon
  });
});