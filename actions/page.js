"use server";
import Joi from "joi";
import connectDB from "@/database";
import API from "@/models/Api";
import Testimonial from "@/models/Testimonial";
import User from "@/models/User";

import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { pusher } from "@/lib/pusher";
import Chat from "@/models/Chat";
import Conversation from "@/models/Conversation";


const string = process.env.NEXT_PUBLIC_SECRET_STRING
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
  password: Joi.string().required()
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
  const testimonialsData = await Testimonial.find({}).limit(3);
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

    const { error } = signUpValidation.validate({
      name,
      email,
      password
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
      password: hashedPassword
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

export async function getUser() {
  try {
      await connectDB();
  const data = await User.find({});
            return {
              success: true,
              data: JSON.parse(JSON.stringify(data)),
              message: "data fetched Successfully!!",
          };
      
      
  } catch (error) {
      console.log(error);
      return {
          success: false,
          message: "Something went wrong. Try again!!",
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
      id: existingUser._id.toString()
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



export async function sendMessage({ sender, message }) {
    await pusher.trigger("chat-channel", "new-message", {
        sender,
        message,
    });

    return { success: true };
}


export async function sendMessageAction({ sender, message, userId, adminId }) {
  try {
    await connectDB();

    let conversation = await Conversation.findOne({
      userId,
      adminId,
    });

    if (!conversation) {

      conversation = await Conversation.create({
        userId,
        adminId,
      });
    }

    const newChatMessage = await Chat.create({
      conversationId: conversation._id,
      sender,
      message,
    });

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
}


export async function getChatAction({userId, adminId}) {
  try {
    // Find conversation based on userId and adminId
    const conversation = await Conversation.findOne({
      userId,
      adminId,
    });

    if (!conversation) {
      return { success: false, message: "No conversation found." };
    }

    // Fetch all chat messages associated with this conversation
    const messages = await Chat.find({ conversationId: conversation._id });

    return { success: true, messages };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to fetch chat history." };
  }
}



export async function getChatHistory(userId, adminId) {
  try {
    // Find conversation based on userId and adminId
    const conversation = await Conversation.findOne({
      userId,
      adminId,
    });

    if (!conversation) {
      return { success: false, message: "No conversation found." };
    }

    // Fetch all chat messages associated with this conversation
    const messages = await Chat.find({ conversationId: conversation._id });

    return { success: true, messages };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to fetch chat history." };
  }
}

