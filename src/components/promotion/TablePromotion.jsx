import React, { useState } from "react";
import { Link } from "react-router-dom";
import EyeIcon from "../../assets/promotion/EyeIcon";
import PenIcon from "../../assets/promotion/PenIcon";
import TrashIcon from "../../assets/promotion/TrashIcon";
import AlertDialog from "../sweetalert/AlertDialog";
import filterIcon from "../../assets/product/filterIcon.svg";
import SuccessAlert from "../sweetalert/SuccessAlert";
import { useDeleteData } from "../../hooks/useDeleteData";
import { useFetchData } from "../../hooks/useFetchData";
import { useUpdateData } from "../../hooks/UseUpdateData";

const TablePromotion = ({ promotions }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const headerMapping = {
    "Promotion Name": "name",
    "Start Date": "start_date",
    "End Date": "end_date",
    "Promotion Type": "type",
    "Description": "description",
    "Status": "status",
    "Published": "published",
  };

  const handleSort = (header) => {
    const key = headerMapping[header];
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const sortedPromotion = [...promotions].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "price") {
      aValue = parseFloat(aValue.replace("$", ""));
      bValue = parseFloat(bValue.replace("$", ""));
    }

    if (sortConfig.key === "stock") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const { updateData } = useUpdateData("promotions");
  const handleToggleClick = (selectedPromotion) => {
    setSelectedPromotion(selectedPromotion);
    setShowPublishConfirm(true);
  };

  const handlePublishConfirm = async () => {
    if (selectedPromotion) {
      await updateData(selectedPromotion.id, {
        published: !selectedPromotion.published,
      });
      refetch();
      setShowPublishConfirm(false);
      setSuccessMessage(`This promotion was successfully ${selectedPromotion.published ? 'unpublished' : 'published'}`);
      setShowSuccess(true);
    }
  };

  const { deleteData } = useDeleteData("promotions");
  const { refetch } = useFetchData("promotions");
  const handleDeleteClick = (selectedPromotion) => {
    setSelectedPromotion(selectedPromotion);
    setShowDeleteConfirm(true);
  };
  const handleDeleteConfirm = async () => {
    if (selectedPromotion) {
      const success = await deleteData(selectedPromotion.id);
      if (success) {
        setShowDeleteConfirm(false);
        setSuccessMessage("This promotion was successfully deleted");
        setShowSuccess(true);
        refetch();
      }
    }
  };

  const checkActivePromotion = (startDate, endDate) => {
    return (
      new Date(endDate).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) &&
      new Date(startDate).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)
    );
  };  

  const headers = [...Object.keys(headerMapping), "Action"];

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              {headers.map((header) => (
                <th
                  key={header}
                  className="text-left px-6 py-4 whitespace-nowrap"
                >
                  <div
                    className="flex items-center gap-1"
                    onClick={() => header !== "Action" && handleSort(header)}
                  >
                    <span
                      className={header !== "Action" ? "cursor-pointer" : ""}
                    >
                      {header}
                    </span>
                    {header !== "Action" && (
                      <img
                        src={filterIcon}
                        alt="filter"
                        className={`inline-block ml-1 cursor-pointer transition-transform duration-200 ${
                          sortConfig.key === headerMapping[header] &&
                          sortConfig.direction === "desc"
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedPromotion.map((item) => (
              <tr key={item.id} className="table-row">
                <td className="px-6 py-4 text-xs">{item.name}</td>
                <td className="px-6 py-4 text-xs">{item.start_date}</td>
                <td className="px-6 py-4 text-xs">{item.end_date}</td>
                <td className="px-6 py-4 text-xs">{item.type}</td>
                <td className="px-6 py-4 text-xs">{item.description}</td>
                <td className="px-6 py-4 text-xs">
                  {checkActivePromotion(item.start_date, item.end_date) ? (
                    <span className="bg-green-700 text-sm text-white font-medium rounded-full py-2 px-3">
                      Active
                    </span>
                  ) : (
                    <span className="bg-gray-500 text-white font-medium rounded-full py-2 px-3">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-xs">
                  <div className="flex justify-center items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleClick(item);
                        }}
                        onChange={() => {}} 
                        checked={item.published}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#DB4444]"></div>
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform transform peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs">
                  <div className="flex gap-2">
                    <Link
                      to={`/promotion/detail`}
                      state={{ promotion: item }}
                      className="hover:bg-gray-100 p-1 rounded-md"
                    >
                      <EyeIcon />
                    </Link>
                    <Link
                      to={`/promotion/edit`}
                      state={{ promotion: item }}
                      className="hover:bg-gray-100 p-1 rounded-md"
                    >
                      <PenIcon />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="hover:bg-gray-100 p-1 rounded-md"
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
      <AlertDialog
        isOpen={showPublishConfirm}
        onClose={() => setShowPublishConfirm(false)}
        onConfirm={handlePublishConfirm}
        title='Confirmation'
        message={`Are you sure want to ${selectedPromotion?.published ? 'unpublish' : 'publish'} this promotion?`}
        icon='confirm'
        confirmLabel='Yes'
        cancelLabel='No'
      />
      <AlertDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Promotion"
        message="Are you sure want to delete this promotion?"
        icon="trash"
        confirmLabel="Yes"
        cancelLabel="No"
      />
      <SuccessAlert
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={successMessage}
        duration={1000}
      />
    </>
  );
};

export default TablePromotion;
