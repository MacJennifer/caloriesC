import { jwtDecode } from "jwt-decode";

const saveToken = (token, isConnected) => {
  localStorage.setItem("access_token", token);
};

const logout = () => {
  localStorage.removeItem("access_token");
};

const getToken = () => {
  return localStorage.getItem("access_token");
};

const isLoggedIn = () => {
  const token = localStorage.getItem("access_token");
  return token !== null;
};

const getDecodedToken = () => {
  if (getToken()) {
    return jwtDecode(localStorage.getItem("access_token"));
  } else {
    return false;
  }
};

const getExpiryTime = () => {
  // Check si le token est valide et n'a pas expiré
  if (getDecodedToken() && !(getDecodedToken().exp * 1000 < Date.now())) {
    return true;
  } else {
    return localStorage.removeItem("access_token");
    // return false;
  }
};

let getRoles = () => {
  if (getExpiryTime()) {
    return getDecodedToken().role_id;
  } else {
    return false;
  }
};

// let getId = () => {
//   // On teste si il y a un token décodé et si il n'a pas expiré
//   if (getExpiryTime()) {
//     return getDecodedToken().id;
//   } else {
//     return false;
//   }
// };

const loggedAdmin = () => {
  const roles = getRoles();
  // console.log("Roles:", roles); // Ajoutez ce console.log()

  return !!(roles === 2);
};
// let loggedAndAdminOrEditorM = () => {
//   // Check si il y a un token valide et check si le rôle est celui d'un editorM ou Admin, répond true quand c'est vrai
//   return !!((getExpiryTime() && getRoles() === 2) || getRoles() === 1);
// };

export default {
  saveToken,
  logout,
  getToken,
  getDecodedToken,
  getRoles,
  // getId,
  loggedAdmin,
  getExpiryTime,
  isLoggedIn,
};
