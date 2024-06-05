import axiosSecure from '.'

// save user in db
export const saveUser = async (user, status) => {
  console.log(status)
  const currentUser = {
    email: user.email,
    role: 'user',
    image: user.photoURL,
    name: user?.displayName,
    isPremium : false,
    expiryDate:0
  }

  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser)
  return data
}

export const updateUser = async (id, userData) => {
  const { data } = await axiosSecure.put(`/user/${id}`, userData)
  return data
}
export const updateUserPremium = async (email, time) => {
  const { data } = await axiosSecure.put(`/userPremium/${email}`, time)
  return data
}

export const getRole = async (email) => {
  const { data } = await axiosSecure(`/user/${email}`)
  return data.role
}

export const getSingleUser = async (email) => {
  const { data } = await axiosSecure(`/user/${email}`);
  return data;
};


export const getToken = async (email) => {
  const { data } = await axiosSecure.post(`/jwt`, email)
  console.log('token revi ', data)
  return data
}

export const clearCookie = async () => {
  const { data } = await axiosSecure.get('/logout')
  return data
}
