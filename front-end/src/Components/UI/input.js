import { InputGroup, Form } from 'react-bootstrap';

const Input = (props) => {
	const { text, ...other } = props;
	return (
		<InputGroup className='p-1'>
			<InputGroup.Text className='w-25'>{text}</InputGroup.Text>
			<Form.Control {...other} />
		</InputGroup>
	);
};

export default Input;
