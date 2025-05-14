import { Atuacao } from "./atuacoes.model";
import { StartupContatos } from "./contatos.model";
import { EnumTicketMedio } from "./enumTicketMedio.model";
import { EnumTipoDeAtendimento } from "./enumTipoAtendimento.model";
import { StartupImagem } from "./imagem.model";
import { StartupVideo } from "./videos.model";

export interface Startup {
    id?: number,
    nome: string,   
    descricao: string,
    metas: string,
    cnpj?: string,
    cep: string,
    logradouro: string,
    numero: string,
    bairro: string,
    municipio: string,
    uf: string,
    siteStartup?: string,
    quantidadeFuncionario: number,
    tipoAtendimento: EnumTipoDeAtendimento[],
    ticket: EnumTicketMedio[],
    responsavelCadastro: string,
    login: string,
    senha: string,
    atuacoes: Atuacao[],
    imagens : StartupImagem[],
    videos: StartupVideo[],
    contatos: StartupContatos[],
}

