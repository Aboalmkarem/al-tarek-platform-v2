import { Link } from "react-router-dom";
import Card from "../dinamic/card";
import { useEffect, useState } from "react";
import axios from "axios";
import StaticCard from "../static/staticCard";
import useMessages from "../context/messageContext";

const Courses = () => {
    const [empty, setEmpty] = useState({
        isEmpty: false,
        message: "",
    });
    const [err, setErr] = useState({
        isError: false,
        message: "",
    });
    const [courses, setCourses] = useState(false);

    const { addMessage } = useMessages();

    async function getCourses() {
        const reqOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        await axios
            .get(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/courses?populate=*&filters[category][name][$eq]=${
                    window.location.pathname.split("/courses/")[1]
                }`,
                reqOptions
            )
            .then((res) => {
                // console.log(res.data.data)
                if (res.data.data.length === 0) {
                    setEmpty({
                        isEmpty: true,
                        message: "No courses found",
                    });
                } else {
                    setCourses(res.data.data);
                }
            })
            .catch((error) => {
                if (
                    error.response?.status === 401 &&
                    error.response?.statusText === "Unauthorized"
                ) {
                    addMessage(
                        "error",
                        `Error: you must be logged in. please login first`
                    );
                    setErr({
                        isError: true,
                        message: "you must be logged in. please login first",
                    });
                }
                if (error.response?.status === undefined) {
                    addMessage("error", `Error: ${error.message}`);
                    setErr({
                        isError: true,
                        message: `${error.message}. please try again later`,
                    });
                }
            });
    }

    useEffect(() => {
        getCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col px-4 py-10">
            <div className="py-10 my-[5rem] smooth">
                <div className="px-2 lg:px-4 sm:px-10 pb-10 space-y-10 py-8">
                    <div className="text-center mb-8 flex justify-center items-center flex-col space-y-5">
                        <div className="flex flex-col gap-5 justify-center items-center w-full max-w h-fit">
                            <div className="font-bold text-4xl sm:text-5xl text-center">
                                الصف{" "}
                                <span className="text-sky-500">{window.location.pathname.split("/courses/")[1]}</span>
                            </div>
                            <div className="underline-svg w-[340px] sm:w-[400px] inline-block">
                                <svg
                                    className="w-full h-full "
                                    viewBox="0 0 407 49"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className="path-vert"
                                        d="M1 48C30.5 5.5 261 -22.5 406 32.3365"
                                        stroke="#11BAF0"
                                        strokeWidth="3"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 lg:px-4 sm:px-10  space-y-10 py-8">
                        {courses ? (
                            <div className="g-teal-400 smooth clr-text-primary drk:bg-teal-800 bg-opacity-50 dark:bg-opacity-50 grid  grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                                {courses.map((course) => {
                                    return (
                                        <Card
                                            key={course.id}
                                            link={`course/${course.id}`}
                                            img={`${
                                                import.meta.env.VITE_BACKEND_URL
                                            }${
                                                course.attributes.courseCoverIMG
                                                    .data.attributes.url
                                            }`}
                                            class="card"
                                            name={course.attributes.title}
                                            info={course.attributes.discription}
                                            isSub={false}
                                            isFree={true}
                                            isPinned={false}
                                            price={"420.00"}
                                            editDate={
                                                course.attributes.updatedAt
                                            }
                                            publishDate={
                                                course.attributes.publishedAt
                                            }
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <StaticCard err={err} empty={empty} />
                        )}
                    </div>
                </div>
            </div>
            <div className="px-10 py-10 text-sm space-y-4">
                <hr className="sm:w-3/4 h-2 bg-sky-200 border-0 rounded dark:bg-sky-900 mx-auto"></hr>
                <div className="flex w-full justify-center items-center gap-2">
                    <h6>اعرف تفاصيل اكتر عن حسابك</h6>
                    <Link
                        className="bg-transparent text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white rounded px-10 py-10"
                        to="/al-tarek-platform-v2/myProfile/user"
                    >
                        ملفك الشخصي
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Courses;