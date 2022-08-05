import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import useApi from '../../hooks/useApi';
import './styles.css';

const LIMIT = 10;

const ShareItem = (props) => {
	const api = useApi();
	const { t } = useTranslation();

	const { show, id, sharedWith, handleSave, handleClose } = props;

	const [newSharedWith, setNewSharedWith] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		setNewSharedWith(getOptions(sharedWith));
	}, [sharedWith]);

	const getUsers = async () => {
		const nextUsers = await api.getUsersToShare({ limit: LIMIT, skip: users.length });
		setUsers([...users, ...nextUsers]);
	};

	const onChangeUser = (selectedOptions) => {
		setNewSharedWith(selectedOptions);
	};

	const handleScrollBottom = () => {
		getUsers();
	};

	const handleKeyDown = () => {
		getUsers();
	};

	const handleSubmit = () => {
		const idShareWith = newSharedWith.map((el) => el.value);
		handleSave({ sharedWith: idShareWith, id });
	};

	const getOptions = (arr) => arr.map((item) => ({ value: item.id, label: item.email }));

	return (
		<div className='share-todo-form'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t('list.share.edit.head')}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<Select
							value={newSharedWith}
							isMulti={true}
							placeholder={t('list.share.edit.optionUser')}
							options={getOptions(users)}
							onChange={onChangeUser}
							onMenuScrollToBottom={handleScrollBottom}
							onKeyDown={handleKeyDown}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className='share-todo-form__btns-wrapper'>
						<button onClick={handleClose} className='share-todo-form__submit-btn'>
							{t('list.share.edit.cancel')}
						</button>
						<button onClick={handleSubmit} className='share-todo-form__submit-btn'>
							{t('list.share.edit.save')}
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ShareItem;
