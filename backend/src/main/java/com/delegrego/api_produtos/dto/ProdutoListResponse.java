package com.delegrego.api_produtos.dto;

public record ProdutoListResponse(

		int id,

		String nome,

        String descricao,

		double preco,

		String urlImagem

) {}
