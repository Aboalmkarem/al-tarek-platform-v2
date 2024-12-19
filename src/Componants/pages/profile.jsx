import { FaUser } from "react-icons/fa";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import User from "./profilePages/user";
import FavCourses from "./profilePages/favCourses";
import BgEffect from "../static/bgEffect";
import NotFound from "./notFound";

const Profile = () => {
    let location = useLocation();
    const validPaths = ["user", "favCourses", "wallet"];
    const isValidPath = validPaths.some((path) =>
        location.pathname.endsWith(path)
    );

    return (
        <>
            {isValidPath ? (
                <div className="flex flex-col justify-between h-full w-full relative min-h-screen">
                    <div className="w-full">
                        <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                            <div className="px-2 lg:px-4 sm:px-10 py-20 space-y-10">
                                <BgEffect></BgEffect>
                                <div className="relative px-2 lg:px-4 sm:px-10 space-y-10">
                                    <div className="-mt-24 px-2 py-2 bg-white dark:bg-gray-800 rounded-xl drop-shadow-xl">
                                        <div className="flex flex-col w-full h-full">
                                            <div className="w-full h-max py-6">
                                                <div className="flex gap-4 items-center w-max pl-8 mx-auto rounded-full border-2 border-gray-200 dark:border-gray-600 leading-relaxed">
                                                    <span className="bg-sky-400 px-8 py-4 rounded-full border-2 border-sky-300">
                                                        <FaUser color="white"></FaUser>
                                                    </span>
                                                    <h2 className="dark:text-white text-black text-2xl font-bold">
                                                        ملف المستخدم
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row w-full h-full px-2 py-2">
                                                <div className="slidebar w-full lg:w-1/6">
                                                    <ul className="flex flex-col w-full text-center lg:text-right gap-4 px-4 py-2">
                                                        <NewLi
                                                            content={
                                                                "ملف المستخدم"
                                                            }
                                                            path={"user"}
                                                        />
                                                        <NewLi
                                                            content={
                                                                "شحن كود السنتر"
                                                            }
                                                            path={"favCourses"}
                                                        />
                                                        <NewLi
                                                            content={"محفظتي"}
                                                            path={"wallet"}
                                                        />
                                                    </ul>
                                                </div>
                                                <div className="w-full lg:w-5/6">
                                                    <Routes>
                                                        <Route
                                                            path="user"
                                                            element={
                                                                <User></User>
                                                            }
                                                        ></Route>
                                                        <Route
                                                            path="favCourses"
                                                            element={
                                                                <FavCourses></FavCourses>
                                                            }
                                                        ></Route>
                                                    </Routes>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <NotFound></NotFound>
            )}
        </>
    );
};

export default Profile;

const NewLi = ({ content, path }) => {
    return (
        <li className="flex">
            <NavLink
                className="w-full px-4 py-2 text-xl font-medium border-2 border-transparent hover:border-sky-300 rounded drop-shadow-md"
                to={`/al-tarek-platform-v2/myProfile/${path}`}
            >
                {content}
            </NavLink>
        </li>
    );
};
