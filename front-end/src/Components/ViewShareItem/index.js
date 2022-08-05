import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ViewShareItem = ({ show, owner, sharedWith, handleClose }) => {
	const { t } = useTranslation();

	return (
		<div className='share-todo-form'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t('list.share.view.head')}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<h6>{t('list.share.view.owner')}:</h6>
						<div>{owner.email}</div>
						<hr />
						<h6>{t('list.share.view.shareWith')}:</h6>
						{sharedWith &&
							sharedWith.map((item) => {
								return <div key={item.id}>{item.email}</div>;
							})}
					</div>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</div>
	);
};

export default ViewShareItem;
