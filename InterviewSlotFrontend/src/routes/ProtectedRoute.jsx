import { Navigate } from "react-router-dom";

function ProtectedRoute({

    children,
    roles

}) {

    // GET USER
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // NOT LOGGED IN
    if (!user) {

        return <Navigate to="/login" />;
    }

    // ROLE CHECK
    if (
        roles &&
        !roles.includes(user.role)
    ) {

        return (

            <div className="container mt-5 text-center">

                <h2 className="text-danger">
                    Access Denied 🚫
                </h2>

            </div>
        );
    }

    // ACCESS GRANTED
    return children;
}

export default ProtectedRoute;