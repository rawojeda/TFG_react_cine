/* eslint-disable eqeqeq */
import { ChangeEvent } from "react";

export function emailValidation(event: ChangeEvent<HTMLInputElement>){
    const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)/;
    if (event.target.value.match(email_re)) {
        return "valid";
    } else {
        if (event.target.value === "") {
            return ""
        } else {
            return "not-valid";
        }
    }
}
export function passValidation(event: React.ChangeEvent<HTMLInputElement>){
    const pass_re = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if(event.target.value.match(pass_re)){
      return "valid";
    }else{
      if(event.target.value===""){
        return "";
      }else{
        return "not-valid";
      }
    }
};

export function repeatedpassValidation(event: React.ChangeEvent<HTMLInputElement>, passSignin:string){
  if(event.target.value===""){
    return "";
  }else if(passSignin===event.target.value){
      return "valid";
  }else {
      return "not-valid";
  }
};
export function equal(string1: string, string2:string){
  if(string1===""){
    return "";
  }else if(string1===string2){
      return "valid";
  }else {
      return "not-valid";
  }
};
export function erroresSigninCliente(username:string, email_e:string,pass_e:string,repeatedpass_e:string){
  var errores:string[] = [];
  if(email_e==""|| pass_e==""|| repeatedpass_e=="" || username==""){
    errores.push("hay datos sin rellenar");
  }
  if(email_e.includes("not-valid")){
    errores.push("el email no esta escrito correctamente: x@x.x");
  }
  if(pass_e.includes("not-valid")){
    errores.push("La contraseña debe estar entre 8 y 16 y contener al menos una letra mayúscula, una letra minúscula y un número");
  }
  if(repeatedpass_e.includes("not-valid")){
    errores.push("Las contraseñas no coinciden");
  }
  return errores;
}