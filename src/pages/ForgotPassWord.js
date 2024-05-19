import React, { useEffect } from "react";
import Authentication from "./Authentication";
import Field from "../components/field/Field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useForm } from "react-hook-form";
import { NavLink, useSearchParams } from "react-router-dom";
import { auth, db } from "../firebase/firebase-config";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ForgotPassWord = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const userId = params.get("id");

  const handleSignIn = async (values) => {
    console.log("values: ", values.email);
    await sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toast.success("Gửi mã thành công");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
            toast.error("Tài khoản không tồn tại.");
            break;
          case "auth/invalid-email":
            toast.error("Địa chỉ email không hợp lệ.");
            break;
          default:
            toast.error("Lỗi không xác định. Vui lòng thử lại sau.");
        }
      });
  };
  return (
    <Authentication title="Forgot password?">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email" className="label">
            Email address
          </Label>
          <Input
            type="email"
            className="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          />
          <div className="nav-link">
            <NavLink to={"/sign-in"}>You have an account?</NavLink>
          </div>
        </Field>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full max-w-[300px] mx-auto"
        >
          Sent
        </Button>
      </form>
    </Authentication>
  );
};

export default ForgotPassWord;
