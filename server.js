/* DEFINIZIONE MODULI */
"use strict"
const fs = require('fs');
const ERRORS = require('errors');
let mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* CONNESSIONE AL DATABASE */
let userDB = "dbUser";
let pwdDB = "djNDIPkNP6skFZEP";
mongoose.connect("mongodb+srv://"+ userDB +":"+ pwdDB +"@learnonthenet-rqmxj.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true});
console.log("Everything seems ok...");

// code 600 - database connection error
ERRORS.create({
    code: 600,
    name: 'DB_CONNECTION',
    defaultMessage: 'An error occured when connecting to database'
});

// code 601 - query execution error
ERRORS.create({
    code: 601,
    name: 'QUERY_EXECUTE',
    defaultMessage: 'An error occured during the query execution'
});

const HTTPS = require('https');

// mongo
const MONGO_CLIENT = require("mongodb").MongoClient;
const STRING_CONNECT = 'mongodb://127.0.0.1:27017';
const PARAMETERS = {
    useNewUrlParser: true,
};

// express
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

//Mongoose
let utenti = require("./models/Utenti.js");


// Online RSA Key Generator
const privateKey = fs.readFileSync("keys/private.key", "utf8");
const certificate = fs.readFileSync("keys/certificate.crt", "utf8");
const credentials = { "key": privateKey, "cert": certificate };

/* ************************************************************ */

// avvio server
const TIMEOUT = 30; // 60 SEC
let pageNotFound;

var httpsServer = HTTPS.createServer(credentials, app);
httpsServer.listen(8888, '127.0.0.1', function () {
    fs.readFile("./static/error.html", function (err, content) {
        if (err)
            content = "<h1>Risorsa non trovata</h1>"
        pageNotFound = content.toString();
    });
    console.log("Server in ascolto https://127.0.0.1: " + this.address().port);
});

/* ************************************************************ */
app.use("/", express.static('./static'));
// middleware
app.use("/", bodyParser.json());
app.use("/", bodyParser.urlencoded({ extended: true }));

app.use("/", function (req, res, next) {
    console.log(">_ " + req.method + ": " + req.originalUrl);
    if (Object.keys(req.query).length != 0)
        console.log("Parametri GET: " + JSON.stringify(req.query));
    if (Object.keys(req.body).length != 0)
        console.log("Parametri BODY: " + JSON.stringify(req.body));
    next();
});

/* --------------------------------------------------------------- */
// controllo token per dare l'accesso oppure no
app.get('/', function (req, res, next) {
    controllaToken(req, res, next);
});
app.get('/index.html', function (req, res, next) {
    controllaToken(req, res, next);
});
/* --------------------------------------------------------------- */

// controllo del token
app.use('/api', function (req, res, next) {
    controllaToken(req, res, next);
});

function controllaToken(req, res, next) {
    if (req.originalUrl == '/api/login' || req.originalUrl == '/api/logout')
        next();
    else {
        let token = readCookie(req);
        if (token == '') {
            error(req, res, null, JSON.stringify(new ERRORS.Http403Error({})));
        } else {
            jwt.verify(token, privateKey, function (err, payload) {
                if (err)
                    error(req, res, err, JSON.stringify(new ERRORS.Http401Error({})));
                else {
                    // aggiornamento del token
                    var exp = Math.floor(Date.now() / 1000) + TIMEOUT;
                    payload = { ...payload, 'exp': exp }
                    token = createToken(payload)
                    writeCookie(res, token)
                    req.payload = payload;
                    next();
                }
            });
        }
    }
}

function readCookie(req) {
    var valoreCookie = "";
    if (req.headers.cookie) {
        var cookies = req.headers.cookie.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            cookies[i] = cookies[i].split("=");
            if (cookies[i][0] == "token") {
                valoreCookie = cookies[i][1];
                break;
            }
        }
    }
    return valoreCookie;
}

/* ************************************************************ */

app.post('/api/login', function (req, res, next) {
    let username = req.body.username;
    utenti.findOne({"user":username}).exec.then(utente => {
        if (utente == null)
            error(req, res, null, JSON.stringify(new ERRORS.Http401Error({})));
        else {
            bcrypt.compare(req.body.password, utente.pwd, function (errC, resC) {
                if (resC) {
                    let token = createToken(dbUser, tipoUtente, admin);
                    writeCookie(res, token);
                    res.send({ "ris": "ok"});
                } else {
                    error(req, res, err, JSON.stringify(new ERRORS.Http401Error({})));
                }
            });
        }
    }).catch(err => {
        error(req, res, err, JSON.stringify(new ERRORS.QUERY_EXECUTE({})));
    });
});

app.post("/api/registrati", function (req, res) {
    utenti.find().sort({ _id: 1 }).exec().then(results => {
        let vet = JSON.parse(JSON.stringify(results));
        let idUt = parseInt(vet[vet.length - 1]["_id"]) + 1;
        bcrypt.hash(req.body.pwd, saltRounds, function (errC, hash) {
            const utInsert = new utenti({

            });
            utInsert.save().then(results => { res.send(JSON.stringify("regOk")); }).catch(errSave => { error(req, res, err, JSON.stringify(new ERRORS.QUERY_EXECUTE({})));});
        })
    }).catch(err => {
        error(req, res, err, JSON.stringify(new ERRORS.QUERY_EXECUTE({})));
    });
});

/* createToken si aspetta un generico json contenente i campi indicati.
   iat e exp se non esistono vengono automaticamente creati          */
function createToken(obj) {
    let token = jwt.sign({
        '_id': obj._id,
        'username': obj.username,
        'iat': obj.iat || Math.floor(Date.now() / 1000),
        'exp': obj.exp || Math.floor(Date.now() / 1000 + TIMEOUT)
    },
        privateKey
    );
    console.log("Creato Nuovo token");
    console.log(token);
    return token;
}

function writeCookie(res, token) {
    res.set("Set-Cookie", "token=" + token + ";max-age=" + TIMEOUT + ";Path=/;httponly=true;secure=true");
}

app.post('/api/logout', function (req, res, next) {
    res.set("Set-Cookie", "token=;max-age=-1;Path=/;httponly=true");
    res.send({ "ris": "LogOutOk" });
});

/* ************************************************************* */

// gestione degli errori
function error(req, res, err, httpError) {
    console.log("httpError: " + httpError);
    if (err)
        console.log(err.message);

    res.status(JSON.parse(httpError).code);
    console.log("URI: " + req.originalUrl);
    if (req.originalUrl.startsWith("/api"))
        res.send(httpError);
    else
        // L'unico errore su una richiesta di pagina può essere il token non valido 
        //  (oppure il successivo 404 not found)
        res.sendFile('login.html', { root: './static' })
}

// default route finale
app.use('/', function (req, res, next) {
    res.status(404)
    if (req.originalUrl.startsWith("/api")) {
        res.send('Risorsa non trovata');
    } else {
        res.send(pageNotFound);
    }
});