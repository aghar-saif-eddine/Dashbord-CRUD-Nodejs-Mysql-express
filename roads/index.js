var express = require('express');
var router = express.Router();
var mysql = require("mysql");


// connection a la base de donnee 

var con = mysql.createConnection({
  database: "CRUD",
  host: "localhost",
  user: "root",
  password: "",
  debug: false,
  });
     con.connect(function() {
        console.log("connected successfully to Data base! ");
  });


/* redirect to  page d'accuiel lors lancement du server */

router.get("/", function(req, res, next) {
  res.render("index", {});
});

/* login administrateur  */

router.post("/loginadmin", function(req, res) {  
  var username = req.body.username;
  var password = req.body.password;
    if (username && password) {
    con.query('SELECT * FROM admin WHERE Nom_utlisateur= ? AND mot_de_passe = ?', [username, password], function(error, result, fields) {
          if (result ) {
             res.redirect('/home');
        } else {
           res.send('Nom d utilisateur ou mot de passe incorecte ');
        }           
        res.end();
    });
} else {
    res.send('Entrer votre mot de passe et votre nom d utlisateur');
    res.end();
}
 });

 /* charger la page login */

router.get("/loginadmin", function(req, res, next) {
  res.render("loginadmin", {});
});

/* recuperer la liste du docteurs */

router.get("/ListeDocteur" , function (req ,res,next) {
 con.query("SELECT * FROM `CRUD`.`medcin`", function(
     err,result,fields){
    res.render("ListeDocteur",{ result: result });
      });  
});

/* recuperer la liste du clients */

router.get("/ListeClients" , function (req ,res,next) {
  con.query("SELECT * FROM `CRUD`.`patient`", function(
    err,result,fields){
   res.render("ListeClients",{ result: result });
     }); 
});

/* redirect la page home lors que le login et le mot de passe est coorecte  */

router.get("/home", function(req, res, next) {
  con.query("SELECT COUNT (*) as count FROM `CRUD`.`medcin` ", function
    err,result,fields){
    let results =result[0].count;
     con.query("SELECT COUNT (*) as count1 FROM `pfe_ranya`.`patient` ", function(
      err,result,fields){
      let resultss =result[0].count1;
         res.render("home",{ results: results , resultss: resultss});
        }); 
    }); 
res.render("home");
});


/* ajouter un patient */

router.get("/AjouterClient", function(req, res, next) {
  res.render("AjouterClient",{}); 
});


router.post('/AjouterClient',function(req ,res,next){
      let num_FIC_PATIENT =req.body.num_FIC_PATIENT;
      let dat_FIC_PATIENT = req.body.dat_FIC_PATIENT;
      let nom_PATIENT =req.body.nom_PATIENT;
      let prenom_PATIENT =req.body.prenom_PATIENT;
      let cin_PATIENT =req.body.cin_PATIENT;
      let dat_NAI_PATIENT =req.body.dat_NAI_PATIENT;
      let prof_PATIENT =req.body.prof_PATIENT;
      let adr_PATIENT =req.body.adr_PATIENT;
      let tel_PATIENT =req.body.tel_PATIENT;
      let  num_RDV =req.body.num_RDV;


      con.query("INSERT INTO `pfe_ranya`.`patient` (num_FIC_PATIENT, dat_FIC_PATIENT, nom_PATIENT , prenom_PATIENT ,cin_PATIENT, dat_NAI_PATIENT , prof_PATIENT ,adr_PATIENT, tel_PATIENT ,num_RDV ) VALUES ('" +
      num_FIC_PATIENT +
        "', '" +
        dat_FIC_PATIENT +
         "', '" +
         nom_PATIENT +
          "', '" +
          prenom_PATIENT +
          "', '" +
          cin_PATIENT +
          "', '" +
          dat_NAI_PATIENT +
           "', '" +
           prof_PATIENT +
           "', '" +
           adr_PATIENT +
           "', '" +
           tel_PATIENT +
            "', '" +
            num_RDV +
            "')",function(err,result){
     res.send('patient added');
   });
 });
/*ajouter un docteur */

router.get("/AjouterDocteur", function(req, res, next) {
       res.render("AjouterDocteur",{}); 
});

 router.post('/AjouterDocteur',function(req ,res,next){
  let nom_MED =req.body.nom;
      let prenom_MED = req.body.prenom;
      let ard_MED =req.body.adresse;
      let datenaissance_MED =req.body.datenaissance;
      let tel_MED =req.body.telephone;
      con.query("INSERT INTO `pfe_ranya`.`medcin` (nom_MED, prenom_MED, ard_MED , datenaissance_MED ,tel_MED ) VALUES ('" +
        nom_MED +
        "', '" +
         prenom_MED +
         "', '" +
          ard_MED +
          "', '" +
          datenaissance_MED +
          "', '" +
           tel_MED +
          "')",function(err,result){
     res.send('docteur bien ajouter a la base de donnee');
   });
 });
/*edit patient */
router.get('/editP',function (req, res ,next) {
  con.query('SELECT * FROM patient WHERE id =?',req.query.id , function(err , result){
    res.render('editP',{ result: result[0] });
    });
});
router.post('/editP', function(req ,res ,next ){
      let id = req.query.id;
      let num_FIC_PATIENT =req.body.num_FIC_PATIENT;
      let dat_FIC_PATIENT = req.body.dat_FIC_PATIENT;
      let nom_PATIENT =req.body.nom_PATIENT;
      let prenom_PATIENT =req.body.prenom_PATIENT;
      let cin_PATIENT =req.body.cin_PATIENT;
      let dat_NAI_PATIENT =req.body.dat_NAI_PATIENT;
      let prof_PATIENT =req.body.prof_PATIENT;
      let adr_PATIENT =req.body.adr_PATIENT;
      let tel_PATIENT =req.body.tel_PATIENT;
      let  num_RDV =req.body.num_RDV;

  
  let sql = "UPDATE `patient` SET `num_FIC_PATIENT` = '" + num_FIC_PATIENT + "', `dat_FIC_PATIENT` = '" + dat_FIC_PATIENT + "', `nom_PATIENT` = '" + nom_PATIENT + "', `prenom_PATIENT` = '" + prenom_PATIENT + "', `cin_PATIENT` = '" + cin_PATIENT + "', `dat_NAI_PATIENT` = '" + dat_NAI_PATIENT + "', `prof_PATIENT` = '" + prof_PATIENT + "', `adr_PATIENT` = '" + adr_PATIENT + "', `tel_PATIENT` = '" + tel_PATIENT + "', `num_RDV` = '" + num_RDV + "' WHERE `patient`.`id` = '" + id + "'";
  con.query(sql, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.redirect('ListeClients');
  } ) ;  
    });


 /* edit medecin */
 router.get('/edit',function (req, res ,next) {
   con.query('SELECT * FROM medcin WHERE id_MED =?',req.query.id , function(err , result){
     res.render('edit',{ result: result[0] });
     });
 });
 router.post('/edit', function(req ,res ,next ){
let id_MED = req.query.id;
let nom_MED = req.body.nom;
let prenom_MED = req.body.prenom;
let ard_MED = req.body.adresse;
let datenaissance_MED = req.body.datenaissance;
let tel_MED =req.body.telephone;

let query = "UPDATE `medcin` SET `nom_MED` = '" + nom_MED + "', `prenom_MED` = '" + prenom_MED + "', `ard_MED` = '" + ard_MED + "', `datenaissance_MED` = '" + datenaissance_MED + "', `tel_MED` = '" + tel_MED + "' WHERE `medcin`.`id_MED` = '" + id_MED + "'";
con.query(query, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.redirect('ListeDocteur');
} ) ;  
  });
/* delete from medecin */
router.get('/delete', function(req , res ,next ){
  con.query('DELETE FROM medcin WHERE id_MED=?', req.query.id, function(err , result){
    res.redirect('/ListeDocteur');
  });
});

/*delete from patient */
router.get('/deleteP', function(req , res ,next ){
  con.query('DELETE FROM patient WHERE id=?', req.query.id, function(err , result){
    res.redirect('/ListeClients');
  });
});
 module.exports = router;
