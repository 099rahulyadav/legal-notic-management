"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const storedUserData = typeof window !== "undefined" ? localStorage.getItem("userData") : null;
  const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [userData, setUserData] = useState(storedUserData ? JSON.parse(storedUserData) : null);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    if (storedUserData) setUserData(JSON.parse(storedUserData));
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Dashboard</h1>
          <p className="text-center text-gray-500 mb-6">Your registration details</p>

          <div className="border-t border-gray-300 pt-4">
            <div className="space-y-3">
              <p><strong className="text-gray-700">Full Name:</strong> {userData?.fullName}</p>
              <p><strong className="text-gray-700">Email:</strong> {userData?.email}</p>
              <p><strong className="text-gray-700">Phone:</strong> {userData?.phone}</p>
              <p><strong className="text-gray-700">Order Details:</strong> {userData?.orderDetails}</p>
              {userData?.file ? (
                <p>
                  <strong className="text-gray-700">Uploaded File:</strong> 
                  <span className="text-blue-500"> {userData.file}</span>
                </p>
              ) : (
                <p className="text-gray-500">No file uploaded</p>
              )}

              <p className="text-blue-600"><strong>Token:</strong> {token}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                localStorage.removeItem("userData");
                localStorage.removeItem("token");
                window.location.href = "/register";
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
