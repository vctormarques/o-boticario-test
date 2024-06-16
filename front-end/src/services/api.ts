import axios from 'axios';

export const apiBoticario = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 5000
});

apiBoticario.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem('@ApiBot:userData');
    const token = userData ? JSON.parse(userData).userState.accessToken : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiBoticario.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('@ApiBot:userData');
      if (window.location.pathname === '/login') {
        return;
      }
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const endpoints = {
  category: {
    list: async (token: string) => {
      return await apiBoticario
        .get('/category')
        .then((result) => result.data)
        .catch(({ response }) => {
          throw response;
        });
    },
    delete: async (id: number) => {
      return await apiBoticario
        .delete(`/category/${id}`)
        .then((result) => result.data)
        .catch(({ response }) => {
          throw response;
        });
    }
  }
};
