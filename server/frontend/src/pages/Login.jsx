import React from "react";
import Login from "../components/Login/Login.jsx";

const LoginPage = () => {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
