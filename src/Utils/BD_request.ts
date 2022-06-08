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

  export function Comments_bd(url:RequestInfo, data: {filmId:number}){
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => result.json());
  }

  export const newComments_bd = async (url:RequestInfo, data: {userId: number,comment: string, filmId: number, vote: number, username: string, admin: number}) => {
    return  await fetch(url, {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => result.json());
  }

  export const  Reviewsget = async (url:RequestInfo) =>{
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => result.json());
  }