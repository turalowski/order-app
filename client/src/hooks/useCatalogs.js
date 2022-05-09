export const useCatalogs = () => {
    const getCatalogs = () => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch('http://localhost:5000/api/catalogs', {
        headers: {
          'x-auth-token': token,
        },
      });
    };
    const addCatalog = data => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch('http://localhost:5000/api/catalogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(data),
      });
    };
  
    const deleteCatalog = id => {
      const token = localStorage.getItem('SMB_TOKEN');
      return fetch(`http://localhost:5000/api/catalogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
    };
  
    return {
      getCatalogs,
      addCatalog,
      deleteCatalog,
    };
  };
  