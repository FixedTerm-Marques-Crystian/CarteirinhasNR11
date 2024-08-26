
document.addEventListener("DOMContentLoaded", function () {
    fetch('./db/db.json')
        .then(response => response.json())
        .then(data => {
            const dataDisplay = document.getElementById("tbody");

            data.Colaboradores.forEach(x => {
                // Create HTML elements to display the JSON data
                dataDisplay.innerHTML += '<tr><td style="width: 7%;">' + x.status + '</td><td style="width: 5.5%;">' + x.edv + '</td><td style="width: 20%;">'+ x.nome +'</td><td style="width: 4%;">' + x.CC + '</td><td style="width: 7%;">' + x.dataImpressao + '</td><td style="width: 6%;">'+ x.qtdMed +'</td><td style="width: 9%;">' + x.qtdBtc + '</td><td style="width: 6%;">0000'+ x.bckpCC +'</td><td style="width: 9%;">' + x.bckpNome + '</td><td style="width: 5%;">teste1</td><td style="width: 5.5%;">' + x.qtdReclass + '</td><td style="width: 8%;">'+ x.dataReclass +'</td></tr>';
            }); 
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});