import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useUserData from '../../hooks/useUserData';

const ProtectedRouteAdmin = ({ redirectPath = '/login' }) => {
	const auth = useAuth();
	const user = useUserData();

	if (!auth.accessToken || !user || !user.isAdmin) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default ProtectedRouteAdmin;
