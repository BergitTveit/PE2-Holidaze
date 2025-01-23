import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('Redux auth state:', user);
  return <div>Home Page</div>;
};