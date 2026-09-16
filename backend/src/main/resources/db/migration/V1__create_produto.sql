CREATE TABLE produto (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    preco DOUBLE NOT NULL,
    url_imagem TEXT NOT NULL
);
