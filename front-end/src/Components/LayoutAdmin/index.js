import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LayoutAdmin = () => {
	const auth = useAuth();
	const { t, i18n } = useTranslation();

	const handleLogout = () => {
		auth.singOut();
	};

	const getActiveLngClass = (Lng) => {
		return i18n.language === Lng ? 'active border border-info' : '';
	};

	const setNewLng = (Lng) => {
		i18n.changeLanguage(Lng);
	};
	return (
		<div>
			<div className='justify-content-sm-center m-2'>
				<Button className='me-1'>
					<NavLink style={{ textDecoration: 'none', color: 'white' }} to='/admin/users'>
						{t('admin.menu.users')}
					</NavLink>
				</Button>
				<Button className='me-1'>
					<NavLink style={{ textDecoration: 'none', color: 'white' }} to='/admin/todos'>
						{t('admin.menu.todos')}
					</NavLink>
				</Button>
				<Button className='me-1'>
					<NavLink style={{ textDecoration: 'none', color: 'white' }} to='/list'>
						{t('admin.menu.myTodos')}
					</NavLink>
				</Button>
				<Button className='me-1' onClick={handleLogout}>
					{t('admin.menu.logOut')}
				</Button>
				<Button className={`btn btn-light ms-5 btn-sm ${getActiveLngClass('ua')}`} onClick={() => setNewLng('ua')}>
					UA
				</Button>{' '}
				|{' '}
				<Button className={`btn btn-light btn-sm ${getActiveLngClass('en')}`} onClick={() => setNewLng('en')}>
					EN
				</Button>
			</div>
			<Outlet />
		</div>
	);
};

export default LayoutAdmin;
