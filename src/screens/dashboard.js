import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Navbar,
    Nav,
} from 'reactstrap';
import GenericLoader from '../components/genericLoader';
import withLayout from '../layouts/withLayout';
import SideNav from '../layouts/sidenav';
import { USER_KEY } from '../utils/auth';
import Endpoint from '../utils/endpoint';

const UserDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [userObj, setuserObj] = useState({});

    const handleFetchUserData = () => {
        Endpoint.getUserDetails()
            .then((res) => {
                setLoading(false)
                setuserObj(res?.data);
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
                    <CardTitle>Welcome, <strong>{userObj?.lastname} {userObj?.firstname}</strong>!</CardTitle>
                    <CardText>
                        This is your dashboard, where you can view your account information,
                        and manage your devices.
                    </CardText>
                </CardBody>
            </Card>
      </>
    );
};

export default withLayout(SideNav)(UserDashboard);