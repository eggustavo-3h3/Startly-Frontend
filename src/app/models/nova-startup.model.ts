import { EnumTipoImagem } from "./imagem.model";
export interface NovaStartup {
    login: string;
    nome: string;
    descricao: string;
    metas: string;
    cnpj: string;
    telefone: string;
    siteStartup: string;
    cep: string;
    emailCorporativo: string;
    emailPessoal: string;
    quantidadeFuncionario: string;
    responsavelCadastro: string;
    logradouro: string;
    numero: string;
    municipio: string;
    senha: string;
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