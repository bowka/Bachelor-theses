var fs = require ('fs');
var express = require('express'); 
var app = express(); 
app.use('/',express.static(__dirname));
// const http = require('http').Server(app);

const hostname = '127.0.0.1';
const port = 3000;
const server = require ('http').createServer(app); 
var db=require('./databConnect');
var connect=new db.Pripojenie();
  // polia objektov:
var pouzivatelia=[];
var poleFarieb=[];
var poleZvierat=[];
var StatistikaF = new Statistika();
var StatistikaZ = new Statistika();
var ucitelia={}
var odkliknute={};
var pocetPercSpravnych=0;
var io = require('socket.io')(server);
var pripoj=pripojDB();
var pocetKariet=0;
var pocetSpravnychKlik=0;
var pocetSpravnych=0;
var UzivateliaSpravne={};

function koiecHry(){
 io.emit('koniecHry');
}



//objekty Uzivatel,Zviera,Farba
function Statistika(pocet,uzivatel_id,atr1,atr2,spravne,nespravne){
  this.spravne={}; //id_uz-key : value-pocet;
  this.nespravne={};
  this.mena={};
}
function Uzivatel(idecko,uc,meno){
  this.meno=meno;
  this.idd=idecko;
  this.jeUcitel=uc;
  this.spravne={};
  this.nespravne={};
  this.pocetSpravnych=0;
  this.pocetNespravnych=0;
}
function Farba(idecko,slovo,rgb){
  this.idd=idecko;
  this.slovo=slovo;
  this.rgb=rgb;
}
function Zviera(idecko,popis,hlava,telo){
  this.idd=idecko;
  this.popis=popis;
  this.hlava=hlava;
  this.telo=telo;
}
server.listen(port, hostname, () => {
  console.log(`Server bezi na http://${hostname}:${port}/`);
});
io.on('connection', function(socket){
    console.log('io pripojenie zapnute');
    socket.on('koniecHryPosielamID',function(id_uziv){
      if (id_uziv in ucitelia){
        socket.emit('koniecHryUcitel');
      }
      else{
        socket.emit('koniecHryZiak',UzivateliaSpravne[id_uziv]);
      }
    });
    socket.on('SpustiNovaHra', function(VygenerovanePole,Rozmery,Typ,Format,perc){  

      pocetKariet=Rozmery*Rozmery;
      pocetSpravnychKlik=0;
      pocetSpravnych=Math.round(Rozmery*Rozmery*perc/100);
      UzivateliaSpravne={}
      odkliknute={};

      console.log("nova hra "+pocetSpravnych);
      socket.broadcast.emit('NovaHra',VygenerovanePole,Typ,Rozmery);
      socket.emit('NovaHra',VygenerovanePole,Typ,Rozmery);
      });
    socket.on('pripojil_sa_id',function(ide_uziv){
      if (ide_uziv in ucitelia){
        socket.emit('vyhodnotJeUcitel',true);
      }
      else{
       socket.emit('vyhodnotJeUcitel',false); 
      }
    });
    socket.on ('dbZvierata',function(){      
      socket.emit('dbZvierataEMIT', poleZvierat);
    });
     socket.on ('dbFarby',function(){      
      socket.emit('dbFarbyEMIT', poleFarieb);
    });
    socket.on('aktualizujStatistikuFarby',function(){
      connect.getStatistikaF(nacitajStatistikaF,socket);
      // socket.emit()
    });
    socket.on('aktualizujStatistikuZviera',function(){
      connect.getStatistikaZ(nacitajStatistikaZ,socket);
      // socket.emit()
    });
    socket.on('ZiskajUdajeDietataEmit',function(idecko){
      connect.getStatistikaDieta(zapisStatistikaDieta,idecko,socket);
    });
    socket.on('nastavPerc',function(p){
      pocetPercSpravnych=p;
      // socket.emit()
    });
     //vyhodnotZviera
    socket.on('vyhodnotKartu',function(slovo,farba,ide_element,uzivatel_id){
        if (uzivatel_id in ucitelia){      
            console.log("ste ucitel a nemate pravo zasahovat do hry");
            return;
        } 
        else{
          if (ide_element in odkliknute){
            return;
          }
          odkliknute[ide_element]=true;
          for (u in pouzivatelia){
            if (pouzivatelia[u].idd==uzivatel_id){
              var clovek=pouzivatelia[u];
            }
          }                         
          res=false;
          for (prvok in poleFarieb){
              if (poleFarieb[prvok].slovo==slovo && poleFarieb[prvok].rgb==farba){
                  res=true;
                  clovek.spravne[slovo]=true;
                  clovek.pocetSpravnych += 1;
                  pocetSpravnychKlik++;                  
                  UzivateliaSpravne[uzivatel_id]= UzivateliaSpravne[uzivatel_id]+1|| 1;
                  break;
              }
          }
          if (!res){
            clovek.nespravne[slovo]=true;
            clovek.pocetNespravnych+=1;
          }
          udpate_statitka_farba(uzivatel_id,farba,res,slovo);          
          io.emit('vyhodnotenaKarta',ide_element,res);
          console.log(pocetSpravnychKlik);
          console.log(pocetSpravnych);
          if (pocetSpravnychKlik==pocetSpravnych){
            koiecHry();
          }
        }
      }
    );
    socket.on('vyhodnotZviera',function(slovo,hlava,telo,ide_element,uzivatel_id){
      if (uzivatel_id in ucitelia){
            console.log("ste ucitel a nemate pravo zasahovat do hry");
            return;
        }
      else{
        if (ide_element in odkliknute){
            return;
          }
          odkliknute[ide_element]=true;
          for (u in pouzivatelia){
            if (pouzivatelia[u].idd==uzivatel_id){
              var clovek=pouzivatelia[u];
            }
          }             
          res=false;
          for (prvok in poleZvierat){
              if (poleZvierat[prvok].hlava==hlava && poleZvierat[prvok].telo==telo){
                  res=true;
                  clovek.spravne[slovo]=true;
                  clovek.pocetSpravnych += 1;                  
                  pocetSpravnychKlik++;                  
                  UzivateliaSpravne[uzivatel_id]= UzivateliaSpravne[uzivatel_id]+1|| 1;
                  break;
              }
          }
          if (!res){
            clovek.nespravne[slovo];
            clovek.pocetNespravnych+=1;
          }
          
          udpate_statitka_zviera(uzivatel_id,hlava,telo,res);
          io.emit('vyhodnotenaKarta',ide_element,res);
          if (pocetSpravnychKlik==pocetSpravnych){
            koiecHry();
          }
        }
      }
    );
  });
function udpate_statitka_farba(id,rgb,spravne,slovo){
  //pocet,uzivatel_id,rgb,spravne,slovom
  connect.updateStatistikaF(id,rgb,spravne,slovo);
}
function udpate_statitka_zviera(uzivatel_id,hlava,telo,res){
  connect.updateStatistikaZ(uzivatel_id,hlava,telo,res);
}
function nacitajUzivatelov(err,dbRowsUzivatelia) {
  //id meno jeUcitel
  for (i in dbRowsUzivatelia) {    
      pouzivatelia.push(new Uzivatel(dbRowsUzivatelia[i].id,dbRowsUzivatelia[i].jeUcitel,dbRowsUzivatelia[i].meno));
      //uloz ucitelov
      if (dbRowsUzivatelia[i].jeUcitel==1){
        ucitelia[dbRowsUzivatelia[i].id]=true;
      }
  }
  // console.log(pouzivatelia);  
}
function nacitajFarby(err,dbRowsFarby){
  //[2, "modrá", "#2C04AB", 1], 
  for (i in dbRowsFarby){
    poleFarieb.push(new Farba(dbRowsFarby[i].id,dbRowsFarby[i].slovom,dbRowsFarby[i].atrament));
  }
  
  // console.log(poleFarieb);
}
function nacitajZvierata(err,dbRowsZvierata){
//[1,"krava","krava-hlava.png","krava-telo.png"],
  for (i in dbRowsZvierata){
      poleZvierat.push(new Zviera(dbRowsZvierata[i].id,dbRowsZvierata[i].popis,dbRowsZvierata[i].hlava,dbRowsZvierata[i].telo));
    }
    // console.log(poleZvierat);
}
function nacitajStatistikaZ(err,dbRowsStatZ,socket){
// (pocet,uzivatel_id,atr1,atr2,spravne){
  for (i in dbRowsStatZ){
    StatistikaZ.spravne[dbRowsStatZ[i].uzivatel_id]=dbRowsStatZ[i].spravne_pocet;
    StatistikaZ.nespravne[dbRowsStatZ[i].uzivatel_id]=dbRowsStatZ[i].nespravne_pocet;
    // console.log(dbRowsStatZ[i].uzivatel_id);
    // console.log(dbRowsStatZ[i].meno);
    StatistikaZ.mena[dbRowsStatZ[i].uzivatel_id]=dbRowsStatZ[i].meno;
    }
    socket.emit('posielamStatZ',StatistikaZ);
}
function nacitajStatistikaF(err,dbRowsStatF,socket){
  for (i in dbRowsStatF){
    StatistikaF.spravne[dbRowsStatF[i].uzivatel_id]=dbRowsStatF[i].spravne_pocet;
    StatistikaF.nespravne[dbRowsStatF[i].uzivatel_id]=dbRowsStatF[i].nespravne_pocet;
    // console.log(dbRowsStatF[i].uzivatel_id);
    // console.log(dbRowsStatF[i].meno);
    StatistikaF.mena[dbRowsStatF[i].uzivatel_id]=dbRowsStatF[i].meno;
    }
    socket.emit('posielamStatF',StatistikaF);
}
function zapisStatistikaDieta(err,dbRows,socket){
  var StatistikaDieta={}
   for (i in dbRows){
      var datumObj = dbRows[i].datum;
      var datumKluc = datumObj.getFullYear() + "-" + (datumObj.getMonth()+1)+ "-" +datumObj.getDate();
      StatistikaDieta[datumKluc]  =[dbRows[i].spravne_farby,dbRows[i].nespravne_farby,dbRows[i].spravne_zvierata,dbRows[i].nespravne_zvierata];
    }
    socket.emit('posielamStatDieta',StatistikaDieta);
}
function pripojDB(){	
	connect.getUzivatelia(nacitajUzivatelov);
  connect.getFarby(nacitajFarby);
  connect.getZvierata(nacitajZvierata);
}


