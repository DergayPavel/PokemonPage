var xhr= new XMLHttpRequest();
var next;
var infoPocemonInPage;
var xhrInfo= new XMLHttpRequest();
var pocemonAbility;
xhr.open(
    'GET', //что делаем
    'https://pokeapi.co/api/v2/pokemon/',//ссылка на апишку
    true  // вид запроса асинхронный-true
)

xhr.send();

xhr.onreadystatechange=function(){
    if(xhr.readyState !==4){  //1-начало запроса  2-получение заголовков  3-загрузка body 4-запрос завершен
        return
    }
    console.log('end');
    if(xhr.status ===200){
        console.log('result',JSON.parse(xhr.responseText));
        next=JSON.parse(xhr.responseText).next;
        infoPocemonInPage=JSON.parse(xhr.responseText).results;
        console.log(infoPocemonInPage);
    }
    else{
        console.log('err', xhr.responseText)
    }
}

function addPocemon (){
    let i=0;
    //for(i=0;i<infoPocemonInPage.length;i++){
        let box = document.createElement('div');
        box.className = "box";
        main.append(box);
        let namePocemon = document.createElement('div');
        namePocemon.className = "namePocemon";
        namePocemon.innerHTML = infoPocemonInPage[i].name.toUpperCase();
        box.append(namePocemon);
        let abilityPocemon = document.createElement('div');
        abilityPocemon.className = "abilityPocemon";
        getAbility(i);
        console.log(pocemonAbility);
    //}
}

function getAbility(i){
    linkInfo=infoPocemonInPage[i].url
    xhrInfo.open(
        'GET', //что делаем
        linkInfo,//ссылка на апишку
        true  // вид запроса асинхронный-true
    )
    xhrInfo.send();
    xhrInfo.onreadystatechange=function(){
        if(xhrInfo.readyState !==4){  //1-начало запроса  2-получение заголовков  3-загрузка body 4-запрос завершен
            return
        }
        console.log('end');
        if(xhrInfo.status ===200){
            console.log('result',JSON.parse(xhrInfo.responseText));
            pocemonAbility=JSON.parse(xhrInfo.responseText).abilities[0].ability.name;
        }
        else{
            console.log('err', xhrInfo.responseText)
        }
    }
}