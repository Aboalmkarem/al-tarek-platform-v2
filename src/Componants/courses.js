import { Link } from "react-router-dom";
import "./courses.css";
import Card from "./card";
import { useEffect, useState } from "react";
import axios from "axios";
import StaticCard from "./static/staticCard";
import useMessages from './context/messageContext'

const Courses = () => {
    const [empty, setEmpty] = useState({
        isEmpty: false,
        message: '',
    });
    const [err, setErr] = useState({
        isError: false,
        message: ''
    });
    const [courses, setCourses] = useState(false);

    const {addMessage} = useMessages()

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
                    process.env.REACT_APP_NOT_SECRET_CODE
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
                        message: 'No courses found'
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
                        'error',
                        `Error: you must be logged in. please login first`
                    );
                    setErr({
                        isError: true,
                        message: "you must be logged in. please login first"
                    });
                }
                if (error.response?.status === undefined) {
                    addMessage('error', `Error: ${error.message}`);
                    setErr({
                        isError: true,
                        message: `${error.message}. please try again later`
                    });
                }
            });
    }

    useEffect(() => {
        getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="courses-file">
            <h2 className="homeh" id="mainh">
                {window.location.pathname.split("/courses/")[1]}
            </h2>
            {courses ? (
                <div className="cards">
                    {courses.map((course) => {
                        return (
                            <Card
                                key={course.id}
                                link={`course/${course.id}`}
                                img={`${process.env.REACT_APP_NOT_SECRET_CODE}${course.attributes.courseCoverIMG.data.attributes.url}`}
                                class="card"
                                name={course.attributes.title}
                                info={course.attributes.discription}
                                // isSub={course.isSub}
                                editDate={course.attributes.updatedAt}
                                publishDate={course.attributes.publishedAt}
                            />
                        );
                    })}
                </div>
            ) : (
                <StaticCard err={err} empty={empty}/>
            )}
            <hr id="hr2"></hr>
            <div className="to-account">
                <h6>اعرف تفاصيل اكتر عن حسابك</h6>
                <Link to="/al-tarek-platform-v2/myProfile/user">
                    <button>ملفك الشخصي</button>
                </Link>
            </div>
        </div>
    );
};

export default Courses;
