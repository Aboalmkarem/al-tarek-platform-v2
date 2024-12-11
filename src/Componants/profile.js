import { FaUser } from "react-icons/fa";
import "./profile.css";
import { NavLink, Route, Routes } from "react-router-dom";
import User from "./profileFiles/user";
import FavCourses from "./profileFiles/favCourses";
import { useRef } from "react";
import { createRoot } from "react-dom/client";
import Message from "./message";

const Profile = () => {

    const messageRef = useRef()
    const rootRef = useRef(null); // Ref to store the root instance
    
    function showMessage(isErr, message) {
        if (!rootRef.current) {
            rootRef.current = createRoot(messageRef.current);
        }
        rootRef.current.render(
            <Message options={{ isErr: isErr, message: message }} />
        );
    }

    return (
        <div id="fixPosition">
            <div ref={messageRef}></div>
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
                            <Route path="user" element={<User showMessage={showMessage}></User>}></Route>
                            <Route path="favCourses" element={<FavCourses showMessage={showMessage}></FavCourses>}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
