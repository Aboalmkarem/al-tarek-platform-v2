import "./user.css";
import profileIMG from "../../Assets/profileIMG.svg";
import { useEffect, useState } from "react";
import { getUser } from "../handler";
import { MdOutlineLock } from "react-icons/md";
import axios from "axios";

const User = ({ showMessage }) => {
    const [isAutherized, setIsAuthenticated] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [user, setUser] = useState({
        username: "",
        email: "",
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    useEffect(() => {
        if (isAutherized) {
            getUser()
                .then((res) => {
                    setUser({
                        username: res.data.username,
                        email: res.data.email,
                    });
                })
                .catch((err) => {
                    if (err.status === 403 || err.status === 401) {
                        setIsAuthenticated(false);
                    }
                    if (err.response === undefined) {
                        console.log(err.message);
                        showMessage(true, `Error: ${err.message}`);
                    }
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function makeRequest(reqOptions) {
        axios
            .post(`${process.env.REACT_APP_NOT_SECRET_CODE}/api/auth/change-password`, reqOptions, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                
                if (res.data.jwt && res.data.user) {
                    showMessage(false, `successfull changing password`)
                    localStorage.setItem("token", res.data.jwt);
                    setIsAuthenticated(true);
                    setIsChangingPassword(!isChangingPassword)
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response?.data?.error?.message !== undefined) {
                    showMessage(true, `Error: ${err.response?.data?.error?.message}`)
                } else {
                    showMessage(true, `Error: ${err.message}`)
                }
            });
    }

    async function changePassword(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const jsonData = Object.fromEntries(formData);
        if ( jsonData.password !== jsonData.passwordConfirmation) {
            showMessage(true, `Passwords do not match`)
            return;
        }
        const reqBody = JSON.stringify(jsonData)
        await makeRequest(reqBody);
    }

    return (
        <div className="user">
            <div className="profileIMG">
                <img src={profileIMG} alt="img"></img>
            </div>
            <div className="user-info">
                {user.username ? (
                    <>
                        <h2>{user.username}</h2>
                        <hr></hr>
                        <p>{user.email}</p>
                        <button className="btn" onClick={() => {setIsChangingPassword(!isChangingPassword)}}>change password</button>
                    </>
                ) : (
                    <p>check your network</p>
                )}
            </div>
            {isChangingPassword ? (
                <div className="authentcation">
                    <div className="section">
                        <div className="container">
                            <div className="row full-height justify-content-center">
                                <div className="col-12 text-center align-self-center py-5">
                                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                        <div className="card-3d-wrap mx-auto">
                                            <div className="card-3d-wrapper">
                                                <div className="card-front">
                                                    <div className="center-wrap">
                                                        <div className="section text-center">
                                                            <h4 className="mb-4 pb-3">
                                                                change password
                                                            </h4>
                                                            <form
                                                                onSubmit={(e) =>
                                                                    changePassword(e)
                                                                }
                                                            >
                                                                <div className="form-group">
                                                                    <input
                                                                        type="password"
                                                                        name="currentPassword"
                                                                        className="form-style"
                                                                        placeholder="current password"
                                                                        id="logname"
                                                                        autoComplete="off"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                    <MdOutlineLock />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <input
                                                                        type="password"
                                                                        name="password"
                                                                        className="form-style"
                                                                        placeholder="new password"
                                                                        id="logemail"
                                                                        autoComplete="off"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                    <MdOutlineLock />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <input
                                                                        type="password"
                                                                        name="passwordConfirmation"
                                                                        className="form-style"
                                                                        placeholder="Confirm Your Password"
                                                                        id="confirmPassword"
                                                                        autoComplete="off"
                                                                        required={
                                                                            true
                                                                        }
                                                                    />
                                                                    <MdOutlineLock />
                                                                </div>
                                                                <input
                                                                    type="submit"
                                                                    className="btn mt-4"
                                                                    value="Change Password"
                                                                />
                                                            </form>
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
                </div>
            ) : <></>}
        </div>
    );
};

export default User;