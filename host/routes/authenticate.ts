import { loginUser } from "../queries/queries";

const login = async (email: string, password: string) => {
  try {
    const resp = await loginUser(email, password);
    console.log(resp);
    if (resp) {
      return resp;
    }
    throw new Error("No such user");
  } catch (error) {
    throw error;  
  }
}

export {
  login,
}
