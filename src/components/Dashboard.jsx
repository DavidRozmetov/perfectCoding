import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../firebase/Auth";
import { readData } from "../firebase/FireStore";
import { useNavigate } from "react-router-dom";
export const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(authentication, (u) => {
      const user = authentication.currentUser;

      if (user) {
        const uid = user.uid;
        let role = "";
        readData("users", uid).then((res) => {
          role = res.role;
          if (role !== "admin") {
            navigate("/login");
          }
        });
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="dashboard-container">
      <div className="dashboard-main-container dashboard-content">
        Dashboard
      </div>
    </div>
  );
};
