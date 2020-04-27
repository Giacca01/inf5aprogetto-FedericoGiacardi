# LearnOnTheNet

![](/Immagini/Home_1.PNG)

## Descrizione:
Piattaforma di e-learning che consente di seguire, individualmente o come parte di un gruppo, corsi relativi a determinati argomenti. 
Ogni corso può prevedere degli esami finali. 
Il corso è composto da appunti caricati per ogni materia dagli utenti. 
Ogni appunto può possedere degli allegati ed è possibile richiedere lettura automatica dell’appunto. 
Ogni corso è moderato da dei moderatori che hanno il compito di controllare gli appunti e gli allegati caricati sul corso e verificare che siano inerenti all'argomento su cui è incentrato il corso.

## Autori: Federico Giacardi e Stefano Fontana

## Tecnologie Utilizzate: 
* HTML
* CSS
* Bootstrap
* Javascript
* jQuery
* Ajax
* Node.js
* [IBM Watson Text to speech](https://www.ibm.com/it-it/cloud/watson-text-to-speech)
* MongoDB (Database hostato su cloud [Atlas](https://www.mongodb.com/cloud/atlas))

## Piattaforma di Hosting: [Heroku](https://www.heroku.com/)

## Versione:
Progetto in fase di sviluppo

## Sezioni Sito:
* Home: Pagina di presentazione del sito con breve descrizione, elenco dei principali servizi offerti, statistiche di utilizzo e recensioni. Pagina relizzata da Giacardi.
![](/Immagini/Home_1.PNG)
* Registrati: Sezione con form di iscrizione. Una volta completata la registrazione si viene re-indirizzati alla pagina di login. Pagina relizzata da Giacardi.
![](/Immagini/Registrati.PNG)
* Login: Pagina con form di login che richiede l'inserimento di Username e Password. Qualora il login vada a buon fine, si viene re-indirizzati sulla propria area personale. Pagina relizzata da Giacardi.
![](/Immagini/Login.PNG)
* Reimposta Password: Pagina con form che richiede username, email e numero di telefono per la reimpostazione della password.
Qualora i dati inseriti siano corretti verrà inviata una mail con un link al quale è associato un token per la reimpostazione della password. Se il token passato come corretto è valido si avrà accesso ad una nuova pagina con un form che consentirà di scegliere la nuova password. Al termine dell'operazione si verrà re-indirizzati alla pagina di login e verrà inviata una mail di conferma. Se il token non è corretto quando si tenterà di inviare la nuova password l'operazione verrà bloccata. Pagina relizzata da Giacardi.
![](/Immagini/NuovaPassword.PNG)
![](/Immagini/MailToken.PNG)
![](/Immagini/ReimpostaPassword.PNG)
![](/Immagini/ConfermaModifcaPwd.PNG)
* Area Personale: La pagina contiene un calendario sul quale sono segnati moduli, lezioni ed esami svolti sia individualmente sia come parte di gruppi. Sono indicate le prove scadute (non completate in tempo), quelle programmate e quelle completate in passato. Cliccando sull'evento sarà possibile visualizzarne il dettaglio.
Più in basso sono indicati i gruppi a cui l'utente è iscritto, i corsi che potrebbero interessargli, basandosi su quelli da lui svolti di recente, le materie moderate e gli appunti caricati. Cliccando sui box mostrati sarà possibile accedere alle rispettive pagine di dettaglio. Attualmente si sta implementando un meccanismo di "mostra di più" per comprimere la visualizzazione e mostrare tutti i dati solo su richiesta dell'utente. Pagina relizzata da Giacardi.
![](/Immagini/dashborad.PNG)
![](/Immagini/DatiDashboard.PNG)
* Corsi: Pagina che consente di ricercare e visualizzare i corsi presenti nel Database. Effettuata la ricerca vengono visualizzati in dei box alcuni dati riepilogativi di ogni corso che corrisponde ai filtri di ricerca, cliccando sul nome del corso sarà possibile accedere alla sua pagina di dettaglio dove sono presenti tutti i dettagli del corso. La corrente pagina presenta al fondo un form che permette l'inserimento di un nuovo corso specificandone il tipo (scolastico, privato, ecc.) tra quelli presenti su Database e la materia di appartenenza tra quelle presenti sul Database. Pagina realizzata da Fontana.
![](/Immagini/Corsi.png)
![](/Immagini/RicercaCorsi.png)
![](/Immagini/InserimentoCorso.png)
* DettaglioCorso: Pagina che consente di visualizzare i dettagli del corso selezionato. In caso in cui l'utente attualmente loggato sia l'autore del corso, verranno visualizzati dei pulsanti per l'aggiunta di argomenti e lezioni al corso, la modifica e l'eliminazione del corso. Il pulsante di aggiunta degli argomenti, come quello di aggiunta delle lezioni, aprirà una modale nella quale è possibile ricercare l'oggetto da aggiungere al corso. Cliccando il pulsante della modifica del corso è possibile modificare i dettagli del corso, rimuovere gli argomenti e le lezioni. Se invece l'utente attualmente loggato è iscritto al corso sarà possibile visualizzare il dettaglio delle lezioni cliccando l'apposito pulsante oppure iscrivere un gruppo di cui è autore. Se invece l'utente loggato al sito non è iscritto avrà la possibilità di farlo o di iscrivere un gruppo di cui è autore con gli appositi pulsanti. Pagina realizzata da Fontana.
![](/Immagini/AdminCorso.png)
![](/Immagini/IscrittoCorsoNoAdm.png)
![](/Immagini/NoIscrittoCorso.png)
* DettaglioLezione: Pagina che consente di visualizzare i dettagli del lezione selezionata. In caso in cui l'utente attualmente loggato sia l'autore della lezione, verranno visualizzati dei pulsanti per l'aggiunta di appunti alla lezione, la modifica e l'eliminazione della lezione. Il pulsante di aggiunta degli appunti aprirà una modale nella quale è possibile ricercare l'appunto da aggiungere alla lezione. Cliccando il pulsante della modifica della lezione è possibile modificarne i dettagli e rimuovere gli appunti. Se invece l'utente attualmente loggato è iscritto al corso di cui la lezione fa parte potrà vedere i dettagli della lezione e visualizzare i dettagli degli appunti tramite l'apposito pulsante solo una volta dopo essersi iscritto alla lezione tramite l'apposito pulsante, a patto che non sia terminata. Pagina realizzata da Fontana.
![](/Immagini/AdminLezione.png)
![](/Immagini/NoIscrittoLezione.png)
* Gruppi: Pagina che consente di ricercare e visualizzare i gruppi presenti nel Database. Effettuata la ricerca vengono visualizzati in dei box alcuni dati riepilogativi di ogni gruppo che corrisponde ai filtri di ricerca, cliccando sul nome del gruppo sarà possibile accedere alla sua pagina di dettaglio dove sono presenti tutti i dettagli del gruppo. La corrente pagina presenta al fondo un form che permette l'inserimento di un nuovo gruppo specificandone il tipo (classe, privato, amici, ecc.) tra quelli presenti su Database. Pagina realizzata da Fontana.
![](/Immagini/Gruppi.png)
![](/Immagini/InserimentoGruppo.png)
* DettaglioGruppo: Pagina che consente di visualizzare i dettagli del gruppo selezionato. In caso in cui l'utente attualmente loggato sia l'autore del gruppo, verranno visualizzati anche dei pulsanti per l'aggiunta di componenti del gruppo, la modifica e l'eliminazione del gruppo. Il pulsante di aggiunta dei membri aprirà una modale nella quale è possibile ricercare un utente registrato sul sito e aggiungerlo al gruppo. Cliccando il pulsante della modifica del gruppo è possibile modificare i dettagli del gruppo e rimuoverne i componenti. Pagina realizzata da Fontana.
![](/Immagini/DettaglioGruppo.png)
* Appunti: Pagina che consente di ricercare e visualizzare gli appunti presenti nel Database. Al termine di ogni ricerca sono visualizzati in un box alcuni dati di ogni appunto individuato, cliccando sul box sarà possibile accedere alla pagina con tutti i dettagli dell'appunto e le funzioni di modifica, eliminazione e lettura. La pagina presente anche un form per l'inserimento di un nuovo appunto con la possibilità di caricare nuovi allegati o di utilizzare quelli presenti nel Database. Pagina relizzata da Giacardi.
![](/Immagini/RicercaAppunti.PNG)
![](/Immagini/InserimentoAppunti.PNG)
* Dettaglio Appunto: Pagina che consente di visualizzare i dettagli dell'appunto selezionato. Qualora l'utente loggato sia colui che ha effettuato il caricamento dell'appunto, verranno visualizzati un pulsante per eliminare l'appunto e uno per modificarlo. Tale pulsante aprirà, nella medesima pagina, un form con i dati dell'appunto che potranno essere modificati. Il pulsante lettura consente di aprire un form che consente di indicare quali allegati dell'appunto leggere (sono ammessi, per ora, solo file PDF, DOCX e TXT), la lingua degli allegati da leggere e la voce di lettura. All'invio del form viene effettuata una chiamata al server il quale, qualora la lettura vada a buon fine, risponde restituendo i file .wav creati che l'utente può scaricare. Il servizio di Text to speech è basato sul servizio IBM Watson fruibile gratuitamente fino a 10000 caratteri mensili via cloud IBM. Al momento si sta valutando l'inserimento nel form di un campione audio di prova della voce scelta. Il problema è legato al fatto che IBM non offre un web service con l'elenco dei campioni che andrebbero scaricati su server. Per estrarre il contenuto del file da leggere, andando anche ad escludere anche eventuali immagini, si è dovuto realizzare un modulo, denominato FileReader, che effettui, in modo asincrono tramite dei Promise, l'estrazione del contenuto combinando le funzionalità di due moduli, [PdfReader](https://www.npmjs.com/package/pdfreader) e [node-stream-zip](https://www.npmjs.com/package/node-stream-zip).
Il contenuto così estratto viene poi passato a IBM Watson per la lettura.
Per poter usufruire dei servizi del cloud IBM in NodeJs si è utlizzata la [SDK disponibile su GitHub](https://github.com/watson-developer-cloud/node-sdk).
Si prevede di implementare l'eliminazione dei campioni audio una volta scaricati. Pagina relizzata da Giacardi.
![](/Immagini/DettaglioAppunto.PNG)
![](/Immagini/TTSAppunto.PNG)
![](/Immagini/PaginaDownloadTTS.PNG)
![](/Immagini/DownloadTTS.PNG)
* Allegati: Pagina che consente di visualizzare una tabella con gli allegati presenti sul server con la possiblità di filtrare i dati nella tabella, è inoltre possibile scaricare gli allegati presenti con un apposito pulsante. Pagina relizzata da Giacardi.
![](/Immagini/Allegati.PNG)
* Modifica Profilo: Pagina raggiungibile dalla navbar che consente di modificare le impostazioni relative al proprio profilo (ad eccezione della password, modificabile come descritto in precedenza). Pagina relizzata da Giacardi.
![](/Immagini/ModificaProfilo.PNG)

## Aggiunte Previste fino al 10/05/2020
* Aggiunta sezione moderatore materia con possibilità di accettare o rifiutare gli appunti caricati. Per questo punto verrà realizzata una pagina di dettaglio materia collegata all'area personale.
* Aggiunta sezione per svolgimento esame.
* Si sta valutando l'opportunità di realizzare una pagina con la possibilità di visualizzare le materie caricate sul sito.

## Aggiunte Previste oltre il 10/05/2020
* Implementazione delle funzionalità mancanti indicate nelle varie sezioni.
* Revisioni del codice.
* Revisione grafica delle pagine.
* Deploy su Heroku e test di funzionamento e carico

## Stima conclusione lavori
Orientativamente si ritiene di poter completare i lavori entro il 17/05/2020. In base a quanto impiegato per implementare le funzionalità della sezione "Aggiunte Previste" e alla durata della fase di deploy e test (ci sono moduli di NodeJs, come il NodeMailer, che potrebbero dare problemi) si potrebbe anche terminare in anticipo o poco oltre la data stabilita (di sicuro non oltre il 24/05/2020).

## Problemi riscontrati
La relizzazione della funzionalità di lettura automatica del file si è rivelata molto ostica.
Non essendo disponibile un modulo per l'estrazione del contenuto del file capace di offrire buone prestazioni su tipi di file diversi si è dovuto scrivere un nostro modulo, FileReader, che combini un modulo per la lettura di PDF con uno per la lettura dei DOCX. Particolarmente complicata si è poi rivelata la combinazione dell'estrazione del file con la sua lettura tramite IBM Watson a causa delle molte operazioni asincrone da coordinare. Il meccanismo risulta ad oggi funzionante, tuttavia siamo consci del fatto che sia piuttosto limitato, soprattuto per i pochi tipi di file supportati.
Molto complessa, sempre per il dover andare a coordinare più operazioni asincrone, si è rivelata la funzionalità di modifica dell'appunto. Si tratta della funzione che ha richiesto più tempo ma ad oggi risulta funzionante.