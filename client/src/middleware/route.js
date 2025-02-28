import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate
        to={"/"}
        replace={true}
      ></Navigate>
    );
  }
  return children;
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};

export const Admin = ({ children }) => {
  const user = jwtDecode(localStorage.getItem("token"));

  if (user.isAdmin) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};

  export const Mechanic = ({ children }) => {
    const user = jwtDecode(localStorage.getItem("token"));
  
    if (user.isMechanic) {
      return children;
    }
    return (
      <Navigate
        to={"/"}
        replace={true}
      ></Navigate>
    );
};




// import { Navigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";

// const getUserFromToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return null; // No token found
//   try {
//     return jwtDecode(token);
//   } catch (error) {
//     console.error("Token is invalid:", error);
//     return null; // Token is invalid or expired
//   }
// };

// export const Protected = ({ children }) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return <Navigate to="/" replace={true} />;
//   }
//   return children;
// };

// export const Public = ({ children }) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return children;
//   }
//   return <Navigate to="/" replace={true} />;
// };

// export const Admin = ({ children }) => {
//   const user = getUserFromToken();
  
//   if (user && user.isAdmin) {
//     return children;
//   }
//   return <Navigate to="/" replace={true} />;
// };

// export const Mechanic = ({ children }) => {
//   const user = getUserFromToken();

//   if (user && user.isMechanic) {
//     return children;
//   }
//   return <Navigate to="/" replace={true} />;
// };
