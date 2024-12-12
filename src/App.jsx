import "./App.css";
import useLocalStorage from "use-local-storage";
import Navbar from "./Componants/navbar";
import LandingPage from "./Componants/landingPage";
import Authentication from "./Componants/authentcation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Componants/footer";
import Courses from "./Componants/courses";
import ScrollToTop from "./Componants/ScrollToTop";
import Profile from "./Componants/profile";
import User from "./Componants/profileFiles/user";
import FavCourses from "./Componants/profileFiles/favCourses";
import Course from "./Componants/course";
import MessagePopup from "./Componants/messagePopup";
import {MessageContext} from "./Componants/context/messageContext";
import { createRef, useState } from "react";
function App() {

    const [messages, setMessages] = useState([]);
    const addMessage = (type, message) => {
        const newMessage = {
            id: Date.now(),
            type,
            message,
            ref: createRef(),
            progressRef: createRef(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        let progress = 100;
        const progressInterval = setInterval(() => {
            if (newMessage.progressRef.current) {
                progress -= 0.25;
                newMessage.progressRef.current.style.width = `${progress}%`;
            }
        }, 20);
        setTimeout(() => {
            if (newMessage.ref.current) {
                newMessage.ref.current.style.transform = "translateX(-17rem)";
            }
            setTimeout(() => {
                if (newMessage.ref.current) {
                    newMessage.ref.current.style.transform =
                        "translateX(17rem)";
                }
                clearInterval(progressInterval);
            }, 7800);
        }, 100);

        setTimeout(() => {
            removeMessage(newMessage.id);
        }, 8000);
    }
    const removeMessage = (id) => {
        setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.id !== id)
        );
    };
    const messageValues = {
        messages,
        addMessage,
        removeMessage
    }

    const preference = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const [isDark, setIsDark] = useLocalStorage("isDark", preference);
    return (
        <div className="app" data-theme={isDark ? "dark" : "light"}>
            <BrowserRouter>
                <ScrollToTop />
                <MessageContext.Provider value={messageValues}>
                    <MessagePopup />
                    <Navbar
                        isChecked={isDark}
                        handleChange={() => {
                            setIsDark(!isDark);
                        }}
                    />
                    <Routes>
                        <Route
                            index
                            path="/al-tarek-platform-v2"
                            element={<LandingPage />}
                        />
                        <Route
                            path="/al-tarek-platform-v2/authentcation/login"
                            element={<Authentication authToggle={false} />}
                        />
                        <Route
                            path="/al-tarek-platform-v2/authentcation/signup"
                            element={<Authentication authToggle={true} />}
                        />
                        <Route
                            path="/al-tarek-platform-v2/courses/:categoryName"
                            element={<Courses />}
                        />
                        <Route
                            path="/al-tarek-platform-v2/courses/:categoryName/course/:id"
                            element={<Course></Course>}
                        />
                        <Route
                            path="/al-tarek-platform-v2/myProfile/*"
                            element={<Profile></Profile>}
                        >
                            <Route path="user" element={<User></User>}></Route>
                            <Route
                                path="favCourses"
                                element={<FavCourses></FavCourses>}
                            ></Route>
                        </Route>
                    </Routes>
                    <Footer></Footer>
                </MessageContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App;