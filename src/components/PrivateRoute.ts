import { Navigate } from 'react-router-dom';
import { ReactNode } from "react";


const PrivateRoute = ({isauthenticated, children}: {isauthenticated: boolean, children: ReactNode}) => {
    if(!isauthenticated) {
      return Navigate({to: '/login'})
    }
    return children
};

export default PrivateRoute;