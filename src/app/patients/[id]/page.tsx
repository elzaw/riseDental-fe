"use client";
import instance from "@/axois/instance";
import React, { useEffect, useState } from "react";

import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@mui/material";
import { Label } from "@/components/ui/label";

// Define the type of props using an interface
interface patient {
  // Define the structure of props here
  // For example:
  _id: string;
  name: string;
  address: string;
  phone: number;
  notes: string;
  // Add more props as needed
}

interface examination {
  _id: string;
  patient: string;
  examinationFee: number;
  paid: number;
  remaining: number;
  action: string;
  date: Date;
  nextVisit: Date;
}

const formatDateAndCalculateDifference = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();

  if (isNaN(date.getTime())) {
    return "لا يوجد";
  }

  // Check if the date is today
  if (date.toDateString() === today.toDateString()) {
    return "اليوم";
  }
  // Check if the date is tomorrow
  else if (
    date.getDate() - today.getDate() === 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "الغد";
  }
  // For other dates, calculate the difference
  else {
    const diffTime = Math.abs(date.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `بعد ${diffDays} يوم`;
  }
};

// Update the function to format the date properly
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toLocaleDateString("ar-EG"); // Adjust the locale based on your preference
};

const Patient = (props: any) => {
  const [patient, setPatient] = useState<patient>();
  const [examinations, setExaminations] = useState<examination[]>();
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const [formData, setFormData] = useState({
    patient: props.params.id,
    examinationFee: "",
    paid: 0,
    // remaining: 0,
    action: "",
    notes: "",
    date: new Date(),
    nextVisit: new Date(),
  });

  const fetchData = async () => {
    try {
      const response = await instance.get(`/patients/${props.params.id}`);
      console.log("API Response:", response.data);
      setPatient(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchExaminaions = async () => {
    try {
      const response = await instance.get(
        `examinations/patient/${props.params.id}/`
      );
      console.log("API Response:", response.data);
      setExaminations(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    fetchData();
    fetchExaminaions();
  }, []);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;
    // If the input name is "date" or "nextVisit", format the value to "yyyy-mm-dd"
    if (name === "date" || name === "nextVisit") {
      const [year, month, day] = value.split("-"); // Split the value by "-" to get year, month, and day
      updatedValue = `${year.padStart(4, "0")}-${month.padStart(
        2,
        "0"
      )}-${day.padStart(2, "0")}`; // Format the date as "yyyy-mm-dd"
    }
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);

      await instance.post(`examinations/`, formData);
      fetchExaminaions();
      setFormData({
        ...formData,
        examinationFee: "",
        paid: 0,
        // remaining: 0,
        notes: "",
        action: "",
        date: new Date(),
        nextVisit: new Date(),
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting examination data:", err);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 lg:m-20 m-5 border-2 border-[#000080] ">
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

      {/* Toggle button for new examination form */}
      <div className="flex justify-center mt-5">
        <button
          onClick={handleFormToggle}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {showForm ? "إغلاق النموذج" : "إضافة فحص جديد"}
        </button>
      </div>

      {/* New examination form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 lg:m-20 m-5 border-2  flex items-center justify-center">
          <Card className="lg:w-[50rem] w-[20rem] ">
            <CardHeader>
              <CardTitle className="text-end">إضافة فحص جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="examinationFee" className="flex justify-end">
                    رسوم الفحص
                  </Label>
                  <Input
                    id="examinationFee"
                    name="examinationFee"
                    value={formData.examinationFee}
                    type="number"
                    placeholder="أدخل رسوم الفحص"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paid" className="flex justify-end">
                    المبلغ المدفوع
                  </Label>
                  <Input
                    id="paid"
                    name="paid"
                    value={formData.paid}
                    placeholder="أدخل المبلغ المدفوع"
                    type="number"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="action" className="flex justify-end">
                    الاجراء
                  </Label>
                  <Input
                    id="action"
                    name="action"
                    value={formData.action}
                    placeholder="أدخل الاجراء"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex justify-end">
                    ميعاد
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    type="date"
                    placeholder="أدخل ميعاد الكشف"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextVisit" className="flex justify-end">
                    ميعاد الزيارة القادمة
                  </Label>
                  <Input
                    id="nextVisit"
                    name="nextVisit"
                    value={formData.nextVisit}
                    type="date"
                    placeholder="أدخل ميعاد الزيارة القادمة"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex justify-end">
                    ملاحظات
                  </Label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    placeholder="أدخل الملاحظات"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>

                <Button type="submit" className="bg-[#000080] text-white">
                  إضافة فحص
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Display all examinations */}
      <div className="mt-5 text-xl">
        <h2 className="text-2xl font-bold mb-4 text-right mr-10">الفحوصات</h2>
        {examinations?.map((exam, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 lg:mx-20 m-5 border-2 border-[#000080] "
          >
            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                رسوم الفحص: {exam.examinationFee}
              </span>
              {/* <PhoneIcon className="h-5 w-5 text-gray-500" /> */}
            </div>

            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                المبلغ المدفوع: {exam.paid}
              </span>
              {/* <PhoneIcon className="h-5 w-5 text-gray-500" /> */}
            </div>

            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                المبلغ المتبقي: {exam.remaining}
              </span>
              {/* <PhoneIcon className="h-5 w-5 text-gray-500" /> */}
            </div>

            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                الإجراء: {exam.action}
              </span>
            </div>

            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                ملاحظات: {exam.notes}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                تاريخ الكشف: {formatDate(exam.date)}{" "}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-gray-900 dark:text-gray-50 mr-2">
                موعد الزيارة القادمة: {formatDate(exam.nextVisit)}{" "}
              </span>
            </div>
            {/* Edit/Update buttons */}
            <div className="flex items-center justify-start mt-4">
              <button
                className="text-[#000080] bg-transparent border border-[#000080] px-10 py-3 rounded-md hover:bg-[#000080] hover:text-white mr-2"
                onClick={() => handleEdit(exam)}
              >
                تعديل
              </button>
              <button
                className="text-red-500 bg-transparent border border-red-500 px-10 py-3 rounded-md hover:bg-red-500 hover:text-white"
                onClick={() => handleDelete(exam._id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
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
