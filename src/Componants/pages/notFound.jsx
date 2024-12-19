import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center max-w-md px-6 py-12 bg-white shadow-lg rounded-lg">
                <h1 className="text-8xl font-bold text-blue-500">404</h1>
                <h2 className="text-3xl font-semibold mt-4 text-gray-800">
                    Page Not Found
                </h2>
                <p className="mt-4 text-gray-600">
                    The page you’re looking for doesn’t exist or has been moved.
                    Let&apos;s get you back to learning!
                </p>
                <Link
                    to="/al-tarek-platform-v2"
                    className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition duration-300"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;