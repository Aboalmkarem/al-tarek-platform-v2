import background from "../../Assets/Untitled-1.png";
import icon from "../../Assets/chemistry-sticker-05.png";
import { useEffect, useState } from "react";
import axios from "axios";
import StaticCard from "../static/staticCard";
import useMessages from "../context/messageContext";
import { Link } from "react-router";
import CategoryCard from "../dinamic/categoryCard";
import Card from "../dinamic/card";

const HomePage = () => {
    const [isAutherized, setIsAuthenticated] = useState(
        localStorage.getItem("token") ? true : false
    );

    return (
        <div className="w-full min-h-max">
            {isAutherized ? <Home /> : <LandingPage />}
        </div>
    );
};

export default HomePage;
const LandingPage = () => {
    return (
        <div className="flex flex-col text-3xl">
            <section className="min-h-max py-3 w-full grow-1">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 justify-center items-center min-h-svh px-3 grow-1">
                    <div className="px-2 h-96 flex flex-col justify-center items-center sm:block sm:h-auto">
                        <h2 className="md:text-7xl text-4xl pb-5 text-nowrap">
                            منصة{" "}
                            <span className="md:text-8xl text-5xl text-sky-500">
                                الطارق
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl">
                            منصة متكاملة بها كل ما يحتاجه الطالب ليتفوق
                        </p>
                        <hr className="max-w-96 min-w-64 h-1 my-14 bg-sky-100 border-0 rounded sm:my-10 dark:bg-sky-700" />
                        <Link
                            to={"/al-tarek-platform-v2/authentication/register"}
                            className="btn drop-shadow-md bg-sky-500 hover:bg-sky-600 text-white text-2xl sm:text-xl font-bold max-w-max h-max px-4 py-3"
                        >
                            ابدء رحلتك{" "}
                            <span className="text-yellow-400">الان</span>
                        </Link>
                    </div>
                    <div>
                        <img src={background} alt="img" />
                    </div>
                </div>
            </section>
            <section className="min-h-max w-full grow-1 px-2 py-2 my-2 bg-sky-500 rounded-l-[10rem]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="md:w-1/2 font-bold pr-10 grow order-last md:order-frist">
                        <div className="flex flex-col h-full md:justify-between py-10 gap-10">
                            <div className="w-full text-nowrap text-white text-4xl md:text-[3rem] md:px-4 py-4 md:leading-[8rem]">
                                <span>ذاكر في اي وقت </span>
                                <br />
                                <span>
                                    وفي اي{" "}
                                    <span className="text-yellow-500">
                                        مكان
                                    </span>
                                </span>
                            </div>
                            <Link
                                to={
                                    "/al-tarek-platform-v2/authentication/register"
                                }
                                className="btn border-none drop-shadow-md bg-indigo-600 hover:bg-indigo-700 text-white text-2xl sm:text-5xl font-bold max-w-max h-max px-12 py-5 md:px-36 md:py-10"
                            >
                                ذاكر الان
                            </Link>
                        </div>
                    </div>
                    <div className="md:size-[30rem] order-frist md:order-last">
                        <img src={icon} alt="Chemistry Sticker" />
                    </div>
                </div>
            </section>
            <Categories />
            <section className="min-h-max py-2 w-full grow-1">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 justify-center items-center min-h-lvh px-3 grow-1">
                    <div className="px-2 h-96 font-black flex flex-col justify-center items-center sm:block sm:h-auto order-last">
                        <h2 className="md:text-7xl text-4xl pb-5">
                            <span className="md:text-8xl text-5xl text-sky-500">
                                وبعدين
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl max-w-96">
                            تيم الاسطورة كبر عشانك وبقي معاك علي مدار اليوم خطوة
                            بخطوة علشان توصل لحلمك ... ملكش حجة
                        </p>
                        <hr className="max-w-96 min-w-64 h-1 my-14 bg-sky-100 border-0 rounded sm:my-10 dark:bg-sky-700" />
                        <Link
                            to={"/al-tarek-platform-v2/authentication/register"}
                            className="btn drop-shadow-md bg-sky-500 hover:bg-sky-600 text-white text-2xl sm:text-xl font-bold max-w-max h-max px-4 py-3"
                        >
                            استر نفسك{" "}
                            <span className="text-yellow-400">بأكونت</span>
                        </Link>
                    </div>
                    <div className="order-frist">
                        <img src={background} alt="img" />
                    </div>
                </div>
            </section>
        </div>
    );
};
const Home = () => {
    const [empty, setEmpty] = useState({
        isEmpty: true,
        message: "لا توجد بيانات",
    });
    const [err, setErr] = useState({
        isError: false,
        message: "",
    });
    const courses = false;
    return (
        <div className="flex flex-col text-3xl px-2 py-5">
            <div className="py-10 my-[5rem] smooth">
                <div className="px-2 lg:px-4 sm:px-10 pb-10 space-y-12 py-8">
                    <div className="font-bold text-4xl sm:text-5xl px-3">
                        <span className="text-sky-500">كورساتي</span>
                    </div>
                    <div className="px-2 lg:px-4 sm:px-10  space-y-10 py-8">
                        {courses ? (
                            <div className="smooth grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                                {courses.map((course) => {
                                    return (
                                        <Card
                                            key={course.id}
                                            link={`courses/${course.attributes.name}`}
                                            img={`${
                                                import.meta.env
                                                    .VITE_BACKEND_URL +
                                                course.attributes.coverIMG.data
                                                    .attributes.url
                                            }`}
                                            name={course.attributes.title}
                                            info={course.attributes.discription}
                                            isSub={false}
                                            isFree={true}
                                            isPinned={true}
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
                            <StaticCard empty={empty} err={err} />
                        )}
                    </div>
                </div>
            </div>
            <Categories />
            {/* ================================================== */}
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
            {/* ======================================================== */}
            <div className="py-10 my-[5rem] smooth">
                <div className="px-2 lg:px-4 sm:px-10 pb-10 space-y-10 py-8">
                    <div className="text-center mb-8 flex justify-center items-center flex-col space-y-5">
                        <div className="flex flex-col gap-5 justify-center items-center w-full max-w h-fit">
                            <div className="font-bold text-3xl sm:text-5xl text-center">
                                كورساتنا{" "}
                                <span className="text-sky-500">المقترحة</span>
                            </div>
                            <div className="underline-svg w-1/2 px-5 sm:px-0 sm:w-[400px] inline-block">
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
                        <p className="text-lg md:text-xl mt-2 w-1/2">
                            ريحنا دماغك وجمعنا لك كورسات على مزاجك، مختارة بحب
                            وعناية كأننا بنعمل شوبينج لأحسن شوية كورسات تساعدك
                            وتنميك! 🌟
                        </p>
                    </div>
                    <div className="px-2 lg:px-4 sm:px-10  space-y-10 py-8">
                        {courses ? (
                            <div className="g-teal-400 smooth clr-text-primary drk:bg-teal-800 bg-opacity-50 dark:bg-opacity-50 grid  grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                                {courses.map((course) => {
                                    return (
                                        <Card
                                            key={course.id}
                                            link={`courses/${course.attributes.name}`}
                                            img={`${
                                                import.meta.env
                                                    .VITE_BACKEND_URL +
                                                course.attributes.coverIMG.data
                                                    .attributes.url
                                            }`}
                                            name={course.attributes.title}
                                            info={course.attributes.discription}
                                            isSub={false}
                                            isFree={true}
                                            isPinned={true}
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
                            <StaticCard empty={empty} err={err} />
                        )}
                    </div>
                </div>
            </div>
            {/* ================================================== */}
        </div>
    );
};
const Categories = () => {
    const [empty, setEmpty] = useState({
        isEmpty: false,
        message: "",
    });
    const [err, setErr] = useState({
        isError: false,
        message: "",
    });
    const [categories, setCategories] = useState(false);
    const { addMessage } = useMessages();

    async function getCategories() {
        const reqOptions = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/api/categories?populate=*`,
                reqOptions
            )
            .then((res) => {
                // console.log(res.data.data)
                if (res.data.data.length === 0) {
                    setEmpty({
                        isEmpty: true,
                        message: "لا يوجد بيانات",
                    });
                } else {
                    setCategories(res.data.data);
                }
            })
            .catch((error) => {
                if (error.message === "Network Error") {
                    addMessage("error", "تحقق من اتصالك بالانترنت");
                    setErr({
                        isError: true,
                        message: "تحقق من اتصالك بالانترنت",
                    });
                } else {
                    addMessage("error", error.message);
                    setErr({
                        isError: true,
                        message: error.message,
                    });
                }
            });
    }

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="py-10 my-[5rem] smooth">
            <div className="px-2 lg:px-4 sm:px-10 pb-10 space-y-10 py-8">
                <div className="text-center mb-8 flex justify-center items-center flex-col space-y-5">
                    <div className="flex flex-col gap-5 justify-center items-center w-full max-w h-fit">
                        <div className="font-bold text-3xl sm:text-5xl text-center">
                            السنين{" "}
                            <span className="text-sky-500">الدراسية</span>
                        </div>
                        <div className="underline-svg w-1/2 px-5 sm:px-0 sm:w-[400px] inline-block">
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
                <div className="px-2 lg:px-4 sm:px-10 space-y-10 py-8">
                    {categories ? (
                        <div className="smooth grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                            {categories.map((category) => {
                                return (
                                    <CategoryCard
                                        key={category.id}
                                        link={`courses/${category.attributes.name}`}
                                        img={`${
                                            import.meta.env.VITE_BACKEND_URL +
                                            category.attributes.coverIMG.data
                                                .attributes.url
                                        }`}
                                        name={category.attributes.title}
                                        info={category.attributes.discription}
                                        isSub={false}
                                        isFree={true}
                                        isPinned={true}
                                        price={"420.00"}
                                        editDate={category.attributes.updatedAt}
                                        publishDate={
                                            category.attributes.publishedAt
                                        }
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <StaticCard empty={empty} err={err} />
                    )}
                </div>
            </div>
        </div>
    );
};
