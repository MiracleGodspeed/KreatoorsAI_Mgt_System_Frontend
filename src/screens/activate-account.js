import React, { useEffect, useState } from 'react';
import { Button, Result, message } from 'antd';
import { Link } from 'react-router-dom';
import Endpoint from '../utils/endpoint';
import GenericLoader from '../components/genericLoader';


const ActivateAccount = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token')

    const reformatUrl = () => {
        let stateObj = { id: "100" };
        window.history.replaceState(stateObj, "x 2", "/activate-account");
    }
    const processValidation = () => {
        Endpoint.activateAccount(token)
        .then((res) => {
            if(res?.data?.status){
                setEmail(res?.data?.message)
                setVerified(true);
                setTimeout(() => {
                    setLoading(false);
                    reformatUrl();
                }, 2000);
            }
        })
        .catch((err) => {
            message.error(`expired/invalid token provided`);
            setLoading(false);
            reformatUrl();
        })
       
    }

        useEffect(() => {
            processValidation();
        }, [])
   return(
       <>
           <GenericLoader spin={loading}/>
          {verified && 
               <Result
                   status="success"
                   title="Weldone! Account Activated"
                   subTitle="Your account activation was successful! Kindly Proceed to login"
                   extra={[
                       <Link className='btn btn-primary'
                           to={"/"}
                           state={{
                               some: {
                                   emailAddress: email,
                               }
                           }}
                       >
                           Go to login
                       </Link>,
                       <Button key="create">Home</Button>,
                   ]}
               />
          }
       </>
   )
};
export default ActivateAccount;