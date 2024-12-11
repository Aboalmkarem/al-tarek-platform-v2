import background from "../Assets/Untitled-1.png";
import icon from "../Assets/chemistry-sticker-05.png";
import atom from "../Assets/—Pngtree—atom icon_8473596.png";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Card from "./card";
import axios from "axios";
import Message from "./message";
import StaticCard from "./static/staticCard";

const LandingPage = () => {
    const [empty, setEmpty] = useState({
        isEmpty: false,
        message: '',
    });
    const [err, setErr] = useState({
        isError: false,
        message: ''
    });
    const [categories, setCategories] = useState(false);
    const messageRef = useRef();
    const rootRef = useRef(null); // Ref to store the root instance

    function showMessage(isErr, message) {
        if (!rootRef.current) {
            rootRef.current = createRoot(messageRef.current);
        }
        rootRef.current.render(
            <Message options={{ isErr: isErr, message: message }} />
        );
    }

    async function getCategories() {
        const reqOptions = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios
            .get(
                `${process.env.REACT_APP_NOT_SECRET_CODE}/api/categories?populate=*`,
                reqOptions
            )
            .then((res) => {
                // console.log(res.data.data)
                if (res.data.data.length === 0) {
                    setEmpty({
                        isEmpty: true,
                        message: 'No categories found'
                    });
                } else {
                    setCategories(res.data.data);
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
                        isError: true,
                        message: "you must be logged in. please login first"
                    });
                }
                if (error.response?.status === undefined) {
                    showMessage(true, `Error: ${error.message}`);
                    setErr({
                        isError: true,
                        message: `${error.message}. please try again later`
                    });
                }
            });
    }

    useEffect(() => {
        getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="landing-page">
            <div ref={messageRef}></div>
            <div className="main">
                <img className="atom" src={atom} alt="Atom Icon" />
                <div className="main-img">
                    <img src={background} alt="img" />
                </div>
                <img className="atom-2" src={atom} alt="Atom Icon" />
                <div className="main-content">
                    <h1>
                        منصه <span>الطارق</span>
                    </h1>
                    <h2>
                        أول منصه تعليمية باستعمال <span>الذكاء الاصطناعي</span>
                    </h2>
                    <a className="main-btnm" href="#categories">
                        يلا بينا <span> نتعلم</span>
                    </a>
                </div>
            </div>
            {/* ======== list start ========== */}
            <div className="list">
                <div className="list-img">
                    <img src={icon} alt="Chemistry Sticker" />
                </div>
                <div className="list-text">
                    هنشرحلك منهج <span> الفزياء و الكيمياء</span> للصف الثاني
                    الثانوي بكل بساطه وسهوله
                </div>
            </div>
            {/* ======== categories start ========== */}
            <div className="categories" id="categories">
                {categories ? (
                    <div className="cards">
                        {categories.map((category) => {
                            return (
                                <Card
                                    key={category.id}
                                    link={`courses/${category.attributes.name}`}
                                    img={`${process.env.REACT_APP_NOT_SECRET_CODE}${category.attributes.coverIMG.data.attributes.url}`}
                                    class="card"
                                    name={category.attributes.title}
                                    info={category.attributes.discription}
                                    // isSub={category.isSub}
                                    editDate={category.attributes.updatedAt}
                                    publishDate={
                                        category.attributes.publishedAt
                                    }
                                />
                            );
                        })}
                    </div>
                ) : <StaticCard empty={empty} err={err} />}
            </div>
            {/* ======== landing page end ========== */}
        </div>
    );
};

export default LandingPage;
