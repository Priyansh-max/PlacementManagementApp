/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React , { useState }from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { 
    Edit2, 
    Trash2, 
    Eye,
    X 
  } from 'lucide-react';

// Drive Card Component
const DriveCard = ({ drive , refreshDrives , onView}) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [driveStatus , setDriveStatus] = useState("ONGOING");
    const [description , setDescription] = useState(drive.description);
    const [jobDescription , setJobdescription] = useState('')
    const [stipend , setStipend] = useState();
    const [additioninfo , setAdditioninfo] = useState()
    const [eligibility , setEligibility] = useState()
    const [deadline , setDeadline] = useState(drive.deadline);

    const navigate = useNavigate();
    const getStatusColor = (status) => {
      switch(status) {
        case 'ONGOING': return 'bg-green-100 text-green-800';
        case 'CLOSED': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    //done
    function handleView(){
      onView();
      navigate(`/admin/drive/users/${drive.id}`);
    }

    function handleEdit() {
      setDescription(drive.description);
      setJobdescription(drive.jobDescription || '');
      setStipend(drive.stipend || '');
      setAdditioninfo(drive.additionInfo || '');
      setEligibility(drive.eligibility || '');
      setDeadline(drive.deadline);
      setDriveStatus(drive.status || 'ONGOING');
      setOverlayVisible(true); 
      setOverlayVisible(true); 
    }
  
    function handleCloseOverlay() {
      setOverlayVisible(false);
    }

    function handleSubmit(){
      //implement update drive details here
    }

    //replace api and complete it
    async function handleDelete() {
      if (window.confirm("Are you sure you want to delete this drive?")) {
          try {
              await axios.delete(`/api/drives/${drive.id}`); // Replace with your API endpoint
              alert("Drive deleted successfully.");
              refreshDrives(); // Call a function to refresh the list of drives
          } catch (error) {
              console.error("Error deleting drive:", error);
              alert("Failed to delete drive.");
          }
        }
    }


    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{drive.jobTitle}</h2>
            <p className="text-gray-600 mt-1">{drive.companyName}</p>
          </div>
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${getStatusColor(drive.status)}
          `}>
            {drive.status}
          </span>
        </div>
        
        <p className="text-gray-700 mt-3 line-clamp-2">
          {drive.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Deadline: {drive.deadline}
            <span className="ml-4">
              Applicants: {drive.applicants}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleView}
              className="text-blue-600 hover:text-blue-800 transition"
              title="View Details"
            >
              <Eye size={20} />
            </button>
            <button 
              onClick={handleEdit}
              className="text-green-600 hover:text-green-800 transition"
              title="Edit Drive"
            >
              <Edit2 size={20} />
            </button>
            <button 
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 transition"
              title="Delete Drive"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {isOverlayVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-lg h-[90vh] rounded-lg shadow-lg p-6 relative scrollbar-custom">
              <button
                onClick={handleCloseOverlay}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                <X></X>
              </button>
              <h2 className="text-xl font-semibold mb-4">Edit Drive</h2>
              {/* Add your form inputs here */}
              <form
                onSubmit={handleSubmit}
              >
          
                {/* Search Field for Company Name */}
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                        type="text"
                        placeholder="Search for a company..."
                        className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                        disabled
                        value={drive.companyName}
                        required
                    />
                </div>
          
                {/* Description */}
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter a description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    rows="3"
                    required
                  ></textarea>
                </div>
          
                {/* Job Description */}
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Job Description</label>
                  <textarea
                    name="job_description"
                    placeholder="Enter job description"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    rows="3"
                    required
                  ></textarea>
                </div>
          
                {/* Stipend */}
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Stipend</label>
                  <input
                    type="text"
                    name="stipend"
                    placeholder="Enter stipend amount"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    required
                  />
                </div>
          
                {/* Eligibility */}
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Eligibility</label>
                  <textarea
                    name="eligibility"
                    placeholder="Enter eligibility criteria"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    rows="3"
                    required
                  ></textarea>
                </div>
          
                {/* Deadline */}
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={deadline}
                    min={new Date().toISOString().split("T")[0]} // Set the minimum value dynamically
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    required
                  />
                </div>
          
                {/* Additional Info */}
                <div className="my-4"> 
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Information
                  </label>
                  <textarea
                    name="additionInfo"
                    placeholder="Enter any additional information (optional)"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    rows="3"
                  ></textarea>
                </div>

                <div className="my-4 flex items-center">
                  <label className="block text-sm font-medium text-gray-700 mr-2">Drive Status:</label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={(e) => setDriveStatus(e.target.checked ? 'ongoing' : 'ended')}
                    />
                    <div className="w-8 h-5 bg-red-500 rounded-full peer peer-checked:bg-green-400 transition-all duration-200"></div>
                    <span className="ml-2 text-sm text-gray-700">
                      {driveStatus === 'ongoing' ? 'Set to Active' : 'Set to End'}
                    </span>
                  </label>
                </div>


          
                <button
                  type="submit"
                  className="bg-orange-500 text-white font-semibold text-sm rounded w-full h-[35px] py-1 hover:bg-orange-700 transition-all duration-300 ease-out-in"
                >
                  Submit Drive
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
};

export default DriveCard;