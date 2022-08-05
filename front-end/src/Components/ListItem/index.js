import useUserData from '../../hooks/useUserData';

import './styles.css';

const ListItem = (props) => {
	const { text, id, isCompleted, owner, handleEdit, handleRemove, handleCheck, handleShareEdit, handleShareView } = props;
	const user = useUserData();

	return (
		<div className='list-item'>
			<p className={`list-item__title list-item__title--${isCompleted ? 'checked' : null}`}>{text}</p>
			<div className='list-item__btns-wrapper'>
				<input onChange={() => handleCheck(id)} className='list-item__checkbox' type='checkbox' checked={isCompleted} />
				<i className='fa fa-pencil' onClick={() => handleEdit(id)} />
				<i className='fa fa-trash' onClick={() => handleRemove(id)} />
				{owner.id === user.id ? (
					<i className='fa fa-user-plus' onClick={() => handleShareEdit(id)} />
				) : (
					<i className='fa fa-user' onClick={() => handleShareView(id)} />
				)}
			</div>
		</div>
	);
};

export default ListItem;
