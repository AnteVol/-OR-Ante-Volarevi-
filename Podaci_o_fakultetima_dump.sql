--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: podaci_o_fakultetima; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.podaci_o_fakultetima (
    rednibroj integer,
    puninaziv character varying(255),
    kratica character varying(255),
    adresa character varying(255),
    grad character varying(255),
    pbr character varying(255),
    godinaosnivanja integer,
    brojstudenata integer,
    dekan character varying(255),
    menza boolean,
    brstudija integer,
    brojzaposlenika integer
);


ALTER TABLE public.podaci_o_fakultetima OWNER TO postgres;

--
-- Name: podaciofakultetima; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.podaciofakultetima (
    rednibroj integer,
    puninaziv character varying(255),
    kratica character varying(255),
    adresa character varying(255),
    grad character varying(255),
    pbr character varying(255),
    godinaosnivanja integer,
    brojstudenata integer,
    dekan character varying(255),
    menza boolean,
    brstudija integer,
    brojzaposlenika integer,
    opisstudija jsonb
);


ALTER TABLE public.podaciofakultetima OWNER TO postgres;

--
-- Name: podaciofakultetima2; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.podaciofakultetima2 (
    rednibroj integer,
    puninaziv character varying(255),
    kratica character varying(255),
    adresa character varying(255),
    grad character varying(255),
    pbr character varying(255),
    godinaosnivanja integer,
    brojstudenata integer,
    dekan character varying(255),
    menza boolean,
    brstudija integer,
    brojzaposlenika integer,
    naziv character varying(255),
    trajanje integer,
    vrsta character varying(255)
);


ALTER TABLE public.podaciofakultetima2 OWNER TO postgres;

--
-- Name: privremena; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.privremena (
    rednibroj integer,
    puninaziv character varying(255),
    kratica character varying(255),
    adresa character varying(255),
    grad character varying(255),
    pbr character varying(255),
    godinaosnivanja integer,
    brojstudenata integer,
    dekan character varying(255),
    menza boolean,
    brstudija integer,
    brojzaposlenika integer,
    naziv character varying(255),
    trajanje integer,
    vrsta character varying(255)
);


ALTER TABLE public.privremena OWNER TO postgres;

--
-- Name: studijski_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studijski_program (
    rednibroj integer,
    naziv character varying(255),
    trajanje integer,
    vrsta character varying(255)
);


ALTER TABLE public.studijski_program OWNER TO postgres;

--
-- Data for Name: podaci_o_fakultetima; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.podaci_o_fakultetima (rednibroj, puninaziv, kratica, adresa, grad, pbr, godinaosnivanja, brojstudenata, dekan, menza, brstudija, brojzaposlenika) FROM stdin;
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160
5	Geodetski fakultet	GEOF	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1962	700	Mladen Zrinjski	t	3	80
6	Kineziološki fakultet	KIF	Horvaćanski zavoj 15	Zagreb	10000	1959	1200	Mario Baić	f	1	417
7	Ekonomski fakultet	EFZG	Trg John F. Kennedy 6	Zagreb	10000	1920	8500	Sanja Sever Mališ	t	2	260
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202
\.


--
-- Data for Name: podaciofakultetima; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.podaciofakultetima (rednibroj, puninaziv, kratica, adresa, grad, pbr, godinaosnivanja, brojstudenata, dekan, menza, brstudija, brojzaposlenika, opisstudija) FROM stdin;
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	[{"naziv": "Elektrotehnika i informacijska tehnologija", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Računarstvo", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Elektrotehnika i informacijska tehnologija", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Informacijska i komunikacijska tehnologija", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Računarstvo", "vrsta": "Diplomski", "trajanje": 2}]
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	[{"naziv": "Novinarstvo", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Politologija", "vrsta": "Preddiplomski", "trajanje": 4}, {"naziv": "Novinarstvo", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Politologija", "vrsta": "Diplomski", "trajanje": 1}]
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	[{"naziv": "Arhitektura i urbanizam", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Dizajn", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Arhitektura i urbanizam", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Dizajn", "vrsta": "Diplomski", "trajanje": 2}]
6	Kineziološki fakultet	KIF	Horvaćanski zavoj 15	Zagreb	10000	1959	1200	Mario Baić	f	1	417	[{"naziv": "Kineziologija", "vrsta": "Integrirani preddiplomski i diplomski sveučilišni studij", "trajanje": 5}]
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	[{"naziv": "Informacijski i poslovni sustavi", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Ekonomika poduzetništva", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Informacijske tehnologije i digitalizacija poslovanja", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Diplomski studiji informatike", "vrsta": "Diplomski", "trajanje": 3}, {"naziv": "Ekonomika poduzetništva", "vrsta": "Diplomski", "trajanje": 3}]
5	Geodetski fakultet	GEOF	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1962	700	Mladen Zrinjski	t	3	80	[{"naziv": "Geodezija i geoinformatika", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Geodezija", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Geoinformatika", "vrsta": "Diplomski", "trajanje": 2}]
7	Ekonomski fakultet	EFZG	Trg John F. Kennedy 6	Zagreb	10000	1920	8500	Sanja Sever Mališ	t	2	260	[{"naziv": "Poslovna ekonomija", "vrsta": "Integrirani preddiplomski i diplomski sveučilišni studij", "trajanje": 5}, {"naziv": "Ekonomija", "vrsta": "Integrirani preddiplomski i diplomski sveučilišni studij", "trajanje": 5}]
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	[{"naziv": "Šumarstvo", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Uzgajanje i uređivanje šuma s lovnim gospodarenjem", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Tehnika, tehnologija i management u šumarstvu", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Drvna tehnologija", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Drvnotehnološki procesi", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Oblikovanje proizvoda od drva", "vrsta": "Diplomski", "trajanje": 2}]
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	[{"naziv": "Metalurgija", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Sigurnost, zdravlje na radu i radni okoliš", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Metalurgija", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Sigurnost, zdravlje na radu i radni okoliš", "vrsta": "Diplomski", "trajanje": 2}]
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	[{"naziv": "Promet", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Inteligentni transportni sustavi i logistika", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Aeronautika", "vrsta": "Preddiplomski", "trajanje": 3}, {"naziv": "Promet", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Inteligentni transportni sustavi i logistika", "vrsta": "Diplomski", "trajanje": 2}, {"naziv": "Aeronautika", "vrsta": "Diplomski", "trajanje": 2}]
\.


--
-- Data for Name: podaciofakultetima2; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.podaciofakultetima2 (rednibroj, puninaziv, kratica, adresa, grad, pbr, godinaosnivanja, brojstudenata, dekan, menza, brstudija, brojzaposlenika, naziv, trajanje, vrsta) FROM stdin;
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Elektrotehnika i informacijska tehnologija	3	Preddiplomski
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Računarstvo	3	Preddiplomski
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Elektrotehnika i informacijska tehnologija	2	Diplomski
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Informacijska i komunikacijska tehnologija	2	Diplomski
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Računarstvo	2	Diplomski
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	Novinarstvo	3	Preddiplomski
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	Politologija	4	Preddiplomski
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	Novinarstvo	2	Diplomski
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	Politologija	1	Diplomski
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	Arhitektura i urbanizam	3	Preddiplomski
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	Dizajn	3	Preddiplomski
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	Arhitektura i urbanizam	2	Diplomski
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	Dizajn	2	Diplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Informacijski i poslovni sustavi	3	Preddiplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Ekonomika poduzetništva	3	Preddiplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Informacijske tehnologije i digitalizacija poslovanja	3	Preddiplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Diplomski studiji informatike	3	Diplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Ekonomika poduzetništva	3	Diplomski
5	Geodetski fakultet	GEOF	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1962	700	Mladen Zrinjski	t	3	80	Geodezija i geoinformatika	3	Preddiplomski
5	Geodetski fakultet	GEOF	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1962	700	Mladen Zrinjski	t	3	80	Geodezija	2	Diplomski
5	Geodetski fakultet	GEOF	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1962	700	Mladen Zrinjski	t	3	80	Geoinformatika	2	Diplomski
6	Kineziološki fakultet	KIF	Horvaćanski zavoj 15	Zagreb	10000	1959	1200	Mario Baić	f	1	417	Kineziologija	5	Integrirani preddiplomski i diplomski sveučilišni studij
7	Ekonomski fakultet	EFZG	Trg John F. Kennedy 6	Zagreb	10000	1920	8500	Sanja Sever Mališ	t	2	260	Poslovna ekonomija	5	Integrirani preddiplomski i diplomski sveučilišni studij
7	Ekonomski fakultet	EFZG	Trg John F. Kennedy 6	Zagreb	10000	1920	8500	Sanja Sever Mališ	t	2	260	Ekonomija	5	Integrirani preddiplomski i diplomski sveučilišni studij
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Šumarstvo	3	Preddiplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Uzgajanje i uređivanje šuma s lovnim gospodarenjem	2	Diplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Tehnika, tehnologija i management u šumarstvu	2	Diplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Drvna tehnologija	3	Preddiplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Drvnotehnološki procesi	2	Diplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Oblikovanje proizvoda od drva	2	Diplomski
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	Metalurgija	3	Preddiplomski
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	Sigurnost, zdravlje na radu i radni okoliš	3	Preddiplomski
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	Metalurgija	2	Diplomski
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	Sigurnost, zdravlje na radu i radni okoliš	2	Diplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Promet	3	Preddiplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Inteligentni transportni sustavi i logistika	3	Preddiplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Aeronautika	3	Preddiplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Promet	2	Diplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Inteligentni transportni sustavi i logistika	2	Diplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Aeronautika	2	Diplomski
\.


--
-- Data for Name: privremena; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.privremena (rednibroj, puninaziv, kratica, adresa, grad, pbr, godinaosnivanja, brojstudenata, dekan, menza, brstudija, brojzaposlenika, naziv, trajanje, vrsta) FROM stdin;
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Elektrotehnika i informacijska tehnologija	3	Preddiplomski
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Računarstvo	3	Preddiplomski
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Elektrotehnika i informacijska tehnologija	2	Diplomski
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Informacijska i komunikacijska tehnologija	2	Diplomski
1	Fakultet elektrotehnike i računarstva	FER	Unska 3	Zagreb	10000	1956	3700	Vedran Bilas	t	5	600	Računarstvo	2	Diplomski
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	Novinarstvo	3	Preddiplomski
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	Politologija	4	Preddiplomski
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	Novinarstvo	2	Diplomski
2	Fakultet političkih znanosti	FPZG	Lepušićeva 6	Zagreb	10000	1962	1735	Andrija Henjak	f	4	112	Politologija	1	Diplomski
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	Arhitektura i urbanizam	3	Preddiplomski
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	Dizajn	3	Preddiplomski
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	Arhitektura i urbanizam	2	Diplomski
3	Arhitektonski fakultet u Zagrebu	AFZG	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1919	1017	Bojan Baletić	t	4	121	Dizajn	2	Diplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Informacijski i poslovni sustavi	3	Preddiplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Ekonomika poduzetništva	3	Preddiplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Informacijske tehnologije i digitalizacija poslovanja	3	Preddiplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Diplomski studiji informatike	3	Diplomski
4	Fakultet organizacije i informatike	FOI	Pavlinska 2	Varaždin	42000	1974	1600	Marina Klačmer Čalopa	t	5	160	Ekonomika poduzetništva	3	Diplomski
5	Geodetski fakultet	GEOF	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1962	700	Mladen Zrinjski	t	3	80	Geodezija i geoinformatika	3	Preddiplomski
5	Geodetski fakultet	GEOF	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1962	700	Mladen Zrinjski	t	3	80	Geodezija	2	Diplomski
5	Geodetski fakultet	GEOF	Ulica Andrije Kačića Miošića 26	Zagreb	10000	1962	700	Mladen Zrinjski	t	3	80	Geoinformatika	2	Diplomski
6	Kineziološki fakultet	KIF	Horvaćanski zavoj 15	Zagreb	10000	1959	1200	Mario Baić	f	1	417	Kineziologija	5	Integrirani preddiplomski i diplomski sveučilišni studij
7	Ekonomski fakultet	EFZG	Trg John F. Kennedy 6	Zagreb	10000	1920	8500	Sanja Sever Mališ	t	2	260	Poslovna ekonomija	5	Integrirani preddiplomski i diplomski sveučilišni studij
7	Ekonomski fakultet	EFZG	Trg John F. Kennedy 6	Zagreb	10000	1920	8500	Sanja Sever Mališ	t	2	260	Ekonomija	5	Integrirani preddiplomski i diplomski sveučilišni studij
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Šumarstvo	3	Preddiplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Uzgajanje i uređivanje šuma s lovnim gospodarenjem	2	Diplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Tehnika, tehnologija i management u šumarstvu	2	Diplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Drvna tehnologija	3	Preddiplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Drvnotehnološki procesi	2	Diplomski
8	Fakultet šumarstva i drvne tehnologije u Zagrebu	FŠDT	Svetošimunska cesta 23	Zagreb	10000	1898	800	Josip Margaletić	t	6	182	Oblikovanje proizvoda od drva	2	Diplomski
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	Metalurgija	3	Preddiplomski
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	Sigurnost, zdravlje na radu i radni okoliš	3	Preddiplomski
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	Metalurgija	2	Diplomski
9	Metalurški fakultet	SIMET	Aleja narodnih heroja 3	Sisak	44000	1979	150	Nikola Mrvac	f	4	41	Sigurnost, zdravlje na radu i radni okoliš	2	Diplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Promet	3	Preddiplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Inteligentni transportni sustavi i logistika	3	Preddiplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Aeronautika	3	Preddiplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Promet	2	Diplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Inteligentni transportni sustavi i logistika	2	Diplomski
10	Fakultet prometnih znanosti	FPZ	Vukelićeva ulica 4	Zagreb	10000	1984	1779	Marko Šoštarić	f	6	202	Aeronautika	2	Diplomski
\.


--
-- Data for Name: studijski_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studijski_program (rednibroj, naziv, trajanje, vrsta) FROM stdin;
1	Elektrotehnika i informacijska tehnologija	3	Preddiplomski
1	Računarstvo	3	Preddiplomski
1	Elektrotehnika i informacijska tehnologija	2	Diplomski
1	Informacijska i komunikacijska tehnologija	2	Diplomski
1	Računarstvo	2	Diplomski
2	Novinarstvo	3	Preddiplomski
2	Politologija	4	Preddiplomski
2	Novinarstvo	2	Diplomski
2	Politologija	1	Diplomski
3	Arhitektura i urbanizam	3	Preddiplomski
3	Dizajn	3	Preddiplomski
3	Arhitektura i urbanizam	2	Diplomski
3	Dizajn	2	Diplomski
4	Informacijski i poslovni sustavi	3	Preddiplomski
4	Ekonomika poduzetništva	3	Preddiplomski
4	Informacijske tehnologije i digitalizacija poslovanja	3	Preddiplomski
4	Diplomski studiji informatike	3	Diplomski
4	Ekonomika poduzetništva	3	Diplomski
5	Geodezija i geoinformatika	3	Preddiplomski
5	Geodezija	2	Diplomski
5	Geoinformatika	2	Diplomski
6	Kineziologija	5	Integrirani preddiplomski i diplomski sveučilišni studij
7	Poslovna ekonomija	5	Integrirani preddiplomski i diplomski sveučilišni studij
7	Ekonomija	5	Integrirani preddiplomski i diplomski sveučilišni studij
8	Šumarstvo	3	Preddiplomski
8	Uzgajanje i uređivanje šuma s lovnim gospodarenjem	2	Diplomski
8	Tehnika, tehnologija i management u šumarstvu	2	Diplomski
8	Drvna tehnologija	3	Preddiplomski
8	Drvnotehnološki procesi	2	Diplomski
8	Oblikovanje proizvoda od drva	2	Diplomski
9	Metalurgija	3	Preddiplomski
9	Sigurnost, zdravlje na radu i radni okoliš	3	Preddiplomski
9	Metalurgija	2	Diplomski
9	Sigurnost, zdravlje na radu i radni okoliš	2	Diplomski
10	Promet	3	Preddiplomski
10	Inteligentni transportni sustavi i logistika	3	Preddiplomski
10	Aeronautika	3	Preddiplomski
10	Promet	2	Diplomski
10	Inteligentni transportni sustavi i logistika	2	Diplomski
10	Aeronautika	2	Diplomski
\.


--
-- PostgreSQL database dump complete
--

