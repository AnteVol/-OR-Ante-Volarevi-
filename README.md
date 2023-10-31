# -OR-Ante-Volarević-
### Repozitorij za laboratorijske vježbe iz kolegija Otvoreno računarstvo
- **Naslov**: Podaci o fakultetima sveučilišta u Zagrebu
- **Autor**: Ante Volarević
- **JMBAG**: 0036541973
- **Verzija**: 1.0
- **Licenca**: Creative Commons: CC BY-SA 3.0 HR DEED 
- **Datum kreiranja**: 29.10.2023.
- **Datum zadnje izmjene i objave**: 01.11.2023.
- **Jezik**: hrvatski
- **Opis**: korisni podaci o fakultetima Sveučilišta u Zagrebu
- **Tip datoteka u repozitoriju**: CSV, JSON

## Opis atributa: 
### Tablica podaci_o_fakultetima
- redniBroj - označava šifru pojedinog fakulteta, primarni ključ; tip podataka: int
- puniNaziv - naziv fakulteta; tip podataka: varchar(255)
- adresa - adresa fakulteta; tip podataka: varchar(255)
- grad - grad u kojem se nalazi fakultet; tip podataka: varchar(255)
- pbr - poštanski broj; tip podataka: varchar(255)
- godinaOsnnivanja - službena godina osnivanja fakulteta; tip podataka: int
- brojStudenata - okviran broj studenata; tip podataka: int
- dekan - trenutačni dekan pojedinog fakulteta; tip podataka: varchar(255)
- brZaposlenika - okviran broj zaposlenika i vanjskih suradnika; tip podataka: int
- brStudija - broj sveučilišnih studija (ne uključuje stučne studije); tip podataka: int

### Tablica opis_studija
- redniBroj - označava šifru pojedinog fakulteta; tip podataka: int
- naziv - naziv studijskog programa; tip podataka: varchar(255)
- trajanje - trajanje studija izražen u broju godina; tip podataka: int
- vrsta - vrsta studijskog programa; tip podataka: varchar(255)
