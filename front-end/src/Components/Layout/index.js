import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useUserData from '../../hooks/useUserData';
import { useTranslation } from 'react-i18next';

import './style.css';

const Layout = () => {
	const auth = useAuth();
	const user = useUserData();
	const { t, i18n } = useTranslation();

	const handleLogout = () => {
		auth.singOut();
	};

	const getActiveLngClass = (Lng) => {
		return i18n.language === Lng ? 'button-language-active' : '';
	};

	const setNewLng = (Lng) => {
		i18n.changeLanguage(Lng);
	};

	return (
		<div>
			<nav>
				<button>
					<NavLink to='list'> {t('list.menu.list')}</NavLink>
				</button>
				<button>
					<NavLink to='profile'>{t('list.menu.profile')}</NavLink>
				</button>
				{user && user.isAdmin && (
					<button>
						<NavLink to='admin'>{t('list.menu.admin')}</NavLink>
					</button>
				)}
				<button onClick={handleLogout}>{t('list.menu.logOut')}</button>
				<button className={`button-language button-language-space ${getActiveLngClass('ua')}`} onClick={() => setNewLng('ua')}>
					UA
				</button>
				{' | '}
				<button className={`button-language ${getActiveLngClass('en')}`} onClick={() => setNewLng('en')}>
					EN
				</button>
			</nav>

			<Outlet />
		</div>
	);
};

export default Layout;
