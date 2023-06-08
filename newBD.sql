CREATE TABLE POSTAGEM (
    cod_post TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cod_usuario INT NOT NULL,
    FOREIGN KEY (cod_usuario) REFERENCES USUARIO (cod_usuario)
);

CREATE TABLE USUARIO (
    cod_usuario SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
   	senha TEXT NOT NULL,
    nome TEXT NOT NULL
);

CREATE TABLE COMENTARIO (
    cod_comentario TEXT PRIMARY KEY,
    conteudo TEXT NOT NULL,
    cod_postagem TEXT NOT NULL,
    cod_usuario INT NOT NULL,
    FOREIGN KEY (cod_postagem) REFERENCES POSTAGEM (cod_post),
    FOREIGN KEY (cod_usuario) REFERENCES USUARIO (cod_usuario)
);


