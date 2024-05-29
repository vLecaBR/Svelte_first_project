<script lang="ts">
    import type IUsuario from "../intefaces/IUsuario";
    import { createEventDispatcher } from "svelte";
    import { buscaRepositorios, buscaUsuario } from "../requisicoes";
    import montaUser from "../utils/montaUser";
    import Botao from "./Botao.svelte";

    let valorInput = "";
    let statusDeErro: null | number = null;

    // dispatch é uma via de filho para pai e props de pai para filho, já o bind é uma via de mao dupla
    const dispatch = createEventDispatcher<{
        aoAlterarUser: IUsuario | null;
    }>();

    async function aoSubmeter(){
      const respostaUser = await buscaUsuario(valorInput);
      const repostaRepositorios = await buscaRepositorios(valorInput);

    if(respostaUser.ok && repostaRepositorios.ok){
      const respostaJson = await respostaUser.json()
      const dadosRepositorios = await repostaRepositorios.json();

      let dadosUsuario;

      dispatch("aoAlterarUser", 
      montaUser(respostaJson, dadosRepositorios));
      statusDeErro = null;

  }else{
    statusDeErro = respostaUser.status;
    dispatch('aoAlterarUser', null);
  }
}
</script>

<form on:submit|preventDefault={aoSubmeter}>
    <input 
    type="text" 
    class="input"
    class:erro-input={statusDeErro === 404}
    bind:value="{valorInput}" 
    placeholder="Pesquise aqui:"
    />

    {#if statusDeErro === 404}
    <span class="erro">Usuário não encontrado!</span>
    {/if}

    <div class="botao-container">
        <Botao>
          Buscar
        <img src="/assets/assets/lupa.svg" alt="icone de lupa" />
        </Botao>
    </div>
</form>

<style>
    .input {
    padding: 15px 25px;
    width: calc(100% - 8.75rem);
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #2e80fa;
    box-shadow: 0px 17px 52px rgba(222, 231, 247, 0.4);
    outline: 0;
  }

  .input::placeholder {
    font-family: "Roboto";
    font-style: italic;
    font-weight: 300;
    font-size: 19.5px;
    line-height: 26px;
    color: #6e8cba;
  }

  .botao-container {
    position: absolute;
    width: 9.625rem;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }

  .erro {
    position: absolute;
    bottom: -25px;
    left: 0;
    font-style: italic;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    z-index: -1;
    color: #ff003e;
  }

  .erro-input {
    border: 1px solid;
    border-color: #ff003e;
  }
  </style>