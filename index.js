const inquirer = require("inquirer");
const db = require("./db/connection");


//prompt to ask users what they would like to do
function userChoice() {
inquirer.prompt([
    {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View all departments", 
            "View all roles", 
            "View all employees", 
            "Add a department", 
            "Add a role", 
            "Add an employee", 
            "Update an employee's role",
            "Exit"
            //bonus
            // "Update employee's manager",
            // "View employees by manager",
            // "View employees by department",
            // "Delete department",
            // "Delete role",
            // "Delete employee",
            // "View total budget",
            // "Quit"
            ]
        }
]).then( answers => {
    console.log(answers.choice);
   //switch statement controlling flow of application
switch(answers.choice) {
    case "View all employees":
        viewEmployees();
        break;
    case "View all roles":
        viewRoles();
        break;
    case "View all departments":
        viewDepartments();
        break;
    case "Add an employee":
        addEmployee();
        break;
    case "Add a department":
        addDepartment();
        break;
    case "Add a role":
        addRole();
        break;
    case "Update an employee's role":
        updateEmployeeRole();
        break;
    case "Exit":
        exit();
//     case "View all employees by department":
//         viewEmployeesByDepartment();
//         break;
//     case "View all employees by manager":
//         viewEmployeesByManager();
//         break;
//     case "Add an employee":
//         addEmployee();
//         break;
        // case "Quit":
        //     return;     
} 
})
}

//function to stop the node process and exit the application
function exit() {
    console.log("Goodbye.");
    process.exit();
}
userChoice( );

//function to view all of the employees in a table
function viewEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err,rows) => {
        if(err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
    });
    userChoice();
};

//function to view all roles in a table
function viewRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err,rows) => {
        if(err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
    });
    userChoice();
};
    
//function to view all departments in a table 
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err,rows) => {
        if(err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
    })
    userChoice();
}

//function to add a department and show updated list of departments
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the new department you would like to add?"
        }
    ]).then(answers => {
        console.log("Department name", answers.newDepartment);
        db.query(`INSERT INTO department(name) VALUE (?)`, [answers.newDepartment], function (err,rows) {
            if(err){
                console.log(err);
            } else {
                console.log("Success! Department added to the database.");
                viewDepartments();
            }
        });
})
}

//function add employee and show updated list of employees
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeFirst",
            message: "What is the new employee's first name?"
        },
        {
            type: "input",
            name: "employeeLast",
            message: "What is the new employee's last name?"
        },
        {
            type: "number",
            name: "employeeRole",
            message: "Enter the ID of the employee's role"
        },
        {   type: "number",
            name: "employeeManager",
            message: "Enter the employee manager's ID"}
        ])
    .then(answers => {
        console.log("first", answers.employeeFirst);
        console.log("last", answers.employeeLast);
        console.log("roleid", answers.employeeRole);
        console.log("managerid", answers.employeeManager);
        db.query(`INSERT INTO employee(first_name, last_name, role_ID, manager_ID) VALUES (?,?,?,?)`, 
        [answers.employeeFirst, answers.employeeLast, answers.employeeRole, answers.employeeManager]), 
        function (err, data) {
            if (err){
                console.log(err)
            } else {
                console.table(data);
            };
        };
        viewEmployees();
    });
};

//function to add a role and show updated list of roles
function addRole() {
    inquirer.prompt([
            {
                type: "input",
                name: "newTitle",
                message: "What title would you like to add?"
            },
            {   
                type: "number",
                name: "roleSalary",
                message: "What is the salary of this role?"
            },
            {
                type: "list",
                name: "roleDepartment",
                choices: [
                    "1",
                    "2",
                    "3",
                    "4"
                    ]
                }
        ]).then(answers => {
            
            console.log("title", answers.newTitle, "salary", answers.roleSalary, "department", answers.roleDepartment);
            db.query(`INSERT INTO roles(title,salary,department_id) 
                VALUE(?,?,?)`, [answers.newTitle, answers.roleSalary, answers.roleDepartment], function(err,data) {
                if(err) {console.log(err)}
                else { 
                    console.table(data);
                    viewRoles()
                    };
                })
        })
}    

//function to update the role of an exisiting employee and show updated list of employees
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "number",
            name: "employeeID",
            message: "What is the ID of the employee you wish to change?"
        },
        {
            type: "number",
            name: "newRole",
            message: "What is the ID of the new role you wish to assign the employee?"
        }
    ]).then ( answers => {
        console.log("ID," , answers.employeeID, "newRole", answers.newRole);
        db.query(`UPDATE employee SET role_ID = ?  WHERE ID =  ? ` , 
        [answers.newRole, answers.employeeID], function(err, rows) {
            if(err){
                console.log(err);
                return;
            } else {
                console.table(rows);
            }
        });
        db.query(`SELECT * FROM employee`, (err,rows) => {
            if(err) {
                console.log(err);
                return;
            } else {
                console.table(rows);
            }
        });
        userChoice();
    })
}

