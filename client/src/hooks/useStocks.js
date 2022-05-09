export const useStocks = () => {
    const getStocks = () => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch('http://localhost:5000/api/stocks', {
        headers: {
          'x-auth-token': token,
        },
      });
    };
    const addStock = data => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch('http://localhost:5000/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(data),
      });
    };
  
    const deleteStock = id => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch(`http://localhost:5000/api/stocks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
    };
  
    return {
      getStocks,
      addStock,
      deleteStock,
    };
  };
  