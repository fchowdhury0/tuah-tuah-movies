export const getAuthToken = () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      return token;
    } catch (error) {
      console.error('Error retrieving authentication token:', error);
      return null;
    }
};