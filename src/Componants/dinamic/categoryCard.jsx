import { Link } from "react-router-dom";

function CategoryCard(category) {
    return (
        <div className="group" id={category.id} key={category.id}>
            <div className="rounded-md overflow-hidden w-full relative">
                <img
                    className="w-full object-cover transition-transforms-shadows-filters ease-in-out duration-500 transform group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-150 smooth"
                    src={category.img}
                    alt="img"
                ></img>
            </div>
            <div className="px-5 -mt-10 relative z-10">
                <div className="rounded-md w-full bg-slate-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm px-4 py-6 transition-transforms-shadows-filters shadow-xl group-hover:shadow-[0_35px_35px_rgba(0,0,0,0.25)] group-hover:scale-105 smooth border border-slate-300 dark:border-slate-800">
                    <Link to={`./${category.link}`}>
                        <div className="flex flex-col space-y-1">
                            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                                <div className="flex space-y-4 w-full my-6">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl dark:text-white text-[black] font-black mx-auto">
                                        <span>الصف</span>{" "}
                                        <span className="text-sky-500">{category.name}</span>
                                    </h2>
                                </div>
                            </div>
                            <div className="flex justify-center items-center w-full">
                                <div className="my-6">
                                    <h2 className="text-[1rem] font-bold mx-auto text-center">
                                        <span>كل محتوى</span>
                                        <br />
                                        <span>{category.info}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
