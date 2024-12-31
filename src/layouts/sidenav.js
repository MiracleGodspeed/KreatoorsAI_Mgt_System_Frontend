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
import { Link } from 'react-router-dom';
import { logOutUser, USER_KEY } from '../utils/auth';

const SideNav = ({children}) => {
    const [userObj, setuserObj] = useState(JSON.parse(localStorage.getItem(USER_KEY)));

    useEffect(() => {
        
    }, [])
    return (
        <>
            <Container fluid>
                {/* Navbar */}
                <Navbar color="light" light expand="md">
                    <Nav className="mr-auto" navbar>
                        <span className="navbar-brand" style={{ fontWeight: "600" }}>Kreatoors.Ai</span>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <Button outline color="primary" onClick={() => logOutUser()}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar>

                {/* Dashboard Content */}
                <Row >
                    <Col md="3">
                        {/* Sidebar */}
                        <Card className='mb-4'>
                            <CardBody>
                                <CardTitle>Account</CardTitle>
                                <CardText>
                                    <ul style={{ lineHeight: "34px" }}>

                                        <li>
                                            <Link to="/dashboard">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to="/manage-devices">Manage Device(s)</Link>
                                        </li>
                                        <li>
                                            <Link to="/profile-management">Profile</Link>
                                        </li>
                                    </ul>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md="9">
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SideNav;