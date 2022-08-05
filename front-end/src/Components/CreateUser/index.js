import { useState } from 'react';
import { Modal, Form, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Input from '../UI/input';

const initStateUser = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	dateOfBirth: '',
	isAdmin: false,
};

const CreateUser = ({ show, handleClose, handleSave }) => {
	const { t } = useTranslation();

	const [newUser, setNewUser] = useState(initStateUser);

	const validateForm = () => {
		//тут потрібно валідувати без властивості адмін вона може бути і не встановлена
		const { isAdmin, ...usersProps } = newUser;
		return Object.values(usersProps).some((item) => !item) || newUser.password !== newUser.confirmPassword;
	};

	const onChangeNewUserValue = (key, e) => {
		setNewUser({ ...newUser, [key]: e.target.value });
	};

	const handleModalSave = (e) => {
		e.preventDefault();

		handleSave(newUser);
		//чистимо стейт щоб не залишались поля при повторному відкритті
		setNewUser(initStateUser);
		handleClose();
	};

	const handleModalCancel = () => {
		//чистимо стейт щоб не залишались поля при повторному відкритті
		setNewUser(initStateUser);
		handleClose();
	};

	return (
		<div>
			<Modal show={show} onHide={handleModalCancel}>
				<Modal.Header closeButton>
					<Modal.Title>{t('admin.users.create.head')}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input
						type='text'
						placeholder={t('admin.users.user.firstNamePlaceholder')}
						text={t('admin.users.user.firstName')}
						id='firstName'
						value={newUser.firstName}
						onChange={(e) => onChangeNewUserValue('firstName', e)}
					/>
					<Input
						type='text'
						placeholder={t('admin.users.user.lastNamePlaceholder')}
						text={t('admin.users.user.lastName')}
						id='lastName'
						value={newUser.lastName}
						onChange={(e) => onChangeNewUserValue('lastName', e)}
					/>
					<Input
						type='text'
						placeholder={t('admin.users.user.emailPlaceholder')}
						text={t('admin.users.user.email')}
						id='email'
						value={newUser.email}
						onChange={(e) => onChangeNewUserValue('email', e)}
					/>
					<Input
						type='text'
						placeholder={t('admin.users.user.passwordPlaceholder')}
						text={t('admin.users.user.password')}
						id='password'
						value={newUser.password}
						onChange={(e) => onChangeNewUserValue('password', e)}
					/>
					<Input
						type='text'
						placeholder={t('admin.users.user.confirmPlaceholder')}
						text={t('admin.users.user.confirm')}
						id='confirmPassword'
						value={newUser.confirmPassword}
						onChange={(e) => onChangeNewUserValue('confirmPassword', e)}
					/>
					<Input
						type='data'
						placeholder={t('admin.users.user.dateOfBirthPlaceholder')}
						text={t('admin.users.user.dateOfBirth')}
						id='dateOfBirth'
						value={newUser.dateOfBirth}
						onChange={(e) => onChangeNewUserValue('dateOfBirth', e)}
					/>
					<Form.Check
						className='m-2'
						type='switch'
						id='isAdmin'
						label={t('admin.users.user.isAdmin')}
						value={newUser.isAdmin}
						onChange={(e) => onChangeNewUserValue('isAdmin', e)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<ButtonGroup className='m-auto'>
						<Button disabled={validateForm()} className='me-2 w-50' onClick={handleModalSave}>
							{t('admin.users.create.save')}
						</Button>
						<Button className='me-2 w-50' onClick={handleModalCancel}>
							{t('admin.users.create.cancel')}
						</Button>
					</ButtonGroup>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default CreateUser;
