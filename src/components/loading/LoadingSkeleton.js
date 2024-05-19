import React from "react";

const LoadingSkeleton = (props) => {
  return (
    <div
      className="skeleton"
      style={{
        height: props.height || "100%",
        width: props.width || "100%",
        borderRadius: props.radius || "16px",
      }}
    ></div>
  );
};

export default LoadingSkeleton;
