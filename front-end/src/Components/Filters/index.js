import { useTranslation } from 'react-i18next';

import { FILTERS } from '../../utils';

import './styles.css';

const FiltersBar = ({ setFilterType }) => {
	const { t } = useTranslation();
	return (
		<div className='filters-bar'>
			<button className='filters-bar__btn' onClick={() => setFilterType(FILTERS.ALL)}>
				{t('list.filters.all')}
			</button>
			<button className='filters-bar__btn' onClick={() => setFilterType(FILTERS.DONE)}>
				{t('list.filters.done')}
			</button>
			<button className='filters-bar__btn' onClick={() => setFilterType(FILTERS.TODO)}>
				{t('list.filters.todo')}
			</button>
		</div>
	);
};

export default FiltersBar;
