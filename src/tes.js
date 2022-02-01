const validTest = (email, password) => {
  const emailRGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailResult = emailRGEX.test(email);

  if (emailResult === false) {
    console.log(`please input valid email address`);
    return false;
  }

  console.log("email oke");

  const passwordRGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
  const passwordResult = passwordRGEX.test(password);

  if (passwordResult === false) {
    console.log(
      `Password must contain at least eight characters, at least one number and both lower and uppercase letters, and special characters`
    );
    return false;
  }
  console.log("password oke");

  return true;
};

console.log(validTest("jasdasdwad@asdwad.com", "P4ssW0rd!"));

const d = new Date();
console.log(`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`);
