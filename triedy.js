
$(document).ready(function () {
    // $("#ukazUvod").hide();
    $("#ukazUvod").click(function () {
        $("#uvod").show(1500);
    });    
});

var socket=io.connect('http://127.0.0.1:3000');
socket.emit('data',"posielam si toto",function (socket){
    console.log('data spracovane');
});
socket.on('novaHra'),function (){
     $("#uvod").show(1500);   
};

var perc=50;// x% spravnych rieseni  
socket.on('koniecHry',function(){
    socket.emit('koniecHryPosielamID',getID());
})  ;
socket.on('koniecHryUcitel',function(){
    var hra = getHraElement();   
    setTimeout(function(){
        var KS= document.createElement("p");
        KS.innerHTML="Hra sa skončila";
        hra.appendChild(KS);    
    },2000);
    
});
socket.on('koniecHryZiak',function(pocetSpravnych){
    var hra = getHraElement();   
    var KS= document.createElement("p");
    KS.innerHTML="Hra sa skončila, tvoje skóre je "+pocetSpravnych;
    hra.appendChild(KS);

});
socket.on('vyhodnotenaKarta',function (id,spravne) {
    console.log(id,spravne);
    var karta =document.getElementById(id);
    var vyska=$("#1").height();
    try{
        karta.innerHTML="";
    }
    catch (err){
        console.log("hras hru so zvieratkami");
    }
    karta.setAttribute("style","width:"+(100/Rozmery-1) +"%;height:"+(100/Rozmery-1)+"%;margin: 0.3%;");  
    var  obr=document.createElement("img");
    if (spravne){
        obr.setAttribute("src","obr/OK.png");                
    }
    else{
        obr.setAttribute("src","obr/Zle.png");                
    }
    obr.setAttribute("width","100%");
    obr.setAttribute("height","100%")
    karta.appendChild(obr);
}) ;

var Format=0;
var Rozmery=0;
var typ=0;
var VygenerovanePole=[];
var dbA=[]; 
var db=[];
socket.on('dbZvierataEMIT', function(poleZvierat) {dbA=poleZvierat});
socket.on('dbFarbyEMIT', function(poleFarieb){    db=poleFarieb;});

function NastavPerc(input){     perc=input;   }
function NastavFormu(f){        Format=f;   }
function NastavRozmery(r){      Rozmery=r;  }
function NastavTyp(t){
    typ=t;
    socket.emit('dbZvierata');
    socket.emit('dbFarby');
}

//c:\dir /b > files.txt
function ObjFarba(slovoS,farbaF,IDecko){
    this.slovo=slovoS;
    this.farba=farbaF;
    this.idd=IDecko;
}  
function ObjZviera(idecko,slovoS,hlavaH,teloT) {
    this.idd=idecko
    this.slovo=slovoS;
    this.hlava=hlavaH;
    this.telo=teloT;
}
function ObjHrac(id){
        this.id=id;
        this.spravne=[];
        this.nespravne=[];
}
function generujPole(Rozmery){
    VygenerovanePole=[];
    for (var i =0;i<Rozmery;i++) {
        var pole=[];
       VygenerovanePole.push(pole);
       for (var j =0;j<Rozmery;j++) {
            VygenerovanePole[i].push(null);
        }
    }
}
function generujSpravne(percentualne){
    var i=0;    
    var zaokruhlPerc=Math.round(Rozmery*Rozmery*percentualne/100);
    while (i<zaokruhlPerc){
        var R=Math.floor(Math.random()*Rozmery);
        var S=Math.floor(Math.random()*Rozmery);
        var nahodne=Math.floor(Math.random() * (db.length));
        if (VygenerovanePole[R][S] ==null){
            VygenerovanePole[R][S] = new ObjFarba(db[nahodne].slovo,db[nahodne].rgb,i);        
            i++;
        }
    }
}
function generujNespravne(percentualne){
   // var db=dajDB();
   percentual=Math.round(Rozmery*Rozmery*percentualne/100);
    for (var i = 0;i<Rozmery;i++){
        for (var j = 0;j<Rozmery;j++){        
            var nahodne=Math.floor(Math.random() * db.length);    
            var posun=Math.floor(Math.random() * db.length) ;
            if (posun==0){
                posun++;
            }    
            if (VygenerovanePole[i][j] ==null){                
                VygenerovanePole[i][j]= new ObjFarba(db[nahodne].slovo,db[(nahodne+posun)%db.length].rgb,percentual);                            
            percentual++;
            }
        }
    }
}       
function generujSpravneZvierata(percentualne){
   // "id":"5","popis":"kacka","hlava":"kacka-hlava.png",telo
    // dbA=dajDBA();
    // id slovo hlava telo

    console.log("generuj zverata");
    console.log(dbA);
    var i=0;
    var zaokruhlPerc=Math.round(Rozmery*Rozmery*percentualne/100);
    while (i<zaokruhlPerc){
        var R=Math.floor(Math.random()*Rozmery);
        var S=Math.floor(Math.random()*Rozmery);
        var nahodne=Math.floor(Math.random() * (dbA.length));
        if (VygenerovanePole[R][S] ==null){
            VygenerovanePole[R][S] = new ObjZviera(i,dbA[nahodne].popis,dbA[nahodne].hlava,dbA[nahodne].telo);        
            i++;
        }
    }
}   
function generujNespravneZvierata(percentualne){
   // dbA=dajDBA();
   percentual=Math.round(Rozmery*Rozmery*percentualne/100);
    for (var i = 0;i<Rozmery;i++){
        for (var j = 0;j<Rozmery;j++){        
            var nahodne=Math.floor(Math.random() * dbA.length);    
            var posun=Math.floor(Math.random() * dbA.length);  
            if (posun==0){
                posun++;
            }      
            if (VygenerovanePole[i][j] ==null){                
                VygenerovanePole[i][j]= new ObjZviera(percentual,dbA[nahodne].popis,dbA[nahodne].hlava,dbA[(nahodne+posun)%dbA.length].telo);                        
            percentual++;
            }
        }
    }
}      

function spustiJednotlivca(){        
}
function spustiSkupinu(){
}
function generujHru(R,F){
    NastavRozmery(R);
    NastavFormu(F);
    NastavPerc(perc);      
    generujPole(Rozmery);
    generujSpravne(perc);
    generujNespravne(perc);
    socket.emit('nastavPerc',Math.round(Rozmery*Rozmery*perc/100));   
}

function generujHruZvierata(R,F){
    NastavRozmery(R);
    NastavFormu(F);
    NastavPerc(perc);     
    generujPole(Rozmery);
    generujSpravneZvierata(perc);
    console.log("3");
    generujNespravneZvierata(perc);
    console.log("4");
    socket.emit('nastavPerc',Math.round(Rozmery*Rozmery*perc/100));   
    console.log("5");
}
function spustiNovuHru() {
	var chyba="";
    getHraElement();

	if (Format == 1 && Rozmery != 0 && typ==2) {
        generujHru(Rozmery,Format);            
        spustiJednotlivca();

	}
	else if (Format == 2 && Rozmery != 0 && typ==2) {
        generujHru(Rozmery,Format);                
        spustiSkupinu();
        
	}
    else if (Format == 1 && Rozmery != 0 && typ==1) {
        generujHruZvierata(Rozmery,Format);            
        spustiJednotlivca();
    }
    else if (Format == 2 && Rozmery != 0 && typ==1) {
        generujHruZvierata(Rozmery,Format);                
        spustiSkupinu();
    }

	else if (Format!=0 && Rozmery ==0){
		chyba="Nezvolili ste Rozmery hry!";
	}
	else if (Format ==0 && Rozmery!=0){
		chyba="Nezvolili ste Format hry!";
	}
	else if(Format==0 && Rozmery==0){
		chyba="Nezvolili ste ani Rozmery ani Format";
	}
    else if(typ==0){
        chyba="Nezvolili ste Typ";   
    }
	if (chyba==""){
	    $("#uvod").hide(1500);
        socket.emit('SpustiNovaHra',VygenerovanePole,Rozmery,typ,Format,perc);
	}
	else{
		alert(chyba);
	}
}
//http://paletton.com/#uid=13c0u0kllll1P7Md18NtEAD-0Vy
function vykresliKartyDB(){
    var hra = getHraElement();
    $('#hra').show();
    console.log(VygenerovanePole);
    // Obj : slovo,farba,ID
    for (var i=0; i<VygenerovanePole.length;i++){
        for (var j=0;j<VygenerovanePole[i].length;j++){
            var pecko=document.createElement("p");
            var s=VygenerovanePole[i][j].slovo;
            var idecko=VygenerovanePole[i][j].idd;
            var fa=VygenerovanePole[i][j].farba;
            var x = document.createElement("div");
            x.setAttribute("id",idecko);            
            x.setAttribute("style","color:white;margin: 0.3%;margin: 0.3%;background-color:"+ fa +";width:"+(100/Rozmery-1) +"%;height:"+(100/Rozmery-1)+"%;")//padding-bottom:"+(100/Rozmery/2-2.5) +"%;padding-top:"+(100/Rozmery/2-0.7) +"%;");              
            x.setAttribute("alt", idecko);            
            pecko.innerHTML=s;
            x.setAttribute("onclick","serverVyhodnotF('"+s+"','"+fa+"',"+idecko+")" );
            x.appendChild(pecko);
            hra.appendChild(x);
            var vyska=$("#"+idecko).height();
            x.setAttribute("style", x.getAttribute("style")+"line-height:"+vyska+"px;");
        }
    }
}

function  vykresliZvierataDB(){
    //anker point
    var hra = getHraElement();
    $('#hra').show();
    console.log(VygenerovanePole);
    for (var i=0; i<VygenerovanePole.length;i++){
        for (var j=0;j<VygenerovanePole[i].length;j++){
            var H=VygenerovanePole[i][j].hlava;
            var idecko=VygenerovanePole[i][j].idd;
            var T=VygenerovanePole[i][j].telo;
            var s=VygenerovanePole[i][j].slovo;
            var container = document.createElement("div");
            container.setAttribute("id",idecko);
            container.setAttribute("style","width:"+(100/Rozmery-1) +"%;float:left;height:"+(100/Rozmery-1)+"%;margin: 0.3%;");  
            container.setAttribute("alt", idecko);
            container.setAttribute("onclick", "serverVyhodnotZ('"+s+"','"+H+"','"+T+"',"+idecko+")");
            var telo=document.createElement("img");
            telo.setAttribute("width","65%;");
            telo.setAttribute("height","65%;");
            telo.setAttribute("style","position:absolute; bottom:0;left:0;");
            telo.setAttribute("src","obr/tvary/"+T);
            var hlava=document.createElement("img");
            hlava.setAttribute("width","60%;");
            hlava.setAttribute("height","60%;");
            hlava.setAttribute("style","position:absolute; right:0;");         
            hlava.setAttribute("src","obr/tvary/"+H);
            container.appendChild(telo);
            container.appendChild(hlava);
            hra.appendChild(container);
        }
    }                
}
function serverVyhodnotF(s,fa,idecko){
    socket.emit('vyhodnotKartu',s,fa,idecko,getID());
}
function serverVyhodnotZ(s,H,T,idecko){
    socket.emit('vyhodnotZviera',s,H,T,idecko,getID());
}

function zafarbiZle(ide){
    var  image= document.getElementById(ide);
    image.innerHTML="";
    image.src = "obr/OK.png";
}
function zafarbiDobre(ide){
    var  image= document.getElementById(ide);
    image.innerHTML="";
    image.src = "obr/Zle.png";
}
function getID(){
        var adresa=window.location.toString();
        var vyskyt = adresa.indexOf("?");
        var uzivatel_id=adresa.substring(vyskyt+1);
     return uzivatel_id;
}


function getHraElement() {
    var hra = document.getElementById("hra");
    if (hra == null || hra == undefined) {
        hra = document.createElement("div");    
        hra.setAttribute("id","hra");
        hra.setAttribute("style","width:"+ window.innerHeight+"px;padding-right:30%");
        document.body.appendChild(hra);
    } else {
        while (hra.hasChildNodes()) {
            hra.removeChild(hra.firstChild);
        }
    }
    return hra;
}
