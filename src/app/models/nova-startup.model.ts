import { EnumTipoImagem } from "./imagem.model";
export interface NovaStartup {
    nome: string;
    descricao: string;
    metas: string;
    cnpj: string;
    cep: string;
    //telefone: string;
     emailCorporativo: string;
    //siteStartup: string;
    emailPessoal: string;
    quantidadeFuncionario: string;
    responsavelCadastro: string;
    logradouro: string;
    numero: string;
    municipio: string;
    senha: string;
    ticketMedio: string;
    tipoCliente: string;
    confirmarSenha: string;
    atuacoes: NovaStartupAtuacao[];
    imagens: NovaStartupImagem[];


}

export interface NovaStartupAtuacao {
    atuacaoId: string;
}

export interface NovaStartupImagem {
    tipoImagem: EnumTipoImagem;
    imagem: string;
}