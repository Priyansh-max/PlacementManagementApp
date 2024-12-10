/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import myimage from '../assets/jklulogo.png';
import { Eye } from 'lucide-react';

// Mock data (replace with actual data fetching)
const mockDrives = [
  {
    id: '1',
    companyName: 'Tech Innovators Inc.',
    jobTitle: 'Software Engineer',
    deadline: '2024-12-15',
    status: 'ONGOING',
    applicants: 45,
    description: 'Seeking passionate software engineers for innovative projects.',
  },
  {
    id: '2',
    companyName: 'Data Solutions Ltd.',
    jobTitle: 'Data Analyst',
    deadline: '2024-12-20',
    status: 'ONGOING',
    applicants: 23,
    description: 'Looking for data-driven professionals to join our analytics team.',
  },
  {
    id: '3',
    companyName: 'Cloud Dynamics',
    jobTitle: 'Cloud Architect',
    deadline: '2024-12-30',
    status: 'CLOSED',
    applicants: 67,
    description: 'Experienced cloud architects needed for cutting-edge infrastructure projects.',
  },
];

// Top Bar Component
const TopBar = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">User Dashboard</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setProfileDropdown(!profileDropdown)}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            UN
          </div>
          <span>User Name</span>
        </button>

        {profileDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Profile</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Settings</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Contact</div>
            <div className="p-2 hover:bg-red-50 text-red-600 cursor-pointer">
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Drive Card Component
const DriveCard = ({ drive, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ONGOING':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeadlineInDays = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate - today;
    const daysLeft = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{drive.jobTitle}</h2>
          <p className="text-gray-600 mt-1">{drive.companyName}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            drive.status
          )}`}
        >
          {drive.status}
        </span>
      </div>

      <p className="text-gray-700 mt-3 line-clamp-2">{drive.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Deadline: {getDeadlineInDays(drive.deadline)} days
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onView(drive.id)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="View Details"
          >
            <Eye size={20} />
          </button>
          {drive.status !== 'CLOSED' && (
            <button
              onClick={() => console.log(`Register for drive ${drive.id}`)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-all duration-300 ease-out-in"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// User Dashboard Component
const Student = () => {
  const [drives, setDrives] = useState(mockDrives);

  const handleViewDrive = (driveId) => {
    console.log(`Viewing drive ${driveId}`);
    // Implement view logic
  };

  const ongoingDrives = drives.filter((drive) => drive.status === 'ONGOING');
  const endedDrives = drives.filter((drive) => drive.status === 'CLOSED');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
      <TopBar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Drives</h1>

        {ongoingDrives.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Ongoing Drives
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingDrives.map((drive) => (
                <DriveCard key={drive.id} drive={drive} onView={handleViewDrive} />
              ))}
            </div>
          </div>
        )}

        {endedDrives.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Ended Drives
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {endedDrives.map((drive) => (
                <DriveCard key={drive.id} drive={drive} onView={handleViewDrive} />
              ))}
            </div>
          </div>
        )}

        {ongoingDrives.length === 0 && endedDrives.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">You haven't applied for any drives yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
