import { useAuth } from "../contexts/auth-context";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import { useForm } from "react-hook-form";
import { Label } from "../components/label";
import { Input } from "../components/input";
import Field from "../components/field/Field";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

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
  const [toggle, setToggle] = useState(false);

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
  }, [userInfo]);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  return (
    <Authentication>
      <form onSubmit={handleSubmit(handleSignIn)} className="">
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
          <Input
            type={toggle ? "text" : "password"}
            className="input"
            name="password"
            placeholder="Enter your password"
            control={control}
          >
            {toggle ? (
              <IconEyeOpen
                className="input-icon"
                onClick={() => setToggle(false)}
              ></IconEyeOpen>
            ) : (
              <IconEyeClose
                className="input-icon"
                onClick={() => setToggle(true)}
              ></IconEyeClose>
            )}
          </Input>
          <div className="nav-link">
            <NavLink to={"/sign-up"}>You don't have an account?</NavLink>
          </div>
        </Field>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{
            width: 300,
            margin: "0 auto",
          }}
        >
          Sign in
        </Button>
      </form>
    </Authentication>
  );
};

export default SignInPage;
