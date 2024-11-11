-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS fee_delivery;
USE fee_delivery;

-- Tabela de usuários
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    tipo_usuario ENUM('Administrador', 'Motoboy', 'Empresa') NOT NULL,
    opt_in_tos BOOLEAN DEFAULT FALSE
);

-- Tabela de motoboys (referência para usuários)
CREATE TABLE motoboys (
    id_motoboy INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100),
    cpf CHAR(11) UNIQUE NOT NULL,
    data_nascimento DATE,
    mei VARCHAR(200),
    FOREIGN KEY (id_motoboy) REFERENCES usuarios(id_usuario)
);

-- Tabela de empresas (referência para usuários)
CREATE TABLE empresas (
    id_empresa INT PRIMARY KEY,
    nome_empresa VARCHAR(255) NOT NULL,
    cnpj CHAR(14) UNIQUE NOT NULL,
    inscricao_estadual VARCHAR(20),
    FOREIGN KEY (id_empresa) REFERENCES usuarios(id_usuario)
);

-- Tabela de administradores (referência para usuários)
CREATE TABLE administradores (
    id_admin INT PRIMARY KEY,
    FOREIGN KEY (id_admin) REFERENCES usuarios(id_usuario)
);

-- Tabela de cartões de crédito (vinculada a empresas)
CREATE TABLE cartoes_credito (
    id_cartao INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    numero_cartao CHAR(16) NOT NULL,
    nome_titular VARCHAR(255) NOT NULL,
    validade DATE NOT NULL,
    cvv CHAR(3) NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

-- Tabela de contas bancárias (vinculada a motoboys)
CREATE TABLE contas_bancarias (
    id_conta INT AUTO_INCREMENT PRIMARY KEY,
    id_motoboy INT NOT NULL,
    banco VARCHAR(100) NOT NULL,
    agencia VARCHAR(20) NOT NULL,
    conta VARCHAR(20) NOT NULL,
    tipo_conta ENUM('Corrente', 'Poupança') NOT NULL,
    FOREIGN KEY (id_motoboy) REFERENCES motoboys(id_motoboy)
);

CREATE TABLE vagas (
    id_vaga INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    tipo_vaga ENUM('pontual', 'fixo') NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao VARCHAR(1000) NOT NULL,
    endereco VARCHAR(300) NOT NULL,
    numero VARCHAR(20),
    data_inicio DATE NOT NULL,
    data_fim DATE,
    horario_inicio TIME,
    horario_fim TIME,
    requisito_ear BOOLEAN DEFAULT FALSE,
    requisito_mei BOOLEAN DEFAULT FALSE,
    forma_pagamento ENUM('credito', 'debito', 'dinheiro', 'bitcoin') NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    status_publicacao ENUM('rascunho', 'publicada', 'finalizada') DEFAULT 'rascunho',
    data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

