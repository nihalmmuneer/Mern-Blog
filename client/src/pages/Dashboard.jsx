import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search, tab]);
  return (
    <div className="min-h-screen flex  flex-col md:flex-row">
      <div className="md:w-56">
        {/* SideBar */}
        <DashSideBar />
      </div>
      <div className="md:w-screen">
        {/* Profile Section */}
        {tab === "profile" && <DashProfile />}
        {/* Posts Section */}
        {tab === "posts" && <DashPosts />}
        {/* Users Section */}
        {tab === "users" && <DashUsers />}
        {/* Comments Section */}
        {tab=== "comments" && <DashComments />}
        {/* Dashboard Comp */}
        {tab==="dash" && <DashboardComp />}
      </div>
    </div>
  );
}
