import { Atuacao } from "./atuacoes.model";
import { StartupImagem } from "./imagem.model";
import { StartupVideo } from "./videos.model";

export interface Startup {
    id?: number,
    nome: string,   
    descricao: string,
    metas: string,
    cnpj?: string,
    emailPessoal: string,
    emailCorporativo: string,
    telefoneFixo: string,
    linkedIn: string,
    cep: string,
    logradouro: string,
    numero: string,
    bairro: string,
    municipio: string,
    uf: string,
    quantidadeFuncionario: string,
    tipoCliente: string,
    ticket: string, // EnumTicketMedio[],
    responsavelCadastro: string,
    login: string,
    senha: string,
    logo: string,
    atuacoes: Atuacao[],
    imagens : StartupImagem[],
    videos: StartupVideo[],
}
