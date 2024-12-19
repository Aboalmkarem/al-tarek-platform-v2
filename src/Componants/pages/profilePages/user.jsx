import profileIMG from "../../../Assets/profileIMG.svg";
import { useEffect, useState } from "react";
import { getUser } from "../../utils/handler";
import axios from "axios";
import useMessages from "../../context/messageContext";
import { FaAt, FaPhone } from "react-icons/fa";

const User = () => {
    const [isAutherized, setIsAuthenticated] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [user, setUser] = useState({
        username: "",
        email: "",
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const { addMessage } = useMessages();

    useEffect(() => {
        if (isAutherized) {
            getUser()
                .then((res) => {
                    setUser({
                        username: res.data.username,
                        email: res.data.email,
                    });
                })
                .catch((err) => {
                    if (err.status === 403 || err.status === 401) {
                        setIsAuthenticated(false);
                    }
                    if (err.response === undefined) {
                        console.log(err.message);
                        addMessage("error", `Error: ${err.message}`);
                    }
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function makeRequest(reqOptions) {
        axios
            .post(
                `${
                    import.meta.env.REACT_APP_NOT_SECRET_CODE
                }/api/auth/change-password`,
                reqOptions,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                if (res.data.jwt && res.data.user) {
                    addMessage("success", `successfull changing password`);
                    localStorage.setItem("token", res.data.jwt);
                    setIsAuthenticated(true);
                    setIsChangingPassword(!isChangingPassword);
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response?.data?.error?.message !== undefined) {
                    addMessage(
                        "error",
                        `Error: ${err.response?.data?.error?.message}`
                    );
                } else {
                    addMessage("error", `Error: ${err.message}`);
                }
            });
    }

    async function changePassword(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const jsonData = Object.fromEntries(formData);
        if (jsonData.password !== jsonData.passwordConfirmation) {
            addMessage("error", `Passwords do not match`);
            return;
        }
        const reqBody = JSON.stringify(jsonData);
        await makeRequest(reqBody);
    }

    return (
        <div className="flex w-full flex-col">
            <div className="flex lg:flex-row flex-col w-full px-2 py-2">
                <div className="w-20 md:w-1/6 xl:w-2/6 min-w-40">
                    <img src={profileIMG} alt="img"></img>
                </div>
                <div className="w-full md:w-5/6 xl-w-4/6 px-5 text-xl text-black dark:text-white font-medium">
                    {user.username ? (
                        <>
                            <h2 className="text-3xl py-3">{user.username}</h2>
                            <hr className="w-full h-1 my-4 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700"></hr>
                            <span className="flex items-center gap-3">
                                <FaAt className="text-yellow-500 text-sm"></FaAt>
                                <p>{user.email}</p>
                            </span>
                            <span className="flex items-center gap-3">
                                <FaPhone className="text-sky-500 text-sm"></FaPhone>
                                {/* <p>{user.phone}</p> */}
                                <p>01558557818</p>
                            </span>
                        </>
                    ) : (
                        <p>check your network</p>
                    )}
                </div>
            </div>
            <div className="dark:text-white text-black flex flex-col items-center">
                <Heading h2Text={"احصائيات"} h2Span={"كورساتك"} />
                <div className="grid md:grid-cols-2 xl:grid-cols-3 px-2 py-5 gap-4">
                    <RadialProgress
                        value={70}
                        color={"red-500"}
                        title={"عدد الفديوهات اللي شفتها"}
                        doneDegree={0}
                        perfectDegree={100}
                        degreeType={"فيديو"}
                    />
                    <RadialProgress
                        value={70}
                        color={"blue-500"}
                        title={"عدد الاختبارات اللي خلصتها"}
                        doneDegree={0}
                        perfectDegree={100}
                        degreeType={"اختبار"}
                    />
                    <RadialProgress
                        value={70}
                        color={"indigo-500"}
                        title={"متوسط النتائج اللي جبتها"}
                    />
                </div>
                <Heading h2Text={"احصائياتك علي"} h2Span={"المنصة"} />
                <div className="w-full px-2 md:w-96 lg:w-[35rem] pt-8">
                    <ProgressLine
                        text={"إجمالي مدة فتح المحاضرات علي المنصة"}
                        span={`${30} دقيقة`}
                        color={"yellow-500"}
                    />
                    <hr className="w-5/6 h-1 my-4 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-900"></hr>
                    <ProgressLine
                        text={"إجمالي عدد مرات مشاهدة الفيديوهات علي المنصة"}
                        span={`${30} مرة`}
                        color={"blue-500"}
                    />
                    <hr className="w-5/6 h-1 my-4 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-900"></hr>
                    <hr className="w-5/6 h-1 my-4 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-900"></hr>
                    <ProgressLine
                        text={"اجمالي عدد مرات فتح الاختبار"}
                        span={`${30} مرة`}
                        color={"red-500"}
                    />
                    <hr className="w-5/6 h-1 my-4 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-900"></hr>
                    <ProgressLine
                        text={"اجمالي عدد مرات إنهاء الاختبارات"}
                        span={`${30} مرة`}
                        color={"indigo-500"}
                    />
                    <hr className="w-5/6 h-1 my-4 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-900"></hr>
                    <hr className="w-5/6 h-1 my-4 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-900"></hr>
                </div>
            </div>
            {/* {isChangingPassword ? (
                <div className="authentcation">
                    <div className="section">
                        <div className="container">
                            <div className="row full-height justify-content-center">
                                <div className="col-12 text-center align-self-center py-5">
                                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                        <div className="card-3d-wrap mx-auto">
                                            <div className="card-3d-wrapper">
                                                <div className="card-front">
                                                    <div className="center-wrap">
                                                        <div className="section text-center">
                                                            <h4 className="mb-4 pb-3">
                                                                change password
                                                            </h4>
                                                            <form
                                                                onSubmit={(e) =>
                                                                    changePassword(
                                                                        e
                                                                    )
                                                                }
                                                            >
                                                                <div className="form-group">
                                                                    <input
                                                                        type="password"
                                                                        name="currentPassword"
                                                                        className="form-style"
                                                                        placeholder="current password"
                                                                        id="logname"
                                                                        autoComplete="off"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                    <MdOutlineLock />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <input
                                                                        type="password"
                                                                        name="password"
                                                                        className="form-style"
                                                                        placeholder="new password"
                                                                        id="logemail"
                                                                        autoComplete="off"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                    <MdOutlineLock />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <input
                                                                        type="password"
                                                                        name="passwordConfirmation"
                                                                        className="form-style"
                                                                        placeholder="Confirm Your Password"
                                                                        id="confirmPassword"
                                                                        autoComplete="off"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                    <MdOutlineLock />
                                                                </div>
                                                                <input
                                                                    type="submit"
                                                                    className="btn mt-4"
                                                                    value="Change Password"
                                                                />
                                                            </form>
                                                        </div>
                                                    </div>
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
                <></>
            )} */}
        </div>
    );
};

export default User;

const Heading = ({ h2Text, h2Span }) => {
    return (
        <>
            <hr className="w-64 lg:w-[40rem] h-1 mt-4 bg-sky-100 border-0 rounded md:mt-10 dark:bg-sky-700" />
            <div className="flex gap-2 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="size-10"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 48 48"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        d="m6.255 14.724l10.12-.333L23.62 2.28l1.551-.042l-5.53 16.198l-9.156.019Zm4.155 22.727l2.719-9.755L3.75 17.153l.425-1.493l13.793 10.135l-2.73 8.74Zm21.918 3.319l-8.585-5.372l-12.768 6.006l-1.311-.83l13.628-10.356l7.609 5.094ZM41.8 20.15l-7.653 6.632l1.997 13.97l-1.178 1.01l-5.903-16.067l7.101-5.78ZM26.323 4.635l3.585 9.471l13.8 2.943l.542 1.454H27.135l-2.977-8.659Z"
                    ></path>
                </svg>
                <h2 className="text-xl md:text-2xl xl:text-4xl py-5 font-bold">
                    {h2Text} <span className="text-yellow-400">{h2Span}</span>
                </h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="size-10"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 48 48"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        d="m6.255 14.724l10.12-.333L23.62 2.28l1.551-.042l-5.53 16.198l-9.156.019Zm4.155 22.727l2.719-9.755L3.75 17.153l.425-1.493l13.793 10.135l-2.73 8.74Zm21.918 3.319l-8.585-5.372l-12.768 6.006l-1.311-.83l13.628-10.356l7.609 5.094ZM41.8 20.15l-7.653 6.632l1.997 13.97l-1.178 1.01l-5.903-16.067l7.101-5.78ZM26.323 4.635l3.585 9.471l13.8 2.943l.542 1.454H27.135l-2.977-8.659Z"
                    ></path>
                </svg>
            </div>
        </>
    );
};
const RadialProgress = ({
    value,
    color,
    title,
    degreeType,
    doneDegree,
    perfectDegree,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <div
                className={`radial-progress text-${color}`}
                style={{
                    "--value": `${value}`,
                    "--size": "12rem",
                    "--thickness": "2rem",
                }}
                role="progressbar"
            >
                {value}%
            </div>
            <p>{title}</p>
            {degreeType ? (
                <div
                    className={`flex items-center w-max rounded-full border border-${color}`}
                >
                    <div
                        className={`px-4 py-2 text-white rounded-full border border-${color} bg-${color}`}
                    >
                        {doneDegree} {degreeType}
                    </div>
                    <div className="pr-2 pl-4">من {perfectDegree}</div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
const ProgressLine = ({ color, text, span }) => {
    return (
        <div className="flex justify-between items-center w-100% text-sm sm:text-lg">
            <p>{text}</p>
            <span
                className={`rounded-full px-2 py-1 font-bold text-nowrap border-4 border-${color}`}
            >
                {span}
            </span>
        </div>
    );
};
