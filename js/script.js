const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_n');
const pokemonImg = document.querySelector('.pokemon__img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next'); //puxar os elementos do html para o js

let searchPokemon = 1;

const fetchPokemon = async(pokemon) => { /* Constante que recebe uma função */

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //permite buscas na rede, retorna uma promessa, entre cràse pra juntar o ver pokemon na string com ${}.

    if(APIResponse.status == 200){ //200 quando encontra, 404 qnd não encontra
        const data = await APIResponse.json(); //Converter para json => formato para tranferencia servidor/cliente
        return data; // passa o json e não a response
    }    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...'; // acontecer imediatamente/antes do retorno
    pokemonId.innerHTML = '';
    const data = await fetchPokemon(pokemon); // daqui pra baixo só acontece DEPOIS do retorno

    if(data){ //se existir data
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
        input.value = ''; //limpar a caixa de input depois
    }else{
        pokemonImg.style.display = 'none'; //alterar o css apenas quando acontecer o else
        pokemonName.innerHTML = 'Não encontrado :C';
        pokemonId.innerHTML = '';
        
        input.value = '';
    }
}

form.addEventListener('submit', (event) => { // quando o evento acontecer executa a função, param é o objeto do evento

    event.preventDefault(); // ignorar sequência de eventos padrão

    renderPokemon(input.value.toLowerCase()); //puxar o que foi inserido no input na API com a função render
    
    //input.value = ''; vou deixar na função render por ser a função que lida com a tela/interface/view
} );

btnPrev.addEventListener('click', () => { // quando o evento acontecer executa a função
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
} );

btnNext.addEventListener('click', () => { // quando o evento acontecer executa a função
    
    searchPokemon += 1;
    renderPokemon(searchPokemon);
} );

renderPokemon('1');