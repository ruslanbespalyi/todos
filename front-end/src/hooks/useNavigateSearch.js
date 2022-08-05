import { useNavigate, createSearchParams } from 'react-router-dom';

export default function useNavigateSearch() {
	const navigate = useNavigate();
	return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
}
