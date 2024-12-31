import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UAParser } from "ua-parser-js";
import GenericLoader from '../components/genericLoader';
import withLayout from '../layouts/withLayout';
import SideNav from '../layouts/sidenav';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
} from 'reactstrap';
import Endpoint from '../utils/endpoint';
import { message, Popconfirm } from 'antd';



const ManageDevices = () => {
    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState([]);
    const [text, settext] = useState("");
    const [description, setdescription] = useState("");
    const [activeDeviceId, setactiveDeviceId] = useState("");
   

    const handleLogoutDevice = (deviceId) => {
        settext("Are you sure you want to log this device out?")
        setdescription("Log out device")
        setactiveDeviceId(deviceId)
    };

    const handleDelete = (deviceId) => {
        console.log(`Deleting device ${deviceId}`);
    };

    const triggerLogDeviceOut = () => {
        setLoading(true);
        Endpoint.logOutDevice(activeDeviceId)
        .then((res) => {
            setLoading(false);
            console.log(res?.data)
            message.success("Device removed successfully!")
            handleFetchDevices()
        })
        .catch((err) => {
            setLoading(false);
            console.log(err)
            message.error("Error logging out device!")
        })
    }

    const handleFetchDevices = () => {
        const userAgent = "Unknown Device";
        const parser = new UAParser();
        parser.setUA(userAgent);

        Endpoint.getMyDevices()
            .then((res) => {
                console.log(res?.data);
                setLoading(false);

                const mapData = res?.data?.map((x, i) => {
                    parser.setUA(x?.deviceName || userAgent);
                    const uaDetails = parser.getResult();

                    return {
                        deviceName: `${uaDetails.browser.name || "Unknown Browser"} on ${uaDetails.os.name || "Unknown OS"}`,
                        lastLoggedIn: x?.lastLoggedIn,
                        deviceType: uaDetails.device.type || "Desktop",
                        deviceId: x?.deviceId,
                        active: x?.active
                    };
                });

                console.log(mapData);

                setDevices(mapData);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        handleFetchDevices()
    }, [])
   
    return (
        <>
            <GenericLoader spin={loading} />
            <Card>
                <CardBody>
                    <CardTitle><strong> <h2>Device Management</h2></strong></CardTitle>
                    <CardText>
                        Keep control of your devices with ease. Log out from devices or remove them entirely for enhanced security.
                    </CardText>
                </CardBody>
            </Card>
            <Container className='mt-4'>
                <Row>
                    <Col>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Device Name</th>
                                    <th>Device Type</th>
                                    <th>Last Active</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices && devices?.map((device) => (
                                    <tr key={device.id}>
                                        <td>{device?.deviceName}</td>
                                        <td>{device?.deviceType}</td>
                                        <td>{device?.lastLoggedIn}</td>
                                        <td>{device?.active ? <span className='text-success'>Active</span> : <span className='text-danger'>Logged out</span>}</td>
                                        <td>
                                            <Popconfirm
                                                placement="top"
                                                title={text}
                                                description={description}
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => triggerLogDeviceOut()}
                                            >
                                                <Button className='mb-2' style={{ marginRight: "10px" }} variant="danger" size="sm" onClick={() => handleLogoutDevice(device.deviceId)}>
                                                    Remove/Logout
                                                </Button>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default withLayout(SideNav)(ManageDevices);