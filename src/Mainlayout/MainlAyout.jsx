import { Outlet } from "react-router-dom";
import Home from "../Pages/Home";
import Header from "../components/Header";


const MainlAyout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default MainlAyout;