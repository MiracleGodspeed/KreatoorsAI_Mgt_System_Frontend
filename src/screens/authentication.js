import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Button, message } from "antd";
import Endpoint from "../utils/endpoint";
import { isUserLoggedIn, loginUser } from "../utils/auth";
import { useLocation } from "react-router-dom";

function Authentication(props) {
    const [showSignIn, setShowSignIn] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLaststname] = useState('');
    let { state } = useLocation();
    const [emailAddress, setEmailAddress] = useState(state?.some?.emailAddress || '');
    const [loading, setloading] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);

    const toggleForm = () => {
        $(".card.login-form").fadeOut(300, () => {
            setShowSignIn(!showSignIn);
            $(".card.login-form").fadeIn(300);
        });
    };

    const comparePasswords = (e) => {
        if (e === password) {
            $("#password_mismatch").hide();
            setconfirmPassword(e);
            setDisableBtn(false);
            return;
        }
        $("#password_mismatch").fadeIn();
        setDisableBtn(true);
    }

    const handleLogin = () => {
        if ((emailAddress == null || password == null) || (emailAddress == "" || password == "")) {
            message.error(`Input email address and password to continue`);
            return;
        }
        setloading(true)
        const payload = {
            "emailaddress": emailAddress,
            "password": password
        }
        Endpoint.login(payload)
            .then((res) => {
                console.log(res?.data)
                setloading(false)
                loginUser(res?.data)
            })
            .catch((err) => {
                console.log(err)
                setloading(false)
                message.error(err?.data?.Message);
            })
    }
    const handleSignup = () => {
        if (emailAddress == "" || password == "" || lastname == "" || firstname == "") {
            message.error(`All fields are required fields`);
            return;
        }
        setloading(true)
        const payload = {
            "emailaddress": emailAddress,
            "firstname": firstname,
            "lastname": lastname,
            "password": password
        }
        Endpoint.signup(payload)
            .then((res) => {
                console.log(res?.data)
                setloading(false)
                if (res?.data?.status == true) {
                    setFirstname('')
                    setLaststname('')
                    setPassword('')
                    setconfirmPassword('')
                    message.success("Your signup request was successful!. An activation link has been sent to your email.", 10000);
                    return;
                }
                message.error(res?.data?.message);
            })
            .catch((err) => {
                console.log(err)
                setloading(false)
                message.error(err?.data?.Message);
            })
    }
    useEffect(() => {
        isUserLoggedIn();
    })
    return (
        <div style={{ marginTop: "5em" }} className="align-content-center">
            <div style={{ width: "100%" }} className="text-center">
                <h3 style={{ fontWeight: "600" }}>Kreatoors.Ai</h3>
            </div>

            <div className="container mt-3">
                <div className="wrapper d-flex align-items-center justify-content-center h-100 row">
                    <div className="card login-form shadow col-11 col-lg-4">
                        <div className="card-body ">
                            {showSignIn ? (
                                <div className="">
                                    <h5 className="card-title text-center">Login Form</h5>
                                    <div>
                                        <div className="mb-3 ">
                                            <label htmlFor="loginEmail" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                value={emailAddress}
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                                type="email"
                                                className="form-control"
                                                id="loginEmail"
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="loginPassword" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                className="form-control"
                                                id="loginPassword"
                                            />
                                        </div>
                                        {/* <button type="submit" className="btn btn-primary w-100">
                                            Submit
                                        </button> */}
                                        <Button disabled={disableBtn} onClick={() => handleLogin()} className="w-100" type="primary" loading={loading} iconPosition={'end'} style={{ padding: "23px", fontSize: "15px" }}>
                                            Submit
                                        </Button>
                                        <div className="sign-up mt-4">
                                            Don't have an account?{" "}
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                toggleForm();
                                            }}>
                                                Create One
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h5 className="card-title text-center">Create an Account</h5>
                                    <div>
                                        <div className="mt-4">
                                            <label htmlFor="signupEmail" className="form-label">
                                                Email Address <span className="text-danger" style={{ fontSize: "20px" }}>*</span>
                                            </label>
                                            <input
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                                type="email"
                                                className="form-control mb-2"
                                                id="signupEmail"
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="signupEmail" className="form-label">
                                                Firstname <span className="text-danger" style={{ fontSize: "20px" }}>*</span>
                                            </label>
                                            <input
                                                value={firstname}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                type="firstname"
                                                className="form-control mb-2"
                                                id="signupEmail"
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="signupEmail" className="form-label">
                                                Lastname <span className="text-danger" style={{ fontSize: "20px" }}>*</span>
                                            </label>
                                            <input
                                                value={lastname}
                                                onChange={(e) => setLaststname(e.target.value)}
                                                type="lastname"
                                                className="form-control mb-2"
                                                id="signupEmail"
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="signupPassword" className="form-label">
                                                Password <span className="text-danger" style={{ fontSize: "20px" }}>*</span>
                                            </label>
                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                className="form-control mb-2"
                                                id="signupPassword"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="signupPassword" className="form-label">
                                                Confirm Password <span className="text-danger" style={{ fontSize: "20px" }}>*</span>
                                            </label>
                                            <input
                                                onChange={(e) => comparePasswords(e.target.value)}
                                                type="password"
                                                className="form-control"
                                                id="signupPassword"
                                            />
                                            <span className="text-danger" id="password_mismatch" style={{ fontSize: "13px", display: 'none' }}>password and confirm password mismatch!</span>
                                        </div>
                                        <Button disabled={disableBtn} onClick={() => handleSignup()} className="w-100" type="primary" loading={loading} iconPosition={'end'} style={{ padding: "23px", fontSize: "15px" }}>
                                            Submit
                                        </Button>
                                        <div className="sign-up mt-4">
                                            Have an account?{" "}
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                toggleForm();
                                            }}>
                                                Sign In
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;
