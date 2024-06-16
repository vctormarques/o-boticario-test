import axios from 'axios';
import { IAddressRequest } from 'interfaces/address.interface';
import { ICategoryRequest } from 'interfaces/category.interface';

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
    list: async () => {
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
    },
    create: async (payload: ICategoryRequest) => {
      return await apiBoticario
        .post(`/category/`, payload)
        .then((result) => result.data)
        .catch(({ response }) => {
          throw response;
        });
    }
  },
  address: {
    list: async () => {
      return await apiBoticario
        .get('/address')
        .then((result) => result.data)
        .catch(({ response }) => {
          throw response;
        });
    },
    delete: async (id: number) => {
      return await apiBoticario
        .delete(`/address/${id}`)
        .then((result) => result.data)
        .catch(({ response }) => {
          throw response;
        });
    },
    create: async (payload: IAddressRequest) => {
      return await apiBoticario
        .post(`/address/`, payload)
        .then((result) => result.data)
        .catch(({ response }) => {
          throw response;
        });
    }
  }
};
