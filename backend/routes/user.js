const express = require('express');
const app = express();
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middleware/authmiddleware');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resumeSchema = z.object({
  resume : z.string({message : "Resume is must*"})
});

const personalSchema = z.object({
  firstname: z.string().min(1, {message:"Firstname is must*"}),
  lastname: z.string().min(1, {message : "Lastname is must*"}),  
  gender: z.enum(["Male", "Female", "Other"] , {message : "gender is must*"}),
  dob : z.string().regex(/^\d{2}-\d{2}-\d{4}$/, {message : "Date of birth must be in the format dd-mm-yyyy"}),
  contact : z.string().min(10, { message: "contact number should be of 10 digits*" }),
  email: z.string().regex(/^([a-zA-Z0-9._%+-]+)@jklu\.edu\.in$/, {
    message: "Email must be in the format 'email@jklu.edu.in'",}),
  alternateEmail : z.string().email({message : "must be an valid email address*"}),
})  

const educationSchema = z.object({
  rollno : z.string().min(1, {message:"rollno is must*"}),
  degree : z.string().min(1, {message:"degree is must*"}),
  branch : z.string().min(1, {message:"branch is must*"}),
  startyear: z
  .number()
  .int()
  .min(1900, "Start year must be after 1900")
  .max(new Date().getFullYear(), "Start year cannot be in the future"), 
  endyear: z
    .number()
    .int()
    .min(1900, "End year must be after 1900")
    .max(new Date().getFullYear() + 6, "End year cannot be far in the future"),
  cgpa: z
    .number()
    .min(0, "CGPA cannot be less than 0")
    .max(10, "CGPA cannot be more than 10"),
  percentage10: z
    .number()
    .min(0, "10th Percentage cannot be less than 0")
    .max(100, "10th Percentage cannot exceed 100"), 
  percentage12: z
    .number()
    .min(0, "12th Percentage cannot be less than 0")
    .max(100, "12th Percentage cannot exceed 100"),
})

const documentSchema = z.object({
  transcript : z.string({message : "Transcript is must*"}),
  marksheet10 : z.string({message : "Marksheet of class 10th is must*"}),
  marksheet12 : z.string({message : "Marksheet of class 12th is must*"})
})

router.get("/drive", authmiddleware, async (req, res) => {
    try {
      const drives = await prisma.drive.findMany();
  
      res.status(200).json(drives);
      
    } catch (error) {
      console.error("Error fetching drives:", error);
      res.status(500).json({ error: "An error occurred while fetching drives." });
    }
});

router.post("/profile" ,authmiddleware, async (req , res) => {
  try{
    
    const validate_resume = resumeSchema.parse(req.body.resume);
    const validated_personal = personalSchema.parse(req.body.personal);
    const validated_education = educationSchema.parse(req.body.education);
    const validated_document = documentSchema.parse(req.body.document);

    const { resume } = validate_resume;

    const { firstname , lastname , gender , dob , contact , email , alternateEmail } = validated_personal;
    const { rollno , degree , branch , startyear , endyear , cgpa , percentage10 , percentage12 } = validated_education;
    const { transcript , marksheet10 , marksheet12 } = validated_document;

    const userId = req.userid;

    if(!userId){
      return res.status(404).json({ error: 'Unauthorised' });
    }

    const [newResume, newPersonalInfo, newEducationalInfo, newDocument] = await Prisma.$transaction([
      Prisma.resume.create({
        data: {
          resume,
          userId,
        },
      }),
      Prisma.personalInfo.create({
        data: {
          firstname,
          lastname,
          gender,
          dob,
          contact,
          email,
          alternateEmail,
          userId,
        },
      }),
      Prisma.educationInfo.create({
        data: {
          rollno,
          degree,
          branch,
          startyear,
          endyear,
          cgpa,
          percentage10,
          percentage12,
          userId,
        },
      }),
      Prisma.document.create({
        data: {
          transcript,
          marksheet10,
          marksheet12,
          userId,
        },
      }),
    ]);

    res.status(201).json({
        message : "profile created successfully",
        userid : userId,
        resume : {
            id: newResume.id,
        },
        personalInfo : {
            id: newPersonalInfo.id,
        },
        educationInfo : {
            id: newEducationalInfo.id,
        },
        document : {
            id: newDocument.id,
        },
    });

  }catch(error){
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => err.message);
        return res.status(400).json({ error: errorMessages.join(', ') });
      }
      //internal server error
      res.status(500).json({ error: error.message });
  }
})

//upload pdf to cloudinary and get back the url

router.post('/upload', async (req, res) => {
  try {
    const fileData = req.body.fileData; // base64 file data
    const fileName = `${Date.now()}-${req.body.fileName}`; // Unique file name

    // Determine the file type (pdf, doc, or docx)
    let mimeType = req.body.fileType; // Assume fileType is sent in the request (either 'pdf' or 'doc')
    let cloudinaryMimeType;

    // Set appropriate MIME type and resource type for Cloudinary
    if (mimeType === 'pdf') {
      cloudinaryMimeType = 'application/pdf';
    } else if (mimeType === 'doc' || mimeType === 'docx') {
      cloudinaryMimeType = 'application/msword'; // for .doc files
      if (mimeType === 'docx') {
        cloudinaryMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; // for .docx files
      }
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(`data:${cloudinaryMimeType};base64,${fileData}`, {
      public_id: fileName,
      folder: mimeType === 'pdf' ? 'pdf-uploads' : 'doc-uploads', // Separate folders for PDF and DOC files
      resource_type: 'raw', // For non-image files
    });

    // Return the URL of the uploaded file
    res.status(200).json({
      message: `${mimeType.toUpperCase()} file uploaded successfully`,
      fileUrl: result.secure_url, // Cloudinary URL of the uploaded file
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//for upload company images for drive
//this is to be used by admin
router.post('/upload-image', async (req, res) => {
  try {
    const fileData = req.body.fileData; // base64 image data
    const fileName = `${Date.now()}-${req.body.fileName}`; // Unique file name
    const mimeType = req.body.fileType; // File type (jpeg or png)

    // Check if fileType is valid (either jpeg or png)
    if (mimeType !== 'jpeg' && mimeType !== 'png') {
      return res.status(400).json({ error: 'Unsupported image type. Only JPEG and PNG are allowed.' });
    }

    // Set the MIME type for the image (for Cloudinary)
    let cloudinaryMimeType;
    if (mimeType === 'jpeg') {
      cloudinaryMimeType = 'image/jpeg';
    } else if (mimeType === 'png') {
      cloudinaryMimeType = 'image/png';
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(`data:${cloudinaryMimeType};base64,${fileData}`, {
      public_id: fileName,
      folder: 'image-uploads', // Folder for images in Cloudinary
      resource_type: 'image',  // Indicates that the uploaded file is an image
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }, // Automatic quality and format selection
      ],
    });

    // Return the Cloudinary image URL
    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url, // Cloudinary URL of the uploaded image
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/update" , authmiddleware , async (req , res) => {

})

router.put("/registerDrive" , authmiddleware , async(req , res) => {
    try{
      const { driveId } = req.body;

      const userId = req.userid

      if (!userId || !driveId) {
        return res.status(400).json({ 
          error: 'Invalid user or drive' 
        })
      }

      const existingRegistration = await prisma.drive.findFirst({
        where: {
          id: driveId,
          registeredUsers: {
            some: {
              id: userId
            }
          }
        }
      })

      if (existingRegistration) {
        return res.status(400).json({ 
          error: 'User is already registered for this drive' 
        })
      }

      const updatedDrive = await prisma.drive.update({
        where: { id: driveId },
        data: {
          registeredUsers: {
            connect: { id: userId }
          }
        },
        include: {
          registeredUsers: true
        }
      })

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          registeredDrives: {
            connect: { id: driveId }
          }
        }
      });



      return res.status(200).json({
        message: 'Successfully registered for the drive',
        drive_update : updatedDrive,
        user_update : updatedUser
      })

    }catch(error){
      res.status(500).json({error : "Failed to register"})
    }
})

module.exports = router;

