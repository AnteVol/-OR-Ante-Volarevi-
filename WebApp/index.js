const express = require('express');
const { Pool } = require('pg');
const path = require('path'); // Dodajte ovu liniju za uvoz 'path' modula
const app = express();
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
