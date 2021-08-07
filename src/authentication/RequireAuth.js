import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const RequireAuth = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [isAuthorised, setIsAuthorised] = useState(false);

    useEffect(() => {
        let index = localStorage.getItem("loginUserIndex");
        if (index !== null) {
            setIsAuthorised(true)
        }
        setLoading(false);
    }, []);

    if (loading && !isAuthorised) {
        return <h4>Validating.....</h4>
    }

    if (!loading && isAuthorised) {
        return children
    }

    if (!loading && !isAuthorised) {
        return <Redirect to="/login" />
    }
}
export default RequireAuth