"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CloudUpload } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  orderDetails: z.string().min(1, "Submit Your Order Information - Item Name, Decoration Size, Quantity, Due Date and any other details are required"),
  file: z.any(),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [fileName, setFileName] = useState("Click to upload");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-xl shadow-xl w-full max-w-3xl space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Get a Quote Now</h2>
        <p className="text-lg font-bold text-center text-gray-500 hidden md:block">Get a Quote Immediately Upon Form Submission</p>
        
        <div className="grid grid-cols-1 md:hidden gap-6">
          <input
            {...register("fullName")}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>
        
        <div className="hidden md:grid grid-cols-2 gap-6">
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
        <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
        
        <input
          {...register("email")}
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
        
        <input
          {...register("phone")}
          type="tel"
          placeholder="Phone"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        
        <textarea
          {...register("orderDetails")}
          placeholder="Order details"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.orderDetails?.message}</p>
        
        <label className="flex flex-col items-center justify-center gap-3 border-dashed border-2 border-gray-300 p-6 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <CloudUpload className="w-8 h-8 text-blue-500" />
          <span className="text-gray-600">{fileName}</span>
          <input
            type="file"
            {...register("file")}
            className="hidden"
            onChange={(e) =>
              setFileName(e.target.files[0] ? e.target.files[0].name : "Click to upload")
            }
          />
        </label>

        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 shadow-lg text-lg font-semibold">
          Send Request
        </button>
      </form>
    </div>
  );
}
