
function Vykreslihru(){
	// $("#nastav").hide(1500);
	$("#graf").hide(1500);		
	$("#grafZviera").hide(1500);
	$("#hra").show(1500);
	$("#uvod").hide(1500);
	$("#grafDieta").hide(1500);
	clearInterval(intervalZvierataGraf);
	clearInterval(intervalFarbyGraf);
}
var intervalFarbyGraf=null;
var intervalZvierataGraf=null;
var graf=document.createElement("div");
graf.setAttribute("width","300px");
graf.setAttribute("height","100px");
graf.setAttribute("id","graf");

var graf2=document.createElement("div");
graf2.setAttribute("width","300px");
graf2.setAttribute("height","100px");
graf2.setAttribute("id","grafZviera");
var GD=null;
var containerGraf=document.createElement("div");
containerGraf.setAttribute("width","300px");
containerGraf.setAttribute("height","100px");
containerGraf.setAttribute("id","containerGraf");
containerGraf.appendChild(graf);
containerGraf.appendChild(graf2);

function Vykresligraph(){
	$("#uvod").hide(1500);
	$("#hra").hide(1500);
	$("#graf").show(1500);
	$("#grafZviera").show(1500);
	$("#containerGraf").show(1500);
  	intervalFarbyGraf=setInterval(function(){
		socket.emit('aktualizujStatistikuFarby');},500);
  	intervalZvierataGraf=setInterval(function(){
		socket.emit('aktualizujStatistikuZviera');},500);
	document.body.appendChild(containerGraf);
}
function getStFarby(){
	var slovnik = new Array();	
	socket.emit('dbStFarba');
    socket.on('dbStFarbaEMIT', statistika);
	for (ziak in statistika){
		socket.emit('dajZiakov');
    	socket.on('dajZiakovEMIT', Ziaci);
		statistika[uzivatelia[ziak].uzivatel_id]=statistika[ziak].pocet;
	}
	return slovnik;
}
function spat(){
	$("#nastav").hide(1500);
	$("#graf").hide(1500);		
	$("#hra").hide(1500);
	$("#uvod").show(1500);
	$("#containerGraf").hide(1500);
	window.clearInterval(intervalFarbyGraf);
	window.clearInterval(intervalZvierataGraf);
}

function ZiskajUdajeDietata(idecko){
	socket.emit('ZiskajUdajeDietataEmit',idecko);
}
socket.on('posielamStatDieta',function (StatistikaDieta){
	grafDietata(StatistikaDieta);
});

 socket.on('posielamStatF',function(statistika){
 	var graf=document.getElementById("graf");
 	while (graf.hasChildNodes()){
 		graf.removeChild(graf.lastChild); 	
 	}
 	var max=0;
 	for (i in statistika.spravne){
 		if (statistika.spravne[i]>max){
 			max=statistika.spravne[i];
 		}
 	}
 	for (i in statistika.nespravne){
 		if (statistika.nespravne[i]>max){
 			max=statistika.nespravne[i];
 		}
 	}
 	for (i in statistika.mena){
 		var bar=document.createElement("div");
 		bar.setAttribute("class","bar");
 		bar.setAttribute("onclick", "ZiskajUdajeDietata("+i+")");
 		var namebox=document.createElement("div");
 		namebox.innerHTML=	statistika.mena[i];
 		namebox.setAttribute("style","width:30%;height:30px;float:left;");
 		bar.appendChild(namebox);
 		var barbox=document.createElement("div");
 		barbox.setAttribute("style","width:70%;height:30px;float:left;");
 		var barspravne=document.createElement("div");
 		barspravne.setAttribute("class","spravne");
 		barspravne.innerHTML=statistika.spravne[i];
 		barspravne.setAttribute("style","width:"+0.9*100/max*statistika.spravne[i]+"%;");
 		barbox.appendChild(barspravne);
 		var barnespravne=document.createElement("div");
 		barnespravne.setAttribute("class","nespravne");
 		barnespravne.setAttribute("style","width:"+0.9*100/max*statistika.nespravne[i]+"%;");
 		barnespravne.innerHTML=statistika.nespravne[i];
 		barbox.appendChild(barnespravne);
 		bar.appendChild(barbox);
 		graf.appendChild(bar);
 	}
 	console.log(statistika);
 }) ;
socket.on('posielamStatZ',function(statistika){
 	var graf=document.getElementById("grafZviera");
 	while (graf.hasChildNodes()){
 		graf.removeChild(graf.lastChild); 	
 	}
 	var max=0;
 	for (i in statistika.spravne){
 		if (statistika.spravne[i]>max){
 			max=statistika.spravne[i];
 		}
 	}
 	for (i in statistika.nespravne){
 		if (statistika.nespravne[i]>max){
 			max=statistika.nespravne[i];
 		}
 	} 	
 	for (i in statistika.mena){
 		var bar=document.createElement("div");
 		bar.setAttribute("class","bar");
 		bar.setAttribute("onclick", "ZiskajUdajeDietata("+i+")");
 		var namebox=document.createElement("div");
 		namebox.innerHTML=	statistika.mena[i];
 		namebox.setAttribute("style","width:30%;height:30px;float:left;");
 		bar.appendChild(namebox);
 		var barbox=document.createElement("div");
 		barbox.setAttribute("style","width:70%;height:30px;float:left;");
 		var barspravne=document.createElement("div");
 		barspravne.setAttribute("class","spravne");
 		barspravne.innerHTML=statistika.spravne[i];
 		// barspravne.setAttribute("width",100/max*statistika.spravne[i]+"%");
 		barspravne.setAttribute("style","width:"+0.7*100/max*statistika.spravne[i]+"%;");
 		barbox.appendChild(barspravne);
 		var barnespravne=document.createElement("div");
 		barnespravne.setAttribute("class","nespravne");
 		barnespravne.setAttribute("style","width:"+0.7*100/max*statistika.nespravne[i]+"%;");
 		barnespravne.innerHTML=statistika.nespravne[i];
 		barbox.appendChild(barnespravne);
 		bar.appendChild(barbox);
 		graf.appendChild(bar);
 	}
 	console.log(statistika);
 }) 
function grafDietata(Stat){
	if (GD!=null){
		containerGraf.removeChild(GD);
	}
	GD=document.createElement("div");
	GD.setAttribute("id", "grafDieta");
	containerGraf.appendChild(GD);
	var xova=['x'];
	var FT=["spravne farby"];//farba true
	var FF=["nespravne farby"];//farba false
	var ZT=["spravne zvierata"];//zviera true
	var ZF=["nespravne zvierata"];//zviera dalse
	for (datum in Stat){
		console.log(datum);
		xova.push(datum);
		FT.push(Stat[datum][0]);
		FF.push(Stat[datum][1]);
		ZT.push(Stat[datum][2]);
		ZF.push(Stat[datum][3]);
	}
	console.log(xova);
	var chart = c3.generate({
	bindto: '#grafDieta',
    data: {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
        	xova,FT,FF,ZT,ZF
//             ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
// //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
//             ['data1', 30, 200,null, 400, 150, 250],
//             ['data2', 130, 340, 200, 500, 250, 350]
        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    }
});

// setTimeout(function () {
//     chart.load({
//         columns: [
//             ['data3', 400, 500, 450, 700, 600, 500]
//         ]
//     });
// }, 500);


}
