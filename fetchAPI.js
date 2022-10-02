getInfo1();
var infoPocemonInPage;
var infoAbility=[];
var nextLink;



async function getInfo1(){
    let info1 = await fetch('https://pokeapi.co/api/v2/pokemon/');
    let content = await info1.text();
    infoPocemonInPage=JSON.parse(content).results;
    console.log(infoPocemonInPage);
    if (info1.ok){
        addPocemon();
    }
}

async function addAbilityImg(i,box){
    let linkInfo=infoPocemonInPage[i].url;
    let info = await fetch(linkInfo);
    let content = await info.text();
    let infoParse=JSON.parse(content)
    
    if(info.ok){
        for(let k=0; k<JSON.parse(content).abilities.length;k++){
            infoAbility[k] = infoParse.abilities[k].ability.name;//.results;
        }
        let abilityPocemon1 = document.createElement('span');
        abilityPocemon1.className = 'abilityPocemon';
        abilityPocemon1.innerHTML = infoAbility[0].toUpperCase();
        box.append(abilityPocemon1);

        let abilityPocemon2 = document.createElement('span');
        abilityPocemon2.className = 'abilityPocemon';
        abilityPocemon2.innerHTML = infoAbility[1].toUpperCase();
        box.append(abilityPocemon2);
        
        img=infoParse.sprites.front_default
        let imgPocemon = document.createElement('img');
        imgPocemon.className = 'imgPocemon';
        imgPocemon.src=img;
        box.append(imgPocemon);

    }
}

function addPocemon (){
        for(i=0;i<infoPocemonInPage.length;i++){
        let box = document.createElement('div');
        box.className = "box";
        main.append(box);
        
        let namePocemon = document.createElement('div');
        namePocemon.className = "namePocemon";
        namePocemon.innerHTML = infoPocemonInPage[i].name.toUpperCase();
        box.append(namePocemon);
        addAbilityImg(i,box);
        
    }
}






    