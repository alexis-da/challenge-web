export async function Auth(try_login) {
  try {
    const response = await fetch("/api/get_users");
    const data = await response.json();
    console.log(data);
    const user = data.users.find(
      (user) => user.email === try_login.email && user.password === try_login.password
    );
    return user
      ? { status: "success", user }
      : { status: "failure", message: "Invalid email or password" };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { status: "error", message: "Unable to authenticate" };
  }
}
