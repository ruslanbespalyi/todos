import { ButtonGroup, ListGroupItem } from 'react-bootstrap';

const UserItem = (props) => {
	const { id, firstName, lastName, handleDelete, handleEdit, handleOnDoubleClick } = props;

	return (
		<ListGroupItem
			className='text-start list-group-item d-flex justify-content-between align-items-center'
			onDoubleClick={() => handleOnDoubleClick(id)}
		>
			<p className='m-0'>{`${firstName} ${lastName}`}</p>
			<ButtonGroup className='d-flex align-content-center'>
				<i className='fa fa-pencil' onClick={() => handleEdit(id)} />
				<i className='fa fa-trash' onClick={() => handleDelete(id)} />
			</ButtonGroup>
		</ListGroupItem>
	);
};

export default UserItem;
