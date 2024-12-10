const express = require('express');
const app = express();
const router = express.Router();
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { Parser } = require('json2csv');
const authmiddleware = require("../middleware/authmiddleware");


const companySchema = z.object({
    name : z.string().min(1 , { message : "Company name is must*"}),
    address : z.string().min(1 , { message : "address is must*"}),
    email: z.string().email({message : "must be an valid email address*"}),
    contact_person : z.string().min(1 , {message : "contact person name is must*"}),
    contact : z.string().min(10, { message: "contact number should be of 10 digits*" }),
    additionInfo : z.string().optional()
});

const driveSchema = z.object({
    cname: z.string().min(1 , {message : "drive must have a company name*"}),           
    imgUrl: z.string().url().optional(), 
    description: z.string().min(1 , {message : "company description is required*"}),     
    job_description: z.string().min(1 , {message : "job description is required*"}), 
    stipend: z.string().min(1 , {message : "stipend info is must"}),          
    eligibility: z.string().min(1 , {message : "eligibility criteria is must*"}),     
    deadline: z.date({message : "deadline is must"}),                  
    additionInfo: z.string().optional()
});

router.post("/company" , authmiddleware ,  async(req , res) => {
    try{

        const validatedData = companySchema.parse(req.body);
        const { name , address , email , contact_person , contact , additionInfo } = validatedData;

        const newCompany = await Prisma.company.create({
            data : {
                name,
                address,
                email,
                contact_person,
                contact,
                additionInfo
            }
        });

        res.status(201).json({
            message : "Company added successfully",
            company : {
                id: newCompany.id,
                address : newCompany.address,
                email: newCompany.email,
                contact_person : newCompany.contact_person,
                contact : newCompany.contact,
                additionInfo : newCompany.additionInfo
            }
        });
    }
    catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({ error: errorMessages.join(', ') });
        }
        res.status(500).json({ error: error.message });

    }
})

router.post("/drive" , authmiddleware , async(req , res) => {
    try{
        const validatedData = driveSchema.parse(req.body);
        const { cname , imgUrl , description , job_description , stipend ,eligibility, deadline, additionInfo } = validatedData;

        const company = await prisma.company.findUnique({
            where: { name: cname },
        });

        console.log(company.id);
      
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const newDrive = await Prisma.drive.create({
            data : {
                cname,
                imgUrl,
                description,
                job_description,
                stipend,
                eligibility,
                deadline,
                additionInfo,
                companyId : company.id
                //add companyid here --- recheck if this worksss
            }
        });

        res.status(201).json({
            message : "drive created successfully",
            drive : {
                id: newDrive.id,
                companyId : newDrive.companyId,
                description : newDrive.description
            }
        });

    }catch(error){
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            return res.status(400).json({ error: errorMessages.join(', ') });
        }
        res.status(500).json({ error: error.message });
    }
})

//get all drive
router.get("/drive" , authmiddleware , async(req , res) => {
    try{
        const drives = await prisma.drive.findMany({
            select : {
                id : true,
                cname : true,
                imgUrl : true,
                description : true,
                job_description : true,
                stipend : true,
                eligibility : true,
                deadline : true,
                stauts : true,
                additionInfo : true,
                createdAt : true,
                _count : {
                    select : {
                        registeredUser : true
                    }
                }
            }
        })

        res.status(200).json({
            success : true,
            message : "fetched drives",
            count : drives.length,
            data : drives
        })
    }catch(error){
        console.error('Error fetching drives : ', error),
        res.status(500).json({
            success : false,
            message : "Unable to fetch drives",
            error : error.message
        })
    }
})

//get all users in a particular drive given a driveId
router.get("/drive/users/:driveId" , authmiddleware , async(req , res) => {
    try{
        const { driveId } = req.params;

        // Validate driveId
        if (!driveId) {
            return res.status(400).json({
                success: false,
                message: 'Drive ID is required'
            });
        }

        // Check if drive exists
        const driveExists = await prisma.drive.findUnique({
            where: { id: driveId }
        });

        if (!driveExists) {
            return res.status(404).json({
                success: false,
                message: 'Drive not found'
            });
        }

        const registeredUsers = await prisma.drive.findUnique({
            where : {
                id : driveId,
            },

            select : {
                registeredUser : {
                    select : {
                        id : true,
                        email : true,
                        resume : {
                            select : {
                                resume : true,
                            }
                        },
                        personalInfo: {
                            select: {
                                firstname: true,
                                lastname: true,
                                contact : true,
                            }
                        },
                        educationInfo : {
                            select : {
                                rollno : true,
                                degree : true,
                                endyear : true,
                                cgpa : true,
                                percentage10 : true,
                                percentage12 : true,
                            }
                        }
                    }
                },
                _count: {
                    select: { 
                        registeredUser: true }
                }
            }
        })

        const processedUser = registeredUsers.registeredUser.map(user => ({
            id : user.id,
            email : user.email,
            resume : user.resume || null,
            personalInfo : user.personalInfo || null,
            educationInfo : user.educationInfo || null,
        }))

        res.status(200).json({
            success : true,
            message : "User data is as follows",
            totalRegisteredUser : registeredUsers._count.registeredUser,
            users : processedUser, //user info of each user
        })

    }catch(error){
        console.error('Error fetching drive users: ' , error);
        res.status(500).json({
            success : true,
            message : "Unable to fetch user data",
            error : error.message
        });
    }
})
//get all users data
router.get("/userdata" ,authmiddleware , async(req , res) => {
    try {
        const users = await prisma.user.findMany({
          include: {
            resume: true,
            personalinfo: true,
            educationinfo: true,
            documents: true,
            registeredDrives: true,
            placedStudent: true,
          },
        });

        res.status(200).json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
      }
});


//edit userdata , delete or add a record
router.put("/drive/manage-users/:driveId", authmiddleware, async (req, res) => {
    try {
        const { driveId } = req.params;
        const { email , action } = req.body;

        // Validate input
        if (!email || !action || !['add', 'remove'].includes(action)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request. Provide userId and action (add/remove)'
            });
        }

        // Verify drive exists
        const drive = await prisma.drive.findUnique({
            where: { id: driveId }
        });

        if (!drive) {
            return res.status(404).json({
                success: false,
                message: 'Drive not found'
            });
        }

        // Verify user exists
        const user = await prisma.user.findUnique({
            where: { email : email }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Perform the action
        if (action === 'add') {
            // Add user to the drive
            await prisma.drive.update({
                where: { id: driveId },
                data: {
                    registeredUser: {
                        connect: { email : email }
                    }
                }
            });

            return res.status(200).json({
                success: true,
                message: 'User added to drive successfully'
            });
        } else if (action === 'remove') {
            // Remove user from the drive
            await prisma.drive.update({
                where: { id: driveId },
                data: {
                    registeredUser: {
                        disconnect: { email : email }
                    }
                }
            });

            return res.status(200).json({
                success: true,
                message: 'User removed from drive successfully'
            });
        }

    } catch (error) {
        console.error('Could not update user list:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to update user list',
            error: error.message
        });
    }
});

//download the records in every drive
router.post("/drive/download", authmiddleware, async (req, res) => {
    try {
        const { driveId } = req.body;

        // Validate driveId
        if (!driveId) {
            return res.status(400).json({
                success: false,
                message: 'Drive ID is required'
            });
        }

        // Check if drive exists
        const driveExists = await prisma.drive.findUnique({
            where: { id: driveId }
        });

        if (!driveExists) {
            return res.status(404).json({
                success: false,
                message: 'Drive not found'
            });
        }

        const registeredUsers = await prisma.drive.findUnique({
            where : {
                id : driveId,
            },
            select : {
                cname: true,
                registeredUser : {
                    select : {
                        id : true,
                        email : true,
                        resume : {
                            select : {
                                resume : true,
                            }
                        },
                        personalInfo: {
                            select: {
                                firstname: true,
                                lastname: true,
                                contact : true,
                            }
                        },
                        educationInfo : {
                            select : {
                                rollno : true,
                                degree : true,
                                endyear : true,
                                cgpa : true,
                                percentage10 : true,
                                percentage12 : true,
                            }
                        }
                    }
                },
                _count: {
                    select: { 
                        registeredUser: true 
                    }
                }
            }
        });

        // Transform data for CSV
        const csvData = registeredUsers.registeredUser.map(user => {
            return {
                // User Basic Info
                userId: user.id,
                email: user.email,

                // Resume (as hyperlink)
                resume: user.resume?.resume 
                    ? `=HYPERLINK("${user.resume.resume}", "View Resume")`
                    : 'N/A',

                // Name (combined first and last name)
                name: user.personalInfo 
                    ? `${user.personalInfo.firstname} ${user.personalInfo.lastname}`.trim() 
                    : 'N/A',

                contact: user.personalInfo?.contact || 'N/A',

                // Education Info
                rollNo: user.educationInfo?.rollno || 'N/A',
                degree: user.educationInfo?.degree || 'N/A',
                endYear: user.educationInfo?.endyear || 'N/A',
                cgpa: user.educationInfo?.cgpa || 'N/A',
                percentage10: user.educationInfo?.percentage10 || 'N/A',
                percentage12: user.educationInfo?.percentage12 || 'N/A'
            };
        });

        // Create CSV Parser

        //Change order according to need
        const fields = [
            'userId', 'email', 'resume',
            'name', 'contact',
            'rollNo', 'degree', 'endYear', 
            'cgpa', 'percentage10', 'percentage12'
        ];

        const json2csvParser = new Parser({ fields });
        const csvContent = json2csvParser.parse(csvData);

        // Generate filename
        const filename = `${registeredUsers.cname.replace(/\s+/g, '_')}_drive_users_${new Date().toISOString().split('T')[0]}.csv`;

        // Send CSV as download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.status(200).send(csvContent);

    } catch (error) {
        console.error('Error downloading drive records:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to download drive records',
            error: error.message
        });
    }
});

module.exports = router;

