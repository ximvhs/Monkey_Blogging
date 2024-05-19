import { useAuth } from "../contexts/auth-context";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import { useForm } from "react-hook-form";
import { Label } from "../components/label";
import { Input } from "../components/input";
import Field from "../components/field/Field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import InputPasswordToggle from "../components/input/InputPasswordToggle";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address ")
    .required("Please enter your address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
  }, [userInfo, navigate]);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      toast.error("Tài khoản hoặc mật khẩu không tồn tại.");
    }
  };
  return (
    <Authentication title="Sign in to XimVHS Blogging">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email" className="label">
            Email address
          </Label>
          <Input
            type="email"
            className="input"
            name="email"
            placeholder="Enter your email address"
            control={control}
          />
        </Field>

        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
          <div className="nav-link">
            <NavLink to={"/forgot-password"}>You forgot your password?</NavLink>
          </div>
        </Field>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full max-w-[300px] mx-auto"
        >
          Sign in
        </Button>
        <div className="nav-link">
          <NavLink to={"/sign-up"} className=" mx-auto mt-5">
            You don't have an account?
          </NavLink>
        </div>
      </form>
    </Authentication>
  );
};

export default SignInPage;
