export const useRelations = () => {
  const getRelations = () => {
    const token = localStorage.getItem('SMB_TOKEN');
    return fetch('http://localhost:5000/api/relations', {
      headers: {
        'x-auth-token': token,
      },
    });
  };
  const addRelation = data => {
    const token = localStorage.getItem('SMB_TOKEN');
    return fetch('http://localhost:5000/api/relations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(data),
    });
  };

  const deleteRelation = id => {
    const token = localStorage.getItem('SMB_TOKEN');
    return fetch(`http://localhost:5000/api/relations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
  };

  return {
    addRelation,
    getRelations,
    deleteRelation,
  };
};
