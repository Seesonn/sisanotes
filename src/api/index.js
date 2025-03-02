// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// export const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor to add token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/user-login';
//     }
//     return Promise.reject(error);
//   }
// );

// export const authApi = {
//   userLogin: (data) => api.post('/auth/user/login', data),
//   ownerLogin: (data) => api.post('/auth/owner/login', data),
//   updateProfile: (data) => api.put('/auth/profile', data),
// };

// export const bookingApi = {
//   getBookings: () => api.get('/bookings'),
//   createBooking: (data) => api.post('/bookings', data),
// };

// export const futsalApi = {
//   getFutsalDetails: () => api.get('/futsal'),
//   addFutsalDetails: (data) => api.post('/futsal', data),
//   updateFutsalDetails: (id, data) => api.put(`/futsal/${id}`, data),
//  };----------------------------------------------------
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000",
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     config.headers["Content-Type"] = "application/json";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // export { api };
// import axios from "axios"

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

// export const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Add request interceptor to add token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Add response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export const authApi = {
//   login: (data) => api.post("/auth/login", data),
//   register: (data) => api.post("/auth/register", data),
// }

// export const userApi = {
//   getProfile: () => api.get("/user/profile"),
//   updateProfile: (data) => api.put("/user/profile", data),
// }

// export const futsalApi = {
//   getFutsalDetails: () => api.get("/futsal"),
//   addFutsalDetails: (data) => api.post("/futsal", data),
//   updateFutsalDetails: (id, data) => api.put(`/futsal/${id}`, data),
// }


// import axios from "axios"

// const API_BASE_URL =  "http://localhost:3000"

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export const authApi = {
//   login: (data) => api.post("/auth/login", data),
//   register: (data) => api.post("/auth/register", data),
// }

// export const userApi = {
//   getProfile: () => api.get("/user/profile"),
//   updateProfile: (id, data) => api.patch(`/user/${id}`, data),
//   getAllUsers: () => api.get("/user"),
//   getUser: (id) => api.get(`/user/${id}`),
//   createUser: (data) => api.post("/user", data),
//   deleteUser: (id) => api.delete(`/user/${id}`),
// }

// export const roleApi = {
//   getAllRoles: () => api.get("/role"),
//   getRole: (id) => api.get(`/role/${id}`),
//   createRole: (data) => api.post("/role", data),
//   updateRole: (id, data) => api.patch(`/role/${id}`, data),
//   deleteRole: (id) => api.delete(`/role/${id}`),
// }

// export const futsalApi = {
//   getFutsalDetails: () => api.get("/futsal"),
//   addFutsalDetails: (data) => api.post("/futsal", data),
//   updateFutsalDetails: (id, data) => api.put(`/futsal/${id}`, data),
// }

// export const bookingApi = {
//   getUserBookings: () => api.get("/bookings/user"),
//   createBooking: (data) => api.post("/bookings", data),
// }
import axios from "axios"

const API_BASE_URL = "http://localhost:3000"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const authApi = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
}

export const userApi = {
   getProfile: () => api.get("/auth/profile"),
  //  updateProfile: (id, data) => api.patch(`/user/${id}`, data),
  getAllUsers: () => api.get("/user"),
  getUser: (id) => api.get(`/user/${id}`),
  createUser: (data) => api.post("/user", data),
  deleteUser: (id) => api.delete(`/user/${id}`),
}

export const roleApi = {
  getAllRoles: () => api.get("/role"),
  getRole: (id) => api.get(`/role/${id}`),
  createRole: (data) => api.post("/role", data),
  updateRole: (id, data) => api.patch(`/role/${id}`, data),
  deleteRole: (id) => api.delete(`/role/${id}`),
}

export const futsalApi = {
  getFutsalDetails: () => api.get("/futsal"),
  addFutsalDetails: (data) => api.post("/futsal", data),
  updateFutsalDetails: (id, data) => api.put(`/futsal/${id}`, data),
}

export const bookingApi = {
  getUserBookings: () => api.get("/booking/user"),
  createBooking: (data) => api.post("/booking", data),
}

