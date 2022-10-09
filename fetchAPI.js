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
        if(lastLink){
            document.getElementById('last').style.display = 'flex';
        }
        else{
            document.getElementById('last').style.display = 'none';
        }
        if(nextLink){
            document.getElementById('next').style.display = 'flex';
        }
        else{
            document.getElementById('next').style.display = 'none';
        }
    }
}

async function addAbilityImg(i,box,infoPokemonInPage){
    let linkInfo=infoPokemonInPage[i].url;
    let info = await fetch(linkInfo);
    let content = await info.text();
    let infoParse=JSON.parse(content)
    
    if(info.ok){
        for(let k=0; k<JSON.parse(content).abilities.length;k++){
            infoAbility[k]=infoParse.abilities[k].ability.name;//.results;
        }
        let abilityPokemon1 = document.createElement('span');
        abilityPokemon1.className = 'abilityPokemon';
        abilityPokemon1.innerHTML = infoAbility[0].toUpperCase();
        box.append(abilityPokemon1);

        let abilityPokemon2 = document.createElement('span');
        abilityPokemon2.className = 'abilityPokemon';
        abilityPokemon2.innerHTML = infoAbility[1].toUpperCase();
        box.append(abilityPokemon2);
        
        abilityPokemon1.style.display='none';
        abilityPokemon2.style.display='none';

        img=infoParse.sprites.front_default
        let imgPokemon = document.createElement('img');
        imgPokemon.className = 'imgPokemon';
        imgPokemon.src=img;
        box.append(imgPokemon);
        
        let btnPokemon = document.createElement('button');
        btnPokemon.className = infoPokemonInPage[i].name.toUpperCase();
        btnPokemon.id="btn";
        btnPokemon.innerHTML = 'Read more';
        box.append(btnPokemon);
        
        btnPokemon.addEventListener('click',(e)=>{
            // console.log(e.target);
            // let name=e.target.className;
            // console.log (name);
            abilityPokemon1.style.display='flex';
            abilityPokemon2.style.display='flex';
            btnPokemon.style.display='none';

            let btnPokemon2 = document.createElement('button');
            btnPokemon2.className = infoPokemonInPage[i].name.toUpperCase();
            btnPokemon2.id="btn2";
            btnPokemon2.innerHTML = 'all pokemon';
            box.append(btnPokemon2);

            btnPokemon2.addEventListener('click',()=>{
                abilityPokemon1.style.display='none';
                abilityPokemon2.style.display='none';
                btnPokemon2.style.display='none';
                btnPokemon.style.display='flex';
            });
        });
    }
}

function getMore(name){


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

