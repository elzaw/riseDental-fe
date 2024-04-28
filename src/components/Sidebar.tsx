import React from "react";
import Link from "next/link";
import Image from "next/image";
import RiseDentalLogo from "../../public/Logo.svg";
const Sidebar = () => {
  return (
    <div className="hidden border-l bg-gray-100/40 dark:bg-gray-800/40 h-screen lg:block rtl">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            {/* <SmileIcon className="h-6 w-6" /> */}
            <Image
              src={RiseDentalLogo}
              alt="Picture of the author"
              width={200}
              //   height={10}
            />
            {/* <span>Rise Dental</span> */}
          </Link>
          <button className="mr-auto h-8 w-8 ">
            {/* <BellIcon className="h-4 w-4" /> */}
            <span className="sr-only ">تبديل الإشعارات</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-xl font-medium ">
            <Link
              className="flex items-center justify-end gap-3 rounded-lg hover:bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/add-patient"
            >
              {/* <CalendarIcon className="h-4 w-4" /> */}
              اضافة مريض
            </Link>
            <Link
              className="flex items-center justify-end gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/home"
            >
              {/* <CalendarIcon className="h-4 w-4" /> */}
              المواعيد
            </Link>
            <Link
              className="flex items-center justify-end gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              {/* <UsersIcon className="h-4 w-4" /> */}
              المرضى
            </Link>
            <Link
              className="flex items-center justify-end gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              {/* <CreditCardIcon className="h-4 w-4" /> */}
              المدفوعات
            </Link>
            <Link
              className="flex items-center justify-end gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              {/* <SettingsIcon className="h-4 w-4" /> */}
              الإعدادات
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
