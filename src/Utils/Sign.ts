export const Login_bd = async (url: string, data: { username: string; pass: string }) => {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => result.json());
    return resp;
  };
  
  export const Signin_bd = async (url: string, data: { username: string; pass: string; email: string }) => {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => result.json());
    return resp;
  };