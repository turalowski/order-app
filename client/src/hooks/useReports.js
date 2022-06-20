export const useReports = () => {
  const getReports = () => {
    const token = localStorage.getItem('SMB_TOKEN');
    return fetch('http://localhost:5000/api/reports', {
      headers: {
        'x-auth-token': token,
      },
    });
  };

  return {
    getReports,
  };
};
