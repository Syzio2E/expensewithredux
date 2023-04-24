import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserProfile from './components/Layouts/UserProfile'
import USerForm from "./components/Layouts/USerForm";
import Home from "./components/pages/Home";
import VerifyEmail from "./components/Layouts/VerifyEmail";
import Passwordreset from "./components/Layouts/Passwordreset";
import Header from "./components/Layouts/Header";
const routes = [
  {path: '/', element: <USerForm/>},
  {path:'/home', element:<Home/>},
  {path:'/home/userprofile',element:<UserProfile/>},
  {path:'/home/verify',element:<VerifyEmail/>},
  {path:'/passwordreset',element:<Passwordreset/>}
]


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
