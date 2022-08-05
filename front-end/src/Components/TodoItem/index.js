import { ButtonGroup, ListGroupItem } from 'react-bootstrap';

const TodoItem = (props) => {
	const { id, text, handleDelete, handleEdit, handleView } = props;

	return (
		<ListGroupItem className='text-start list-group-item d-flex justify-content-between align-items-center' onDoubleClick={() => handleView(id)}>
			<p className='m-0'>{`${text}`}</p>
			<ButtonGroup className='d-flex align-content-center'>
				<i className='fa fa-pencil' onClick={() => handleEdit(id)} />
				<i className='fa fa-trash' onClick={() => handleDelete(id)} />
			</ButtonGroup>
		</ListGroupItem>
	);
};

export default TodoItem;
