const inquirer = require('inquirer');
const mysql = require('mysql2');

function addADepart() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of new department:',
            name: 'departID',
        },
    ]).then(responses => {
        db.query("INSERT INTO department SET ?", {
            name: responses.department,

        }
        )
    }
    )
}

function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the title of the role:',
            name: 'titleName',
        },
        {
            type: 'input',
            message: 'Enter the salary:',
            name: 'salary',
        },
        {
            type: 'input',
            message: 'Enter the department for the role:',
            name: 'departForRole',
        },
    ]).then(responses => {
        db.query("INSERT INTO department SET ?", {
            title: responses.titleName,
            salary: responses.salary,
            department_id: responses.departForRole
        }
        )
    }
    )
}

function addAEmploy() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'First name:',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'Last name:',
            name: 'lastName',
        },
        {
            type: 'input',
            message: 'role ID:',
            name: 'roleID',
        },
        {
            type: 'input',
            message: 'If they have a manager, type their ID. If not press Enter:',
            name: 'managerOfE',
        },
    ]).then(responses => {
        db.query("INSERT INTO employees SET?", {
            first_name: responses.firstName,
            last_name: responses.lastName,
            role_id: responses.roleID,
            manager_id: responses.managerOfE
        }
        )
    }
    )
}

// function UpdateEmpRole() {
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Who do you want to make changes for? Enter ID:',
//             name: 'idOfEmp',
//         },
//         {
//             type: 'input',
//             message: 'New ID of rol:',
//             name: 'idOfRole',
//         },
//     ]).then(responses => {
//         const sql = `UPDATE employee SET role_id = ? WHERE id ?`;
//         const params = [responses.idOfRole, responses.idOfEmp];
//         db.query(sql, params, (err, result) => {
//             if (err) {
//                 console.log('Error')
//             }
//             if (result) {
//                 console.log('Updates have been made')
//             }
//         })

//     }
//     )
// }




module.exports = { addADepart, addARole, addAEmploy, UpdateEmpRole }