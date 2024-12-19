import { useEffect, useState } from "react";
import axios from "axios";
import StaticCourse from "../static/staticCourse";
import useMessages from "../context/messageContext";
import BgEffect from "../static/bgEffect";

const Course = () => {
    const [empty, setEmpty] = useState({
        isEmpty: false,
        message: "",
    });
    const [err, setErr] = useState({
        isError: false,
        message: "",
    });
    const [isShowVideo, setIsShowVideo] = useState(false);
    const [course, setCourse] = useState();

    function showVideo() {
        if (!isShowVideo) {
            window.scrollTo(0, 0);
            setIsShowVideo(true);
        } else {
            return;
        }
    }

    const { addMessage } = useMessages();

    async function getCourse() {
        const reqOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        await axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/api/courses/${
                    window.location.pathname.split("/course/")[1]
                }?populate=*`,
                reqOptions
            )
            .then((res) => {
                // console.log(res.data.data.attributes);
                if (res.data.data.length === 0) {
                    setEmpty(true);
                } else {
                    setCourse(res.data.data.attributes);
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
                        isErr: true,
                        message: "you must be logged in. please login first",
                    });
                }
                if (error.response?.status === undefined) {
                    addMessage("error", `Error: ${error.message}`);
                    setErr({
                        isErr: true,
                        message: `${error.message}. please try again later`,
                    });
                }
            });
    }

    useEffect(() => {
        getCourse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="md:py-[7rem] py-7 md:px-[2rem] px-2">
                {course ? (
                    <div className="flex flex-col justify-between h-full w-full relative min-h-screen">
                        <div className="w-full">
                            <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                                <div className="px-2 lg:px-4 sm:px-10 py-10 pb-10 space-y-10">
                                    <BgEffect course={course}></BgEffect>
                                    <div className="px-2 lg:px-4 sm:px-10 relative py-0 space-y-10">
                                        {isShowVideo ? (
                                            <>
                                                <div className="flex justify-center items-center py-5">
                                                    <div className="font-bold text-2xl rounded-full border-2 text-white overflow-hidden border-yellow-500 bg-yellow-500 py-3 px-5">
                                                        الدرس الاول
                                                    </div>
                                                </div>
                                                <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-large overflow-hidden border border-secondary-container smooth clr-text-primary">
                                                    <video
                                                        src={`${
                                                            import.meta.env
                                                                .VITE_BACKEND_URL
                                                        }${
                                                            course.courseVideo
                                                                .data[0]
                                                                .attributes.url
                                                        }`}
                                                        controls={true}
                                                    ></video>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col md:flex-row-reverse space-y-10 md:space-y-0 md:space-x-10">
                                                <div className="md:basis-1/3 relative -mt-52">
                                                    <div className="shadow-2xl border border-gray-200 dark:border-gray-800 w-full glass smooth shadow-large rounded-lg overflow-hidden">
                                                        <div className="p-4 space-y-8">
                                                            <div className="overflow-hidden rounded-md">
                                                                <img
                                                                    src={`${
                                                                        import.meta
                                                                            .env
                                                                            .VITE_BACKEND_URL
                                                                    }${
                                                                        course
                                                                            .courseCoverIMG
                                                                            .data
                                                                            .attributes
                                                                            .url
                                                                    }`}
                                                                    alt="img"
                                                                ></img>
                                                            </div>
                                                            <button className="border-2 smooth w-full inline-block text-center bg-rose-500 border-rose-500 dark:bg-rose-500 dark:border-rose-500 hover:bg-opacity-0 dark:hover:bg-opacity-0 dark:bg-opacity-100 bg-opacity-100 hover:text-rose-500 dark:hover:text-rose-500 text-white rounded-md px-4 py-2 ">
                                                                هذا الكورس
                                                                مجاني!
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" md:basis-2/3">
                                                    <div className="space-y-5">
                                                        <div className="rounded-2xl shadow-2xl overflow-hidden">
                                                            <img
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_BACKEND_URL
                                                                }${
                                                                    course
                                                                        .courseCoverIMG
                                                                        .data
                                                                        .attributes
                                                                        .url
                                                                }`}
                                                                alt="img"
                                                            ></img>
                                                        </div>
                                                        <div>
                                                            <div className="py-16 px-10 rounded-md shadow-xl border border-gray-200 dark:border-gray-800 smooth bg-white dark:bg-gray-900 space-y-12">
                                                                <div className="space-y-8">
                                                                    <div className="font-bold text-3xl">
                                                                        {
                                                                            course.title
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            course.discription
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="rounded-2xl shadow-2xl w-full relative overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-900 smooth">
                                        <div className="py-10 px-5 sm:px-10">
                                            <div className="smooth space-y-6">
                                                <div className="font-bold clr-text-primary py-5 text-5xl">
                                                    <span>محتوى </span>
                                                    <span className="text-blue-500 smooth">
                                                        الكورس
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-md px-5 py-5 shadow-xl space-y-4">
                                            <Collapse
                                                onClickFunction={showVideo}
                                                title={"الدرس الاول"}
                                                type={"video"}
                                                info={"لا توجد بيانات"}
                                            />
                                            <Collapse
                                                onClickFunction={showVideo}
                                                title={"الدرس الاول"}
                                                type={"exam"}
                                                info={"لا توجد بيانات"}
                                            />
                                            <Collapse
                                                onClickFunction={showVideo}
                                                title={"الدرس الاول"}
                                                type={"homework"}
                                                info={"لا توجد بيانات"}
                                            />
                                            <Collapse
                                                onClickFunction={showVideo}
                                                title={"الدرس الاول"}
                                                type={"pdf"}
                                                info={"لا توجد بيانات"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <StaticCourse
                        err={err}
                        empty={empty}
                        isShowVideo={isShowVideo}
                    />
                )}
            </div>
        </>
    );
};

export default Course;
const Collapse = ({ onClickFunction, title, type, info }) => {
    return (
        <div className="collapse collapse-arrow bg-white dark:bg-[#080C14]">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                <div className="flex justify-between items-center sm:px-2">
                    {type === "video" ? (
                        <>
                            <span>{title}</span>
                            <button
                                className="z-10 smooth border-2 text-base bg-yellow-500 border-yellow-500 hover:bg-transparent hover:text-yellow-400 text-white rounded-md px-4 py-2"
                                onClick={() => onClickFunction()}
                            >
                                مشاهدة الفيديو
                            </button>
                        </>
                    ) : type === "exam" ? (
                        <>
                            <span>{title}</span>
                            <button
                                className="z-10 smooth border-2 text-base bg-red-500 border-red-500 hover:bg-transparent hover:text-red-400 text-white rounded-md px-4 py-2"
                                onClick={() => onClickFunction()}
                            >
                                بدء الامتحان
                            </button>
                        </>
                    ) : type === 'homework' ?(
                        <>
                            <span>{title}</span>
                            <button
                                className="z-10 smooth border-2 text-base bg-emerald-500 border-emerald-500 hover:bg-transparent hover:text-emerald-400 text-white rounded-md px-4 py-2"
                                onClick={() => onClickFunction()}
                            >
                                بدء الواجب
                            </button>
                        </>
                    ) : (
                        <>
                            <span>{title}</span>
                            <button
                                className="z-10 smooth border-2 text-base bg-blue-500 border-blue-500 hover:bg-transparent hover:text-blue-400 text-white rounded-md px-4 py-2"
                                onClick={() => onClickFunction()}
                            >
                                مشاهدة الملف
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="collapse-content">
                <p>{info}</p>
            </div>
        </div>
    );
};
