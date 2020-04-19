"use strict";
let codUt = -1;
let vetLingue = {
    "ar-AR":"Arabo",
    "pt-BR":"Portoghese (Brasile)",
    "zh-CN":"Cinese mandarino",
    "nl-NL":"Olandese",
    "en-GB":"Inglese (Regno Unito)",
    "en-US":"Inglese (Stati Uniti)",
    "fr-FR":"Francese",
    "de-DE":"Tedesco",
    "it-IT":"Italiano",
    "ja-JP":"Giapponese",
    "ko-KR":"Koreano",
    "es-ES":"Spagnolo (Castilliano)",
    "es-LA":"Spagnolo (America Latina)",
    "es-US":"Spagnolo (Nord America)"
};

$(document).ready(function () {
    let chkToken = inviaRichiesta('/api/chkToken', 'POST', {});
    chkToken.fail(function (jqXHR, test_status, str_error) {
        window.location.href = "login.html";
    });
    chkToken.done(function (data) {
        codUt = data.id;
        loadPagina();
        $("#btnConfElAppunto").on("click", eliminaAppunto);
        $("#btnConfMexElimina").on("click", function () { window.location = "appunti.html";});
        $("#linguaTTSAppunto").on("change", loadVociTTS);
        $("#btnTTSAppunto").on("click", gestRqTTS);
    });
});

function loadPagina() {
    let par = window.location.search.substring(1).split('=');
    // Controllo sui parametri in GET
    if (par[0] == "appunto" && !isNaN(parseInt(par[1]))) {
        let datiAppuntoRQ = inviaRichiesta('/api/datiAppuntoById', 'POST', { "idAppunto": par[1] });
        datiAppuntoRQ.fail(function (jqXHR, test_status, str_error) {
            printErrors(jqXHR, ".msg");
        });
        datiAppuntoRQ.done(function (data) {
            window.sessionStorage.removeItem("codAppunto");
            window.sessionStorage.setItem("codAppunto", par[1]);
            $("#btnModAppunto").on("click", gestModifica);
            loadArgomenti();
            loadAllegati("allegatiModAppunto");
            $('#speedTTSAppunto').selectpicker('refresh');
            caricamentoDatiCorso(data);
        });
    }
    else {
        $(".msg").html("Errore nel passaggio dei parametri");
        window.location.href = "appunti.html";
    }
}

function caricamentoDatiCorso(appunto) {
    $("#contDetAppunto").html("");
    let codHtml = "";

    if (appunto == undefined || appunto.length == 0) {
        // codHtml += '<div class="row justify-content-center">';
        codHtml += '<div class="col-sm-12 col-md-12 col-lg-12 mx-auto">';
        codHtml += '<div class="section_tittle text-center">';
        codHtml += '<h2>L\'Appunto richiesto non è disponibile</h2>';
        codHtml += '<p><a href="appunti.html">Torna agli appunti</a></p>';
        codHtml += '</div>';
        codHtml += '</div>';
        // codHtml += '</div>';
        $("#contDetAppunto").html(codHtml);
    }
    else {
        codHtml += '<div class="col-sm-6 col-md-12 col-lg-6 mx-auto">';
        codHtml += '<div class="content_wrapper">';
        codHtml += '<h4 class="title_top">Descrizione</h4>';
        codHtml += '<div id="descAppunto" class="content">';
        codHtml += appunto[0]["descrizione"];
        codHtml += '</div>';
        codHtml += '<h4 class="title">Data Caricamento</h4>';
        codHtml += '<div class="content">';
        codHtml += new Date(appunto[0]["dataCaricamento"]).toLocaleDateString();
        codHtml += '</div>';
        codHtml += '<h4 class="title">Autore Appunto</h4>';
        codHtml += '<div id="nomeCognomeAutoreAppunto" class="content">';
        codHtml += appunto[0]["nomeAutore"] + " " + appunto[0]["cognomeAutore"];
        codHtml += '</div>';
        codHtml += '<h4 class="title">Autore Caricamento</h4>';
        codHtml += '<div class="content">';
        codHtml += appunto[0]["autoreCaricamento"][0].nome + " " + appunto[0]["autoreCaricamento"][0].cognome;
        codHtml += '</div>';
        codHtml += '<h4 class="title">Argomenti Appunto</h4>';
        codHtml += '<div class="content">';
        codHtml += '<ul class="course_list">';
        if (appunto[0]["detArgomenti"] != undefined && appunto[0]["detArgomenti"].length > 0) {
            for (let i = 0; i < appunto[0]["detArgomenti"].length; i++) {
                codHtml += '<li class="justify-content-between align-items-center d-flex">';
                codHtml += '<p class="descAppunto" codArgomento="' + appunto[0]["detArgomenti"][i]._id+'">' + appunto[0]["detArgomenti"][i].descrizione + '</p>';
                codHtml += '<p>Data aggiunta: ' + new Date(appunto[0]["detArgomenti"][i].dataAggiunta).toLocaleDateString() + '</p>';
                codHtml += '</li>';
            }
        }
        else {
            codHtml += '<li class="justify-content-between align-items-center d-flex">';
            codHtml += '<p>Al momento non ci sono argomenti relativi all\' appunto</p>';
            codHtml += '</li>';
        }
        codHtml += '</ul>';
        codHtml += '</div>';

        codHtml += '<h4 class="title">Allegati Appunto</h4>';
        codHtml += '<div class="content">';
        codHtml += '<ul class="course_list">';
        let ausVet = new Array();
        if (appunto[0]["detAllegati"] != undefined && appunto[0]["detAllegati"].length > 0) {
            for (let i = 0; i < appunto[0]["detAllegati"].length; i++) {
                codHtml += '<li class="justify-content-between align-items-center d-flex">';
                ausVet = appunto[0]["detAllegati"][i].percorso.split('\\');
                ausVet = ausVet[ausVet.length - 1].split("_");
                codHtml += '<p class="descAllegati" codAllegato="' + appunto[0]["detAllegati"][i]._id+'">' + ausVet[1] + '</p>';
                codHtml += '<p>Data aggiunta: ' + new Date(appunto[0]["detAllegati"][i].dataCaricamento).toLocaleDateString() + '</p>';
                codHtml += '</li>';
            }
        }
        else {
            codHtml += '<li class="justify-content-between align-items-center d-flex">';
            codHtml += '<p>Al momento non ci sono allegati relativi all\' appunto</p>';
            codHtml += '</li>';
        }
        codHtml += '</ul>';
        codHtml += '</div>';
        codHtml += '</div>';
        
        codHtml += '<br><div class="form-group">';
        if (parseInt(appunto[0]["codUtente"]) == parseInt(codUt)) {
            codHtml += '<a href="#sezModAppunto" id="btnModAppunto" stato="chiuso" onclick="loadDatiModifica();" class="genric-btn success circle"><i class="fas fa-edit"></i>Modifica</a >&nbsp';
            codHtml += '<a id="btnElAppunto" class="genric-btn danger circle" data-toggle="modal" data-target="#modalConfElimina"><i class="fa fa-trash" aria-hidden="true"></i></i>Elimina</a >&nbsp';
        }
        codHtml += '<a href="#sezioneTTSAppunti" id="btnTTSAppunto" stato="chiuso" onclick="gestTTS();" class="genric-btn success circle"><i class="fa fa-volume-up" aria-hidden="true"></i>Lettura</a >&nbsp';
        codHtml += '</div>';
        codHtml += '</div>';
        $("#contDetAppunto").html(codHtml);
    }
}

function loadDatiModifica() {
    if ($("#btnModAppunto").attr("stato")=="chiuso") {
        let vetNomeCognome = $("#nomeCognomeAutoreAppunto").html().split(' ');
        let nome = "";
        for (let k = 0; k < vetNomeCognome.length - 1; k++) {
            nome += vetNomeCognome[k];
        }
        $("#descModAppunto").val($("#descAppunto").html());
        $("#nomeAutoreModAppunto").val(nome);
        $("#cognomeAutoreModAppunto").val(vetNomeCognome[vetNomeCognome.length - 1]);
        let args = $(".descAppunto");
        let value = new Array();
        let I;
        for (I = 0; I < args.length; I++) {
            value[I] = args[I].attributes[1].value;
        }
        window.sessionStorage.setItem("currentArgs", value);
        $('#argomentiModAppunto').selectpicker('val', value);
        $('#argomentiModAppunto').selectpicker('refresh');
        value = new Array();
        args = $(".descAllegati");
        for (I = 0; I < args.length; I++) {
            value[I] = args[I].attributes[1].value;
        }
        window.sessionStorage.setItem("currentAttachments", value);
        $('#allegatiModAppunto').selectpicker('val', value);
        $('#allegatiModAppunto').selectpicker('refresh');
        $("#sezModAppunto").css("display", "unset");
        $("#btnModAppunto").html('<i class="fas fa-edit"></i>Chiudi');
        $("#btnModAppunto").attr("stato", "aperto");
        $("#sezioneTTSAppunti").css("display", "none");
        $("#btnTTSAppunto").attr("stato", "chiuso");
        $("#btnTTSAppunto").html('<i class="fa fa-volume-up" aria-hidden="true"></i>Lettura');
    }else{
        $("#btnModAppunto").attr("stato", "chiuso");
        $("#sezModAppunto").css("display", "none");
        $("#btnModAppunto").html('<i class="fas fa-edit"></i>Modifica');
    }
    
}

function loadArgomenti() {
    let elArgomenti = inviaRichiesta('/api/elencoArgomenti', 'POST', {});
    elArgomenti.fail(function (jqXHR, test_status, str_error) {
        printErrors(jqXHR, "#msgModAppunto");
    });
    elArgomenti.done(function (data) {
        let codHtml = "";
        data.forEach(argomento => {
            codHtml += '<option value="' + argomento._id + '">' + argomento.descrizione + '</option>';
        });
        document.getElementById("argomentiModAppunto").selectedIndex = -1;
        $("#argomentiModAppunto").html(codHtml).selectpicker("refresh");
    });
}

function loadAllegati(idSelect) {
    let elArgomenti = inviaRichiesta('/api/elencoAllegati', 'POST', {});
    elArgomenti.fail(function (jqXHR, test_status, str_error) {
        printErrors(jqXHR, "#msgModAppunto");
    });
    elArgomenti.done(function (data) {
        let codHtml = "";
        let ausVet = new Array();
        data.forEach(allegato => {
            ausVet = allegato.percorso.split('\\');
            ausVet = ausVet[ausVet.length - 1].split("_");
            codHtml += '<option value="' + allegato._id + '">' + ausVet[1] + '</option>';
        });
        document.getElementById(idSelect).selectedIndex = -1;
        $("#" + idSelect).html(codHtml).selectpicker("refresh");
    });
}

function gestModifica() {
    $("#descModAppunto").removeClass("alert-danger");
    $("#nomeAutoreModAppunto").removeClass("alert-danger");
    $("#cognomeAutoreModAppunto").removeClass("alert-danger");
    $("#argomentiModAppunto").removeClass("alert-danger");
    $("#allegatiModAppunto").removeClass("alert-danger");
    $("#newAllegatiModAppunto").removeClass("alert-danger");
    $("#msgModAppunto").text("");
    let argomentiOk = false;
    let allegatiOk = false;

    if (window.sessionStorage.getItem("codAppunto") != null) {
        if ($("#descModAppunto").val() != "") {
            if ($("#nomeAutoreModAppunto").val() != "") {
                if ($("#cognomeAutoreModAppunto").val() != "") {
                    if (document.getElementById("argomentiModAppunto").selectedIndex != -1) {
                        if (($('#newAllegatiModAppunto').prop('files').length > 0) || (document.getElementById("allegatiModAppunto").selectedIndex != -1)) {
                            let formData = new FormData();
                            argomentiOk = true;
                            allegatiOk = true;
                            formData.append('codAppunto', window.sessionStorage.getItem("codAppunto"));
                            formData.append('descrizione', $("#descModAppunto").val());
                            formData.append('nome', $("#nomeAutoreModAppunto").val());
                            formData.append('cognome', $("#cognomeAutoreModAppunto").val());
                            formData.append('argomentiOk', argomentiOk);
                            formData.append('allegatiOk', allegatiOk);
                            let ausArgs = $("#argomentiModAppunto").val();
                            let oldArgs = window.sessionStorage.getItem("currentArgs").split(',');
                            let newAtt = $("#allegatiModAppunto").val();
                            let oldAtt = window.sessionStorage.getItem("currentAttachments").split(',');
                            formData.append('addArgomenti', ausArgs.filter(x => !oldArgs.includes(x))); //Argomenti da aggiungere
                            formData.append('removeArgomenti', oldArgs.filter(x => !ausArgs.includes(x)));//Argomenti da togliere
                            if (document.getElementById("allegatiModAppunto").selectedIndex != -1) {
                                formData.append('addAllegati', newAtt.filter(x => !oldAtt.includes(x))); //Allegati da aggiungere
                                formData.append('removeAllegati', oldAtt.filter(x => !newAtt.includes(x)));//Allegati da togliere
                            } else {
                                formData.append('removeAllegati', window.sessionStorage.getItem("currentAttachments").split(','));//Se non ho selezionato nulla tolgo tutti i vecchi allegati
                            }

                            if ($('#newAllegatiModAppunto').prop('files').length > 0) {
                                for (let i = 0; i < $('#newAllegatiModAppunto').prop('files').length; i++) {
                                    formData.append('newAllegati', $('#newAllegatiModAppunto').prop('files')[i]);
                                }
                            }

                            let modAppuntoRQ = inviaRichiestaMultipart('/api/modificaAppunto', 'POST', formData);
                            modAppuntoRQ.fail(function (jqXHR, test_status, str_error) {
                                if (jqXHR.status == 603) {
                                    $("#msgModAppunto").text("Parametri Errati o Mancanti");
                                }
                                else {
                                    printErrors(jqXHR, "#msgModAppunto");
                                }
                            });
                            modAppuntoRQ.done(function (data) {
                                clearInputFields();
                            });
                        } else {
                            allegatiOk = false;
                            gestErrori("Indicare almeno un allegato", $("#allegatiAppunto"), "#msgModAppunto");
                        }
                    } else {
                        argomentiOk = false;
                        gestErrori("Selezionare un Argomento", $("#argomentiModAppunto"), "#msgModAppunto");
                    }
                } else {
                    gestErrori("Inserire il Nome dell' Autore", $("#cognomeAutoreModAppunto"), "#msgModAppunto");
                }
            } else {
                gestErrori("Inserire il Nome dell' Autore", $("#nomeAutoreModAppunto"), "#msgModAppunto");
            }

        } else {
            gestErrori("Inserire la Descrizione dell'Appunto", $("#descModAppunto"), "#msgModAppunto");
        }
    } else {
        gestErrori("Codice Appunto mancante. Ricaricare la pagina", undefined, "#msgModAppunto");
    }
    
}

function gestErrori(msg, controllo, target) {
    $(target).html(msg);
    if (controllo) {
        controllo.addClass("alert-danger");
    }
}

function clearInputFields() {
    $("#descModAppunto").val("");
    $("#nomeAutoreModAppunto").val("");
    $("#cognomeAutoreModAppunto").val("");
    document.getElementById("argomentiModAppunto").selectedIndex = -1;
    document.getElementById("allegatiModAppunto").selectedIndex = -1;
    $("#newAllegatiModAppunto").val("");
    $("#msgModAppunto").text("");
    window.location.reload();
}

function eliminaAppunto() {
    if (window.sessionStorage.getItem("codAppunto") != null) {
        let eliminaAppuntoRQ = inviaRichiesta('/api/removeAppunto', 'POST', { "codAppunto": window.sessionStorage.getItem("codAppunto")});
        eliminaAppuntoRQ.fail(function (jqXHR, test_status, str_error) {
            if (jqXHR.status == 603) {
                $("#msgDetAppunto").text("Parametri Errati o Mancanti");
            }
            else {
                printErrors(jqXHR, "#msgDetAppunto");
            }
        });
        eliminaAppuntoRQ.done(function (data) {
            $('#modalMexElimina').modal('show');
        });
    } else {
        gestErrori("Codice Appunto mancante. Ricaricare la pagina", undefined, "#msgDetAppunto");
    }
}

function gestTTS() {
    let codHtml = "";
    let args = $(".descAllegati");
    if ($("#btnTTSAppunto").attr("stato") == "chiuso") {
        for (let I = 0; I < args.length; I++) {
            codHtml += '<option value="' + args[I].attributes[1].value + '">' + args[I].innerText + '</option>';
        }
        $('#allegatiTTSAppunto').html(codHtml).selectpicker('refresh');

        $("#btnTTSAppunto").attr("stato", "aperto");
        $("#sezioneTTSAppunti").css("display", "unset");
        
        $("#btnModAppunto").attr("stato", "chiuso");
        $("#sezModAppunto").css("display", "none");

        $("#btnTTSAppunto").html('<i class="fa fa-volume-up" aria-hidden="true"></i>Chiudi');
        $("#btnModAppunto").html('<i class="fas fa-edit"></i>Modifica');
    }else{
        $("#btnTTSAppunto").attr("stato", "chiuso");
        $("#sezioneTTSAppunti").css("display", "none");
        $("#btnTTSAppunto").html('<i class="fa fa-volume-up" aria-hidden="true"></i>Lettura');
    }
    loadLinguaTTS();
}

function getVociTTS() {
    return new Promise((resolve, reject) =>{
        if (window.sessionStorage.getItem("ttsVoicesList") == null) {
            let rqVociTTS = inviaRichiesta("/api/TTSVoices", "POST", {});
            rqVociTTS.fail(function name(jqXHR, test_status, str_error) {
                printErrors(jqXHR, "#msgTTSAppunto");
                reject();
            });
            rqVociTTS.done(function (data) {
                window.sessionStorage.setItem("ttsVoicesList", JSON.stringify(data));
                resolve(data);
            });
        } else {
            resolve(JSON.parse(window.sessionStorage.getItem("ttsVoicesList")));
        }
    });  
}

function loadLinguaTTS() {
    let codHtml = "", aus = "";
    let vetOpt = new Array();
    getVociTTS().then(ris => {
        ris.result.voices.forEach(voce => {
            try {
                if (!vetOpt.includes(voce.language)) {
                    aus = vetLingue[voce.language];
                    codHtml += "<option value='" + voce.language + "'>";
                    codHtml += aus + "</option>";
                    vetOpt.push(voce.language);
                }
            } catch (error) {
                return;
            }
        });
        document.getElementById("linguaTTSAppunto").selectedIndex = -1;
        $("#linguaTTSAppunto").html(codHtml).selectpicker("refresh");
    }).catch(err=>{
        $("#msgTTSAppunto").html("Errore Caricamento Lingue");
    });
}

function loadVociTTS() {
    if (document.getElementById("linguaTTSAppunto").selectedIndex != -1) {
        getVociTTS().then(elVoci => {
            let codhtml = "";
            let desc = "";
            let regEx;
            elVoci.result.voices.forEach(voce => {
                if (voce.language == $("#linguaTTSAppunto").val()) {
                    codhtml += "<option value='" + voce.name + "'>";
                    desc = "";
                    regEx = /\wV[0-9]{1}\w/;
                    if ((voce.name).match(regEx)) {
                        desc = voce.description.split(':')[0] + (voce.name).substr((voce.name).search(regEx)+1, 2);
                    } else {
                        desc = voce.description.split(':')[0];
                    }
                    codhtml += desc + "</option>";
                }
            });
            document.getElementById("voceTTSAppunto").selectedIndex = -1;
            $("#voceTTSAppunto").html(codhtml).selectpicker("refresh");
            $("#contVoceTTSAppunto").css("display", "unset");
        }).catch(err => {
            console.log(err);
            $("#msgTTSAppunto").html("Errore Caricamento Voci");
        });       
    }else{
        $("#voceTTSAppunto").html("").selectpicker("refresh");
        $("#contVoceTTSAppunto").css("display", "none");
    }
}

function gestRqTTS() {
    if (document.getElementById("allegatiTTSAppunto").selectedIndex != -1) {
        if (document.getElementById("linguaTTSAppunto").selectedIndex != -1) {
            if (document.getElementById("voceTTSAppunto").selectedIndex != -1) {
                $("#sezStatoOp").css("display", "unset");
                $("#msgTTSAppunto").html("");
                setCardStatoOp("InCorso");
                let rqTTS = inviaRichiesta('/api/TTS', 'POST', { "elencoAllegati": $("#allegatiTTSAppunto").val(), "voce": $("#voceTTSAppunto").val()});
                rqTTS.fail(function (jqXHR, test_status, str_error) {
                    setCardStatoOp("errore", jqXHR);
                });
                rqTTS.done(function (data) {
                    setCardStatoOp("opOk");
                    window.sessionStorage.setItem("ttsAudio", JSON.stringify(data));
                });
            } else {
                gestErrori("Selezionare la voce di lettura", $("#voceTTSAppunto"), "#msgTTSAppunto");
            }
        } else {
            gestErrori("Selezionare la lingua di lettura", $("#linguaTTSAppunto"), "#msgTTSAppunto");
        }
    }else{
        gestErrori("Selezionare almeno un allegato", $("#allegatiTTSAppunto"), "#msgTTSAppunto");
    }
}

function setCardStatoOp(stato, objErrore) {
    let testoOp = "", codHtmlBtn = "";
    if (stato == "InCorso") {
        $("#btnTTSAppunto").attr("disabled", "disabled");
        testoOp = "<h3>Attendere il completamento dell' operazione</h3>";
        codHtmlBtn = '<button id="btnStatoOp" class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Lettura in corso</button >';
    }else if(stato == "opOk"){
        $("#btnTTSAppunto").removeAttr("disabled");
        testoOp = "<h3>Lettura completata</h3>";
        codHtmlBtn = '<button id="btnStatoOp" onclick="gestDownloadAudio();" class="btn btn-primary" type="button"><i class="fa fa-download" aria-hidden="true"></i> Download Audio</button >';
    } else if (stato == "errore" && objErrore != undefined){
        $("#btnTTSAppunto").removeAttr("disabled");
        testoOp = "<h3>Operazione fallita</h3>";
        codHtmlBtn = '<p>Server Error: ' + JSON.parse(jqXHR.responseText)["message"]+'</p>';
    }
    $("#titoloCardStatoOp").html(testoOp);
    $("#textCardStatoOp").html(codHtmlBtn);
}

function gestDownloadAudio() {
    
}