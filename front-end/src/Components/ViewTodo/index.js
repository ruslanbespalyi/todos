import { Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Input from '../UI/input';

const ViewTodo = (props) => {
	const { t } = useTranslation();
	const { show, handleClose, text, owner, isCompleted, sharedWith, createdAt, updatedAt } = props;

	const getTextSharedWith = () => {
		return sharedWith.length === 0
			? t('admin.todos.todo.sharedWithNot')
			: sharedWith.map((item) => `${item.firstName} ${item.lastName} (${item.email})`).join('; ');
	};

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t('admin.todos.view.head')}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input type='text' text={t('admin.todos.todo.text')} id='text' value={text} disabled />
					{owner && <Input type='text' text={t('admin.todos.todo.owner')} id='owner' value={`${owner.firstName} ${owner.lastName}`} disabled />}
					{sharedWith && <Input type='text' text={t('admin.todos.todo.sharedWith')} id='sharedWith' value={getTextSharedWith()} disabled />}
					<Input type='text' text={t('admin.todos.todo.create')} id='create' value={new Date(createdAt).toLocaleString()} disabled />
					<Input type='text' text={t('admin.todos.todo.update')} id='update' value={new Date(updatedAt).toLocaleString()} disabled />
					<Form.Check
						className='m-2'
						type='switch'
						id='isCompleted'
						checked={isCompleted}
						label={t('admin.todos.todo.isCompleted')}
						value={isCompleted}
						disabled
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default ViewTodo;
