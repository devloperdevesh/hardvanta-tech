// 🔥 TEMP IN-MEMORY DB
const users: any[] = [];

export async function findUserByEmail(email: string) {
  return users.find((u) => u.email === email) || null;
}

export async function saveUser(user: any) {
  users.push(user);
  return user;
}

export async function getUserById(id: string) {
  return users.find((u) => u.id === id) || null;
}
