SELECT * FROM fee_delivery.vagas;

ALTER TABLE vagas
MODIFY titulo VARCHAR(200) DEFAULT '',
MODIFY descricao VARCHAR(1000) DEFAULT '',
MODIFY endereco VARCHAR(300) DEFAULT '',
MODIFY numero VARCHAR(20) DEFAULT NULL,
MODIFY data_inicio DATE DEFAULT NULL,
MODIFY data_fim DATE DEFAULT NULL,
MODIFY horario_inicio TIME DEFAULT NULL,
MODIFY horario_fim TIME DEFAULT NULL,
MODIFY requisito_ear BOOLEAN DEFAULT FALSE,
MODIFY requisito_mei BOOLEAN DEFAULT FALSE,
MODIFY forma_pagamento ENUM('credito', 'debito', 'dinheiro', 'bitcoin') DEFAULT 'dinheiro',
MODIFY valor DECIMAL(10, 2) DEFAULT 0.00;