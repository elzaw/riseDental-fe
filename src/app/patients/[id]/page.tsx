"use client";
import instance from "@/axois/instance";
import React, { useEffect, useState } from "react";

// Define the type of props using an interface
interface patient {
  // Define the structure of props here
  // For example:
  _id: string;
  name: string;
  address: string;
  phone: number;
  // Add more props as needed
}

const Patient = (props: any) => {
  console.log(props.params.id);
  const [patient, setPatient] = useState<patient>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/patients/${props.params.id}`);
        console.log("API Response:", response.data);
        setPatient(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 mt-5 ">
      <h2 className="text-2xl font-bold mb-4 text-right">معلومات الاتصال</h2>
      <div className="grid grid-cols-1  gap-4">
        <div className="flex items-center justify-end">
          <span className="text-gray-900 dark:text-gray-50 font-medium mr-2">
            {patient?.name}
          </span>
          <UserIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="flex items-center justify-end">
          <span className="text-gray-900 dark:text-gray-50 mr-2">
            {patient?.address}
          </span>
          <MapPinIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="flex items-center justify-end">
          <span className="text-gray-900 dark:text-gray-50 mr-2">
            {patient?.phone}
          </span>
          <PhoneIcon className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Patient;

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
