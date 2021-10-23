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
    })
}

