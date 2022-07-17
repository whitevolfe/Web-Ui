export const SignIn = (username, password) => {
  if (username === "admin" && password === "admin") {
    return {
      status: "success",
      message: "Login successful",
    };
  }else if( username === "admin" && password !== "admin"){
    return {
      status: "password error",
      message: "Password is incorrect",
    };
  }
  else if( username !== "admin" && password === "admin"){
    return {
      status: "username error",
      message: "Username is incorrect",
    };
  }
  else{
    return {
      status: "error",
      message: "Username and password are incorrect",
    };
  }
}
