# Installazione

1) Scarca la repo
2) Esegui `npm install` per installare le dipendenze
3) Avvia il programma in developer mode con il comando `npm start`

# Packaging
### Building
Esistono due metodi di building, quello a 32 e a 64 bit. Per la versione a 32 bit eseguire il comando ` npm run build32`, mentre per la versione a 64 but eseguire `npm run build`. Potrebbero volerci alcuni minuti. Verrà poi creata una cartella `build` contiene il programma eseguibile, criptato con asar e portatile. La cartella `dist` conterrà invece il pacchetto eseguibile con il quale è possibile installare il programma su altri dispositivi. Il programma viene installato sul path `C:\Users\username\AppData\Local\Programs\control-production-slave` dove **username** è il nome dell'utente del PC