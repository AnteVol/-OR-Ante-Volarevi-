const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const app = express();
const session = require('express-session');

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const authCheck = require('E:\\Fakultet 3. godina\\5. Semestar\\OR\\Frontend&Backend\\public\\middleware\\chechLoggedIn.js');


require('dotenv').config();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'blablabla bla bla randomstring blabla',
  baseURL: 'http://localhost:3001',
  clientID: 'uNZjmUQA1iKzdDWCRN2w4nV4qASxmNWo',
  issuerBaseURL: 'https://dev-tk04gsco8lu1zmy3.us.auth0.com'
};

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ORlabos',
  password: 'bazepodataka',
  port: 5432,
});
const util = require('util');
const bodyParser = require('body-parser');
const queryAsync = util.promisify(pool.query).bind(pool);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth(config));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'OR',
  resave: false,
  saveUninitialized: true
}));

let logout = '';

app.get('/', (req, res) => {
  console.log(req.oidc.isAuthenticated());
  logout = req.query.logout || '';
  res.render("index", {isAuthenticated: req.oidc.isAuthenticated(), logout});
});

app.get('/login', authCheck, (req, res) => {
  console.log(req.oidc.isAuthenticated());
  if(req.oidc.isAuthenticated()){
    res.redirect("/")
    console.log("Već ste ulogirani sa Auth0 platformom")
  }else{
    logout = '';
    console.log("nedam")
    res.redirect("https://dev-tk04gsco8lu1zmy3.us.auth0.com/u/login?state=hKFo2SBxS1VjOUtlYU1ycjRZUS1KUU10aVlsUmZ1b1UyaWxnMaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIG9YRktiVkhCc05oZkxqXzhQbmVJLVZWS05WdGpmdmxBo2NpZNkgdU5aam1VUUExaUt6ZERXQ1JOMnc0blY0cUFTeG1OV28")
  }
});

app.get('/profile', (req, res) => {
  if(req.oidc.isAuthenticated())
    res.send(JSON.stringify(req.oidc.user));
  else {
    return res.status(401).send('Status 401! - Neovlašten pristup! Morate se prijaviti da bi mogli pristupisti ovoj stranici.');
  }
});

app.get('/download', async (req, res) => {
  
  const putanjaJson = 'E:\\Fakultet 3. godina\\5. Semestar\\OR\\Frontend&Backend\\public\\files\\Najnoviji.json';
  const putanjaCsv = 'E:\\Fakultet 3. godina\\5. Semestar\\OR\\Frontend&Backend\\public\\files\\Najnoviji.csv';
  if(req.oidc.isAuthenticated()){
  try {
    const result2 = await queryAsync(
      `COPY (
        SELECT jsonb_agg(row_to_json(podaciofakultetima, true))
        FROM (
          SELECT podaciofakultetima.*
          FROM podaciofakultetima
          NATURAL JOIN podaciofakultetima2
        ) AS subquery
        NATURAL JOIN podaciofakultetima
      ) TO '${putanjaJson}'`
    );

    const result3 = await queryAsync(
      `COPY (SELECT * FROM podaciofakultetima2)
       TO '${putanjaCsv}'
       WITH (ENCODING 'UTF8', DELIMITER ';', HEADER true)`
    );

     let message = 'Uspješno preuzete najnovije verzije .csv i .json datoteka!';
     let status = 'success';
     const currentTime = new Date().toLocaleTimeString();
     message = `${message} (Time: ${currentTime})`;

     res.render('downloaded', { message, status });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Error querying the database' });
  }
  }else {
    return res.status(401).send('Status 401! - Neovlašten pristup! Morate se prijaviti da bi mogli pristupisti ovoj stranici.');
  }
});

app.get('/logoutsite', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        console.log("logout sa stranice")
        
        res.redirect('/?logout=Successfully');
    });
});

app.get('/datatable', (req, res) => {
  pool.query('SELECT * FROM podaciofakultetima2', (error, result) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).send('Error querying the database');
    }
    const rows = result.rows;
    res.render('pretraga', { rows });
  });
});

app.post('/datatable', async (req, res) => {
  const trazi = req.body.text;
  const kategorija = req.body.kategorija;
  let zatraziti = '%' + trazi + '%';
  console.log(kategorija)

  if(kategorija === "sve"){
    try {
      const result1 = await queryAsync(
        'SELECT * FROM podaciofakultetima2 WHERE ' +
        ' CAST(rednibroj AS VARCHAR) LIKE $1 OR puninaziv LIKE $1 OR kratica LIKE $1 OR adresa LIKE $1 OR grad LIKE $1 OR pbr = $1 OR' +
        ' CAST(godinaosnivanja AS VARCHAR) LIKE $1 OR CAST(brojstudenata AS VARCHAR) LIKE $1 OR' +
        ' dekan LIKE $1 OR CAST(menza AS VARCHAR) LIKE $1 OR CAST(brojzaposlenika AS VARCHAR) LIKE $1 OR' +
        ' CAST(brstudija AS VARCHAR) LIKE $1 OR CAST(trajanje AS VARCHAR) LIKE $1 OR naziv LIKE $1 OR podaciofakultetima2.vrsta LIKE $1',
        [zatraziti]
      );

      const rows = result1.rows;

      const putanjaJson = 'E:\\Fakultet 3. godina\\5. Semestar\\OR\\Web\\public\\files\\Rezultati.json';
      const result2 = await queryAsync(
        `COPY (
            SELECT jsonb_agg(row_to_json(podaciofakultetima, true))
            FROM (
                SELECT podaciofakultetima.*
                FROM podaciofakultetima
                NATURAL JOIN podaciofakultetima2
                WHERE  CAST(podaciofakultetima2.rednibroj AS VARCHAR) LIKE '${zatraziti}'
                    OR podaciofakultetima2.puninaziv LIKE '${zatraziti}'
                    OR podaciofakultetima2.kratica LIKE '${zatraziti}'
                    OR podaciofakultetima2.adresa LIKE '${zatraziti}'
                    OR podaciofakultetima2.grad LIKE '${zatraziti}'
                    OR podaciofakultetima2.pbr = '${zatraziti}'
                    OR CAST(podaciofakultetima2.godinaosnivanja AS VARCHAR) LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.brojstudenata AS VARCHAR) LIKE '${zatraziti}'
                    OR podaciofakultetima2.dekan LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.menza AS VARCHAR) LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.brojzaposlenika AS VARCHAR) LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.brstudija AS VARCHAR) LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.trajanje AS VARCHAR) LIKE '${zatraziti}'
                    OR podaciofakultetima2.naziv LIKE '${zatraziti}'
                    OR podaciofakultetima2.vrsta LIKE '${zatraziti}'
                LIMIT (
                    SELECT COUNT(DISTINCT podaciofakultetima2.redniBroj)
                    FROM podaciofakultetima2
                    WHERE CAST(podaciofakultetima2.rednibroj AS VARCHAR) LIKE '${zatraziti}'
                        OR podaciofakultetima2.puninaziv LIKE '${zatraziti}'
                        OR podaciofakultetima2.kratica LIKE '${zatraziti}'
                        OR podaciofakultetima2.adresa LIKE '${zatraziti}'
                        OR podaciofakultetima2.grad LIKE '${zatraziti}'
                        OR podaciofakultetima2.pbr = '${zatraziti}'
                        OR CAST(podaciofakultetima2.godinaosnivanja AS VARCHAR) LIKE '${zatraziti}'
                        OR CAST(podaciofakultetima2.brojstudenata AS VARCHAR) LIKE '${zatraziti}'
                        OR podaciofakultetima2.dekan LIKE '${zatraziti}'
                        OR CAST(podaciofakultetima2.menza AS VARCHAR) LIKE '${zatraziti}'
                        OR CAST(podaciofakultetima2.brojzaposlenika AS VARCHAR) LIKE '${zatraziti}'
                        OR CAST(podaciofakultetima2.brstudija AS VARCHAR) LIKE '${zatraziti}'
                        OR CAST(podaciofakultetima2.trajanje AS VARCHAR) LIKE '${zatraziti}'
                        OR podaciofakultetima2.naziv LIKE '${zatraziti}'
                        OR podaciofakultetima2.vrsta LIKE '${zatraziti}'
                )
            ) AS subquery
            NATURAL JOIN podaciofakultetima
        ) TO '${putanjaJson}'`);

        const putanjaCsv = 'E:\\Fakultet 3. godina\\5. Semestar\\OR\\Web\\public\\files\\Rezultati.csv';
        const result3 = await queryAsync(
          `COPY (SELECT * from podaciofakultetima2  WHERE
            CAST(podaciofakultetima2.rednibroj AS VARCHAR) LIKE '${zatraziti}'
                    OR podaciofakultetima2.puninaziv LIKE '${zatraziti}'
                    OR podaciofakultetima2.kratica LIKE '${zatraziti}'
                    OR podaciofakultetima2.adresa LIKE '${zatraziti}'
                    OR podaciofakultetima2.grad LIKE '${zatraziti}'
                    OR podaciofakultetima2.pbr = '${zatraziti}'
                    OR CAST(podaciofakultetima2.godinaosnivanja AS VARCHAR) LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.brojstudenata AS VARCHAR) LIKE '${zatraziti}'
                    OR podaciofakultetima2.dekan LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.menza AS VARCHAR) LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.brojzaposlenika AS VARCHAR) LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.brstudija AS VARCHAR) LIKE '${zatraziti}'
                    OR CAST(podaciofakultetima2.trajanje AS VARCHAR) LIKE '${zatraziti}'
                    OR podaciofakultetima2.naziv LIKE '${zatraziti}' 
                    OR podaciofakultetima2.vrsta LIKE '${zatraziti}')
          TO '${putanjaCsv}'
          WITH  (  ENCODING 'UTF8',  DELIMITER ';',  HEADER true)`
        );

      res.render('datatable', {rows});
    } catch (error) {
      console.error('Error querying the database:', error);
      return res.status(500).send('Error querying the database');
    }
  }else{
    try {
    const kategorijazatraziti = kategorija;
    const result1 = await queryAsync(
    `SELECT* FROM podaciofakultetima2 WHERE CAST(podaciofakultetima2.${kategorijazatraziti} AS VARCHAR) LIKE '${zatraziti}'`);
    const rows = result1.rows;
    const putanjaJson = 'E:\\Fakultet 3. godina\\5. Semestar\\OR\\Web\\public\\files\\Rezultati.json';
    if(kategorija==='vrsta' || kategorija==='trajanje' || kategorija==='naziv'){
      const medukorak1 = await queryAsync(`CREATE VIEW podaci AS
      SELECT DISTINCT
          rednibroj,
          puninaziv,
          kratica,
          dekan,
          adresa,
          grad,
          pbr,
          brstudija,
          (SELECT jsonb_agg(jsonb_build_object('naziv', naziv, 'trajanje', trajanje, 'vrsta', vrsta))
          AS opisstudija FROM studijski_program sp WHERE CAST(sp.${kategorijazatraziti} AS VARCHAR) LIKE '${zatraziti}' AND
          sp.rednibroj = podaci_o_fakultetima.rednibroj) AS opisstudija,
          menza,
          godinaosnivanja,
          brojstudenata,
          brojzaposlenika
      FROM podaci_o_fakultetima
      `);
      const medukorak2 = await queryAsync(`
      COPY (
        SELECT jsonb_agg(row_to_json(podaci, true))
        FROM podaci WHERE opisstudija IS NOT NULL) TO '${putanjaJson}'
      `);
      const medukorak3 = await queryAsync(`DROP VIEW podaci`);
    }else{
      const medukorak1 = await queryAsync(`
      CREATE VIEW podaci AS
      SELECT DISTINCT
        rednibroj,
        puninaziv,
        kratica,
        dekan,
        adresa,
        grad,
        pbr,
        brstudija,
        (
          SELECT jsonb_agg(jsonb_build_object('naziv', naziv, 'trajanje', trajanje, 'vrsta', vrsta))
          AS opisstudija FROM studijski_program sp WHERE sp.rednibroj = podaci_o_fakultetima.rednibroj
        ) AS opisstudija,
        menza,
        godinaosnivanja,
        brojstudenata,
        brojzaposlenika
      FROM podaci_o_fakultetima
      WHERE CAST(podaci_o_fakultetima.${kategorijazatraziti} AS VARCHAR) LIKE '${zatraziti}'
    `);
    
      const medukorak2 = await queryAsync(`
      COPY (
        SELECT jsonb_agg(row_to_json(podaci, true))
        FROM podaci WHERE opisstudija IS NOT NULL) TO '${putanjaJson}'
      `);
      const medukorak3 = await queryAsync(`DROP VIEW podaci`);
    }
    const putanjaCsv = 'E:\\Fakultet 3. godina\\5. Semestar\\OR\\Web\\public\\files\\Rezultati.csv';
    const result3 = await queryAsync( 
      `COPY (SELECT * from podaciofakultetima2 WHERE
      CAST(podaciofakultetima2.${kategorijazatraziti} AS VARCHAR) LIKE '${zatraziti}')
      TO '${putanjaCsv}' WITH  (  ENCODING 'UTF8',  DELIMITER ';',  HEADER true)`);

    res.render('datatable', {rows});
  }catch (error) {
    console.error('Error querying the database:', error);
    return res.status(500).send('Error querying the database');
  }
}
});

app.get('/fakulteti', async (req, res) => {
  try {
    const result = await queryAsync(
      'SELECT * FROM podaciofakultetima');

    const rows = result.rows;
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'Nisu pronađeni traženi fakulteti',
        reponse: null
      });
    }
    const response = {
      rows,
      links: [
        {
          href: `/fakulteti`,
          rel: 'self',
          type: 'GET'
        }
      ]
    };
    res.json({
      status: 'OK',
      message: 'Fetched department object',
      response: response
    });
  } catch (error) {
    console.error('Greška prilikom dohvaćanja podataka iz baze:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom dohvaćanja podataka iz baze',
      reponse: null
    });
  }
});

app.get('/fakulteti/:id', async (req, res) => {
  const id = req.params.id;

  try {
    let result;
    if (id > 10) {
      result = await queryAsync(
        'SELECT * FROM podaciofakultetima2 ' +
        'WHERE CAST(rednibroj AS VARCHAR) LIKE $1', [id]);
    } else {
      result = await queryAsync(
        'SELECT * FROM podaciofakultetima ' +
        'WHERE CAST(rednibroj AS VARCHAR) LIKE $1', [id]);
    }

    const rows = result.rows;
    if (rows.length === 0) {
      return res.status(404).json({
        status: '404',
        message: 'Ne postoji fakultet sa traženim ID-om',
        reponse: null
      });
    }

    const formattedResponse = {
      "@context": {
        "@vocab": "http://schema.org/",
        "rednibroj": "identifier",
        "naziv": "name",
        "adresa": "address",
        "PostalAddress": "PostalAddress",
        "ulica": "streetAddress",
        "grad": "addressLocality",
        "addressRegion": "addressRegion",
        "pbr": "postalCode",
        "description": "description",
        "dekan": "founder",
        "godinaosnivanja": "foundingDate",
        "brojStudenata": "maximumAttendeeCapacity",
        "brojZaposlenika": "numberOfEmployees",
        "opisstudija": "hasCourse",
        "EducationalOccupationalProgram": "EducationalOccupationalProgram",
        "trajanje": "timeToComplete",
        "vrsta": "programType",
        "kratica": "alternateName"
      },
      "@type": "CollegeOrUniversity",
      "rednibroj": rows[0].rednibroj,
      "naziv": rows[0].puninaziv,
      "kratica": rows[0].kratica,
      "adresa": {
        "@type": "PostalAddress",
        "ulica": rows[0].ulica,
        "grad": rows[0].grad,
        "addressRegion": rows[0].grad,
        "pbr": rows[0].pbr
      },
      "dekan": {
        "@type": "Person",
        "naziv": rows[0].dekan
      },
      "godinaosnivanja": rows[0].godinaosnivanja,
      "brojStudenata": rows[0].brojstudenata,
      "brojZaposlenika": rows[0].brojzaposlenika,
      "menza" : rows[0].menza,
      "brstudija" : rows[0].brstudija,
      "opisstudija": rows[0].opisstudija.map(program => ({
        "@type": "EducationalOccupationalProgram",
        "naziv": program.naziv,
        "vrsta": program.vrsta,
        "trajanje": `P${program.trajanje}Y`
      }))
    };
    console.log(rows[0].opisstudija)
    res.json({
      status: 'OK',
      message: 'Fetched department object',
      response: formattedResponse
    });
  } catch (error) {
    console.error('Greška prilikom dohvaćanja podataka iz baze:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom dohvaćanja podataka iz baze',
      reponse: null
    });
  }
});

app.get('/fakulteti/grad/:grad', async (req, res) => {
  const grad = req.params.grad;

  try {
    const result = await queryAsync(
      'SELECT * FROM podaciofakultetima ' +
      'WHERE CAST(grad AS VARCHAR) LIKE $1', [grad]);

    const rows = result.rows;
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'Ne postoje fakulteti u tom gradu',
        reponse: null
      });
    }
    const formattedResponse = {
      "@context": {
        "@vocab": "http://schema.org/",
        "rednibroj": "identifier",
        "naziv": "name",
        "adresa": "address",
        "PostalAddress": "PostalAddress",
        "ulica": "streetAddress",
        "grad": "addressLocality",
        "addressRegion": "addressRegion",
        "pbr": "postalCode",
        "description": "description",
        "dekan": "founder",
        "godinaosnivanja": "foundingDate",
        "brojStudenata": "maximumAttendeeCapacity",
        "brojZaposlenika": "numberOfEmployees",
        "opisstudija": "hasCourse",
        "EducationalOccupationalProgram": "EducationalOccupationalProgram",
        "trajanje": "timeToComplete",
        "vrsta": "programType",
        "kratica": "alternateName"
      },
      "@type": "CollegeOrUniversity",
      "rednibroj": rows[0].rednibroj,
      "naziv": rows[0].puninaziv,
      "kratica": rows[0].kratica,
      "adresa": {
        "@type": "PostalAddress",
        "ulica": rows[0].ulica,
        "grad": rows[0].grad,
        "addressRegion": rows[0].grad,
        "pbr": rows[0].pbr
      },
      "dekan": {
        "@type": "Person",
        "naziv": rows[0].dekan
      },
      "godinaosnivanja": rows[0].godinaosnivanja,
      "brojStudenata": rows[0].brojstudenata,
      "brojZaposlenika": rows[0].brojzaposlenika,
      "menza" : rows[0].menza,
      "brstudija" : rows[0].brstudija,
      "opisstudija": rows[0].opisstudija.map(program => ({
        "@type": "EducationalOccupationalProgram",
        "naziv": program.naziv,
        "vrsta": program.vrsta,
        "trajanje": `P${program.trajanje}Y`
      }))
    };
    console.log(rows[0].opisstudija)
    res.json({
      status: 'OK',
      message: 'Fetched department object',
      response: formattedResponse
    });
  } catch (error) {
    console.error('Greška prilikom dohvaćanja podataka iz baze:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom dohvaćanja podataka iz baze',
      reponse: null
    });
  }
});

app.get('/fakulteti/kratica/:kratica', async (req, res) => {
  const kratica = req.params.kratica;

  try {
    const result = await queryAsync(
      'SELECT * FROM podaciofakultetima ' +
      'WHERE CAST(kratica AS VARCHAR) LIKE $1', [kratica]);

    const rows = result.rows;
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'Ne postoji fakultet sa tom kraticom',
        reponse: null
      });
    }
    const formattedResponse = {
      "@context": {
        "@vocab": "http://schema.org/",
        "rednibroj": "identifier",
        "naziv": "name",
        "adresa": "address",
        "PostalAddress": "PostalAddress",
        "ulica": "streetAddress",
        "grad": "addressLocality",
        "addressRegion": "addressRegion",
        "pbr": "postalCode",
        "description": "description",
        "dekan": "founder",
        "godinaosnivanja": "foundingDate",
        "brojStudenata": "maximumAttendeeCapacity",
        "brojZaposlenika": "numberOfEmployees",
        "opisstudija": "hasCourse",
        "EducationalOccupationalProgram": "EducationalOccupationalProgram",
        "trajanje": "timeToComplete",
        "vrsta": "programType",
        "kratica": "alternateName"
      },
      "@type": "CollegeOrUniversity",
      "rednibroj": rows[0].rednibroj,
      "naziv": rows[0].puninaziv,
      "kratica": rows[0].kratica,
      "adresa": {
        "@type": "PostalAddress",
        "ulica": rows[0].ulica,
        "grad": rows[0].grad,
        "addressRegion": rows[0].grad,
        "pbr": rows[0].pbr
      },
      "dekan": {
        "@type": "Person",
        "naziv": rows[0].dekan
      },
      "godinaosnivanja": rows[0].godinaosnivanja,
      "brojStudenata": rows[0].brojstudenata,
      "brojZaposlenika": rows[0].brojzaposlenika,
      "menza" : rows[0].menza,
      "brstudija" : rows[0].brstudija,
      "opisstudija": rows[0].opisstudija.map(program => ({
        "@type": "EducationalOccupationalProgram",
        "naziv": program.naziv,
        "vrsta": program.vrsta,
        "trajanje": `P${program.trajanje}Y`
      }))
    };
    console.log(rows[0].opisstudija)
    res.json({
      status: 'OK',
      message: 'Fetched department object',
      response: formattedResponse
    });
  } catch (error) {
    console.error('Greška prilikom dohvaćanja podataka iz baze:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom dohvaćanja podataka iz baze',
      reponse: null
    });
  }
});

app.get('/fakulteti/brst/:brst', async (req, res) => {
  const brst = req.params.brst;

  try {
    const result = await queryAsync(
      'SELECT * FROM podaciofakultetima ' +
      'WHERE CAST(brstudija AS VARCHAR) LIKE $1', [brst]);

    const rows = result.rows;
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'Ne postoje fakulteti sa traženim brojem studija',
        reponse: null
      });
    }
    const context = {
      "@context": {
        "@vocab": "http://schema.org/",
        "rednibroj": "identifier",
        "naziv": "name",
        "adresa": "address",
        "PostalAddress": "PostalAddress",
        "ulica": "streetAddress",
        "grad": "addressLocality",
        "addressRegion": "addressRegion",
        "pbr": "postalCode",
        "description": "description",
        "dekan": "founder",
        "godinaosnivanja": "foundingDate",
        "brojStudenata": "maximumAttendeeCapacity",
        "brojZaposlenika": "numberOfEmployees",
        "opisstudija": "hasCourse",
        "EducationalOccupationalProgram": "EducationalOccupationalProgram",
        "trajanje": "timeToComplete",
        "vrsta": "programType",
        "kratica": "alternateName"
      }
    };
    
    const formattedResponse = {
      ...context,
      "@type": "CollegeOrUniversity",
      "rednibroj": rows.rednibroj,
      "naziv": rows.puninaziv,
      "kratica": rows.kratica,
      "adresa": {
        "@type": "PostalAddress",
        "ulica": rows.ulica,
        "grad": rows.grad,
        "addressRegion": rows.grad,
        "pbr": rows.pbr
      },
      "dekan": {
        "@type": "Person",
        "naziv": rows.dekan
      },
      "godinaosnivanja": rows.godinaosnivanja,
      "brojStudenata": rows.brojstudenata,
      "brojZaposlenika": rows.brojzaposlenika,
      "menza" : rows.menza,
      "brstudija" : rows.brstudija,
      "opisstudija": rows.opisstudija.map(program => ({
        "@type": "EducationalOccupationalProgram",
        "naziv": program.naziv,
        "vrsta": program.vrsta,
        "trajanje": `P${program.trajanje}Y`
      }))
    };
    res.json({
      status: 'OK',
      message: 'Fetched department object',
      response: formattedResponse
    });
  } catch (error) {
    console.error('Greška prilikom dohvaćanja podataka iz baze:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom dohvaćanja podataka iz baze',
      reponse: null
    });
  }
});

app.post('/fakulteti/post', async (req, res) => {
  let pom = await queryAsync('SELECT max(rednibroj) FROM podaciofakultetima2');
  let novi_id = pom.rows[0].max;
  console.log(novi_id);
  const unos = req.query;
  novi_id = novi_id + 1;
  try {
    const { fakulteti } = await queryAsync('INSERT INTO podaciofakultetima2 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) '+
    'RETURNING *', [novi_id, unos.puninaziv, unos.kratica, unos.adresa, unos.grad, unos.pbr, unos.godinaosnivanja,
       unos.brojstudenata, unos.dekan, unos.menza, unos.brstudija, unos.zaposlenika, unos.naziv, unos.tranjanje, unos.vrsta]);
    const { studij } = await queryAsync('INSERT INTO studijski_program VALUES ($1, $2, $3, $4) '+
    'RETURNING *', [novi_id, unos.naziv, unos.tranjanje, unos.vrsta]);
    res.status(201).json({
      status: 'Created',
      data: fakulteti
    });
  } catch (error) {
    console.error('Greška prilikom dodavanja podatka u bazu:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom dodavanja podatka u bazu',
      reponse: null
    });
  }
});


app.put('/fakulteti/put/:id', async (req, res) => {
  const id = req.params.id;

  const { puninaziv, kratica, adresa, grad, pbr, godinaosnivanja, brojstudenata, dekan, menza, brstudija, zaposlenika, naziv, tranjanje, vrsta } = req.query;

  const requiredParams = ['puninaziv', 'kratica', 'adresa', 'grad', 'pbr', 'godinaosnivanja', 'brojstudenata', 'dekan', 'menza', 'brstudija', 'zaposlenika', 'naziv', 'tranjanje', 'vrsta'];
  const missingParams = requiredParams.filter(param => req.query[param] === undefined);


  const updateColumns = Object.keys(req.query).map(param => `${param} = \'${req.query[param]}\'`).join(', ');
  console.log(updateColumns)
  const updateQuery = `UPDATE podaciofakultetima2 SET ${updateColumns} WHERE rednibroj = $1  RETURNING * `;

  try {
    const { rows } = await queryAsync(updateQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'Ne postoji fakultet s tim ID-om za ažurirati',
        reponse: null
      });
    }

    res.json({
      status: 'success',
      message: 'Podaci ažurirani',
      data: rows[0],
    });
  } catch (error) {
    console.error('Greška prilikom ažuriranja podataka u bazi:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom ažuriranja podataka u bazi',
      reponse: null
    });
  }
});




app.delete('/fakulteti/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const { rows } = await queryAsync('DELETE FROM podaciofakultetima2 WHERE rednibroj = $1 RETURNING *', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'Ne postoji fakultet s tim ID-om za izbisati',
        reponse: null
      });
    }

    res.json({
      status: 'success',
      message: 'Podatak je izbrisan',
      response : rows
    });
  } catch (error) {
    console.error('Greška prilikom brisanja podatka iz baze:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom brisanja podatka iz baze',
      reponse: null
    });
  }
});

app.get('/openapi', (req, res) => {
  try {
    const openApi = fs.readFileSync('E:\\Fakultet 3. godina\\5. Semestar\\OR\\openapi.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(openApi);
  } catch (error) {
    console.error('Greška prilikom otvaranja OpenAPI specifikacije:', error);
    res.status(500).json({
      status: 'Internal server error',
      message: 'Greška prilikom otvaranja OpenAPI specifikacije',
      response: null
    });
  }

});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
