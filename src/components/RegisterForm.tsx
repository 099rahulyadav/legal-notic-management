"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { submitForm } from "@/store/formSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation"; 

const formSchema = z.object({
  fullName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  orderDetails: z.string().min(1, "Please enter your order details"),
  file: z.any(),
});

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, userData } = useSelector((state: RootState) => state.form);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [fileName, setFileName] = useState("Click to upload");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);

    if (typeof window !== "undefined") {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

  useEffect(() => {
    const fullName = watch("fullName");
    const firstName = watch("firstName");
    const lastName = watch("lastName");

    if (isMobile) {
      if (firstName || lastName) {
        setValue("fullName", `${firstName || ""} ${lastName || ""}`.trim(), { shouldValidate: true });
      }
    } else {
      if (fullName) {
        const [first, ...last] = fullName.split(" ");
        setValue("firstName", first || "", { shouldValidate: true });
        setValue("lastName", last.join(" ") || "", { shouldValidate: true });
      }
    }
  }, [isMobile, watch("fullName"), watch("firstName"), watch("lastName"), setValue]);

  const onSubmit = (data: any) => {
    const formData = {
      fullName: isMobile ? data.fullName : `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone,
      orderDetails: data.orderDetails,
      file: fileName,
    };

    dispatch(submitForm(formData));
  };

  const handleGoToDashboard = () => {
    setTimeout(() => {
      if (localStorage.getItem("token")) {
        router.push("/dashboard");
      }
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-xl shadow-xl w-full max-w-3xl space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Get a Quote Now</h2>
        <p className="text-lg font-bold text-center text-gray-500 hidden md:block">Get a Quote Immediately Upon Form Submission</p>

        {isMobile ? (
          <>
            <input {...register("fullName", { required: "Full Name is required" })} 
              placeholder="Full Name" 
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400" />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </>
        ) : (
          <>
            <input {...register("firstName", { required: "First Name is required" })} 
              placeholder="First Name" 
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400" />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

            <input {...register("lastName", { required: "Last Name is required" })} 
              placeholder="Last Name" 
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400" />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </>
        )}

        <input {...register("email")} type="email" placeholder="Email Address" 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("phone")} type="tel" placeholder="Phone" 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        <textarea {...register("orderDetails")} placeholder="Order details" 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400" />
        {errors.orderDetails && <p className="text-red-500 text-sm">{errors.orderDetails.message}</p>}

        <label className="flex flex-col items-center justify-center gap-3 border-dashed border-2 border-gray-300 p-6 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <CloudUpload className="w-8 h-8 text-blue-500" />
          <span className="text-gray-600">{fileName}</span>
          <input
            type="file"
            {...register("file")}
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "Click to upload")}
          />
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg">
          {status === "loading" ? "Submitting..." : "Send Request"}
        </button>

        {status === "succeeded" && (
          <div className="flex flex-col items-center mt-4">
            <p className="text-center text-green-600 mb-2">Registration successful!</p>
            <button onClick={handleGoToDashboard}
              className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition">
              Go to Dashboard
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
