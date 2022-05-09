export const useProducts = () => {
    const getProducts = () => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch('http://localhost:5000/api/products', {
        headers: {
          'x-auth-token': token,
        },
      });
    };
    const addProduct = data => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(data),
      });
    };
  
    const deleteProduct = id => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
    };
  
    return {
      getProducts,
      addProduct,
      deleteProduct,
    };
  };
  