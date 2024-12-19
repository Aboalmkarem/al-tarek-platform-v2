import { Link } from "react-router-dom";
import { formatDate } from "../utils/handler";

function Card(course) {
    return (
        <div className="group" id={course.id} key={course.id}>
            <div className="rounded-md overflow-hidden w-full relative">
                <img
                    className="w-full object-cover transition-transform transition-colors ease-in-out duration-500 transform group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-150 smooth"
                    src={course.img}
                    alt="img"
                ></img>
                {course.isPinned ? (
                    <div className="absolute w-40 pb-1 bg-rose-500 text-lg text-white text-center rotate-45 -right-9 top-6 z-10 font-bold">
                        كورس مثبت
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="px-5 -mt-10 relative z-10">
                <div className="rounded-md w-full bg-slate-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm px-4 py-6 transition-transforms-shadows shadow-xl group-hover:shadow-[0_35px_35px_rgba(0,0,0,0.25)] group-hover:scale-105 smooth border border-slate-300 dark:border-slate-800">
                    <div className="flex flex-col space-y-6">
                        <div className="flex items-center justify-between flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                            <div className="flex flex-col space-y-4 w-full">
                                <h2 className="text-3xl dark:text-white text-[black] font-black">
                                    {course.name}
                                </h2>
                                <hr className="w-full h-[2px] mt-4 bg-sky-300 dark:bg-sky-900 border-0 rounded md:mt-10"></hr>
                                <div className="text-xl">{course.info}</div>
                            </div>
                            <div className="font-smaller shrink-0 flex flex-col space-y-3 mx-auto">
                                {course.isSub && !course.isFree ? (
                                    <RightButtonsForSubscriped />
                                ) : (
                                    <RightButtonsForNoneSubscriped
                                        course={course}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex-col flex space-y-3">
                            <div className="px-10">
                                <hr className="w-full h-[1px] bg-gray-300 dark:bg-gray-800 border-0 rounded dark:bg-gray-700"></hr>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <div className="sm:w-full mx-auto sm:self-end">
                                    <BottomButton
                                        course={course}
                                    />
                                </div>
                                <div className="w-full opacity- font-w-bold font-smaller flex flex-col-reverse sm:flex-row space-y-4 space-y-reverse sm:space-y-0 sm:space-x-reverse sm:space-x-4 justify-between flex-center-y">
                                    <div className="flex w-full sm:justify-end sm:items-start flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-1 items-center sm:space-x-reverse clr-text-secondary flex-wrap">
                                        <div className="flex flex-col space-y-2 shrink-0">
                                            <div className="flex justify-between space-x-1 space-x-reverse">
                                                <span className="flex-center-both">
                                                    {formatDate(
                                                        course.editDate
                                                    )}
                                                </span>
                                                <span className="font-normal flex-center-both transform -translate-y-px">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        aria-hidden="true"
                                                        role="img"
                                                        className="iconify iconify--icon-park-twotone"
                                                        width="1em"
                                                        height="1em"
                                                        preserveAspectRatio="xMidYMid meet"
                                                        viewBox="0 0 48 48"
                                                    >
                                                        <defs>
                                                            <mask id="iconifyReact24">
                                                                <g
                                                                    fill="none"
                                                                    stroke="#fff"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="4"
                                                                >
                                                                    <path
                                                                        fill="#555"
                                                                        d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20"
                                                                    ></path>
                                                                    <path d="M33.542 27c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7v6m19.084-18v6c-1.274-4.057-5.064-7-9.542-7s-8.268 2.943-9.542 7"></path>
                                                                </g>
                                                            </mask>
                                                        </defs>
                                                        <path
                                                            fill="currentColor"
                                                            d="M0 0h48v48H0z"
                                                            mask="url(#iconifyReact24)"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="flex justify-between space-x-1 space-x-reverse">
                                                <span className="flex-center-both">
                                                    {formatDate(
                                                        course.publishDate
                                                    )}
                                                </span>
                                                <span className="font-normal flex-center-both transform -translate-y-px">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        aria-hidden="true"
                                                        role="img"
                                                        className="iconify iconify--ic"
                                                        width="1em"
                                                        height="1em"
                                                        preserveAspectRatio="xMidYMid meet"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="m11.17 8l-.59-.59L9.17 6H4v12h16V8zM14 10h2v2h2v2h-2v2h-2v-2h-2v-2h2z"
                                                            opacity=".3"
                                                        ></path>
                                                        <path
                                                            fill="currentColor"
                                                            d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m0 12H4V6h5.17l1.41 1.41l.59.59H20zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"
                                                        ></path>
                                                    </svg>
                                                </span>
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
    );
}

export default Card;
const RightButtonsForNoneSubscriped = ({ course }) => {
    return (
        <>
            <Link
                to={`./${course.link}`}
                className="btn bg-transparent text-[black] dark:text-white border-2 border-sky-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white rounded-full min-h-max h-max py-2"
            >
                الدخول للكورس
            </Link>
            {course.isFree ? (
                <span className="bg-sky-500 font-bold text-white border-none rounded-full text-center py-1">
                    كورس مجاني !
                </span>
            ) : (
                <Link
                    to={`./${course.subscripeLink}`}
                    className="btn bg-sky-500 text-white hover:bg-sky-500 border-none rounded-full min-h-max h-max py-2"
                >
                    اشترك الآن !
                </Link>
            )}
        </>
    );
};
const RightButtonsForSubscriped = () => {
    return (
        <div className="bg-cyan-500 bg-opacity-10 border-cyan-500 border rounded-md py-4 px-3 font-w-bold text-cyan-500 text-center">
            انت مشترك
            <br />
            في هذا الكورس
        </div>
    );
};
const BottomButton = ({ course }) => {
    return (
        <>
            {course.isFree ? (
                <span className="flex w-max items-center gap-3 bg-sky-500 font-bold text-white border-2 border-sky-500 hover:border-sky-500 hover:bg-sky-500 text-white rounded px-4 py-1">
                    كورس مجاني !
                </span>
            ) : course.isSub ? (
                <Link
                    to={`./${course.link}`}
                    className="btn bg-transparent text-[black] dark:text-white border-2 border-sky-500 hover:border-sky-500 hover:bg-sky-500 hover:text-white rounded-full min-h-max h-max py-2"
                >
                    الدخول للكورس
                </Link>
            ) : (
                <span className="flex w-max items-center gap-3 bg-sky-500 font-bold text-white border-2 border-sky-500 hover:border-sky-500 hover:bg-sky-500 text-white rounded px-4 py-1">
                    <span className="dark:bg-gray-800 bg-white text-[black] dark:text-white px-1 py-1 rounded">
                        {course.price}
                    </span>
                    <span>جنيهاً</span>
                </span>
            )}
        </>
    );
};
