import { Button } from "../../components/button";
import { useAuth } from "../../contexts/auth-context";
import { userRole } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserNoAd from "./UserNoAd";
import UserTable from "./UserTable";

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) return <UserNoAd></UserNoAd>;
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
