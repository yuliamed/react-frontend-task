

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    console.log("user " + user.token + " ))))))");
    return {
      Authorization: 'Bearer ' + user.token,
      Content: "application/json",
      Access: '*',
      // Content- Type: ,
      //   Access - Control - Allow - Origin: '*',

    };
  } else {
    return {};
  }
}