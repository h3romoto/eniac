const register = async (req, res) => {
  res.send("Register user");
};

const login = async (req, res) => {
  res.send("Login");
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

export { register, login, updateUser };
