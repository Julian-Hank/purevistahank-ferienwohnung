
document.getElementById('validationForm').addEventListener('submit', function (e) {
    const idNumber = document.getElementById('idNumber').value.trim();
    const birthDate = new Date(document.getElementById('birthDate').value);
    const expiryDate = new Date(document.getElementById('expiryDate').value);
    const today = new Date();

    // 1. Format für deutsche Ausweisnummer: 9 Zeichen, alphanumerisch
    const idPattern = /^[A-Z0-9]{9}$/i;
    if (!idPattern.test(idNumber)) {
        createPopup("Ungültige Eingabe","Bitte geben Sie eine gültige Ausweisnummer ein (9-stellig, Buchstaben / Zahlen).","Ok","","#dc143c","null",
            function () {}
        );
        e.preventDefault();
        return;
    }

    // 2. Ablaufdatum in der Zukunft
    if (expiryDate < today) {
        createPopup("Ungültige Eingabe","Der Ausweis ist abgelaufen.","Ok","","#dc143c","null",
            function () {}
        );
        e.preventDefault();
        return;
    }

    // 3. Geburtstag muss in der Vergangenheit liegen und sinnvoll sein
    if (birthDate >= today || birthDate.getFullYear() < 1935 || birthDate.getFullYear() >= today.getFullYear() || today.getFullYear() - birthDate.getFullYear() < 18) {
        createPopup("Ungültige Eingabe","Bitte geben Sie ein gültiges Geburtsdatum ein.","Ok","","#dc143c","null",
            function () {}
        );
        e.preventDefault();
        return;
    }

    // 4. Anreise muss vor Abreisedatum liegen
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    if (startDate >= endDate) {
        createPopup("Ungültige Eingabe","Das Anreisedatum muss vor dem Abreisedatum liegen.","Ok","","#dc143c","null",
            function () {}
        );
        e.preventDefault();
        return;
    }
        
    e.preventDefault(); // Verhindert das Standard-Formularverhalten
    createPopup("Validierung erfolgreich","Alle eingegebenen Daten sind korrekt.","Formular absenden","Abbrechen","#009aa0", "#dc143c", 
        function () {
            // xmlhttprequest
        }
    );

});


//createPopup
function createPopup(headTxt, captionTxt, option1, option2, option1col, option2col, action1, action2 = () => {}) {
    let popup = document.createElement('div');
    let popupBackground = document.createElement('div');
    let header = document.createElement('h1');
    let caption = document.createElement('p');
    let optionWrapper = document.createElement('div');
    let option1Btn = document.createElement('button');
    let option2Btn = document.createElement('button');

    popup.classList.add('popup');
    popupBackground.classList.add('popupBackground');
    optionWrapper.classList.add('optionWrapper');
    option1Btn.id = 'option1';
    option2Btn.id = 'option2';

    header.innerHTML = headTxt;
    caption.innerHTML = captionTxt;
    option1Btn.innerHTML = option1;
    option2Btn.innerHTML = option2;

    option1Btn.style.background = option1col;
    option2Btn.style.background = option2col;

    option1Btn.addEventListener('click', function () {
        action1();
        popup.remove();
        popupBackground.remove();
    });

    option2Btn.addEventListener('click', function () {
        action2();
        popup.remove();
        popupBackground.remove();
    });

    popup.appendChild(header);
    popup.appendChild(caption);
    optionWrapper.appendChild(option1Btn);
    if (option2 !== '') {
        optionWrapper.appendChild(option2Btn);
    } else {
        popup.style.width = 'fit-content';
        option1Btn.style.width = '90%';
        optionWrapper.style.justifyContent = 'center';
    }
    popup.appendChild(optionWrapper);

    document.body.appendChild(popup);
    document.body.appendChild(popupBackground);
}


function toggleAGB(){
    let popup = document.createElement('div');
    let header = document.createElement('h1');
    let btnWrapper = document.createElement('div');
    let closeBtn = document.createElement("button");
    let agbIframe = document.createElement("iframe");
    let popupBackground = document.createElement('div');

    popup.classList.add('popup');
    popupBackground.classList.add('popupBackground');
    btnWrapper.classList.add('optionWrapper');
    popup.style.height = "min-content"

    popup.style.height = "75%"
    popup.style.width = "85%"

    agbIframe.src = "../agb"
    agbIframe.style.width = "100%"
    agbIframe.style.height = "70%"
    agbIframe.style.display = "block"
    agbIframe.style.margin = "0 auto"

    btnWrapper.style.justifyContent = "center"

    let lang = document.getElementById("switchLangBtnText").innerText.toLowerCase()
    closeBtn.innerText = lang == "de" ? "Schließen" : "Close";
    header.innerText = lang == "de" ? "AGB" : "Terms & Conditions";
    

    closeBtn.addEventListener('click', function () {
        popup.remove();
        popupBackground.remove();

        document.body.style.overflow = 'auto';
    });

    btnWrapper.appendChild(closeBtn);
    popup.appendChild(header);
    popup.appendChild(agbIframe);
    popup.appendChild(btnWrapper);

    document.body.appendChild(popup);
    document.body.appendChild(popupBackground);

    document.body.style.overflow = 'hidden';

}

