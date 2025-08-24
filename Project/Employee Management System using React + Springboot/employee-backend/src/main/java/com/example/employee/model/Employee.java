package com.example.employee.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String empNo;

    private String name;
    private String dept;
    private String email;
    private Double salary;

    public Employee() {}

    public Employee(String empNo, String name, String dept, String email, Double salary) {
        this.empNo = empNo;
        this.name = name;
        this.dept = dept;
        this.email = email;
        this.salary = salary;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmpNo() { return empNo; }
    public void setEmpNo(String empNo) { this.empNo = empNo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
}
