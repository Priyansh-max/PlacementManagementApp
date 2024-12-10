/* eslint-disable no-unused-vars */
import React, { useState , useEffect } from 'react';


const UserDisplayCompany = () => {

  // Company details state
  const [companyInfo, setCompanyInfo] = useState({
    name: 'InnovateTech Solutions',
    industry: 'Software Development',
    location: 'San Francisco, CA',
    contactEmail: 'hr@innovatetech.com',
    foundedYear: 2010,
    description: 'A cutting-edge technology company specializing in AI and cloud solutions.',
    websiteUrl: 'https://www.innovatetech.com'
  });

  // Placed students state
  const [placedStudents, setPlacedStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      branch: 'Computer Science',
      role: 'Software Engineer',
      packageOffered: 850000,
      graduationYear: 2024
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      branch: 'Electronics',
      role: 'Hardware Engineer',
      packageOffered: 750000,
      graduationYear: 2024
    }
  ]);

  // State for adding new student (modal simulation)
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    email: '',
    role: '',
    packageOffered: '',
  });

  // Add student handler
  const handleAddStudent = () => {
    if (Object.values(newStudent).some(val => val === '')) {
      alert('Please fill all fields');
      return;
    }

    const studentToAdd = {
      ...newStudent,
      id: placedStudents.length + 1,
      packageOffered: parseFloat(newStudent.packageOffered)
    };

    setPlacedStudents([...placedStudents, studentToAdd]);
    setShowAddStudentModal(false);
    // Reset form
    setNewStudent({
      email: '',
      role: '',
      packageOffered: '',
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200'>
        <div className="container mx-auto px-4 py-6 max-w-7xl ">
      {/* Company Details Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Company Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div>
                <p className="text-gray-600 mb-2">
                <strong className="text-gray-800">Name:</strong> {companyInfo.name}
                </p>
                <p className="text-gray-600 mb-2">
                <strong className="text-gray-800">Industry:</strong> {companyInfo.industry}
                </p>
                <p className="text-gray-600 mb-2">
                <strong className="text-gray-800">Location:</strong> {companyInfo.location}
                </p>
            </div>
            <div>
                <p className="text-gray-600 mb-2">
                <strong className="text-gray-800">Contact:</strong> {companyInfo.contactEmail}
                </p>
                <p className="text-gray-600 mb-2">
                <strong className="text-gray-800">Founded:</strong> {companyInfo.foundedYear}
                </p>
            </div>
            </div>
            <div className="px-6 pb-6">
            <p className="text-gray-700">{companyInfo.description}</p>
            </div>
        </div>

        {/* Placed Students Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Placed Students</h2>
            <button 
                onClick={() => setShowAddStudentModal(true)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Student
            </button>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-100 border-b">
                <tr>
                    {['Name', 'Email', 'Branch', 'Role', 'Package', 'Graduation Year'].map((header) => (
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
                {placedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.branch}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        ₹{student.packageOffered.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.graduationYear}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* Add Student Modal */}
        {showAddStudentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
                    <div className="space-y-2">

                        <label className="block text-sm font-medium text-gray-700">Student email</label>
                        <input 
                            type="email"
                            placeholder="Search for a student email..."
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                            className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                        />
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input 
                            type="text"
                            placeholder="Enter the role eg-SDE"
                            value={newStudent.role}
                            onChange={(e) => setNewStudent({...newStudent, role: e.target.value})}
                            className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                        />
                        <label className="block text-sm font-medium text-gray-700">Package offered</label>
                        <input 
                            type="text"
                            placeholder="Package Offered"
                            value={newStudent.packageOffered}
                            onChange={(e) => setNewStudent({...newStudent, packageOffered: e.target.value})}
                            className="rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button 
                            onClick={() => setShowAddStudentModal(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                            Cancel
                        </button>
                        <button 
                            onClick={handleAddStudent}
                            className="bg-orange-500 text-white font-semibold px-4 py-2 rounded hover:bg-orange-700 transition-all duration-300 ease-out-in"
                            >
                            Add Student
                        </button>
                    </div>
                </div>
            </div>
        )}
        </div>

    </div>
    
  );
};

export default UserDisplayCompany;