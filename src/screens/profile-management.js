import React, { useEffect, useState } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNav from "../layouts/sidenav";
import withLayout from "../layouts/withLayout";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
} from 'reactstrap';
import { baseUrl, USER_KEY } from "../utils/auth";
import Endpoint from "../utils/endpoint";
import GenericLoader from "../components/genericLoader";




function UserProfileUpdate() {
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userObj, setuserObj] = useState(JSON.parse(localStorage.getItem(USER_KEY)));
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [imageFile, setimageFile] = useState(null);
    

    const handleImageUpload = (info) => {
        if (info.file.status === "done") {
            message.success(`uploaded successfully`);
            setimageFile(info?.file?.originFileObj);
            setProfileImage(URL.createObjectURL(info.file.originFileObj));
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} upload failed.`);
        }
    };

    const beforeUpload = (file) => {
        const isImage = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg";
        if (!isImage) {
            message.error("You can only upload PNG, JPG, or JPEG files!");
        }
        return isImage;
    };

    const handleProfileUpdate = () => {
        setLoading(true);

        var formData = new FormData();
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('ImageFile', imageFile)
        formData.append('emailaddress', '-')
        

        Endpoint.updateUserProfile(formData)
        .then((res) => {
            console.log(res?.data)
            setLoading(false);
            message.success("Profile updatd successfully!");
        })
        .catch((err) => {
            message.error("Update failed! please try again");
            setLoading(false);
        })
    }
    const handleFetchUserData = () => {
        Endpoint.getUserDetails()
        .then((res) => {
            setLoading(false)
            console.log(res?.data)
            setProfileImage(baseUrl + res?.data?.profileImage)
            setuserObj(res?.data)
            setEmail(res?.data?.emailaddress)
            setFirstname(res?.data?.firstname)
            setLastname(res?.data?.lastname)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        handleFetchUserData()
    },[])
    return (
   <>
   <GenericLoader spin={loading}/>
            <Card>
                <CardBody>
                    <CardTitle><strong> <h2>Device Management</h2></strong></CardTitle>
                    <CardText>
                        Keep control of your devices with ease. Log out from devices or remove them entirely for enhanced security.
                    </CardText>
                </CardBody>
            </Card>
           <div className="row">
                <div className="container mt-3 col-12 col-lg-7">
                    <div className="card shadow p-4">
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4">Update Profile</h5>
                            <div className="text-center mb-3">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="rounded-circle"
                                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        className="rounded-circle bg-secondary d-inline-flex justify-content-center align-items-center"
                                        style={{ width: "120px", height: "120px", color: "#fff" }}
                                    >
                                        <span>Upload</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-center mb-4">
                                <Upload
                                    name="profile"
                                    listType="picture"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    customRequest={({ file, onSuccess }) => {
                                        setTimeout(() => {
                                            onSuccess("ok");
                                        }, 1000);
                                    }}
                                    onChange={handleImageUpload}
                                >
                                    <Button icon={<UploadOutlined />}>Change Profile Image</Button>
                                </Upload>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input
                                        disabled
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                 
                                </div>

                                <div className="text-center">
                                    <Button onClick={() => handleProfileUpdate()} type="primary" size="large" className="w-100">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
           </div>
   </>
    );
}

export default withLayout(SideNav)(UserProfileUpdate);
