"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl transform hover:scale-105 transition duration-300">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            🎉 Welcome, {userData?.fullName}!
          </h1>
          <p className="text-center text-gray-500 mb-6">Here are your details:</p>

          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="absolute top-2 right-2 bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
              Verified ✔
            </div>
            <p className="text-lg font-semibold">
              ✉️ <strong>Email:</strong> {userData?.email}
            </p>
            <p className="text-lg font-semibold">
              📞 <strong>Phone:</strong> {userData?.phone}
            </p>
            <p className="text-lg font-semibold">
              📝 <strong>Order Details:</strong> {userData?.orderDetails}
            </p>

            {userData?.file ? (
              <p className="text-lg font-semibold">
                📎 <strong>Uploaded File:</strong>
                <span className="text-yellow-300"> {userData.file}</span>
              </p>
            ) : (
              <p className="text-lg font-semibold text-gray-300">📎 No file uploaded</p>
            )}
          </div>

          <div className="mt-4 text-center">
            <p className="text-blue-600 font-semibold">🔑 Your Token:</p>
            <p className="bg-gray-100 p-2 rounded-lg text-gray-700 font-mono text-sm">
              {token}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                localStorage.removeItem("userData");
                localStorage.removeItem("token");
                router.push("/register");
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-600 transition duration-300"
            >
              Logout 🚪
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}



