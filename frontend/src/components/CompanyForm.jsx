/* eslint-disable no-unused-vars */
import React from "react";
import InputField from "./InputField";

function CompanyForm() {

    function handleSubmit(){
        console.log("submitted");
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Enter name of the company"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                    type="text"
                    name="address"
                    placeholder="Entry address of the company"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    name="email"
                    placeholder="Enter the email of company"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                    <input
                    type="text"
                    name="contact_person"
                    placeholder="contact persons name"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                    <input
                    type="text"
                    name="contact"
                    placeholder="Enter contact of the contact_person (optional)"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Additional Info</label>
                    <textarea
                    name="additionInfo"
                    placeholder="addition info (optional)"
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-orange-500 text-white font-semibold text-sm rounded w-full h-[35px] py-1 hover:bg-orange-700 transition-all duration-300 ease-out-in">
                    Submit
                    </button>
                </div>
                </form>
        </div>
    )
}

export default CompanyForm;