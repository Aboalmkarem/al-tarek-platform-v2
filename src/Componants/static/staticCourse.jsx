export default function StaticCourse({ err, empty, isShowVideo }) {
    return (
        <>
            {err.isError ? (
                <div className="-mt-28">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-max mx-auto my-4 flex gap-2">
                        <span className="block sm:inline">{err.message}</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon-lg"
                        >
                            <path
                                d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V12Z"
                                fill="currentColor"
                            ></path>
                            <path
                                d="M12 9.5C12.6904 9.5 13.25 8.94036 13.25 8.25C13.25 7.55964 12.6904 7 12 7C11.3096 7 10.75 7.55964 10.75 8.25C10.75 8.94036 11.3096 9.5 12 9.5Z"
                                fill="currentColor"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                </div>
            ) : empty.isEmpty ? (
                <div className="-mt-28">
                    <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative max-w-md mx-auto my-4 flex gap-2">
                        <span className="block sm:inline">{empty.message}</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon-lg"
                        >
                            <path
                                d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V12Z"
                                fill="currentColor"
                            ></path>
                            <path
                                d="M12 9.5C12.6904 9.5 13.25 8.94036 13.25 8.25C13.25 7.55964 12.6904 7 12 7C11.3096 7 10.75 7.55964 10.75 8.25C10.75 8.94036 11.3096 9.5 12 9.5Z"
                                fill="currentColor"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-between h-full w-full relative min-h-screen">
                    <div className="w-full">
                        <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                            <div className="px-2 lg:px-4 sm:px-10 py-10 pb-10 space-y-10">
                                <div className="rounded-md py-24 px-8 relative overflow-hidden pb-56 bg-blue-700 shadow-md border border-blue-900">
                                    <div className="relative z-10 space-y-6">
                                        <div className="h-8 bg-gray-300 rounded animate-pulse w-3/4"></div>
                                        <div className="h-6 bg-gray-300 rounded animate-pulse w-full"></div>
                                        <div className="flex flex-col sm:flex-row font-smaller sm:space-y-0 space-y-4 sm:space-x-8">
                                            <div className="flex flex-wrap space-x-2">
                                                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                            <div className="flex flex-wrap space-x-2">
                                                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* skeleton when showing video */}
                                {/* <div className="px-2 lg:px-4 sm:px-10 relative py-0 space-y-10">
                                        <div className="flex justify-center items-center py-5">
                                            <div className="h-12 w-48 bg-gray-300 rounded-full animate-pulse"></div>
                                        </div>
                                        <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-large overflow-hidden border border-secondary-container">
                                            <div className="h-64 bg-gray-300 animate-pulse"></div>
                                        </div>
                                    </div> */}
                                <div className="flex flex-col md:flex-row-reverse space-y-10 md:space-y-0 md:space-x-10">
                                    <div className="md:basis-1/3 relative -mt-52">
                                        <div className="w-full glass smooth clr-text-primary shadow-large rounded-lg overflow-hidden">
                                            <div className="p-4 space-y-8">
                                                <div className="h-48 w-full bg-gray-300 rounded-md animate-pulse"></div>
                                                <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:basis-2/3 space-y-5">
                                        <div className="h-64 w-full bg-gray-300 rounded-2xl shadow-2xl animate-pulse"></div>
                                        <div className="py-16 px-10 rounded-md shadow-small border border-secondary-container smooth clr-text-primary bg-gray-900 space-y-12">
                                            <div className="space-y-8">
                                                <div className="h-8 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                                                <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-2xl shadow-2xl w-full relative overflow-hidden bg-gray-900">
                                    <div className="py-10 px-5 sm:px-10 space-y-6">
                                        <div className="h-10 bg-gray-300 rounded animate-pulse w-1/2"></div>
                                    </div>
                                    <div className="bg-gray-900 rounded-md px-5 py-5 shadow-xl space-y-4">
                                        <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                                        <div className="h-8 bg-gray-300 rounded animate-pulse w-1/4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
