import React from 'react';
import { Spin } from 'antd';

const GenericLoader = ({ spin }) => {
    return (
        <>
            <Spin spinning={spin} fullscreen />
        </>
    );
};

export default GenericLoader;