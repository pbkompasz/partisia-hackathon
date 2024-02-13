import { axiosClient } from "./client";

const login =  async  (email, password, ) => {
  try {
    const resp = await axiosClient.post('login', {
      email,
      password,
    });
    return resp.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const register =  async  () => {
  
}


export {
  login,
  register,
};
