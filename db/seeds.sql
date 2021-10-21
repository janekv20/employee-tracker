INSERT INTO (dept_name)
VALUES
('Executive'),
('Account Management'),
('Technology and Project Management'),
('Research'),
('Partnerships');

INSERT INTO roles (title, salary, department_id)
VALUES

('CEO', 300000, 1),
('CFO', 290000, 1),
('Chief of Staff', 280000, 1),
('Executive Assistant', 90000, 1),
('SVP of Account Management', 250000, 2),
('Director of Account Management', 150000, 2),
('Account Manager', 105,000, 2),
('Account Officer', 90000, 2),
('SVP of Technology and Project Management', 220000, 3),
('Director of Project Management', 150000, 3),
('Director of Technology', 150000, 3),
('Senior Software Developer', 130000, 3),
('Junior Software Developer', 100000, 3),
('Project Manager', 110000, 3),
('Technology Asset Coordinator', 110000, 3),
('Administrative Associate', 75000, 3),
('Executive Director of Research', 150000, 4),
('Senior Researcher', 110000, 4),
('Researcher', 100000, 4),
('Research Associate', 80000, 4),
('SVP of Partnerships', 220000, 5),
('Director of Partnerships', 150000, 5),
('Partnership Relations Officer', 120000, 5),
('Administrative Assistant', 70000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES

('Jane', 'Doe', 1, NULL),
('John', 'Smith', 2, NULL),
('Mary', 'Joseph', 3, 2),
('Sarah', 'Johnson', 4, 1),
('Jake', 'Test', 5, 2),
('Molly', 'Gee', 6, 5),
('Holly', 'Light', 7, 6),
('Joe', 'Schmoe', 8, 6),
('Markle', 'John', 9, 1),
('Alex', 'Grey', 10, 9),
('Mark', 'Good', 11, 9),
('Goldie', 'Hawn', 12, 11),
('Kirk', 'Stewart', 13, 11),
('Jean-Luc', 'Picard', 14, 10),
('Geordie', 'La Forge', 15, 11),
('Adam', 'Thomas', 16, 10),
('Benji', 'Wong', 17, 1),
('Nora', 'Tan', 18, 17),
('Tommy', 'Lee', 19, 17),
('Pam', 'Biggs', 20, 17),
('Carli', 'Reds', 21, 1),
('Pete', 'Doe', 22, 21),
('Danny', 'Boy', 23, 21 ),
('Lily', 'Petal', 24, 21),