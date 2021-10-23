//packages needed
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//start server
db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Server runnning on port ${PORT}`);
    });
});

function loadPrompt(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add An Employee', 'Add A Role', 'Add A Department', 'Update An Employee Role', 'Quit']
        }
    ])
    .then(selection => {
        if (selection === "View All Employees") {
            viewEmployees();
        } else if (selection === "View All Roles") {
            viewRoles();
        } else if (selection === "View All Departments") {
            viewDepartments();
        } else if (selection === "Add An Employee") {
            addEmployee();
        } else if (selection === "Add A Role") {
            addRole();
        } else if (selection === "Add A Department") {
            addDepartment();
        } else if (selection === "Update An Employee Role") {
            updateEmployee();
        } else if (selection === "Quit"){
            quitTracker();
        }
    })}

function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        console.table(result);
    });
    loadPrompt();
}

function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
    });
    loadPrompt();
}

function viewEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
    });
    loadPrompt();
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What department would you like to add?',
        },
    ])
    .then(departmentName => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = departmentName.addDepartment;
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('Added new department.')
            console.table(result);
            loadPrompt();
        });
    })
}

function addRole() {
    // one is call from the sql table
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, deptData) =>{
        if (err) throw err;
        const dept = deptData.map((department) => 
        ({ name: department.name, value: department.id}));
        console.log(dept)

        return inquirer.prompt([
    {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the amount of the salary?"
      },
      {
        type: "list",
        name: "departmentList",
        message: "Select which department this role is with.",
        choices: dept
      },
    ])
    .then(roleData => {
        const sqlDept = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;

        
        const params = [
          roleData.roleName,
          roleData.roleSalary,
          roleData.departmentList
        ];
        db.query(sqlDept, params, (err, result) => {
            if (err) throw err;
            console.log("Role has been added");
            console.table(result);
            loadPrompt();
            });
    ``})
    })

}

function addEmployee () {
// one is call from the sql table
const sql = `SELECT * FROM role`;
db.query(sql, (err, roleData) => {
    if (err) throw err;
    const employeeRole = roleData.map((role) => 
    (   {name: role.title, value: role.id
    }));
    console.log (employeeRole)


const mngerSql = `SELECT * FROM employee`;
db.query(mngerSql, (err, employeeData) =>{
    if (err) throw err;
    console.log(employeeData);
    const mnger = employeeData.map((employee) =>
    ({name: employee.first_name + ' ' + employee.last_name, value: employee.manager_id}))
    
    
    return inquirer.prompt([
{
    type: "input",
    name: "employeeFirstName",
    message: "What is the first name of the employee?"
  },
  {
    type: "input",
    name: "employeeLastName",
    message: "What is the last name of the employee?"
  },
  {
    type: "list",
    name: "roleList",
    message: "Select which role this employee is assigned:",
    choices: employeeRole
  },
  {
    type: "list",
    name: "departmentList",
    message: "Select which manager is overseeing this employee:",
    choices: mnger
  },
])
.then(employData => {

    const sqlEmployment = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

    
    const params = [
      employData.employeeFirstName,
      employData.employeeLastName,
      employData.roleList,
      employData.departmentList
    ];
    db.query(sqlEmployment, params, (err, result) => {
        if (err) throw err;
        console.log("Employee has been added")
        console.table(result);
        loadPrompt();
        });
``})
})
})

}

function updateEmployee() {
const sql = `SELECT * FROM employee`;
db.query(sql, (err, employeeData) =>{
    if (err) throw err;
    const employeeList = employeeData.map((employee) =>
    ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}))

const roleSql = `SELECT * FROM role`;
db.query(roleSql, (err, roleData) => {
    if (err) throw err;
    const employeeRole = roleData.map((role) => 
    (   {name: role.title, value: role.id
    }));

    return inquirer.prompt([
        {
            type: "list",
            name: "updateEmployee",
            message: "Which employee's role would you like to update?",
            choices: employeeList
          },
          {
            type: "list",
            name: "roleList",
            message: "Select which new role this employee is assigned:",
            choices: employeeRole
          }
        ])
        .then(updateSelection => {
          
          const updateRole = 
          `UPDATE employee SET role_id = ? WHERE id = ?`;
          
          const params = [
            updateSelection.roleList,
            updateSelection.updateEmployee
            
          ];
          db.query(updateRole, params, (err, result) => {
            if (err) throw err;
            console.log("Employee has been updated")
            console.table(result);
            loadPrompt();
            });
    })
   })
})
 loadPrompt();
}

function quitTracker(){
console.log("Goodbye")
process.exit();
}

loadPrompt();

// Start server after DB connection
db.connect(err => {
if (err) throw err;
console.log('Database connected.');
});