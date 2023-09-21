export async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:8000/v1/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      data.users.forEach((user, index) => {
        if (index === 0) {
          user.access = "admin";
        } else {
          user.access = "user";
        }
      });
      return data.users; // Return the fetched data
    } else {
      console.error("Error fetching data");
      return []; // Return an empty array or handle the error as needed
    }
  } catch (error) {
    console.error("Error:", error);
    return []; // Return an empty array or handle the error as needed
  }
}

export async function createUser(formData) {
  const response = await fetch("http://localhost:8000/v1/users/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return response;
}
