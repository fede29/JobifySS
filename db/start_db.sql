/* Creo las tablas */
DROP TABLE IF EXISTS job_positions;
CREATE TABLE job_positions(
	name text NOT NULL,
	description text,
	category text,
	CONSTRAINT PK_NAME_JOB PRIMARY KEY (name)
);

DROP TABLE IF EXISTS skills;
CREATE TABLE skills(
	name text NOT NULL,
	description text,
	category text,
	CONSTRAINT PK_NAME_SKILL PRIMARY KEY (name)
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories(
	name text NOT NULL,
	description text,
	CONSTRAINT PK_NAME_CATEGORY PRIMARY KEY (name)
);

ALTER TABLE job_positions
ADD CONSTRAINT FK_CATEGORY_JOB FOREIGN KEY (category)
REFERENCES categories (name)
on delete restrict on update restrict;

ALTER TABLE skills
ADD CONSTRAINT FK_CATEGORY_SKILLS FOREIGN KEY (category)
REFERENCES categories (name)
on delete restrict on update restrict;

/*Insercion de Datos*/
insert into categories values('software', 'software description');
insert into categories values('management', 'management description');
insert into categories values('music', 'all kind of music');
insert into categories values('sport', 'sport activities');
insert into categories values('outdoor activities', 'all kind of outdoor activities');

insert into job_positions values('developer', 'a software developer', 'software');
insert into job_positions values('project manager', 'a project manager', 'management');
insert into job_positions(name, category)  values('dj', 'music');

insert into skills values ('c', 'c programming language', 'software');
insert into skills values ('java', 'java programming language', 'software');
insert into skills values ('PMI', 'Project Management Institute', 'management');
