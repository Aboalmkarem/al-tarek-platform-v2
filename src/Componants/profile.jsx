import { FaUser } from "react-icons/fa";
import "./profile.css";
import { NavLink, Route, Routes } from "react-router-dom";
import User from "./profileFiles/user";
import FavCourses from "./profileFiles/favCourses";

const Profile = () => {

    return (
        <div id="fixPosition">
            <div className="my-profile">
                <div className="head">
                    <div>
                        <span>
                            <FaUser></FaUser>
                        </span>
                        <h2>ملف المستخدم</h2>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="slidebar">
                        <ul>
                            <NavLink to="user">
                                <li>ملف المستخدم</li>
                            </NavLink>
                            <NavLink to="favCourses">
                                <li>شحن كود السنتر</li>
                            </NavLink>
                        </ul>
                    </div>
                    <div className="pages-div">
                        <Routes>
                            <Route path="user" element={<User></User>}></Route>
                            <Route path="favCourses" element={<FavCourses></FavCourses>}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
