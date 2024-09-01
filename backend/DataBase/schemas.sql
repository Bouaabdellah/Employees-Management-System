CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    sex ENUM('M', 'F') NOT NULL,
    birthday DATE NOT NULL,
    start_day DATE,
    email VARCHAR(255) NOT NULL,
    user_password VARCHAR(60) NOT NULL,
    salary INT NOT NULL,
    super_id INT,
    branch_id INT NOT NULL,
    role_id INT NOT NULL,
    image_url VARCHAR(255),
    FOREIGN KEY(super_id) REFERENCES user(id) ON DELETE SET NULL,
    FOREIGN KEY(branch_id) REFERENCES branch(branch_id) ON DELETE SET NULL,
    FOREIGN KEY(role_id) REFERENCES roles(role_id) ON DELETE SET NULL,
);

CREATE TABLE branch(
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(20) NOT NULL,
    mgr_id INT,
    start_day DATE NOT NULL,
    FOREIGN KEY(mgr_id) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE roles(
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(20) NOT NULL
);