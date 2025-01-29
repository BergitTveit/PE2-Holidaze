import { useEffect } from 'react';
import api from '../services/api';

export const VenueList = () => {
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get('/holidaze/venues');
        console.log('API Venues:', response.data);
      } catch (error) {
        console.log('API Error:', error);
      }
    };
    fetchVenues();
  }, []);
  return <div>Venue List</div>;
};
//Update functions and make default export
