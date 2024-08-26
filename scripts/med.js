
document.addEventListener("DOMContentLoaded", function () {
    fetch('./db/db.json')
    .then(response => response.json())
    .then(data => {
        const dataDisplay = document.getElementById("tbody");

            data.Med.forEach(x => {
                // Create HTML elements to display the JSON data
                let id = parseInt(dataDisplay.childElementCount+1);
                dataDisplay.innerHTML += "<tr id='aso" + id + "'><td id='edvCad" + id + "'>"+ x.edv +"</td><td id='oculosCad" + id + "'>" + x.oculos + "</td><td id='dataCad" + id + "'>" + x.dataMed + "</td><td id='nr10Cad" + id + "'>"+ x.nr10 +"</td><td id='nr11Cad" + id + "'>" + x.nr11 + "</td><td id='nr33Cad" + id + "'>" + x.nr33 + "</td><td id='nr35Cad" + id + "'>"+ x.nr35 +"</td></tr>";
            
                let nodes = document.querySelectorAll(("tr#aso"+(id)+" > *"));

                for(var i = 0 ; i < nodes.length ; i++) {
                    nodes[i].setAttribute("onclick", "editMed(this)");
                }
            });

        })
    .catch(error => console.error("Error fetching JSON data:", error));
});


function addMed(){
    //Pegando os valores dos campos de cadastro de novo ASO
    let edv = document.getElementById("edv").value;
    let dataMed = document.getElementById("dataMed").value;
    let oculos = document.getElementById("oculosN").checked ? "NÃO" : document.getElementById("oculosS").checked ? "SIM" : "";
    let nr10 = document.getElementById("nr10").checked ? "APTO" : "";
    let nr11 = document.getElementById("nr11").checked ? "APTO" : "";
    let nr33 = document.getElementById("nr33").checked ? "APTO" : "";
    let nr35 = document.getElementById("nr35").checked ? "APTO" : "";

    dataMed = dataMed.split("-");
    dataMed = dataMed[2] + "/" + dataMed[1] + "/" + dataMed[0];

    //Definindo onde adicionar os novos valores, um id para eles
    //e o comando para adicionar o elemento tr com seus tds contendo as informações
    const dataDisplay = document.getElementById("tbody");
    let id = parseInt(dataDisplay.childElementCount+1);
    dataDisplay.innerHTML += "<tr id='aso" + id + "'><td id='edvCad" + id + "'>"+ edv +"</td><td id='oculosCad" + id + "'>" + oculos + "</td><td id='dataCad" + id + "'>" + dataMed + "</td><td id='nr10Cad" + id + "'>"+ nr10 +"</td><td id='nr11Cad" + id + "'>" + nr11 + "</td><td id='nr33Cad" + id + "'>" + nr33 + "</td><td id='nr35Cad" + id + "'>"+ nr35 +"</td></tr>";

    //buscando todos os childNodes do elemento tr criado e adicionando um atributo onclick para futuras edições
    let nodes = document.querySelectorAll(("tr#aso"+(id)+" > *"));

    for(var i = 0 ; i < nodes.length ; i++) {
        nodes[i].setAttribute("onclick", "editMed(this)");
    }

    //clica no cabeçalho "data" da tabela para ordenar pelo mais recente
    const table = document.getElementById('medTbl');
    const header = table.tHead.rows[0].cells[2];
    header.click();

    cleanAddMed();
}


function editMed(el) {
    //Pega o ParentNode(tr) do elemento que ativar a função e, em seguida,
    //seus ChildNodes(td), onde estão as informações atuais para edição
    let nodeList = el.parentNode.childNodes;
    document.getElementById("editWindow").style="";

    //Definindo os campos da tela de edição que vão receber os valores da nodeList
    let idNum = nodeList[0].getAttribute("id").substring(6);
    let oculosN = document.getElementById("oculosNEdit");
    let oculosS = document.getElementById("oculosSEdit");
    let nr10 = document.getElementById("nr10Edit");
    let nr11 = document.getElementById("nr11Edit");
    let nr33 = document.getElementById("nr33Edit");
    let nr35 = document.getElementById("nr35Edit");

    let dataEdit = nodeList[2].innerHTML.split("/");
    
    //Passando os valores da nodeList para os campos definidos
    document.getElementById("idEdit").value = idNum;
    document.getElementById("edvEdit").value = nodeList[0].innerHTML;
    document.getElementById("dataMedEdit").value = dataEdit[2] + "-" + dataEdit[1] + "-" + dataEdit[0];
    oculosN.checked = nodeList[1].innerHTML == "NÃO" ? true : false;
    oculosS.checked = nodeList[1].innerHTML == "SIM" ? true : false;
    nr10.checked = nodeList[3].innerHTML == "APTO" ? true : false;
    nr11.checked = nodeList[4].innerHTML == "APTO" ? true : false;
    nr33.checked = nodeList[5].innerHTML == "APTO" ? true : false;
    nr35.checked = nodeList[6].innerHTML == "APTO" ? true : false;

}

function updateMed(){
    //Puxa as informações dos campos editáveis e insere na tabela novamente
    let id = document.getElementById("idEdit").value;
    let edv = document.getElementById("edvEdit").value;
    let dataMed = document.getElementById("dataMedEdit").value;
    let oculos = document.getElementById("oculosNEdit").checked ? "NÃO" : document.getElementById("oculosSEdit").checked ? "SIM" : "";
    let nr10 = document.getElementById("nr10Edit").checked ? "APTO" : "";
    let nr11 = document.getElementById("nr11Edit").checked ? "APTO" : "";
    let nr33 = document.getElementById("nr33Edit").checked ? "APTO" : "";
    let nr35 = document.getElementById("nr35Edit").checked ? "APTO" : "";


    dataMed = dataMed.split("-");
    dataMed = dataMed[2] + "/" + dataMed[1] + "/" + dataMed[0]

    //Busca pelo elemento tr por id para inserir as informações
    document.getElementById("aso"+id).innerHTML = "<td id='edvCad" + id + "'>"+ edv +"</td><td id='oculosCad" + id + "'>" + oculos + "</td><td id='dataCad" + id + "'>" + dataMed + "</td><td id='nr10Cad" + id + "'>"+ nr10 +"</td><td id='nr11Cad" + id + "'>" + nr11 + "</td><td id='nr33Cad" + id + "'>" + nr33 + "</td><td id='nr35Cad" + id + "'>"+ nr35 +"</td>";
    let nodes = document.querySelectorAll(("tr#aso"+id+" > *"));

    //adiciona o atributo onclick de novo para futuras edições
    for(var i = 0 ; i < nodes.length ; i++) {
        nodes[i].setAttribute("onclick", "editMed(this)");
    }

    document.getElementById("editWindow").style="display: none;";
}

function cancelMed(){
    document.getElementById("editWindow").style="display: none;";
}

function searchMed(val){
    //
    const data = document.getElementById("tbody").childNodes;
    for(var i = 0 ; i < data.length ; i++) {
        let rowData = data[i].childNodes;
        if(rowData.length > 0) {
            rowData[0].innerHTML.startsWith(val) ? data[i].hidden = false : data[i].hidden = true;
        }
    }
}

function cleanAddMed() {
    document.getElementById("edv").value = "";
    document.getElementById("dataMed").value = "";
    document.getElementById("oculosN").checked = false
    document.getElementById("oculosS").checked = false;
    document.getElementById("nr10").checked = false;
    document.getElementById("nr11").checked = false;
    document.getElementById("nr33").checked = false;
    document.getElementById("nr35").checked = false;
}