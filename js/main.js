const url = "https://my---api.herokuapp.com/users";

const getUsers = async () => {
  const response = await fetch(url);
  const users = await response.json();
  return users;
};

const displayUsers = async () => {
  const users = await getUsers();

  document.getElementById("body").innerHTML = users
    .map((user) => {
      return `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
            </tr>
        `;
    })
    .join("");
};

const addUser = async (user) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json"
      },
      body: JSON.stringify(user)
    });

    displayUsers();
  } catch (error) {
    console.log(error);
  }
};

(() => {
  displayUsers();
})();

document.getElementById("addUserForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!username || !email || !password) return;

  const user = { username, email, password };

  addUser(user);

  e.target.reset();
});
