export interface StartupContatos{
    id: string;
    conteudo: string;
    tipoContato: EnumTipoContato;
}

export enum EnumTipoContato {
    Email = 1,
    Telefone = 2,
    WhatsApp = 3,
    Linkedin = 4,
}

