CREATE DATABASE testscaff;

\c testscaff;

drop table auteur cascade;
create TABLE auteur(

    id_auteur serial primary key,
    nom varchar(50) not null,
    prenom varchar(50) not null
);

CREATE table categories(

    id_categories serial primary key,
    libele varchar(50) not null

);

drop table livre;
create TABLE livre(

    id_livre serial primary key,
    id_auteur int not null,
    titre varchar(50) not null,
    id_categories int not null,
    description varchar(50),
    foreign key(id_auteur) references auteur(id_auteur),
    foreign key(id_categories) references categories(id_categories)

);