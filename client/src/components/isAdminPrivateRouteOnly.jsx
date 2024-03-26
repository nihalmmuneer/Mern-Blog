import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const IsAdminPrivateRouteOnly = () => {
  const details = useSelector((state) => state.user.user);
  return (
    <div>
      {details.currentUser?.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />}
    </div>
  );
};

export default IsAdminPrivateRouteOnly;
