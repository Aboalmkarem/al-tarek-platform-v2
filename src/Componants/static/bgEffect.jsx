import { formatDate } from "../utils/handler";
import bgImg from "../../Assets/bg.3b55416e926d51a05f75.png";
function BgEffect({ course }) {
    if (course) {
        return <BgEffectForCourse course={course} />;
    } else {
        return <BgEffectOnly />;
    }
}

export default BgEffect;

const BgEffectForCourse = ({ course }) => {
    return (
        <div className="rounded-md py-24 px-8 text-slate-100 relative overflow-hidden pb-56 bg-blue-700 shadow-md border border-blue-900">
            <div className="relative z-10 space-y-6">
                <div className="text-3xl font-black">{course.title}</div>
                <div>{course.discription}</div>
                <div className="flex flex-col sm:flex-row font-smaller text-slate-100 sm:space-y-0 space-y-4 sm:space-x-8 sm:space-x-reverse">
                    <div className="flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse space-x-2">
                        <span className="flex-center-both trasnform text-blue-400 "></span>
                        <span className="font-w-bold underline">
                            <span>تاريخ انشاء الكورس</span>
                        </span>
                        <span className="bg-blue-400 px-3 rounded-full opacity-90 text-slate-800">
                            {formatDate(course.createdAt)}
                        </span>
                    </div>
                    <div className="flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse space-x-2">
                        <span className="flex-center-both trasnform text-blue-400 "></span>
                        <span className="font-w-bold underline">
                            <span>اخر تحديث للكورس</span>
                        </span>
                        <span className="bg-rose-400 px-3 rounded-full opacity-90 text-slate-800">
                            {formatDate(course.updatedAt)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 w-full h-full">
                <div
                    className="w-auto h-full md:w-full opacity-20 relative mr-auto transform "
                    style={{
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                    }}
                ></div>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-blue-700 from-45% text-sky-400"></div>
            </div>
        </div>
    );
};
const BgEffectOnly = () => {
    return (
        <div className="rounded-md py-24 px-8 text-slate-100 relative overflow-hidden pb-56 bg-blue-700 shadow-md border border-blue-900">
            <div className="relative z-10 space-y-6">
                <div className="text-3xl font-black"></div>
                <div></div>
                <div className="flex flex-col sm:flex-row font-smaller text-slate-100 sm:space-y-0 space-y-4 sm:space-x-8 sm:space-x-reverse">
                    <div className="flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse space-x-2">
                        <span className="flex-center-both trasnform text-blue-400 "></span>
                        <span className="font-w-bold underline">
                            <span></span>
                        </span>
                        <span className="bg-blue-400 px-3 rounded-full opacity-90 text-slate-800"></span>
                    </div>
                    <div className="flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse space-x-2">
                        <span className="flex-center-both trasnform text-blue-400 "></span>
                        <span className="font-w-bold underline">
                            <span></span>
                        </span>
                        <span className="bg-rose-400 px-3 rounded-full opacity-90 text-slate-800"></span>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 w-full h-full">
                <div
                    className="w-auto h-full md:w-full opacity-20 relative mr-auto transform "
                    style={{
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                    }}
                ></div>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-blue-700 from-45% text-sky-400"></div>
            </div>
        </div>
    );
};
