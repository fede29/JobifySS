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
insert into categories values('sports', 'sport activities');
insert into categories values('outdoor activities', 'all kind of outdoor activities');
insert into categories values('education', 'It includes every position related to education');
insert into categories values('politics', 'every political activity');
insert into categories values('human resources', 'Human resources activities');
insert into categories values('health', 'All health realated');
insert into categories values('construction', 'It includes every position related to construction');
insert into categories values('transport', 'All transport activities');
insert into categories values('common', 'common positions or skills known by everybody that fills no other category');
insert into categories values('public service', 'activities related to the wellcare of the community');
insert into categories values('justice', 'all activities related to the justice');
insert into categories values('test_category', 'a test category');

insert into job_positions values('developer', 'a software developer', 'software');
insert into job_positions values('project manager', 'a project manager', 'management');
insert into job_positions(name, category)  values('dj', 'music');
insert into job_positions values('teacher','a teacher who teaches','education');
insert into job_positions values('librarian','a person who likes to ordered books','education');
insert into job_positions values('secretary', 'assistance to boss', 'common');
insert into job_positions values('football player','a person who plays football (el bueno no yankee) for some money', 'sports'); 
insert into job_positions values('police officer', 'job that prevents people from breaking the law (sometimes)', 'public service');
insert into job_positions values('bomberman', 'person who rescues people and extinguish fires', 'public service');
insert into job_positions values('lawyer', 'the defender of the innocent (or not)', 'justice');
insert into job_positions values('judge', 'the one with the funny hair at the court', 'justice');
insert into job_positions values('medic', 'person who saves peoples lifes', 'health');
insert into job_positions values('nursery', 'a nersury', 'health');
insert into job_positions values('guitar player', 'someone who likes to play the guitar', 'music');
insert into job_positions values('guitar hero specialist', 'someone who likes to play the guitar and doesnt know how to', 'music');

insert into skills values ('c', 'c programming language', 'software');
insert into skills values ('java', 'java programming language', 'software');
insert into skills values ('PMI', 'Project Management Institute', 'management');
insert into skills values ('node.js', 'node.js development skill', 'software');
insert into skills values ('express.js','development skill','software');
insert into skills values ('postgresql','development skill','software');
insert into skills values ('angular.js','development skill','software');
insert into skills values ('angular material','development skill','software');
insert into skills values ('html 5','development skill','software');
insert into skills values ('css','development skill','software');
insert into skills values ('surgery','surgery skill (itll certainly wont kill you)','health');
insert into skills values ('levelDB','development skill','software');
insert into skills values ('MongoDB','development skill','software');
insert into skills values ('midfielder','a good midfielder for a football team','sports');
insert into skills values ('passing expert','if you want a good passing player you got it','sports');
insert into skills values ('free kick expert','a good free kick = half a goal','sports');
insert into skills values ('dribbling expert','you will get through players easily','sports');
insert into skills values ('rock n roll master', 'a good rock n roll player','music');
insert into skills values ('blues skill', 'that blues sounds right','music');
insert into skills values ('jazz skill', 'you got the jazz in your veins','music');
