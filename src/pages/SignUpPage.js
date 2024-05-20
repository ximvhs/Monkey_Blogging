import React, { useEffect } from "react";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import slugify from "slugify";
import { userRole, userStatus } from "../utils/constants";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address ")
    .required("Please enter your address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1669723027015-9a3cfab8c5df?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1669723027015-9a3cfab8c5df?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });
    toast.success("Register succussfully !!!");
    navigate("/");
  };

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  return (
    <Authentication title="Sign up to XimVHS Blogging">
      <form onSubmit={handleSubmit(handleSignUp)}>
        {/* Start FullName */}
        <Field>
          <Label htmlFor="fullname" className="label">
            Fullname
          </Label>
          <Input
            type="text"
            className="input"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
        {/* End FullName */}

        {/* Start Address */}
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
        {/* End Address */}

        {/* Start PassWord */}
        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>

          <div className="nav-link">
            <NavLink to={"/sign-in"}>You have an account?</NavLink>
          </div>
        </Field>
        {/* End PassWord */}

        {/* Start button sign up */}
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{
            width: 300,
            margin: "0 auto",
          }}
        >
          Sign up
        </Button>
        {/* End button sign up */}
      </form>
    </Authentication>
  );
};

export default SignUpPage;
