export const useAuth = () => {

  const register = async data => {
    return fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
  };

  const login = () => {};

  return {
    login,
    register,
  };
};
