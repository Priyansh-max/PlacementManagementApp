/* eslint-disable no-unused-vars */
// Import necessary components
import React, { useState , useEffect } from "react";
import { X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopbarAdmin from "../components/TopbarAdmin";
import UserList from "../components/UserList";
import DriveList from "../components/DriveList";
import CompanyList from "../components/CompanyList";
import CompanyForm from "../components/CompanyForm";
import DriveForm from "../components/DriveForm";
import EditAccess from "../components/EditAccess";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const mockCompanies = [
  {
    "id": "1f71c245-0de5-4a9e-9fcf-4a25e55e704a",
    "name": "Tech Innovators Inc.",
    "address": "123 Silicon Valley, California, USA",
    "email": "info@techinnovators.com",
    "contact_person": "John Doe",
    "contact": "9876543210",
    "additionInfo": "Leading in AI and ML solutions."
  },
  {
    "id": "2c39f89b-3fc9-497d-945c-80551a9e2cd2",
    "name": "Creative Minds Pvt. Ltd.",
    "address": "45 Park Avenue, New York, USA",
    "email": "hr@creativeminds.com",
    "contact_person": "Jane Smith",
    "contact": "8765432109",
    "additionInfo": "Specializing in digital marketing and design."
  },
  {
    "id": "3a43b892-67a1-4c45-bc27-617bde129ba7",
    "name": "Future Solutions",
    "address": "88 Industrial Estate, Bangalore, India",
    "email": "careers@futuresolutions.com",
    "contact_person": "Rahul Verma",
    "contact": "9654321780",
    "additionInfo": "Focus on IoT and smart devices."
  },
  {
    "id": "4b51f562-9c5d-4e12-82f9-1e8eefa48b3f",
    "name": "Green Energy Corp.",
    "address": "12 Renewable Street, Berlin, Germany",
    "email": "contact@greenenergy.com",
    "contact_person": "Hans Muller",
    "contact": "9123456789",
    "additionInfo": "Pioneers in renewable energy solutions."
  },
  {
    "id": "5c72e789-d45f-4783-bc88-92f1c5ae71cb",
    "name": "EduTech Hub",
    "address": "78 Learning Lane, London, UK",
    "email": "support@edutechhub.com",
    "contact_person": "Emily Carter",
    "contact": "9876543298",
    "additionInfo": "Innovative solutions for online education."
  },
]

const mockDrives = [
  {
    id: '1',
    companyName: 'Tech Innovators Inc.',
    jobTitle: 'Software Engineer',
    deadline: '2024-07-15',
    status: 'ONGOING',
    applicants: 45,
    description: 'Seeking passionate software engineers for innovative projects.',
    registeredUsers: [
      {
        id: '101',
        email: 'alice.johnson@example.com',
        registrationTime: '2024-07-01T10:00:00Z',
      },
      {
        id: '102',
        email: 'bob.smith@example.com',
        registrationTime: '2024-07-02T14:30:00Z',
      },
    ],
  },
  {
    id: '2',
    companyName: 'Data Solutions Ltd.',
    jobTitle: 'Data Analyst',
    deadline: '2024-08-20',
    status: 'CLOSED',
    applicants: 23,
    description: 'Looking for data-driven professionals to join our analytics team.',
    registeredUsers: [
      {
        id: '103',
        email: 'charlie.brown@example.com',
        registrationTime: '2024-08-01T09:00:00Z',
      },
    ],
  },
  {
    id: '3',
    companyName: 'Cloud Dynamics',
    jobTitle: 'Cloud Architect',
    deadline: '2024-06-30',
    status: 'CLOSED',
    applicants: 67,
    description: 'Experienced cloud architects needed for cutting-edge infrastructure projects.',
    registeredUsers: [],
  },
];



// Sample user data
const users = [
  {
    id: "001",
    firstName: "Priyansh",
    lastName: "Agarwal",
    rollno: "2021Btech091",
    email: "priyansh@example.com",
    contact: "9876543210",
    degree: "BTech",
    status: "unplaced",
    startYear: 2021,
    cgpa: 9.5,
  },
  {
    id: "002",
    firstName: "Rajika",
    lastName: "Patel",
    rollno: "2021Btech094",
    email: "rajika@example.com",
    contact: "9876543222",
    degree: "BTech",
    status: "placed",
    startYear: 2020,
    cgpa: 8.8,
  },
  {
    id: "003",
    firstName: "Rohan",
    lastName: "Mehta",
    rollno: "2021Btech080",
    email: "rohan@example.com",
    contact: "9876543233",
    degree: "BBA",
    status: "placed",
    startYear: 2021,
    cgpa: 8.4,
  },
];

// Sample drive data
const drives = [
  { id: "D001", title: "Google", status: "active" },
  { id: "D002", title: "Amazon", status: "completed" },
  { id: "D003", title: "Microsoft", status: "active" },
];

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("users");
  const [Overlay , setOverlay] = useState(false);
  const [OverlayDrive , setOverlayDrive] = useState(false);
  const [OverlayAccess , setOverlayAccess] = useState(false);
  const [OverlayEditDrive , setOverlayEditDrive] = useState(false);
  const [userDetail , setUserDetail] = useState([]);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const noticesResponse = await axios.get("https://rbac-app-9epa.onrender.com/api/v1/users/notices", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const userResponse = await axios.get("https://rbac-app-9epa.onrender.com/api/v1/users/userdata", {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Uncomment and modify if you want to fetch all users
            const allUserResponse = await axios.get("https://rbac-app-9epa.onrender.com/api/v1/admin/user-data", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUserData(userResponse.data.user);
            setAllUsers(allUserResponse.data.users);

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.response?.data?.error || "Failed to fetch data.");
            setIsLoading(false);
        }
    };

    fetchData();
  }, [navigate]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // ***************************** for registering the company***********************************
  const handleOpenOverlay = () => setOverlay(true); // Open modal
  const handleCloseOverlay = () => setOverlay(false); // Close modal

    // ******************************************************************************************
  
  // ***************************** for Drive creation********************************************

  const handleOpenOverlayDrive = () => setOverlayDrive(true); // Open modal
  const handleCloseOverlayDrive = () => setOverlayDrive(false); // Close modal
  
  // ********************************************************************************************

  // ***************************** for Edit access***********************************************
  const handleOpenOverlayAccess = () => setOverlayAccess(true); // Open modal
  const handleCloseOverlayAccess = () => setOverlayAccess(false); // Close modal

  // ********************************************************************************************

  // ***************************** for Edit access***********************************************
  const handleOpenOverlay_EditDrive = () => setOverlayEditDrive(true); // Open modal
  const handleCloseOverlay_EditDrive = () => setOverlayEditDrive(false); // Close modal

  // ********************************************************************************************
  
  const renderContent = () => {
    switch (currentView) {
      case "users":
        return <UserList users={users}/>;
      case "drives":
        return <DriveList drives={mockDrives} onView={handleOpenOverlay_EditDrive}/>;
      case "companies":
        return <CompanyList companies={mockCompanies} />
      default:
        return <UserList users={users} />
    }
  };

  // Aggregated data for dashboard cards
  const totalUsers = users.length;
  const totalBTech = users.filter((user) => user.degree === "BTech").length;
  const totalBBA = users.filter((user) => user.degree === "BBA").length;
  const totalBDes = users.filter((user) => user.degree === "BDes").length;
  const totalPlaced = users.filter((user) => user.status === "placed").length;
  const totalUnplaced = users.filter((user) => user.status === "unplaced").length;
  const activeDrives = drives.filter((drive) => drive.status === "active").length;
  const completedDrives = drives.filter((drive) => drive.status === "completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
      <TopbarAdmin onMenuToggle={toggleSidebar} handleOpenOverlay={handleOpenOverlay} handleOpenOverlayDrive={handleOpenOverlayDrive} handleOpenOverlayAccess={handleOpenOverlayAccess}/>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onMenuSelect={setCurrentView}/>

      {/* Main Content Area */}
      <div
        className={`
          transition-all 
          duration-300 
          ease-in-out 
          ${sidebarOpen ? "ml-64" : "ml-0"}
          p-6
        `}
      >
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <div className="flex flex-row">
              <p className="mr-4 mt-2 text-lg">Registered: <span className="font-bold">{totalUsers}</span></p>
            </div>
          </div>

          {/* Total Students by Degree */}
          <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Total Students</h3>
            <div className="flex flex-row">
              <p className="mr-6 mt-2 text-lg">BTech: <span className="font-bold">{totalBTech}</span></p>
              <p className="mr-6 mt-2 text-lg">BBA: <span className="font-bold">{totalBBA}</span></p>
              <p className="mr-6 mt-2 text-lg">BDes: <span className="font-bold">{totalBDes}</span></p>
            </div>
          </div>

          {/* Status: Placed and Unplaced */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Status</h3>
            <div className="flex flex-row">
              <p className="mr-4 mt-2 text-lg">Placed: <span className="font-bold">{totalPlaced}</span></p>
              <p className="mr-4 mt-2 text-lg">Unplaced: <span className="font-bold">{totalUnplaced}</span></p>
            </div>
          </div>

          {/* Drives: Active and Completed */}
          <div className="bg-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Drives</h3>
            <div className="flex flex-row">
              <p className="mr-4 mt-2 text-lg">Active: <span className="font-bold">{activeDrives}</span></p>
              <p className="mr-4 mt-2 text-lg">Completed: <span className="font-bold">{completedDrives}</span></p>
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="grid grid-cols-1 gap-6">{renderContent()}</div>
      </div>

         {/* Modal for Company Registration */}
      {Overlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={handleCloseOverlay}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              title="close"
            >
              <X></X>
            </button>
            <h2 className="text-xl font-semibold mb-2 ">Register Company</h2>
            <CompanyForm onClose={handleCloseOverlay} />
          </div>
        </div>
      )}

      {OverlayDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg h-[90vh] rounded-lg shadow-lg p-6 relative scrollbar-custom">
            <button
              onClick={handleCloseOverlayDrive}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              title="close"
            >
              <X></X>
            </button>
            <h2 className="text-xl font-semibold mb-4">Create a Drive</h2>
            <DriveForm onClose={handleCloseOverlayDrive} />
          </div>
        </div>
      )}

      {OverlayAccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md max-h-screen rounded-lg shadow-lg p-6 relative">
            <button
              onClick={handleCloseOverlayAccess}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              title="close"
            >
              <X></X>
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Access</h2>
            <EditAccess />
          </div>
        </div>
      )}

      {OverlayEditDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md max-h-screen rounded-lg shadow-lg p-6 relative">
            <button
              onClick={handleCloseOverlay_EditDrive}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              title="close"
            >
              <X></X>
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Drive</h2>
            <DriveForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
