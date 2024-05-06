import React, { Fragment, useState } from "react";
import Input from "./Input";
import { IconEyeClose, IconEyeOpen } from "../icon";

const InputPasswordToggle = ({ control }) => {
  const [toggle, setToggle] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default InputPasswordToggle;
