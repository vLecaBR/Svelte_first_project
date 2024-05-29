import type IUsuario from "../intefaces/IUsuario";
import type Irepositorio from "../intefaces/Irepositorio";

export default function montaUser(respostaJson: any, dadosRepositorios: any): IUsuario{
    const repositorios_recentes = dadosRepositorios.map((repositorio) => {
        return{
            nome: repositorio.name,
            url: repositorio.url
        }as Irepositorio;
    });

    return{
        nome: respostaJson.name,
        login: respostaJson.login,
        avatar_url: respostaJson.avatar_url,
        perfil_url: respostaJson.html_url,
        repositorios_publicos: respostaJson.public_repos,
        seguidores: respostaJson.followers,
        repositorios_recentes
    };
}