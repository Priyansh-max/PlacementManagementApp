/* eslint-disable no-unused-vars */
import React , { useState } from "react";

function DriveForm() {

    const companies = ["Google", "Facebook", "Apple", "Amazon", "Microsoft"];
  
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [driveStatus , setDriveStatus] = useState();

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        if (query === "") {
          setFilteredCompanies([]);
        } else {
          const filtered = companies.filter((company) =>
            company.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredCompanies(filtered);
        }
      };

    function handleSubmit(){
        console.log("submitted");
    }
    return(
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
                value={searchQuery}
                onChange={handleSearch}
                required
            />
            
            {/* Show suggestions or "No such company" */}
            {searchQuery && (
                <ul className="border border-gray-300 rounded-md mt-1 bg-white max-h-40 overflow-auto">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                    <li
                        key={company}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSearchQuery(company)} // Set the input to the selected company
                    >
                        {company}
                    </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500">No such company</li>
                )}
                </ul>
            )}
        </div>
  
        {/* Description */}
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Enter a description"
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
            type="datetime-local"
            name="deadline"
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
                      onChange={(e) => setDriveStatus(e.target.checked ? 'ONGOING' : 'ENDED')}
                    />
                    <div className="w-8 h-5 bg-red-500 rounded-full peer peer-checked:bg-green-400 transition-all duration-200"></div>
                    <span className="ml-2 text-sm text-gray-700">
                      {driveStatus === 'ONGOING' ? 'Set to Active' : 'Set to End'}
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
    )
}

export default DriveForm;