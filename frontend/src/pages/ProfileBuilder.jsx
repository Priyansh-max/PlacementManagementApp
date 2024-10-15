/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import ProfileButtonComp from "../components/ProfileButtonComp";
import ProfileInputField2 from "../components/ProfileInputField2";
import UploadFeature from "../components/UploadFeature";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("uploadResume");

  const [fileName, setFileName] = useState("No file chosen");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [fileName1, setFileName1] = useState("No file chosen");
  const [isValid1, setIsValid1] = useState(true);
  const [errorMessage1, setErrorMessage1] = useState("");

  const [fileName2, setFileName2] = useState("No file chosen");
  const [isValid2, setIsValid2] = useState(true);
  const [errorMessage2, setErrorMessage2] = useState("");

  const [fileName3, setFileName3] = useState("No file chosen");
  const [isValid3, setIsValid3] = useState(true);
  const [errorMessage3, setErrorMessage3] = useState("");

  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
    setSpecialization("");
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const getSpecializationOptions = () => {
    switch (degree) {
      case "B.Tech":
        return ["CSE", "Electrical", "Mechanical"];
      case "BBA":
        return ["FinTech", "Entrepreneurship"];
      case "B.Des":
        return ["Product Design", "Interdisciplinary Design", "Interaction Design", "Integrated Communication"];
      default:
        return [];
    }
  };

  const handleFileChange_resume = (e) => {
    console.log("hi0")
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // DOC & DOCX

      if (validTypes.includes(fileType)) {
        setFileName(file.name);
        setIsValid(true); // Valid file format
        setErrorMessage("");
      } else {
        // Invalid file format
        setFileName("No file chosen");
        setIsValid(false);
        setErrorMessage("**PDF, DOC format required");
      }
    } else {
      setFileName("No file chosen");
      setIsValid(true);
      setErrorMessage("");
    }
  };

  const handleFileChange_transcript = (e) => {
    console.log("hi1")
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // DOC & DOCX

      if (validTypes.includes(fileType)) {
        setFileName1(file.name);
        setIsValid1(true); // Valid file format
        setErrorMessage1("");
      } else {
        // Invalid file format
        setFileName1("No file chosen");
        setIsValid1(false);
        setErrorMessage1("**PDF, DOC format required");
      }
    } else {
      setFileName1("No file chosen");
      setIsValid1(true);
      setErrorMessage1("");
    }
  };

  const handleFileChange_senior = (e) => {
    console.log("hi2")
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // DOC & DOCX

      if (validTypes.includes(fileType)) {
        setFileName2(file.name);
        setIsValid2(true); // Valid file format
        setErrorMessage2("");
      } else {
        // Invalid file format
        setFileName2("No file chosen");
        setIsValid2(false);
        setErrorMessage2("**PDF, DOC format required");
      }
    } else {
      setFileName2("No file chosen");
      setIsValid2(true);
      setErrorMessage2("");
    }
  };

  const handleFileChange_seniorsec = (e) => {
    console.log("hi3")
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // DOC & DOCX

      if (validTypes.includes(fileType)) {
        setFileName3(file.name);
        setIsValid3(true); // Valid file format
        setErrorMessage3("");
      } else {
        // Invalid file format
        setFileName3("No file chosen");
        setIsValid3(false);
        setErrorMessage3("**PDF, DOC format required");
      }
    } else {
      setFileName3("No file chosen");
      setIsValid3(true);
      setErrorMessage3("");
    }
  };

  // References for the sections
  const sectionRefs = {
    uploadResume: useRef(null),
    personalInfo: useRef(null),
    educationalInfo: useRef(null),
    uploadDocument: useRef(null),
  };

  // Scroll into view when clicking on a sidebar item
  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  // Use Intersection Observer to detect which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // Adjust threshold as needed
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 from-45% to-orange-200">
      <div className="flex flex-col items-start w-[1400px] mt-12 mb-7">
        <div className="p-1">
          <p className="text-5xl text-bold">Welcome, 👋</p>
        </div>
        <div className="p-3">
          <p className="text-xl text-grey">Lets build your profile</p>
        </div>
      </div>
      <div className="flex w-[1400px] h-[570px] bg-transparent rounded-2xl">
        <div className="w-[300px] h-[570px] bg-transparent p-2 rounded-2xl space-y-4">
          {[
            { id: "uploadResume", label: "Upload Resume" },
            { id: "personalInfo", label: "Personal Information" },
            { id: "educationalInfo", label: "Educational Information" },
            { id: "uploadDocument", label: "Upload Document" },
          ].map((section, idx) => (
            <div
              key={idx}
              onClick={() => scrollToSection(section.id)}
              className={`cursor-pointer bg-white w-[280px] p-2 rounded-tl-xl rounded-br-xl border-b border-gray-400 shadow-md hover:bg-orange-200`}>
              {section.label}
            </div>
            ))}
        </div>
        <div className="flex flex-col bg-white w-[1100px] h-[570px] overflow-y-auto p-4 rounded-xl space-y-4">
          <div ref={sectionRefs.uploadResume} id="uploadResume" className="border rounded-tl-2xl p-4 ">
            <p className="text-3xl bold text-gray-600 border-b mb-2">Upload Resume</p>
            <p className="pl-2 pt-1 pb-2 text-md bold text-grey text-italic">*Upload your latest resume</p>

            <UploadFeature validm={isValid} filenamem={fileName} filechange={handleFileChange_resume} error={errorMessage} inputId="fileInputResume"/>

            

            <div className="flex flex-row items-center justify-between mt-2 pr-2">
              <p className="p-2 italic text-grey text-md">*Once the file is added please double check and make sure you have selected the correct resume*</p>
              <ProfileButtonComp text="Save"></ProfileButtonComp>
            </div>
          </div>
          <div ref={sectionRefs.personalInfo} id="personalInfo" className="border rounded-tl-2xl p-4">
            <p className="text-3xl bold text-gray-600 border-b mb-2">Personal Information</p>
            <div className="flex w-full p-2">
              <div className="w-1/2">
                <ProfileInputField2 text="Firstname" type="text" ></ProfileInputField2>
              </div>
              <div className="w-1/2">
                <ProfileInputField2 text="Lastname" type="text" ></ProfileInputField2>
              </div>
            </div>
            <div className="flex w-full p-2">
              <div className="w-1/3">
                <h1 className="pl-5 pb-1 text-md text-left text-grey font-semibold">Gender</h1>
                <div className="relative pt-1 px-5">
                  <select className="rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full">
                    <option value="" disabled selected className="text-grey">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="w-1/3">
                <ProfileInputField2 text="Date of birth" type="date" inputplaceholder="Select Date of birth"></ProfileInputField2>
              </div>
              <div className="w-1/3">
                <ProfileInputField2 text="Contact" type="tel" inputplaceholder="Enter Phone number"></ProfileInputField2>
              </div>
              
            </div>
            <div className="flex w-full p-2">
              <div className="w-1/2">
                <ProfileInputField2 text="University email" type="email" inputplaceholder="example@jklu.edu.in"></ProfileInputField2>
              </div>
              <div className="w-1/2">
                <ProfileInputField2 text="Alternate email" type="email"></ProfileInputField2>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between mt-2 pr-2">
              <p className="p-2 italic text-grey text-md">*Make sure all the details are correct*</p>
              <ProfileButtonComp text="Save"></ProfileButtonComp>
            </div>
            
          </div>
          <div ref={sectionRefs.educationalInfo} id="educationalInfo" className="border rounded-tl-2xl p-4">
            <p className="text-3xl bold text-gray-600 border-b mb-2">Education Information</p>
            <div className="flex w-full p-2">
              <div className="w-1/2">
                <ProfileInputField2 text="Roll Number" type="text"></ProfileInputField2>
              </div>
            </div>
            <div className="flex w-full p-2">
              <div className="w-1/2">
                <h1 className="pl-5 pb-1 text-md text-left text-grey font-semibold">Degree</h1>
                <div className="relative pt-1 px-5">
                  <select
                    value={degree}
                    onChange={handleDegreeChange}
                    className="rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full">
                    <option value="">Select Degree</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="BBA">BBA</option>
                    <option value="B.Des">B.Des</option>
                  </select>
                </div>  
              </div>

              {degree && (
                <div className="w-1/2">
                  <h1 className="pl-5 pb-1 text-md text-left text-grey font-semibold">Branch</h1>
                  <div className="relative pt-1 px-5">
                    <select
                      value={specialization}
                      onChange={handleSpecializationChange}
                      className="rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    >
                      <option value="">Select branch</option>
                      {getSpecializationOptions().map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>  
                </div>
              )}
            </div>
            <div className="flex w-full p-2">
              <div className="w-1/2">
                <ProfileInputField2 text="Start Year" type="number"></ProfileInputField2>
              </div>
              <div className="w-1/2">
                <ProfileInputField2 text="End Year" type="number"></ProfileInputField2>
              </div>
            </div>
            <div className="flex w-full p-2">
              <div className="w-1/3">
                <ProfileInputField2 text="CGPA" step="0.01" type="number"></ProfileInputField2>
              </div>
              <div className="w-1/3">
                <ProfileInputField2 text="Percentage of class 12th" step="0.01" type="number"></ProfileInputField2>
              </div>
              <div className="w-1/3">
                <ProfileInputField2 text="Percentage of class 10th" step="0.01" type="number"></ProfileInputField2>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-2 pr-2">
              <p className="p-2 italic text-grey text-md">*Make sure all the details are correct*</p>
              <ProfileButtonComp text="Save"></ProfileButtonComp>
            </div>
            

          </div>
          <div ref={sectionRefs.uploadDocument} id="uploadDocument" className="border rounded-tl-2xl p-4">
            <p className="text-3xl bold text-gray-600 border-b mb-2">Upload Document</p>
            <p className="mt-4 pl-2 pt-1 pb-2 text-md bold text-grey text-italic">Transcript</p>
            <UploadFeature validm={isValid1} filenamem={fileName1} filechange={handleFileChange_transcript} error={errorMessage1} inputId="fileInputTranscript"/>

            <p className="mt-4 pl-2 pt-1 pb-2 text-md bold text-grey text-italic">Scorecard (10th)</p>
            <UploadFeature validm={isValid2} filenamem={fileName2} filechange={handleFileChange_senior} error={errorMessage2} inputId="fileInputSenior"/>

            <p className="mt-4 pl-2 pt-1 pb-2 text-md bold text-grey text-italic">Scorecard (12th)</p>
            <UploadFeature validm={isValid3} filenamem={fileName3} filechange={handleFileChange_seniorsec} error={errorMessage3} inputId="fileInputSeniorSec"/>

            <div className="flex flex-row items-center justify-between mt-2 pr-2">
              <p className="p-2 italic text-grey text-md">*Please verify all the documents before uploading/saving*</p>
              <ProfileButtonComp text="Save"></ProfileButtonComp>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  
      
  );
};

export default ProfilePage;
