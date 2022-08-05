import { Routes, Route } from 'react-router-dom';

import Login from './Components/LoginForm';
import Register from './Components/RegisterForm';
import List from './Components/List';
import NotFound from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';
import ProtectedRouteAdmin from './Components/ProtectedRouteAdmin';
import Layout from './Components/Layout';
import Profile from './Components/Profile';
import LayoutAdmin from './Components/LayoutAdmin';
import Users from './Components/Users';
import Todos from './Components/Todos';

const Index = () => {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route index element={<List />} />
					<Route path='/list' element={<List />} />
					<Route path='/profile' element={<Profile />} />
				</Route>
			</Route>
			{/* admin routing */}
			<Route element={<ProtectedRouteAdmin />}>
				<Route path='admin' element={<LayoutAdmin />}>
					<Route index element={<Users />} />
					<Route path='/admin/users' element={<Users />} />
					<Route path='/admin/todos' element={<Todos />} />
				</Route>
			</Route>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route
				index
				element={
					<ProtectedRoute>
						<List />
					</ProtectedRoute>
				}
			/>
			<Route path='*' element={<NotFound />} />
			{/* <Route path="*" element={<Navigate to="/login" replace={true} />} /> // navigate to Login page if rout does not exist */}
		</Routes>
	);
};

export default Index;
