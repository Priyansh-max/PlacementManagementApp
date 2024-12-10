/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const UserList = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // New state for status filter
  const currentYear = new Date().getFullYear();

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "placed":
        return (
          <span className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
            Placed
          </span>
        );
      case "unplaced":
        return (
          <span className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
            Unplaced
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full">
            {status}
          </span>
        );
    }
  };

  // Filter users based on search, degree, year, and status
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch =
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fullName.includes(searchQuery.toLowerCase());
    const matchesDegree = degreeFilter
      ? user.degree.toLowerCase() === degreeFilter.toLowerCase()
      : true;
    const matchesYear = yearFilter
      ? currentYear - user.startYear === parseInt(yearFilter, 10)
      : true;
    const matchesStatus = statusFilter
      ? user.status.toLowerCase() === statusFilter.toLowerCase()
      : true;

    return matchesSearch && matchesDegree && matchesYear && matchesStatus;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Data</h1>
      {/* Search Bar and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={degreeFilter}
          onChange={(e) => setDegreeFilter(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Degrees</option>
          <option value="BTech">BTech</option>
          <option value="BDes">BDes</option>
          <option value="BBA">BBA</option>
        </select>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Years</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Status</option>
          <option value="Placed">Placed</option>
          <option value="Unplaced">Unplaced</option>
        </select>
      </div>

      <div className="text-gray-600 text-sm mb-2">
        Showing {filteredUsers.length} {filteredUsers.length === 1 ? "record" : "records"}
      </div>

      {/* User Data Table */}
      <div className="overflow-auto max-h-96 border rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">RollNo</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Contact</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Degree</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Current Year</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr className="bg-white">
                <td colSpan="10" className="px-4 py-2 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-100"}
                >
                  <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{user.rollno}</td>
                  <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-200 px-4 py-2">{user.contact}</td>
                  <td className="border border-gray-200 px-4 py-2">{user.degree}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {currentYear - user.startYear}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{user.cgpa}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
