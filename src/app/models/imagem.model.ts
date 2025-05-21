export interface StartupImagem {
    id: string;
    tipoImagem: EnumTipoImagem;
    imagem: string;
}

export enum EnumTipoImagem {
    Logo = 1,
    Propaganda = 2
}