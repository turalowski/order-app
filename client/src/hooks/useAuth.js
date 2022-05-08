export const useAuth = () => {
  const validateToken = token => {
    return fetch('http://localhost:5000/api/auth', {
      headers: {
        'x-auth-token': token,
      },
    });
  };

  const register = data => {
    return fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const login = data => {
    return fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  return {
    login,
    register,
    validateToken,
  };
};
