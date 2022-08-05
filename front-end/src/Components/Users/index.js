import { useState, useEffect } from 'react';
import { ListGroup, Button, InputGroup, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useApi from '../../hooks/useApi';
import useNotifications from '../../hooks/useNotifications';
import useNavigateSearch from '../../hooks/useNavigateSearch';
import UserItem from '../UserItem';
import Pages from '../Pagination';
import CreateUser from '../CreateUser';
import EditUser from '../EditUser';

const LIMIT = 10;

const Users = () => {
	const api = useApi();
	const { t } = useTranslation();
	const notifications = useNotifications();
	const navigateUserTodos = useNavigateSearch();

	const [users, setUsers] = useState({
		data: [],
		total: undefined,
		limit: undefined,
		page: undefined,
	});

	const [searchEmail, setSearchEmail] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [showCreateUser, setShowCreateUser] = useState(false);

	useEffect(() => {
		getAllUsers();
	}, []);

	useEffect(() => {
		//якщо фільтр пошуку не пустий але введено менше 2 символів тоді нічого не робимо
		//але якщо фільтр очистили потрібно отримати весь список користувачів
		if (searchEmail && searchEmail.length < 2) return;
		//при фільтрації будемо відображати дані з першої сторінки
		const timer = setTimeout(() => getAllUsers(1, searchEmail), 200);

		return () => clearTimeout(timer);
	}, [searchEmail]);

	const getAllUsers = async (page = 1, email = '') => {
		//наші фільтри
		let data = { limit: LIMIT, page: page - 1 };
		if (email) {
			data = { ...data, email: email };
		}
		const users = await api.getAllUsers(data);
		setUsers(users);
	};

	const onChangePage = (page) => {
		if (page === users.page) return;

		getAllUsers(page, searchEmail);
	};

	const getPagesCount = () => {
		return Math.ceil(users.total / users.limit);
	};

	const changeSearchByEmail = (email) => {
		setSearchEmail(email);
	};

	const handleCloseCreateUser = () => {
		setShowCreateUser(false);
	};

	const handleSaveCreateUser = async (newUser) => {
		try {
			await api.createUser(newUser);
			//після створення юзера список повернемо на початок
			//для того щоб позиціонуватися на конкретному створеному юзеру потрібна думаю додаткова логіка
			getAllUsers();
			notifications.success({ message: t('admin.users.messages.success.create') });
		} catch (error) {
			console.log(error);
			notifications.error({ message: t('admin.users.messages.faild.create') });
		}
	};

	const handleEditUser = (id) => {
		setSelectedUser({ id });
	};

	const handleCloseEditUser = () => {
		setSelectedUser(null);
	};

	const handleSaveEditUser = async (id, editUser) => {
		try {
			await api.updateUser(id, editUser);
			notifications.success({ message: t('admin.users.messages.success.update') });
			getAllUsers();
			handleCloseEditUser();
		} catch (error) {
			console.log(error);
			notifications.error({ message: t('admin.users.messages.faild.update') });
		}
	};

	const handleDeleteUser = async (id) => {
		try {
			await api.deleteUser(id);
			notifications.success({ message: t('admin.users.messages.success.delete') });
			getAllUsers();
		} catch (error) {
			console.log(error);
			notifications.error({ message: t('admin.users.messages.faild.delete') });
		}
	};

	const goToTodos = (id) => {
		navigateUserTodos('/admin/todos', { userId: id });
	};

	return (
		<div>
			<h2>{t('admin.users.head')}</h2>
			<InputGroup className='m-auto w-50 p-3 input-group'>
				<InputGroup.Text id='basic-addon1'>{t('admin.users.searchLabel')}</InputGroup.Text>
				<Form.Control
					placeholder={t('admin.users.placeholder')}
					aria-label='search by user email'
					aria-describedby='basic-addon1'
					value={searchEmail}
					onChange={(e) => changeSearchByEmail(e.target.value)}
				/>
				<div className='input-group-append'>
					<Button className='btn btn btn-primary' type='button' id='button' onClick={() => setShowCreateUser(true)}>
						{t('admin.users.newUser')}
					</Button>
				</div>
			</InputGroup>
			<ListGroup className='d-inline-flex p-3 w-50'>
				{users.data.map((user) => (
					<UserItem key={user.id} {...user} handleDelete={handleDeleteUser} handleEdit={handleEditUser} handleOnDoubleClick={goToTodos} />
				))}
			</ListGroup>
			<CreateUser show={showCreateUser} handleClose={handleCloseCreateUser} handleSave={handleSaveCreateUser} />
			<EditUser show={selectedUser} {...selectedUser} handleClose={handleCloseEditUser} handleSave={handleSaveEditUser} />
			<Pages onChange={onChangePage} active={users.page} pages={getPagesCount()} maxButtons={3} customStyle={'justify-content-center'} />
		</div>
	);
};

export default Users;
