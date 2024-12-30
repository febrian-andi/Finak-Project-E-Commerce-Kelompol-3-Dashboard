import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CategoryTable from '../../../components/category/CategoryTable';

const mockCategories = [
  {
    id: 1,
    name: 'Category 1',
    icon: 'Icon 1',
    published: true,
  },
  {
    id: 2,
    name: 'Category 2',
    icon: 'Icon 2',
    published: false,
  },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
const mockTogglePublish = jest.fn();

describe('CategoryTable Component', () => {
  beforeEach(() => {
    render(
      <CategoryTable
        categories={mockCategories}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        togglePublish={mockTogglePublish}
      />
    );
  });

  it('renders the table with categories', () => {
    const rows = screen.getAllByTestId(/category-row-/);
    expect(rows).toHaveLength(mockCategories.length);

    mockCategories.forEach((category) => {
      expect(screen.getByTestId(`category-name-${category.id}`)).toHaveTextContent(category.name);
      expect(screen.getByTestId(`category-icon-${category.id}`)).toHaveTextContent(category.icon);
    });
  });

  it('calls onEdit when the edit button is clicked', () => {
    const editButton = screen.getByTestId('edit-category-1');
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith(mockCategories[0]);
  });

  it('calls onDelete when the delete button is clicked', () => {
    const deleteButton = screen.getByTestId('delete-category-1');
    fireEvent.click(deleteButton);
    expect(screen.getByText('Are you sure want to delete this category?')).toBeInTheDocument();

    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockCategories[0].id);
  });

  it('calls togglePublish when the toggle switch is clicked', () => {
    const toggleSwitch = screen.getByTestId('toggle-publish-1');
    fireEvent.click(toggleSwitch);
    expect(screen.getByText('Are you sure want to unpublish this category?')).toBeInTheDocument();

    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);

    expect(mockTogglePublish).toHaveBeenCalledWith(mockCategories[0].id);
  });

  it('shows success alert after successful action', () => {
    const toggleSwitch = screen.getByTestId('toggle-publish-2');
    fireEvent.click(toggleSwitch);

    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);

    expect(screen.getByText('Category was successfully published')).toBeInTheDocument();
  });
});
