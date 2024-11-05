import axiosInstance from 'axios';
import { toast } from 'sonner'


const axios = axiosInstance.create({});

axios.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);


export { axios };

