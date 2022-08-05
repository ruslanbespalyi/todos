import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useApi from '../../hooks/useApi';
import useNotifications from '../../hooks/useNotifications';
import Pages from '../Pagination';
import TodoItem from '../TodoItem';
import ViewTodo from '../ViewTodo';
import EditTodo from '../EditTodo';

const LIMIT = 10;

const Todos = () => {
	const api = useApi();
	const notifications = useNotifications();
	const { t } = useTranslation();

	const [params] = useSearchParams();
	const userId = params.get('userId');

	const [todos, setTodos] = useState({ data: [], total: undefined, limit: undefined, page: undefined });
	const [selectedUser, setSelectedUser] = useState({ firstName: '', lastName: '' });
	const [selectedTodoEdit, setSelectedTodoEdit] = useState(null);
	const [selectedTodoView, setSelectedTodoView] = useState(null);

	useEffect(() => {
		if (userId) {
			getUserDataById(userId);
		}
		getAllTodos();
	}, [userId]);

	const getUserDataById = async (id) => {
		if (id) {
			const user = await api.getUserById(id);
			setSelectedUser(user);
		}
	};

	const getAllTodos = async (page = 1) => {
		//наші фільтри
		let data = { limit: LIMIT, page: page - 1 };
		if (userId) {
			data = { ...data, userId };
		}
		const todos = await api.getAllAdminTodos(data);

		setTodos(todos);
	};

	const onChangePage = (page) => {
		if (page === todos.page) return;

		getAllTodos(page);
	};

	const getPagesCount = () => {
		return Math.ceil(todos.total / todos.limit);
	};

	const handleEditTodo = (id) => {
		setSelectedTodoEdit(todos.data.find((todo) => todo.id === id));
	};

	const handleViewTodo = (id) => {
		setSelectedTodoView(todos.data.find((todo) => todo.id === id));
	};

	const handleSaveEditTodo = async ({ id, text, isCompleted }) => {
		try {
			await api.updateAdminTodo(id, { text, isCompleted });
			getAllTodos(todos.page);
			handleCloseEditTodo();
			notifications.success({ message: t('admin.todos.messages.success.todoUpdated') });
		} catch (error) {
			console.log(error);
			notifications.error({ message: t('admin.todos.messages.faild.todoUpdated') });
		}
	};

	const handleCloseEditTodo = () => {
		setSelectedTodoEdit(null);
	};

	const handleCloseViewTodo = () => {
		setSelectedTodoView(null);
	};

	const handleDeleteTodo = async (id) => {
		try {
			await api.deleteAdminTodo(id);
			getAllTodos();
			notifications.success({ message: t('admin.todos.messages.success.todoRemoved') });
		} catch (error) {
			console.log(error);
			notifications.error({ message: t('admin.todos.messages.faild.todoRemoved') });
		}
	};

	return (
		<div>
			<h2>{t('admin.todos.head')}</h2>
			{!userId && <h5>{t('admin.todos.allTodos')}</h5>}
			{userId && (
				<h5>
					{t('admin.todos.userTodo')} {selectedUser.firstName} {selectedUser.lastName}
				</h5>
			)}
			<ListGroup className='d-inline-flex p-3 w-50'>
				{todos.data.map((todo) => (
					<TodoItem key={todo.id} {...todo} handleDelete={handleDeleteTodo} handleEdit={handleEditTodo} handleView={handleViewTodo} />
				))}
			</ListGroup>
			{selectedTodoEdit && (
				<EditTodo show={selectedTodoEdit} {...selectedTodoEdit} handleClose={handleCloseEditTodo} handleSave={handleSaveEditTodo} />
			)}
			{selectedTodoView && <ViewTodo show={selectedTodoView} {...selectedTodoView} handleClose={handleCloseViewTodo} />}
			<Pages onChange={onChangePage} active={todos.page} pages={getPagesCount()} maxButtons={3} customStyle={'justify-content-center'} />
		</div>
	);
};

export default Todos;
