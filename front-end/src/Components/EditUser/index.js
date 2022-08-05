import { useEffect, useState } from 'react';
import { Modal, Form, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useApi from '../../hooks/useApi';
import Input from '../UI/input';

const EditUser = ({ show, id, handleClose, handleSave }) => {
	const api = useApi();
	const { t } = useTranslation();

	const [editUser, setEditUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		dateOfBirth: '',
		isAdmin: false,
	});

	useEffect(() => {
		getUserDataById(id);
	}, [id]);

	const getUserDataById = async (id) => {
		if (id) {
			const user = await api.getUserById(id);
			setEditUser({ ...user, password: '', confirmPassword: '' });
		}
	};

	const validateForm = () => {
		return !editUser.password || editUser.password !== editUser.confirmPassword;
	};

	const onChangeNewUserValue = (key, e) => {
		setEditUser({ ...editUser, [key]: e.target.value });
	};

	const onChangeUserIsAdmin = () => {
		setEditUser({ ...editUser, isAdmin: !editUser.isAdmin });
	};

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t('admin.users.edit.head')}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input
						type='text'
						placeholder={t('admin.users.user.firstNamePlaceholder')}
						text={t('admin.users.user.firstName')}
						id='firstName'
						value={editUser.firstName}
						onChange={(e) => onChangeNewUserValue('firstName', e)}
					/>
					<Input
						type='text'
						placeholder={t('admin.users.user.lastNamePlaceholder')}
						text={t('admin.users.user.lastName')}
						id='lastName'
						value={editUser.lastName}
						onChange={(e) => onChangeNewUserValue('lastName', e)}
					/>
					<Input
						type='text'
						placeholder={t('admin.users.user.emailPlaceholder')}
						text={t('admin.users.user.email')}
						id='email'
						value={editUser.email}
						onChange={(e) => onChangeNewUserValue('email', e)}
					/>
					<Input
						type='text'
						placeholder={t('admin.users.user.passwordPlaceholder')}
						text={t('admin.users.user.password')}
						id='password'
						value={editUser.password}
						onChange={(e) => onChangeNewUserValue('password', e)}
					/>
					<Input
						type='text'
						placeholder={t('admin.users.user.confirmPlaceholder')}
						text={t('admin.users.user.confirm')}
						id='confirmPassword'
						value={editUser.confirmPassword}
						onChange={(e) => onChangeNewUserValue('confirmPassword', e)}
					/>
					<Input
						type='data'
						placeholder={t('admin.users.user.dateOfBirthPlaceholder')}
						text={t('admin.users.user.dateOfBirth')}
						id='dateOfBirth'
						value={editUser.dateOfBirth}
						onChange={(e) => onChangeNewUserValue('dateOfBirth', e)}
					/>
					<Form.Check
						className='m-2'
						type='switch'
						id='isAdmin'
						checked={editUser.isAdmin}
						label={t('admin.users.user.isAdmin')}
						onChange={onChangeUserIsAdmin}
					/>
				</Modal.Body>
				<Modal.Footer>
					<ButtonGroup className='m-auto'>
						<Button disabled={validateForm()} className='me-2 w-50' onClick={() => handleSave(id, editUser)}>
							{t('admin.users.edit.save')}
						</Button>
						<Button className='me-2 w-50' onClick={handleClose}>
							{t('admin.users.edit.cancel')}
						</Button>
					</ButtonGroup>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default EditUser;
