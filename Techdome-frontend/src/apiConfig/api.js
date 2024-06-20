import axios from 'axios';

// Create an instance of axios with the backend service URL
const api = axios.create({
  baseURL: 'http://backend-service:8080', // Use the Kubernetes service name
});

export const getBlog = () => {
  return api.get('/api/get_blog')
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error!', error);
      throw error;
    });
};
