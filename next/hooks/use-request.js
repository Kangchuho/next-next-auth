import axios from 'axios';
import { useState } from 'react';
export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  //let errors = '';
  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      //errors = null;
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      let msgsub = '';
      if (
        !Array.isArray(err.response.data.message) ||
        !err.response.data.message.length
      ) {
        msgsub = <li>{err.response.data.message}</li>;
      } else {
        msgsub = err.response.data.message.map((e) => <li key={e}>{e}</li>);
      }

      // errors = (
      //   <div className="alert alert-danger">
      //     <h5>오류입니다.</h5>
      //     <ul className="my-0">{msgsub}</ul>
      //   </div>
      // );

      setErrors(
        <div className="alert alert-danger">
          <h5>오류입니다.</h5>
          <ul className="my-0">{msgsub}</ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};
