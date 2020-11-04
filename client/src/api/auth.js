import defaultUser from '../utils/default-user';
import {login,updatePassword} from "../actions/authActions"
export async function signIn(email, password) {
  try {
    // Send request
    console.log(email, password);
    const creds ={
      email: email,
      password: password
    }
     const userData = await(login(creds))
     const {isOk, data} = userData
    return {
      isOk: isOk,
      data: data
    };
  }
  catch {
    return {
      isOk: false,
      message: "Authentication failed"
    };
  }
}

export async function getUser() {
  try {
    // Send request

    return {
      isOk: true,
      data: defaultUser
    };
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(email, password) {
  try {
    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);
    const creds ={
      email: email,
    }
    console.log(email);
    await updatePassword(creds);
    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  };
}

export async function resetPassword(email) {
  try {

    const creds ={
      email: email,
    }
    await resetPassword(creds)

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
