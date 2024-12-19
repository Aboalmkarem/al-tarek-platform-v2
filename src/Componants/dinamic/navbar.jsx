import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { FaCoins, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { getUser, signOut } from "../utils/handler";
import { useNavigate } from "react-router";
import useMessages from "../context/messageContext";
import { AiTwotoneBell } from "react-icons/ai";
import { CiWallet } from "react-icons/ci";
const Navbar = ({ isChecked, handleChange }) => {
    const { addMessage } = useMessages();
    const [username, setUserName] = useState(null);
    const [isAutherized, setIsAuthenticated] = useState(
        localStorage.getItem("token") ? true : false
    );

    useEffect(() => {
        if (isAutherized) {
            getUser()
                .then((res) => {
                    setUserName(res.data.username);
                })
                .catch((err) => {
                    if (err.status === 403 || err.status === 401) {
                        setIsAuthenticated(false);
                    }
                    if (err.message === "Network Error") {
                        addMessage("error", "تأكد من اتصالك بالإنترنت");
                    }
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header
            dir="ltr"
            className="bg-white dark:bg-gray-900 fixed w-full z-50"
        >
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <NavRight
                        isChecked={isChecked}
                        handleChange={handleChange}
                    />
                    {isAutherized ? (
                        <NavLeftForAuthentcated username={username} />
                    ) : (
                        <NavLeftForNoneAuthentcated />
                    )}
                </div>
            </div>
            <ScrollLine />
        </header>
    );
};

export default Navbar;

const NavRight = ({ isChecked, handleChange }) => {
    return (
        <div className="flex-1 flex items-center gap-6">
            <Link
                className="block text-teal-600 dark:text-teal-300"
                to="/al-tarek-platform-v2"
            >
                <img className="max-w-28" src={logo} alt="logo" />
            </Link>
            <div className="themeToggle">
                <label className="w-max grid cursor-pointer place-items-center">
                    <input
                        type="checkbox"
                        value="synthwave"
                        className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                        onChange={handleChange}
                        checked={isChecked}
                    />
                    <svg
                        className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <svg
                        className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>
            </div>
        </div>
    );
};
const NavLeftForAuthentcated = ({ username }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    let drop = useRef();
    const { addMessage } = useMessages();

    const closeMenu = () => {
        setOpen(!open);
    };

    useEffect(() => {
        let handleClickOutside = (e) => {
            if (!drop.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center gap-6">
            <nav aria-label="Global" className="block">
                <ul className="flex items-center gap-6 text-sm">
                    {/* <li>
                        <span className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                            <FaSearch className="size-6 object-cover" />
                        </span>
                    </li> */}
                    <li>
                        <Link
                            className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                            to="/al-tarek-platform-v2/myProfile/wallet"
                        >
                            <CiWallet className="size-6 object-cover" />
                        </Link>
                    </li>
                    <li>
                        <span className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                            <AiTwotoneBell className="size-6 object-cover" />
                        </span>
                    </li>
                </ul>
            </nav>
            <div className="relative md:block">
                <button
                    type="button"
                    className="overflow-hidden rounded-full border border-gray-300 shadow-inner dark:border-gray-600"
                    onClick={closeMenu}
                >
                    <span className="sr-only">Toggle dashboard menu</span>
                    <FaUser className="size-8 object-cover"></FaUser>
                </button>
                <div
                    className={`absolute end-0 z-10 mt-0.5 w-56 divide-y 
                        divide-gray-100 dark:divide-gray-700 rounded-md border 
                        border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 overflow-hidden ${
                            open ? "border" : "h-0 border-none"
                        }`}
                    role="menu"
                    ref={drop}
                    onClick={closeMenu}
                >
                    <div className="p-2">
                        <MenuItem link={"./al-tarek-platform-v2"}>
                            <FaHome></FaHome>
                            الصفحة الرئيسية
                        </MenuItem>
                    </div>
                    <div className="p-2">
                        <MenuItem
                            link={"./al-tarek-platform-v2/myProfile/user"}
                        >
                            اهلا {username}
                        </MenuItem>
                        <MenuItem
                            link={"/al-tarek-platform-v2/myProfile/favCourses"}
                        >
                            <FaCoins></FaCoins>
                            شحن كود السنتر
                        </MenuItem>
                        <MenuItem
                            link={"/al-tarek-platform-v2/myProfile/wallet"}
                        >
                            <CiWallet></CiWallet>
                            محفظتي
                        </MenuItem>
                        <MenuItem
                            link={"./al-tarek-platform-v2/myProfile/user"}
                        >
                            <FaUser></FaUser>
                            حسابي
                        </MenuItem>
                    </div>
                    <div className="p-2">
                        <button
                            dir="rtl"
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
                            role="menuitem"
                            onClick={() => {
                                addMessage("success", "تم تسجيل الخروج بنجاح");
                                signOut(navigate);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                />
                            </svg>
                            تسجيل خروج
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div> */}
        </div>
    );
};
const MenuItem = ({ children, link }) => {
    return (
        <Link
            dir="rtl"
            to={link}
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            role="menuitem"
        >
            <span className="flex gap-2 items-center">{children}</span>
        </Link>
    );
};
const NavLeftForNoneAuthentcated = () => {
    return (
        <div className="md:flex md:items-center md:gap-6">
            <nav aria-label="Global" className="md:block">
                <div className="flex items-center gap-2 sm:gap-6 text-sm">
                    <Link
                        to="/al-tarek-platform-v2/authentication/login"
                        className="group relative inline-block overflow-hidden border border-sky-600 px-1 py-3 sm:px-8 focus:outline-none focus:ring"
                    >
                        <span className="absolute inset-y-0 right-0 w-[2px] bg-sky-600 transition-all group-hover:w-full group-active:bg-sky-500"></span>
                        <span className="relative text-sm font-medium text-sky-600 transition-colors group-hover:text-white">
                            تسجيل دخول
                        </span>
                    </Link>
                    <Link
                        to="/al-tarek-platform-v2/authentication/register"
                        className="group relative inline-block overflow-hidden border border-sky-600 px-1 py-3 sm:px-8 focus:outline-none focus:ring"
                    >
                        <span className="absolute inset-y-0 left-0 w-[2px] bg-sky-600 transition-all group-hover:w-full group-active:bg-sky-500"></span>
                        <span className="relative text-sm font-medium text-sky-600 transition-colors group-hover:text-white">
                            انشاء حساب
                        </span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
const ScrollLine = () => {
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const totalHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / totalHeight) * 100;
            setScrollWidth(progress);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`relative w-full h-1 dark:bg-sky-900 bg-sky-400`}>
            <div className="absolute h-full dark:bg-sky-400 bg-sky-700" style={{width: `${scrollWidth}%`}}></div>
        </div>
    );
};
