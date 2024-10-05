# Employees-Management-System
in this project we make a system to manage employees
first, we need to talk about the informations that we need to store it about every employee,we have personal informations : firstname, lastname, sex, birthdate, profile image, email, password. also work informations : branch of work, his role, his manager, salary, and if he is a manager
and to manage the branches and roles we design a tables for them, you can find them in backend/database/schema.sql
we use mysql as database, and we design schema for that 

- about backend code : we use nodejs and express
1- to do any request you need to be to be in the cors white list that we allow them to make requests, also you need login, we handle that by JWT tokens
2- some request require admin role, we handle that by make verify role middlware, that check the role from the jwt token payload
3- we make multiple route, all of them have multiple functionality
4- the level of validation is hight in every operation (multiple validation in backend and frontend), in backend side we take care of the pricipe "don 't repeat your self", you can find that when we make edit in profile or branch, or change profile image, also we verify that that thing we want update is already exist

- go to frontend side : we use react to build our app, and taillwind css to style it
1- depending on your role you will have UI, the admins have access to manage employees, and branches, but employee have access just to home page and profile
2- in manage employees you can search an employee, by his firstname, lastname, id, branch, role, its manager and you can go to his profile and edit his work informations and delete him, also you can get all employees, and add new one
3- also in branches page we have the same features
4- you can 't make any request until you pass with validation, wheich make the field red if it is not valid, this validation includes names, dates (for example you can 't add employee under 18 years old, you can 't add employee after today), emails, passwords, images
5- in the profile page you will find your personal informations also work informations, and you can edit your personal informations
6- you can logout from your account, we delete the cookies of this employee, and we add his tokens to redis cach (blacklist) to prevent it to make request after that with those tokens
