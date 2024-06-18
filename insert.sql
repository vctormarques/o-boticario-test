START TRANSACTION;

    -- Inserir o endereço
	INSERT INTO endereco ( cep, rua, bairro, cidade, numero, complemento, uf )
		VALUES ('75523170', 'Rua Getulio Vargas', 'Centro', 'Itumbiara', '123', 'apto1506', 'GO' );

	SET @endereco_id = LAST_INSERT_ID();
	
    -- Inserir Cliente (senha: admin)
	INSERT INTO cliente ( email, username, senha, nome, cpf, telefone, data_nascimento, endereco_id )
		VALUES ( 'teste@teste.com.br', 'admin', '$2a$10$1OuNiNiZpB7RDm7naOkjiuO4q6EE8R3.hGWWLj/hdQWl17iMkgiU6', 'Teste de Oliveira', '12345678912', '64999999999', '1993-11-16', @endereco_id );
	
	SET @cliente_id = LAST_INSERT_ID();
	
	-- Inserir Categoria
	INSERT INTO categoria ( nome_categoria, descricao_categoria )
	VALUES ( 'Combos', 'Perfumaria' );

	SET @categoria_id = LAST_INSERT_ID();

	-- Inserir Produto
	INSERT INTO produto ( nome_produto, descricao_produto, preco_produto, qtd_estoque, categoria_id )
	VALUES ( 'ZAAD', 'Perfum', 269.90, 567, @categoria_id );
	
	SET @produto_id = LAST_INSERT_ID();
	
	-- Inserir Pedido
	INSERT INTO pedido ( numero_pedido, valor_total_pedido, status, cliente_id)
	VALUES ('10', 539.80, true, @cliente_id);
	
	SET @pedido_id = LAST_INSERT_ID();
	
	-- Inserir Produto Pedido
	INSERT INTO produto_pedido (qtd_produto_pedido, preco_produto_pedido, produto_id, pedido_id)
	VALUES (2, 269.90, @produto_id, @pedido_id);
	
COMMIT;