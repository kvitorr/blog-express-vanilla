CREATE TABLE POSTAGEM (
    cod_post TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	att_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE COMENTARIO (
    cod_comentario TEXT PRIMARY KEY,
    conteudo TEXT NOT NULL,
    cod_post TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cod_post) REFERENCES POSTAGEM (cod_post)
);



drop table comentario
drop table usuario
drop table postagem

