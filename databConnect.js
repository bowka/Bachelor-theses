module.exports ={
	Pripojenie: function(){
		this.uzivatelia
		this.mysql      = require('mysql');
		this.connection = this.mysql.createConnection({
	    host     : '127.0.0.1',
	    user     : 'root',
	    password : '',
	    database : 'bc',

		});
		this.connection.connect();
		//function(err) {
		// 	var query = connection.query('SELECT * FROM hrac');
  // 			console.log('connected! (unless `err` is set)'+query);
		// });


		this.getUzivatelia=function(zapisUzivatelov){
			var r;
			var hrac='select * from uzivatelia';	
			r=this.connection.query(hrac, function(err, rows, fields) {
			    if (err) throw err;			    				  
		 		//console.log(rows);
		 		console.log("query successful.")
		 		//console.log(rows);
		 		zapisUzivatelov(null,rows);
			});
			// return r;			
		}

		this.getFarby=function(zapisFarby){
			var r;
			var farby='select * from farby';
			r= this.connection.query(farby, function(err, rows, fields) {
			    if (err) throw err;
			 	//console.log(rows);	   			
			 	zapisFarby(null,rows)
			});			
		}
		this.getZvierata=function(zapisZvierata){
			var r;
			var zvierata='select * from zvierata';
			r=this.connection.query(zvierata,function(err,rows,fields){
				if (err) throw err;
				zapisZvierata(null,rows);
			});
		}
		this.getStatistikaF=function(zapisStatistikaF,socket){
			var r;
			var stat='SELECT uzivatel_id, meno, sum(case when spravne =1 then pocet else 0 end) as spravne_pocet, sum(case when spravne =0 then pocet else 0 end) as nespravne_pocet FROM uspesnost_farba  LEFT JOIN uzivatelia  ON uzivatelia.id = uzivatel_id  GROUP BY uzivatel_id';			
			r=this.connection.query(stat,function(err,rows,fields){
				if (err) throw err;
				zapisStatistikaF(null,rows,socket);

			});	
		}
		this.getStatistikaZ=function(zapisStatistikaZ,socket){
			var r;
			var stat='SELECT uzivatel_id, meno, sum(case when spravne =1 then pocet else 0 end) as spravne_pocet, sum(case when spravne =0 then pocet else 0 end) as nespravne_pocet FROM uspesnost_zviera LEFT JOIN uzivatelia  ON uzivatelia.id = uzivatel_id  GROUP BY uzivatel_id';			
			r=this.connection.query(stat,function(err,rows,fields){
				if (err) throw err;
				zapisStatistikaZ(null,rows,socket);
			});	
		}
		this.updateStatistikaF=function(uziv_id,rgb,res,slovo){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			var dat=yyyy+"-"+mm+"-"+dd;
			var stat='insert into uspesnost_farba (pocet,uzivatel_id,rgb,spravne,slovom,datum) values (1,?,?,?,?,?) ON DUPLICATE KEY UPDATE pocet=pocet+1';
			r=this.connection.query(stat,[uziv_id,rgb,res,slovo,dat],function(err){
				if (err) throw err;
			});
		}
		this.getStatistikaDieta=function(zapisStatistikaDieta,uziv_id,socket){
			var r;
			var stat='SELECT 	f.uzivatel_id, f.datum, f.spravne as spravne_farby, f.nespravne as nespravne_farby,        z.spravne as spravne_zvierata, z.nespravne as nespravne_zvierata FROM (SELECT uzivatel_id, datum, sum(CASE WHEN spravne = 1 THEN pocet ELSE 0 END) as spravne, sum(CASE WHEN spravne = 0 THEN pocet ELSE 0 END) as nespravne  FROM uspesnost_farba WHERE uzivatel_id = ? GROUP BY datum) AS f JOIN  (SELECT uzivatel_id, datum, sum(CASE WHEN spravne = 1 THEN pocet ELSE 0 END) as spravne, sum(CASE WHEN spravne = 0 THEN pocet ELSE 0 END) as nespravne  FROM uspesnost_zviera WHERE uzivatel_id = ? GROUP BY datum) AS z  ON f.datum = z.datum';
			r=this.connection.query(stat,[uziv_id,uziv_id],function(err,rows,fields){
				if (err) throw err;
				zapisStatistikaDieta(null,rows,socket);
			});	
		}
		
		this.updateStatistikaZ=function(uzivatel_id,hlava,telo,res){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			var dat=yyyy+"-"+mm+"-"+dd;
			var stat='insert into uspesnost_zviera (pocet,uzivatel_id,telo,spravne,hlava,datum) values (1,?,?,?,?,?) ON DUPLICATE KEY UPDATE pocet=pocet+1';
			r=this.connection.query(stat,[uzivatel_id,telo,res,hlava,dat],function(err){
				if (err) throw err;
			});
		}
	}
}
// alter table uspesnost_zviera  add primary key (uzivatel_id,telo,hlava,spravne,datum)
// select uzivatel_id, sum(spravne=1) as spravne_pocet, sum(spravne=0) as nespravne_pocet from uspesnost_farba group by uzivatel_id

// select count(main.spravne), ncount, main.uzivatel_id from uspesnost_farba as main  where main.spravne=1 group by main.uzivatel_id

// join (
//     select count(spravne) as ncount, uzivatel_id from uspesnost_farba  where spravne=0 group by uzivatel_id
//     ) as sub
// on sub.uzivatel_id = main.uzivatel_id



// select uzivatel_id,meno, sum(spravne=1) as spravne_pocet, sum(spravne=0) as nespravne_pocet from uspesnost_zviera 
// left join uzivatelia as uz on uzivatel_id=uz.id
// group by uzivatel_id

// SELECT uzivatel_id, meno, sum(spravne=1) as spravne_pocet, sum(spravne=0) as nespravne_pocet FROM uspesnost_farba
// LEFT JOIN uzivatelia
// ON uzivatelia.id = uzivatel_id
// GROUP BY uzivatel_id




// SELECT uf.datum, 
// sum(case when uf.spravne =1 then uf.pocet else 0 end) as spravne_pocet_f, 
// sum(case when uf.spravne =0 then uf.pocet else 0 end) as nespravne_pocet_f ,
// sum(case when uz.spravne =1 then uz.pocet else 0 end) as spravne_pocet_z, 
// sum(case when uz.spravne =0 then uz.pocet else 0 end) as nespravne_pocet_z 

// FROM uspesnost_zviera as uz 
// JOIN uspesnost_farba as uf on uf.uzivatel_id=uz.uzivatel_id  
// where uf.uzivatel_id=7
// GROUP BY uf.datum 

// -----------------
// SELECT 	f.uzivatel_id, f.datum, 
// 		f.spravne as spravne_farby, f.nespravne as nespravne_farby,
//         z.spravne as spravne_zvierata, z.nespravne as nespravne_zvierata FROM 
// (SELECT
//  uzivatel_id, datum,
//  sum(CASE WHEN spravne = 1 THEN pocet ELSE 0 END) as spravne,
//  sum(CASE WHEN spravne = 0 THEN pocet ELSE 0 END) as nespravne
 
//  FROM uspesnost_farba
//  WHERE uzivatel_id = 1
//  GROUP BY datum) AS f
// JOIN 
//  (SELECT
//  uzivatel_id, datum,
//  sum(CASE WHEN spravne = 1 THEN pocet ELSE 0 END) as spravne,
//  sum(CASE WHEN spravne = 0 THEN pocet ELSE 0 END) as nespravne
 
//  FROM uspesnost_zviera
//  WHERE uzivatel_id = 1
//  GROUP BY datum) AS z
 
//  ON f.datum = z.datum
