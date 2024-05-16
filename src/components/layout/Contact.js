import React from "react";
import Field from "../field/Field";
import { Label } from "../label";
import styled from "styled-components";
import { useContact } from "./Contact-context";
import { Button } from "../button";
import { useForm } from "react-hook-form";
import { Textarea } from "../textarea";

const ContactStyled = styled.div`
  .contact_container {
    position: fixed;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1000px;
    width: 900px;
    height: 500px;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    color: white;
    animation: showContact 0.3s ease;
    .icon_close {
      position: absolute;
      right: 10px;
      top: 10px;
      padding: 10px;
      color: black;
      cursor: pointer;
      transition: all 0.2s ease;
      :hover {
        opacity: 0.5;
      }
    }
    .contact_info {
      padding: 40px;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    }

    .contact_form {
      width: 550px;
      padding: 40px 0 40px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      color: ${(props) => props.theme.primary};
      Field {
        z-index: 10;
      }
      .label {
        font-size: 16px;
        margin-bottom: -12px;
        color: ${(props) => props.theme.primary};
      }
      Textarea {
        color: black;
        font-size: 18px;
        margin-bottom: -20px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
          rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        :focus {
          border-color: ${(props) => props.theme.primary};
        }
      }
    }
  }
  .over {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  @keyframes showContact {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 50%;
      opacity: 1;
    }
  }
`;

const info = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
    text: "0336 475 713",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
    text: "ximvhs26092002@gmail.com",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    text: " Bùi Đình Túy, P.24, Bình Thạnh, TP.HCM",
  },
];

const Contact = () => {
  const { setShow, show } = useContact();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const handleContact = (values) => {
    console.log("values: ", values);
  };

  const handleClose = () => {
    setShow(!show);
  };
  return (
    <ContactStyled>
      <div className="over" onClick={handleClose}></div>
      <div className="contact_container flex">
        <div className="contact_info w-[450px] flex flex-col gap-5">
          <h1 className="mx-auto text-[28px] font-bold">CONTACT ME!</h1>
          {info.length > 0 &&
            info.map((item) => (
              <div className="flex gap-5 items-center" key={item.id}>
                <span className="text-[30px]">{item.icon}</span>
                <p className="text-[16px]">{item.text}</p>
              </div>
            ))}
        </div>
        <form className="contact_form" onSubmit={handleSubmit(handleContact)}>
          <img
            src="./monkey.png"
            alt="Monkey"
            className="absolute w-[350px] h-[400px] opacity-10 z-0"
          />
          <h1 className="text-[28px] font-bold z-10">SENT ANONYMOUSLY</h1>
          <Field>
            <Label htmlFor="email" className="label">
              Message
            </Label>
            <Textarea
              name="description"
              control={control}
              placeholder="Nhập tin nhắn"
            ></Textarea>
          </Field>
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
            className="w-[200px] z-10"
          >
            Sent
          </Button>
        </form>
        <div className="icon_close" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 22 22"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </ContactStyled>
  );
};

export default Contact;
