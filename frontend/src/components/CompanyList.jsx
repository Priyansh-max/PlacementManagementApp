/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react"; // Importing Eye icon from Lucide

const CompanyList = ({ companies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAllUser = (companyId) => {
    navigate(`/admin/company/users/${companyId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Company Data</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name, ID, or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="text-gray-600 text-sm mb-2">
        Showing {filteredCompanies.length}{" "}
        {filteredCompanies.length === 1 ? "record" : "records"}
      </div>

      {/* Company Data Table */}
      <div className="overflow-auto max-h-96 border rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Address</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Contact Person</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Contact</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Additional Info</th>
              <th className="border border-gray-200 px-4 py-2 text-left">View</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length === 0 ? (
              <tr className="bg-white">
                <td colSpan="8" className="px-4 py-2 text-center text-gray-500">
                  No companies found.
                </td>
              </tr>
            ) : (
              filteredCompanies.map((company, index) => (
                <tr
                  key={company.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-100"}
                >
                  <td className="border border-gray-200 px-4 py-2">{company.id}</td>
                  <td className="border border-gray-200 px-4 py-2">{company.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{company.address}</td>
                  <td className="border border-gray-200 px-4 py-2">{company.email}</td>
                  <td className="border border-gray-200 px-4 py-2">{company.contact_person}</td>
                  <td className="border border-gray-200 px-4 py-2">{company.contact}</td>
                  <td className="border border-gray-200 px-4 py-2">{company.additionInfo || "N/A"}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition-all duration-300 ease-out-in"
                      onClick={() => handleAllUser(company.id)}
                    >
                      <Eye />
                    
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;
