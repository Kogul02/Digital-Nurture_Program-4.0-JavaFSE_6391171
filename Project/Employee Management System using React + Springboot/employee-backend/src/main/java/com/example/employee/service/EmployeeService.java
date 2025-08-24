package com.example.employee.service;

import com.example.employee.model.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return repository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        return repository.findById(id).map(emp -> {
            emp.setEmpNo(employeeDetails.getEmpNo());
            emp.setName(employeeDetails.getName());
            emp.setDept(employeeDetails.getDept());
            emp.setEmail(employeeDetails.getEmail());
            emp.setSalary(employeeDetails.getSalary());
            return repository.save(emp);
        }).orElseThrow(() -> new RuntimeException("Employee not found with id " + id));
    }

    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}
