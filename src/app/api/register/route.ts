// import { NextResponse } from "next/server";
// import { z } from "zod";
// import fs from "fs";
// import path from "path";

// const registerSchema = z.object({
//   fullName: z.string().optional(),
//   email: z.string().email("Invalid email format"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
//   orderDetails: z.string().min(1, "Order details are required"),
//   file: z.string().optional(),
// });

// const dataFolderPath = path.join(process.cwd(), "data");
// const filePath = path.join(dataFolderPath, "users.json");

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Received Data:", body);

//     const parsedData = registerSchema.safeParse(body);
//     if (!parsedData.success) {
//       return NextResponse.json({ error: "Invalid data" }, { status: 400 });
//     }

//     if (!fs.existsSync(dataFolderPath)) {
//       fs.mkdirSync(dataFolderPath, { recursive: true });
//     }

//     let users = [];
//     if (fs.existsSync(filePath)) {
//       users = JSON.parse(fs.readFileSync(filePath, "utf8"));
//     }
//     users.push(parsedData.data);
//     fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

//     return NextResponse.json({ message: "Registration successful" }, { status: 201 });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

// Define request validation schema
const registerSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  orderDetails: z.string().min(1, "Order details are required"),
  file: z.string().optional(),
});

// Define static token
const STATIC_TOKEN = "yJjbGllbnRfaWQiOiJZekV6TUdkb01ISm5PSEJpT";

// Define file path for storing user data
const dataFolderPath = path.join(process.cwd(), "data");
const filePath = path.join(dataFolderPath, "users.json");

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    console.log("Received Data:", body); // ✅ Log raw received data

    // Validate request data
    const parsedData = registerSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Create response object
    const responsePayload = {
      status: "success",
      message: "User registered successfully",
      "Received Data": parsedData.data, // ✅ Structured as requested
      token: STATIC_TOKEN,
    };

    console.log("Response Sent:", responsePayload); // ✅ Log response structure

    // Ensure data folder exists
    if (!fs.existsSync(dataFolderPath)) {
      fs.mkdirSync(dataFolderPath, { recursive: true });
    }

    // Load existing users
    let users = [];
    if (fs.existsSync(filePath)) {
      users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    // Save new user data
    users.push(responsePayload);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json(responsePayload, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
