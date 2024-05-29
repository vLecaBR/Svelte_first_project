import type Irepositorio from "./Irepositorio";

export default interface IUsuario {
    nome: string;
    login: string;
    avatar_url: string;
    perfil_url: string;
    repositorios_publicos: number;
    seguidores: number;
    repositorios_recentes: Irepositorio[];
}
