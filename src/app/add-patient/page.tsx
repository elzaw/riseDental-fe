import React from "react";

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
import { Textarea } from "@/components/ui/textarea";

const addPatientPage = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>إضافة مريض جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 ">
          <div className="space-y-2">
            <Label htmlFor="first-name" className="flex justify-end">
              الاسم
            </Label>
            <Input id="first-name" placeholder="أدخل الاسم" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex justify-end">
              رقم التليفون
            </Label>
            <Input id="phone" placeholder="أدخل رقم التليفون" type="tel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="flex justify-end">
              البلد
            </Label>
            <Input id="country" placeholder="أدخل البلد" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="examination-fee" className="flex justify-end">
              قيمة الكشف
            </Label>
            <Input id="examination-fee" placeholder="أدخل قيمة الكشف" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paid" className="flex justify-end">
                المدفوع
              </Label>
              <Input id="paid" placeholder="أدخل المدفوع" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remaining" className="flex justify-end">
                المتبقي
              </Label>
              <Input id="remaining" placeholder="أدخل المتبقي" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="action" className="flex justify-end">
              الاجراء
            </Label>
            <Input id="action" placeholder="أدخل الاجراء" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="next-visit" className="flex justify-end">
              ميعاد الزيارة القادمة
            </Label>
            <Input id="next-visit" placeholder="أدخل ميعاد الزيارة القادمة" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex justify-end">
              ملحوظات
            </Label>
            <Textarea id="notes" placeholder="أدخل الملحوظات" />
          </div>

          <Button type="submit">إضافة مريض</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default addPatientPage;
