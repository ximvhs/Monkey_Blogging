import React from "react";
import { Fragment } from "react";
const ParentComponent = () => {
  return <ImageUpload showLabel={true} />;
};

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    image = "",
    progress,
    handleDeleteImage = () => {},
    ...rest
  } = props;
  return (
    <label
      className={`group cursor-pointer flex items-center justify-center bg-gray-300 border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {image ? (
        <Fragment>
          <img
            src={image}
            alt="upload-img"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleDeleteImage}
            type="button"
            className="hover:bg-green-400  opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible absolute z-10 cursor-pointer w-16 h-16 bg-white rounded-full flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strok-width="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-col items-center text-center pointer-events-none">
            <img
              src="/img-upload.png"
              alt="upload-img"
              className="max-w-[80px] mb-5"
            />
            <p className="font-semibold">Choose photo</p>
          </div>
          <div
            className="absolute w-0 h-1 bg-green-400 bottom-0 left-0 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </Fragment>
      )}
    </label>
  );
};

export default ImageUpload;
