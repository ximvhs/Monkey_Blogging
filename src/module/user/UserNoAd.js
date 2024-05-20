import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";

const UserNoAd = () => {
  return (
    <div>
      <DashboardHeading
        title="No Data"
        desc="Only admin can view"
      ></DashboardHeading>
      <div className="flex justify-center items-center">
        <img src="/NoData.png" alt="#" className="w-[550px]" />
      </div>
    </div>
  );
};

export default UserNoAd;
