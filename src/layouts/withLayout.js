import React from 'react';

const withLayout = (LayoutComponent) => (WrappedComponent) => {
    return (props) => (
        <LayoutComponent>
            <WrappedComponent {...props} />
        </LayoutComponent>
    );
};

export default withLayout;