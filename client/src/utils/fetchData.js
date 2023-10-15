import axios from 'axios'

export const axiosInstance= axios.create({
  withCredentials: true,
  baseURL:"https://chat-webapplication.onrender.com"
  // baseURL:"http://localhost:5000"
});

export const getDataAPI = async(url, accessToken) => {
  const res = await axiosInstance.get(`/api/v1/${url}`, {
    headers: {
      Authorization: accessToken
    }
  })

  return res
}

export const postDataAPI = async(url, data, accessToken) => {
  const res = await axiosInstance.post(`/api/v1/${url}`, data, {
    headers: {
      Authorization: accessToken
    }
  })

  return res
}

export const patchDataAPI = async(url, data, accessToken) => {
  const res = await axiosInstance.patch(`/api/v1/${url}`, data, {
    headers: {
      Authorization: accessToken
    }
  })

  return res
}

export const deleteDataAPI = async(url, accessToken) => {
  const res = await axiosInstance.delete(`/api/v1/${url}`, {
    headers: {
      Authorization: accessToken
    }
  })

  return res
}