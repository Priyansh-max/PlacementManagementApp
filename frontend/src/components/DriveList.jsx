/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import DriveCard from "./DriveCard";

const DriveList = ({ drives , onView}) => {
  // Filter drives based on their status
  const activeDrives = drives.filter((drive) => drive.status === "ONGOING");
  const closedDrives = drives.filter((drive) => drive.status === "CLOSED");

  return (
    <div className="space-y-8 mt-5 mx-2">
      {/* Active Drives Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Active Drives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeDrives.length > 0 ? (
            activeDrives.map((drive) => (
              <DriveCard
                key={drive.id}
                drive={drive}
                onView={onView}
              />
            ))
          ) : (
            <p className="text-gray-500">No active drives at the moment.</p>
          )}
        </div>
      </div>

      {/* Closed Drives Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Closed Drives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {closedDrives.length > 0 ? (
            closedDrives.map((drive) => (
              <DriveCard
                key={drive.id}
                drive={drive}
                onView={onView}
              />
            ))
          ) : (
            <p className="text-gray-500">No closed drives available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriveList;
