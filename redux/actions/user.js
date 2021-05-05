export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const login = (id, name, token, status) => ({
  type: LOGIN,
  payload: { id: id, name: name, token: token, status: status },
});

export const logout = () => ({
  type: LOGOUT,
});
