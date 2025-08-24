import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export const getEmployees = () => apiClient.get("/employees");
export const getEmployeeById = (id) => apiClient.get(`/employees/${id}`);
export const addEmployee = (employee) => apiClient.post("/employees", employee);
export const updateEmployee = (id, employee) => apiClient.put(`/employees/${id}`, employee);
export const deleteEmployee = (id) => apiClient.delete(`/employees/${id}`);
