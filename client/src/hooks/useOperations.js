export const useOperations = () => {
    const getOperations = () => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch('http://localhost:5000/api/operations', {
        headers: {
          'x-auth-token': token,
        },
      });
    };
    const addOperation = data => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch('http://localhost:5000/api/operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(data),
      });
    };
  
   
  
    return {
      getOperations,
      addOperation,
    };
  };
  