getInfo1('https://pokeapi.co/api/v2/pokemon/');
var infoAbility=[];
var nextLink,lastLink;



async function getInfo1(linkInfo){
    let info1 = await fetch(linkInfo);
    let content = await info1.text();
    let infoPokemonInPage=JSON.parse(content).results;
    nextLink=JSON.parse(content).next;
    lastLink=JSON.parse(content).previous;
    console.log(nextLink);
    console.log(JSON.parse(content));
    if (info1.ok){
        addPokemon(infoPokemonInPage);
        if(nextLink){
            document.getElementById('next').style.display = 'flex';
            //addNext();
        }
        if(nextLink){
            document.getElementById('next').style.display = 'flex';
            //addNext();
        }
        if(lastLink){
            document.getElementById('last').style.display = 'flex';
            //addNext();
        }
        else{
            document.getElementById('last').style.display = 'none';
        }
        
    }
}

// function addNext(){
//         btnNext = document.createElement('button');
//         btnNext.className = "btnNext";
//         btnNext.id='btnNext';
//         btnNext.innerHTML='Next';
//         btnBox.append(btnNext);
// }

async function addAbilityImg(i,box,infoPokemonInPage){
    let linkInfo=infoPokemonInPage[i].url;
    let info = await fetch(linkInfo);
    let content = await info.text();
    let infoParse=JSON.parse(content)
    
    if(info.ok){
        //let infoAbility=new Array;
        for(let k=0; k<JSON.parse(content).abilities.length;k++){
            infoAbility[k] = infoParse.abilities[k].ability.name;//.results;
        }
        let abilityPokemon1 = document.createElement('span');
        abilityPokemon1.className = 'abilityPokemon';
        abilityPokemon1.innerHTML = infoAbility[0].toUpperCase();
        box.append(abilityPokemon1);

        let abilityPokemon2 = document.createElement('span');
        abilityPokemon2.className = 'abilityPokemon';
        abilityPokemon2.innerHTML = infoAbility[1].toUpperCase();
        box.append(abilityPokemon2);
        
        img=infoParse.sprites.front_default
        let imgPokemon = document.createElement('img');
        imgPokemon.className = 'imgPokemon';
        imgPokemon.src=img;
        box.append(imgPokemon);
    }
}

function addPokemon (infoPokemonInPage){
        let page = document.createElement('div');
        page.className = "page";
        page.id='page'
        main.append(page);
    for(i=0;i<infoPokemonInPage.length;i++){
        let box = document.createElement('div');
        box.className = "box";
        box.id='box';
        page.append(box);
        
        let namePokemon = document.createElement('div');
        namePokemon.className = "namePokemon";
        namePokemon.innerHTML = infoPokemonInPage[i].name.toUpperCase();
        box.append(namePokemon);
        addAbilityImg(i,box,infoPokemonInPage);
    }
} 

function del() {
    //document.getElementById('page').style.display = 'none';
    let description=document.getElementById('page');
    description.remove()
    return;
  }

document
    .querySelector('#next')
    .addEventListener('click', nextPage);

    document
    .querySelector('#last')
    .addEventListener('click', lastPage);

function nextPage(){
    getInfo1(nextLink);
    del();
}
function lastPage(){
    getInfo1(lastLink);
    del();
}


    