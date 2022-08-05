import { useState, useEffect } from 'react';
import { Modal, Form, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Input from '../UI/input';

const EditTodo = ({ show, id, text, isCompleted, owner, handleClose, handleSave }) => {
	const { t } = useTranslation();

	const [newText, setNewText] = useState('');
	const [newIsCompleted, setNewIsCompleted] = useState(false);

	useEffect(() => {
		setNewText(text);
	}, [text]);

	useEffect(() => {
		setNewIsCompleted(isCompleted);
	}, [isCompleted]);

	const onChangeText = (e) => {
		setNewText(e.target.value);
	};

	const onChangeIsCompleted = (e) => {
		setNewIsCompleted(!newIsCompleted);
	};

	const handleSubmit = () => handleSave({ id, text: newText, isCompleted: newIsCompleted });

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t('admin.todos.edit.head')}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input type='text' text={t('admin.todos.todo.text')} id='text' value={newText} onChange={onChangeText} />
					{owner && <Input type='text' text={t('admin.todos.todo.owner')} id='owner' value={`${owner.firstName} ${owner.lastName}`} disabled />}
					<Form.Check
						className='m-2'
						type='switch'
						id='isCompleted'
						checked={newIsCompleted}
						label={t('admin.todos.todo.isCompleted')}
						onChange={onChangeIsCompleted}
					/>
				</Modal.Body>
				<Modal.Footer>
					<ButtonGroup className='m-auto'>
						<Button className='me-2 w-50' onClick={handleSubmit}>
							{t('admin.todos.edit.save')}
						</Button>
						<Button className='me-2 w-50' onClick={handleClose}>
							{t('admin.todos.edit.cancel')}
						</Button>
					</ButtonGroup>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default EditTodo;
