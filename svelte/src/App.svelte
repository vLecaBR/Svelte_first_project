<script lang="ts">
    import Formulario from "./components/Formulario.svelte";
    import Titulo from "./components/Titulo.svelte";
    import Usuario from "./components/Usuario.svelte";
    import type IUsuario from "./intefaces/IUsuario";

	let usuario: IUsuario | null = null;
  function definirUser(evento: CustomEvent<IUsuario | null>){
   usuario = evento.detail
  }
</script>

<div class="app">
	<header>
		<Titulo/>   
		
		<div class="buscauser">
			<Formulario on:aoAlterarUser = {definirUser} />
		</div>
	</header>

	{#if usuario}
	<Usuario {usuario} />
	{/if}
</div>

<style>
  .app {
    max-height: 100vh;
  }

  header {    
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .buscauser {
    position: relative;
    width: 70%;
  }

  
</style>