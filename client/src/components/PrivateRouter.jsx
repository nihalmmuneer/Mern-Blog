import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router-dom";
const PrivateRouter = () => {
  const detail = useSelector((state) => state.user.user);
  return (
    <div>
      {detail.currentUser ? <Dashboard /> : <Navigate to="/sign-in" />}{" "}
    </div>
  );
};

export default PrivateRouter;
