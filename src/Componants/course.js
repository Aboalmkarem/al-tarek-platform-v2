import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Message from "./message";
import { createRoot } from "react-dom/client";
import { formatDate } from "./handler";
import StaticCourse from "./static/staticCourse";

const Course = () => {
    const [empty, setEmpty] = useState({
        isEmpty: false,
        message: '',
    });
    const [err, setErr] = useState({
        isError: false,
        message: ''
    });
    const [isShowVideo, setIsShowVideo] = useState(false);
    const [course, setCourse] = useState();
    const messageRef = useRef();
    const rootRef = useRef(null); // Ref to store the root instance

    function showVideo() {
        if (!isShowVideo) {
            window.scrollTo(0, 0);
            setIsShowVideo(true);
        } else {
            return
        }
    }

    function showMessage(isErr, message) {
        if (!rootRef.current) {
            rootRef.current = createRoot(messageRef.current);
        }
        rootRef.current.render(
            <Message options={{ isErr: isErr, message: message }} />
        );
    }

    async function getCourse() {
        const reqOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        axios
            .get(
                `${process.env.REACT_APP_NOT_SECRET_CODE}/api/courses/${
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
                    showMessage(
                        true,
                        `Error: you must be logged in. please login first`
                    );
                    setErr({
                        isErr: true,
                        message: "you must be logged in. please login first",
                    });
                }
                if (error.response?.status === undefined) {
                    showMessage(true, `Error: ${error.message}`);
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
            <div ref={messageRef}></div>
            <div className="course-page">
                {course ? (
                    <div className="flex flex-col justify-between h-full w-full relative min-h-screen">
                        <div className="w-full">
                            <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                                <div className="px-2 lg:px-4 sm:px-10 py-10 pb-10 space-y-10">
                                    <div className="rounded-md py-24 px-8 text-slate-100 relative overflow-hidden pb-56 bg-blue-700 shadow-md border border-blue-900">
                                        <div className="relative z-10 space-y-6">
                                            <div className="text-3xl font-black">
                                                {course.title}
                                            </div>
                                            <div>{course.discription}</div>
                                            <div className="flex flex-col sm:flex-row font-smaller text-slate-100 sm:space-y-0 space-y-4 sm:space-x-8 sm:space-x-reverse">
                                                <div className="flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse space-x-2">
                                                    <span className="flex-center-both trasnform text-blue-400 "></span>
                                                    <span className="font-w-bold underline">
                                                        <span>
                                                            تاريخ انشاء الكورس
                                                        </span>
                                                    </span>
                                                    <span className="bg-blue-400 px-3 rounded-full opacity-90 text-slate-800">
                                                        {formatDate(course.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse space-x-2">
                                                    <span className="flex-center-both trasnform text-blue-400 "></span>
                                                    <span className="font-w-bold underline">
                                                        <span>
                                                            اخر تحديث للكورس
                                                        </span>
                                                    </span>
                                                    <span className="bg-rose-400 px-3 rounded-full opacity-90 text-slate-800">
                                                        {formatDate(course.updatedAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 w-full h-full">
                                            <div className="backgrounIMG w-auto h-full md:w-full opacity-20 relative mr-auto transform ">
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-blue-900"></div>
                                            </div>
                                        </div>
                                    </div>
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
                                                        src={`${process.env.REACT_APP_NOT_SECRET_CODE}${course.courseVideo.data[0].attributes.url}`}
                                                        controls={true}
                                                    ></video>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col md:flex-row-reverse space-y-10 md:space-y-0 md:space-x-10">
                                                <div className=" md:basis-1/3 relative -mt-52">
                                                    <div className="w-full glass smooth clr-text-primary shadow-large rounded-lg overflow-hidden">
                                                        <div className="p-4 space-y-8">
                                                            <div className="overflow-hidden rounded-md">
                                                                <img
                                                                    src={`${process.env.REACT_APP_NOT_SECRET_CODE}${course.courseCoverIMG.data.attributes.url}`}
                                                                    alt="img"
                                                                ></img>
                                                            </div>
                                                            <button className="  border-2 smooth false w-full inline-block text-center bg-rose-500 border-rose-500 dark:bg-rose-500 dark:border-rose-500 hover:bg-opacity-0 dark:hover:bg-opacity-0 dark:bg-opacity-100 bg-opacity-100 hover:text-rose-500 dark:hover:text-rose-500 clr-white rounded-md  px-4 py-2 ">
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
                                                                src={`${process.env.REACT_APP_NOT_SECRET_CODE}${course.courseCoverIMG.data.attributes.url}`}
                                                                alt="img"
                                                            ></img>
                                                        </div>
                                                        <div>
                                                            <div className="py-16 px-10 rounded-md shadow-small border border-secondary-container smooth clr-text-primary bg-gray-900 space-y-12">
                                                                <div className="space-y-8">
                                                                    <div className="font-bold clr-text-primary text-3xl">
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
                                    <div className="rounded-2xl shadow-2xl w-full relative overflow-hidden bg-gray-900 smooth">
                                        <div className="py-10 px-5 sm:px-10">
                                            <div className="smooth space-y-6">
                                                <div className="font-bold clr-text-primary py-5 text-5xl">
                                                    <span>محتوي </span>
                                                    <span className="text-blue-500 smooth">
                                                        الكورس
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-900 rounded-md px-5 py-5 smooth shadow-xl space-y-4">
                                            <div className="collapses">
                                                <div
                                                    tabIndex={0}
                                                    className="collapse collapse-arrow border-base-300 bg-base-200 border"
                                                >
                                                    <div className="collapse-title text-xl font-medium">
                                                        <div className="flex justify-between items-center">
                                                            <span>
                                                                الدرس الاول
                                                            </span>
                                                            <button
                                                                className="self-start border-2 smooth false text-base bg-yellow-500 border-yellow-500 hover:bg-opacity-0 hover:text-yellow-400 text-white rounded-md  px-4 py-2 "
                                                                onClick={() => showVideo()}
                                                            >
                                                                مشاهدة الفيديو
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="collapse-content">
                                                        <p>video discription</p>
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
                    <StaticCourse err={err} empty={empty} isShowVideo={isShowVideo}/>
                )}
            </div>
        </>
    );
};

export default Course;
