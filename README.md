# Employees-Management-System

in this project i make a system to manage employees

1. first, i need to talk about the informations that i need to store it about every employee,i have personal informations : firstname, lastname, sex, birthdate, profile image, email, password. also work informations : branch of work, his role, his manager, salary, and if he is a manager
and to manage the branches and roles i design a tables for them, you can find them in backend/database/schema.sql
i use mysql as database, and i design schema for that 

2. about **backend logic** : i use nodejs and express
- to do any request you need to be to be in the cors white list that i allow them to make requests, also you need login, i handle that by JWT tokens  
- some request require admin role, i handle that by make verify role middlware, that check the role from the jwt token payload  
- i make multiple route, all of them have multiple functionality  
- the level of validation is hight in every operation (multiple validation in backend and frontend), in backend side i take care of the pricipe "don 't repeat your self", you can find that when i make edit in profile or branch, or change profile image, also i verify that the thing i want update is already exist  

3. go to **frontend side** : i use react to build our app, and taillwind css to style it
- depending on your role you will have UI, the admins have access to manage employees, and branches, but employee have access just to home page and profile
- in manage employees you can search an employee, by his firstname, lastname, id, branch, role, its manager and you can go to his profile and edit his work informations and delete him, also you can get all employees, and add new one  
- also in branches page you will find the same features  
- you can 't make any request until you pass with validation, wheich make the field red if it is not valid, this validation includes names, dates (for example you can 't add employee under 18 years old, you can 't add employee after today), emails, passwords, images  
- in the profile page you will find your personal informations also work informations, and you can edit your personal informations  
- you can logout from your account, i delete the cookies of this employee, and i add his tokens to redis cach (blacklist) to prevent it to make request after that with those tokens
