SELECT * FROM fee_delivery.empresas;

INSERT INTO empresas (id_empresa, nome_empresa, cnpj, inscricao_estadual) VALUES
((SELECT id_usuario FROM usuarios WHERE email = 'contato@nestle.com'), 'Nestlé Brasil Ltda', '11111111000101', '123456789'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@cocacola.com'), 'Coca-Cola Indústria Ltda', '22222222000102', '234567890'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@toyota.com'), 'Toyota do Brasil S.A.', '33333333000103', '345678901'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@mcDonalds.com'), 'McDonald\'s Comércio Ltda', '44444444000104', '456789012'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@nike.com'), 'Nike do Brasil Ltda', '55555555000105', '567890123'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@ford.com'), 'Ford Motor Company Brasil', '66666666000106', '678901234'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@starbucks.com'), 'Starbucks Brasil Comércio', '77777777000107', '789012345'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@ibm.com'), 'IBM Brasil Indústria e Comércio', '88888888000108', '890123456'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@disney.com'), 'Disney Company Brasil', '99999999000109', '901234567'),
((SELECT id_usuario FROM usuarios WHERE email = 'contato@adidas.com'), 'Adidas do Brasil Ltda', '10101010100110', '012345678');

SELECT empresas.id_empresa, empresas.nome_empresa, empresas.cnpj, empresas.inscricao_estadual, usuarios.email, usuarios.telefone
FROM empresas
JOIN usuarios ON empresas.id_empresa = usuarios.id_usuario;

SELECT id_empresa FROM empresas;