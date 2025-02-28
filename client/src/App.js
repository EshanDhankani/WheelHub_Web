import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import Loading from "./components/Loading";
import SuggestMe from "./components/SuggestMe";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Mechanics = lazy(() => import("./pages/Mechanics"));
const MechanicDetail = lazy(() => import("./pages/MechanicDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyMechanic = lazy(() => import("./pages/ApplyMechanic"));
const Error = lazy(() => import("./pages/Error"));


const MechanicLogin = lazy(() => import("./pages/Login")); 
const MechanicRegister = lazy(() => import("./pages/Register")); 
const LandingPage = lazy(() => import("./components/Client/LandingPage")); 
const Login = lazy(() => import("./components/Client/Login"));
const Register = lazy(() => import("./components/Client/Register"));
const EmailVerification = lazy(() =>
  import("./components/Client/EmailVerification")
);
const ForgetPassword = lazy(() => import("./components/Client/ForgetPassword"));
const UsedCars1 = lazy(() => import("./components/Client/UsedCar"));

const SuggestCar = lazy(() => import("./components/SuggestCar"));
const PostAd = lazy(() => import("./components/Client/PostAd"));
const CarDetailScreen = lazy(() =>
  import("./components/Client/CarDetailScreen")
);
const MyProfile = lazy(() => import("./components/Client/MyProfile"));
const MyAds = lazy(() => import("./components/Client/MyAds"));
const AccessoryAd = lazy(() => import("./components/Client/AccessoryAd"));
const Autoparts = lazy(() => import("./components/Client/Autoparts"));
const AutopartsDetail = lazy(() =>
  import("./components/Client/AutopartsDetail")
);
const PasswordReset = lazy(() => import("./components/Client/PasswordReset"));
const Payment = lazy(() => import("./components/Client/Payment"));
const Chat = lazy(() => import("./components/Chat"));

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/UsedCars" element={<UsedCars1 />} />
          <Route path="/Suggested-Car/:Id" element={<SuggestCar />} />
          <Route path="/PostAd" element={<PostAd />} />
          <Route path="/car/:id" element={<CarDetailScreen />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/edit-car/:id" element={<PostAd />} />
          <Route path="/edit-accessory/:id" element={<AccessoryAd />} />
          <Route path="/AccessoryAd" element={<AccessoryAd />} />
          <Route path="/autoparts" element={<Autoparts />} />
          <Route path="/details/:id" element={<AutopartsDetail />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/reset-password/:token" element={<PasswordReset />} />
          <Route path="/login" element={<Login />} /> {/* <-- Fix here */}
          <Route path="/register" element={<Register />} /> {/* <-- Fix here */}
          <Route path="/suggest-me" element={<SuggestMe />} />{" "}
          {/* <-- Fix here */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/register"
            element={
              <Public>
                <Register />
              </Public>
            }
          />
          <Route path="/" element={<LandingPage />} />
          <Route path="/mechanic-login" element={<MechanicLogin />} />
          <Route
            path="/mechanic-register"
            element={
              <Public>
                <MechanicRegister />
              </Public>
            }
          />
          <Route path="/mechanic" element={<Home />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/mechanic/:id" element={<MechanicDetail />} />
          <Route
            path="/appointments"
            element={
              <Protected>
                <Appointments />
              </Protected>
            }
          />
          <Route
            path="/notifications"
            element={
              <Protected>
                <Notifications />
              </Protected>
            }
          />
          <Route
            path="/applyformechanic"
            element={
              <Protected>
                <ApplyMechanic />
              </Protected>
            }
          />
          <Route
            path="/mechanic-profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
   
          <Route
            path="/dashboard/users"
            element={
              <Admin>
                <Dashboard type="users" />
              </Admin>
            }
          />
          <Route
            path="/dashboard/accessory"
            element={
              <Admin>
                <Dashboard type="accessory" />
              </Admin>
            }
          />
          <Route
            path="/dashboard/mechanics"
            element={
              <Admin>
                <Dashboard type="mechanics" />
              </Admin>
            }
          />
          <Route
            path="/dashboard/appointments"
            element={
              <Protected>
                <Dashboard type="appointments" />
              </Protected>
            }
          />
          <Route
            path="/dashboard/cars"
            element={
              <Protected>
                <Dashboard type="cars" />
              </Protected>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <Protected>
                <Dashboard type="applications" />
              </Protected>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
