/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import * as XLSX from "xlsx"

const UserDisplayAdmin = () => {
    const [userData, setUserData] = useState([
        {
          id: 1,
          rollNo: 'CS101',
          name: 'John Doe',
          cgpa: 8.5,
          whatsappNo: '+1234567890',
          schoolEmailId: 'john.doe@school.edu',
          gmailId: 'john.doe@gmail.com',
          cvLink: 'https://example.com/cv/johndoe',
          registeredTime: '2024-06-10T10:30:00',
        },
        {
          id: 2,
          rollNo: 'EC102',
          name: 'Jane Smith',
          cgpa: 9.2,
          whatsappNo: '+0987654321',
          schoolEmailId: 'jane.smith@school.edu',
          gmailId: 'jane.smith@gmail.com',
          cvLink: 'https://example.com/cv/janesmith',
          registeredTime: '2024-06-11T14:45:00',
        },
        {
          id: 3,
          rollNo: 'ME103',
          name: 'Alice Johnson',
          cgpa: 8.9,
          whatsappNo: '+1122334455',
          schoolEmailId: 'alice.j@school.edu',
          gmailId: 'alice.j@gmail.com',
          cvLink: 'https://example.com/cv/alicejohnson',
          registeredTime: '2024-06-09T09:15:00',
        },
  ]);

  const [nameFilter, setNameFilter] = useState('');
  const [cgpaSort, setCgpaSort] = useState('');
  const [timeSort, setTimeSort] = useState('');

  const [driveInfo] = useState({
    driveName: 'Tech Giant Recruitment Drive',
    driveDate: '2024-06-15',
    location: 'Online',
    companyName: 'InnovateTech Solutions',
    registrationDeadline: '2024-06-10',
  });

  const processedUserData = useMemo(() => {
    let result = [...userData];

    if (nameFilter) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (cgpaSort === 'asc') {
      result.sort((a, b) => a.cgpa - b.cgpa);
    } else if (cgpaSort === 'desc') {
      result.sort((a, b) => b.cgpa - a.cgpa);
    }

    if (timeSort === 'asc') {
      result.sort((a, b) => new Date(a.registeredTime) - new Date(b.registeredTime));
    } else if (timeSort === 'desc') {
      result.sort((a, b) => new Date(b.registeredTime) - new Date(a.registeredTime));
    }

    return result;
  }, [userData, nameFilter, cgpaSort, timeSort]);

  const handleDelete = (id) => {
    setUserData((prevData) => prevData.filter((user) => user.id !== id));
  };

  const handleDownload = () => {
    // Define the headers
    const headers = ['RollNo', 'Name', 'CGPA', 'Whatsapp No', 'School Email Id', 'Gmail Id', 'CV Link'];
  
    // Prepare the data with formulas and styles
    const data = processedUserData.map((user) => ({
      RollNo: user.rollNo,
      Name: user.name,
      CGPA: user.cgpa,
      WhatsappNo: user.whatsappNo,
      SchoolEmailId: user.schoolEmailId,
      GmailId: user.gmailId,
      CVLink: { f: `HYPERLINK("${user.cvLink}", "${user.name} 's Resume")`, s: { font: { color: { rgb: "0000FF" }, underline: true } } }, // Blue, underlined text for link
    }));
  
    // Add headers to the worksheet
    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
  
    // Append data to the worksheet
    XLSX.utils.sheet_add_json(worksheet, data, { origin: "A2", skipHeader: true });
  
    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Details");
  
    // Export the workbook as an Excel file
    XLSX.writeFile(workbook, "user_details.xlsx");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
      <div className="container mx-auto px-4 py-6 max-w-[220vh]">
        {/* Drive Details Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="bg-white   px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Drive Details</h2>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-9.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download Data
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div>
              <p className="text-gray-600">
                <strong className="text-gray-800">Drive Name:</strong> {driveInfo.driveName}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Date:</strong> {driveInfo.driveDate}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong className="text-gray-800">Company:</strong> {driveInfo.companyName}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-800">Location:</strong> {driveInfo.location}
              </p>
            </div>
          </div>
        </div>

        {/* Registered Students Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-white px-6 py-4">
                <h2 className="text-2xl font-semibold text-gray-800">Registered Students</h2>
            </div>

            {/* Filters Section */}
            <div className="flex items-center gap-4 px-6 py-4">
                {/* Filter by Name Input */}
                <input
                type="text"
                placeholder="Filter by Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="flex-grow-[8] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Sort by CGPA */}
                <select
                value={cgpaSort}
                onChange={(e) => setCgpaSort(e.target.value)}
                className="flex-grow-[1] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">Sort by CGPA</option>
                <option value="asc">CGPA Low to High</option>
                <option value="desc">CGPA High to Low</option>
                </select>

                {/* Sort by Registered Time */}
                <select
                value={timeSort}
                onChange={(e) => setTimeSort(e.target.value)}
                className="flex-grow-[0] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">Sort by Registered Time</option>
                <option value="asc">Oldest First</option>
                <option value="desc">Newest First</option>
                </select>
            </div>


          {/* User Details Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {['RollNo' , 'Name', 'CGPA', 'Whatsapp No', 'School Email Id' , 'Gmail Id' , 'CV link' , 'Registered Time', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedUserData.length > 0 ? (
                    processedUserData.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">{user.rollNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.cgpa}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.whatsappNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.schoolEmailId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.gmailId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <a
                            href={user.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            View CV
                        </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.registeredTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={9} className="text-center py-4">
                        No value found
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDisplayAdmin;
