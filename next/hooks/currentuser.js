import axios from 'axios';
export default ({ url, method, body, onSuccess }) => {
  const isLogin = false;
  const doRequest = async (props = {}) => {
    try {
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        isLogin = true;
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      return { isLogin: false };
    }
  };
  return { doRequest, isLogin };
};
