import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './styles.css';

const CreateItem = ({ handleCreate }) => {
	const { t } = useTranslation();

	const [text, setText] = useState('');

	const onChangeText = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		handleCreate(text);
		setText('');
	};

	return (
		<div className='create-todo-form'>
			<div className='create-todo-form__title'>{t('list.create.head')}</div>
			<form onSubmit={handleSubmit}>
				<div className='create-todo-form__input-wrapper'>
					<label className='create-todo-form__input-label' htmlFor='text'>
						{t('list.create.title')}:
					</label>
					<input
						placeholder={t('list.create.placeholder')}
						className='create-todo-form__input'
						id='text'
						type='text'
						value={text}
						onChange={onChangeText}
					/>
				</div>
				<button disabled={!text.length} className='create-todo-form__submit-btn' type='submit'>
					{t('list.create.submit')}
				</button>
			</form>
		</div>
	);
};

export default CreateItem;
