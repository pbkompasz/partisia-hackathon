import { loginUser } from "./queries";

const login = async (email: string, password: string) => {
  try {
    return loginUser(email, password);
  } catch (error) {
    throw error;  
  }
}

export {
  login,
}
