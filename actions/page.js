"use server";
import Joi from "joi";
import connectDB from "@/database";
import API from "@/models/Api";
import Testimonial from "@/models/Testimonial";
import User from "@/models/User";
import Staff from "@/models/Staff";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import UserConversation from "@/models/Conversation";
import Quote from "@/models/Quote";
import RequestQuote from "@/models/RequestQuote";

const addNewAPI = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().optional(),
  clients: Joi.string().default(1),
  image: Joi.string().required(),
});

const addNewTestimonial = Joi.object({
  title: Joi.string().required(),
  rating: Joi.string().required(),
  description: Joi.string().optional(),
  client: Joi.string().default(1),
  file: Joi.string().required(),
});


const signUpValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().default('admin')
});


const requestQuoteValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  country: Joi.string().required(),
  projectCategory: Joi.string().required(),
  description: Joi.string().required(),
  uploadedFiles: Joi.array().items(
      Joi.object({
          url: Joi.string().uri().required(),
          fileType: Joi.string().required(),
          filename: Joi.string().required()
      })
  ).optional()
});



const signInValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

const chatValidation = Joi.object({
  sender: Joi.string().required(),
  message: Joi.string().min(1).trim().required()
});

export async function uploadNewAPI(formData) {
  try {
    await connectDB();
    const { title, category, description, clients, image } = formData || {};

    const { error } = addNewAPI.validate({
      title,
      category,
      description,
      clients,
      image,
    });

    if (error) {
      return {
        success: false,
        message: error.details[0].message,
      };
    }

    const newlyUploadedAPI = await API.create({ title, category, description, clients, image });

    if (newlyUploadedAPI) {
      return {
        success: true,
        message: "API Uploaded Successfully!!",
      };
    } else {
      return {
        success: false,
        message: "Failed to upload API! Try again!!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong. Try again!!",
    };
  }
}

export async function getAPIAction() {
  try {
      await connectDB();
  const products = await API.find({});
            return {
              success: true,
              data: JSON.parse(JSON.stringify(products)),
              message: "APIs fetched Successfully!!",
          };
      
      
  } catch (error) {
      console.log(error);
      return {
          success: false,
          message: "Something went wrong. Try again!!",
      };
  }
}

export async function searchApi(id) {
  try {
      await connectDB();
      const api = await API.findById(id);
      if (api) {
          return {
              success: true,
              data: JSON.parse(JSON.stringify(api)),
              message: "Api fetched successfully!!"
          }
      } else {
          return {
              success: false,
              message: "Api not found.",
              status: 404
          }
      }
  } catch (error) {
      console.log(error);
      return {
          success: false,
          message: "Something went wrong!! Please try again!!",
          status: 500
      }
  }
}

export async function uploadNewTestimonial(formData) {
  try {
    await connectDB();
    const { title, rating, description, client, file } = formData || {};

    const { error } = addNewTestimonial.validate({
      title,
      rating,
      description,
      client,
      file,
    });

    if (error) {
      return {
        success: false,
        message: error.details[0].message,
      };
    }

    const newlyUploadedTestimonial = await Testimonial.create({ title, rating, description, client, file });

    if (newlyUploadedTestimonial) {
      return {
        success: true,
        message: "Testimonial Uploaded Successfully!!",
      };
    } else {
      return {
        success: false,
        message: "Failed to upload Testimonial! Try again!!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong. Try again!!",
    };
  }
}

export async function getTestimonialAction() {
  try {
      await connectDB();
  const testimonials = await Testimonial.find({});
            return {
              success: true,
              data: JSON.parse(JSON.stringify(testimonials)),
              message: "Testimonials fetched Successfully!!",
          };
      
      
  } catch (error) {
      console.log(error);
      return {
          success: false,
          message: "Something went wrong. Try again!!",
      };
  }
}


export async function getLimitedTestimonialAction() {
  try {
      await connectDB();
  const testimonialsData = await Testimonial.find({}).limit(8);
            return {
              success: true,
              data: JSON.parse(JSON.stringify(testimonialsData)),
              message: "Testimonials fetched Successfully!!",
          };
      
      
  } catch (error) {
      console.log(error);
      return {
          success: false,
          message: "Something went wrong. Try again!!",
      };
  }
}

export async function SignUpAction(formData) {
  try {
    await connectDB();
    const { name, email, password } = formData || {};
    const role = "general";
    const { error } = signUpValidation.validate({
      name,
      email,
      password,
      role
    });

    if (error) {
      return {
        success: false,
        message: error.details[0].message,
      };
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newlyRegisteredUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    if (newlyRegisteredUser) {
      return {
        success: true,
        message: "User registered successfully!",
      };
    } else {
      return {
        success: false,
        message: "Failed to register user! Try again.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
}

export async function getUser (userEmail) {
  try {
      await connectDB();
      const data = await User.findOne({ email: userEmail });
      if (!data) {
          return {
              success: false,
              message: "User  not found.",
          };
      }


      return {
          success: true,
          data: JSON.parse(JSON.stringify(data)),
          message: "Data fetched successfully!",
      };

  } catch (error) {
      console.error("Error fetching user:", error); // More context in error logging
      return {
          success: false,
          message: "Something went wrong. Try again!",
      };
  }
}


export async function LoginAction(formData) {
  try {
    await connectDB();
    const { email, password } = formData || {};

    const { error } = signInValidation.validate({
      email,
      password
    });

    if (error) {
      return {
        success: false,
        message: error.details[0].message,
      };
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid email or password!",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password!",
      };
    }


    const token = jwt.sign(
      { name: existingUser.name, email: existingUser.email, role: existingUser.role },
      process.env.NEXT_PUBLIC_JWT_SECRET
    );

    return {
      success: true,
      message: "Login successful!",
      token,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role
    };
    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Try again!",
    };
  }
}

export async function logoutAction() {
  try {
      await connectDB();
      return {
          success: true,
          message: "Logout successful.",
          token: ""
      };
  } catch (error) {
      console.error("Logout error:", error);
      return {
          success: false,
          message: "Something went wrong during logout. Try again!",
      };
  }
}



export async function deleteConversations() {
  try {
    await connectDB();
        await RequestQuote.deleteMany({});

        return { success: true, message: "All conversations deleted." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete." };
  }
}
export async function deleteUsers() {
  try {
    await connectDB();
        await User.deleteMany({});

        return { success: true, message: "All Users deleted." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete." };
  }
}

export async function sendQuoteAction({ userEmail, senderEmail, message = "", files = [] }) {
  console.log("userEmail", userEmail)
  console.log("senderEmail", senderEmail)
  try {
    await connectDB();

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    let quote = await Quote.findOne({ userEmail, adminEmail });

    if (!quote) {
      quote = new Quote({
        adminEmail: adminEmail,
        senderEmail: senderEmail,
        userEmail: userEmail,
        messages: [],
      });
    }

    if (!message.trim() && files.length === 0) {
      return {
        success: false,
        message: "Either a message or a file is required.",
      };
    }

    quote.messages.push({
      senderEmail: senderEmail,
      message: message?.trim() || files[0].fileType + "file",
      files: files.length
        ? files.map((file) => ({
            url: file.url,
            filename: file.filename,
            fileType: file.fileType,
          }))
        : [],
      timestamp: new Date(),
    });

    await quote.save();

    return {
      success: true,
      message: "Quote submitted successfully!",
    };
  } catch (error) {
    console.error("Error saving quote:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}





export async function getQuoteHistory(userEmail) {
  try {
    await connectDB();

    const quotes = await Quote.find({ userEmail }).sort({ createdAt: -1 });

    if (quotes.length === 0) {
      return { success: false, message: "No quote history found." };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(quotes)),
    };
  } catch (error) {
    console.error("Error fetching quote history:", error);
    return { success: false, message: "Failed to fetch quote history." };
  }
}


export async function getAllQuotesHistory() {
  try {
    await connectDB();
    const quotes = await Quote.find({}).sort({ timestamp: -1 });

    if (quotes.length === 0) {
      return { success: false, message: "No conversation found." };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(quotes)),
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to fetch chat history." };
  }
}

export async function saveRequestQuote(formData) {
  try {
      await connectDB();

      const { name, email, phone, country, projectCategory, description, files } = formData;

      let uploadedFiles = [];

      if (Array.isArray(files)) {
          uploadedFiles = files.map(file => ({
              url: file.url,
              fileType: file.fileType,
              filename: file.filename
          }));
      }

      const { error } = requestQuoteValidation.validate({
        name, email, phone, country, projectCategory, description, uploadedFiles
      });

      if (error) {
        return { success: false, message: error.details[0].message };
      }
      const newlyUploadedQuote = await RequestQuote.create({
          name,
          email,
          phone,
          country,
          projectCategory,
          description,
          uploadedFiles
      });

      if (newlyUploadedQuote) {
          return { success: true, message: "Request quote submitted successfully!" };
      } else {
          return { success: false, message: "Failed to submit request quote." };
      }

  } catch (error) {
      console.error("Error saving request quote:", error);
      return { success: false, message: "Failed to submit request quote." };
  }
}


export async function getAllQuote() {
  try {
    await connectDB();
    const quotes = await RequestQuote.find({}).sort({ timestamp: -1 });

    if (quotes.length === 0) {
      return { success: false, message: "No Quote found." };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(quotes)),
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to fetch quote history." };
  }
}


export async function uploadNewStaff(formData) {
  try {
    await connectDB();
    const { name, designation, intro, email, phone, status, image } = formData || {};

    if (!name || !designation || !intro || !email || !phone || !image) {
      return {
        success: false,
        message: "All fields are required!",
      };
    }

    const newStaff = await Staff.create({ name, designation, intro, email, phone, status, image });

    if (newStaff) {
      return {
        success: true,
        message: "Staff added successfully!",
      };
    } else {
      return {
        success: false,
        message: "Failed to add staff. Try again!",
      };
    }
  } catch (error) {
    console.error("Error uploading staff:", error);
    return {
      success: false,
      message: "Something went wrong. Try again!",
    };
  }
}


export async function getAllStaff() {
  try {
    await connectDB();
    const staff = await Staff.find({}).sort({ createdAt: -1 });

    if (staff.length === 0) {
      return { success: false, message: "No Staff Member found." };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(staff)),
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to fetch staff history." };
  }
}


export async function deleteStaff({id}) {
  try {
    await connectDB();
        await Staff.deleteOne({id});

        return { success: true, message: "Member deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete." };
  }
}