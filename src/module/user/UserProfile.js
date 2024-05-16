import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import { ImageUpload } from "../../components/image";
import Field from "../../components/field/Field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useAuth } from "../../contexts/auth-context";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const { userInfo } = useAuth();
  const [userList, setUserList] = useState([]);

  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  useEffect(() => {
    async function fetchDate() {
      if (!userInfo || !userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    }
    fetchDate();
  }, [userInfo.email, userInfo, setValue]);

  useEffect(() => {
    async function fetchInfoDate() {
      if (userList.length === 0) return;
      const colRef = doc(db, "users", userList[0].id);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchInfoDate();
  }, [userList, reset]);

  async function deleteAvatar() {
    const colRef = doc(db, "users", userList[0].id);
    await updateDoc(colRef, {
      avatar: "",
      setImage: "",
      setProgress: 0,
    });
  }

  const handleUpdateFrofile = async (values) => {
    try {
      const colRef = doc(db, "users", userList[0].id);
      await updateDoc(colRef, {
        ...values,
        avatar: image || imageUrl,
      });

      toast.success("Update user information successfully!");
    } catch (error) {
      toast.error("Can not update user infomation");
    }
  };

  if (!userInfo) return;
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateFrofile)}>
        <div className="text-center mb-10">
          <ImageUpload
            className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            progress={progress}
            image={image || imageUrl}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              type="tel"
              pattern="[0-0]{1}[1-9]{2}[0-9]{3}[0-9]{4}"
              required
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field></Field>
        </div>
        {/* <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="newpassword"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div> */}
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
