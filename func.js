const password = document.getElementById('pass');
const funct = document.getElementById('funct')
const final = document.getElementById('result');
const keynum = document.getElementById('keynum');
const service = document.getElementById('service');
const custom = document.getElementById('custom');

service.addEventListener('change', (e) => {

    if (service.selectedIndex != 6) {
        document.getElementById('customfield').hidden = true;
        document.getElementById('custom_service').value = service.value;
    }

    else {
        document.getElementById('customfield').hidden = false;
        document.getElementById('custom_service').value = '';
    }

});

funct.addEventListener('click', (e) => {

    var result = "";

    if (password.value !== "") {

        for (i = 0; i < password.value.length; i++) {
            hexlike = password.value.charCodeAt(i).toString(16);
            hexrandom = Math.floor(Math.random() * (100 - 1 + 1) + 1);
            result += (hexrandom + hexlike).slice(-4);
            document.getElementById('A').value = hexrandom;

        }

        keynum.value = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        let encodedString = caesarCipher(result, keynum.value);
        final.value = btoa(encodedString);
        for (var i; i < final.value.length; i++) {

            finalrandom = Math.floor(Math.random() * (100 - 1 + 1) + 1);
            document.getElementById('B').value = finalrandom;
            final.value = final.value.replace(finalrandom, random());
            final.value = final.value.replace('=', random());
            final.value = final.value.slice('-' + document.getElementById('C').value);
        }

    }
    else {
        (function () {
            window.alert = function () {
                modalpopup = $('<div id="myModal" class="modal fade mt-5 text-light" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content border-info"><div class="modal-header border-info"><h5 id="myModalTitle" class="modal-title fw-bold text-warning fs-4">Warning</h5><button type="button" class="btn-close bg-info" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body text-light fw-bold"></div><div class="modal-footer border-info"><button type="button" class="btn btn-secondary border-info border-3 fw-bold" data-bs-dismiss="modal">Okay</button></div></div></div></div>');
                modalpopup.find(".modal-body").text(arguments[0]);
                modal = new bootstrap.Modal(modalpopup);
                modal.show();
            };
        })();
        alert('Please provide your custom phrase in the first field in order to proceed with the password generation process.');
    }
});
const rangeInputs = document.querySelectorAll('input[type="range"]')
document.getElementById('customRange').value = 1;

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
})

const random = (length = (Math.random() * (document.getElementById("customRange").value - 1) + 1)) => {

    let chars = '1234567890!@#$%^&*()-_.?/{}[];":';

    let strnew = '';
    for (let i = 0; i < length; i++) {
        strnew += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return strnew;

};

document.getElementById("reset").addEventListener("click",function(){
    document.getElementById('customRange').value = 1;
    $('#service').val("Google");
    document.getElementById('customfield').hidden = true;
    document.getElementById('custom_service').value = service.value;
    document.getElementById('customRange').style.backgroundSize = 0;
    document.querySelectorAll(".clearbox").forEach(function(element){
        element.value = '';
    });
});

let saveFile = () => {

    if (final.value !== "") {

        let data =
            '--------------------------------------------------------' + '\n' +
            'Service or hint: ' + document.getElementById('custom_service').value + '\n' +
            '--------------------------------------------------------' + '\n' +
            'Your custom seed: ' + password.value + '\n' +
            '--------------------------------------------------------' + '\n' +
            'Your secure password: ' + final.value + '\n' +
            '--------------------------------------------------------';

        const textToBLOB = new Blob([data], { type: 'text/plain' });

        const sFileName = 'pass.txt';

        let url = document.createElement("a");
        url.download = sFileName;

        if (window.webkitURL != null) {
            url.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            url.href = window.URL.createObjectURL(textToBLOB);
            url.style.display = "none";
            document.body.appendChild(url);
        }

        url.click();
    }
    else {
        (function () {
            window.alert = function () {
                modalpopup = $('<div id="myModal" class="modal fade mt-5 text-light" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content border-info"><div class="modal-header border-info"><h5 id="myModalTitle" class="modal-title fw-bold text-warning fs-4">Warning</h5><button type="button" class="btn-close bg-info" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body text-light fw-bold"></div><div class="modal-footer border-info"><button type="button" class="btn btn-secondary border-info border-3 fw-bold" data-bs-dismiss="modal">Okay</button></div></div></div></div>');
                modalpopup.find(".modal-body").text(arguments[0]);
                modal = new bootstrap.Modal(modalpopup);
                modal.show();
            };
        })();
        alert('Please generate a password first.');
    }
}

function replacing(str) {
    let strAm = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890 -_.&?!@ #/";
    let strNz = "0987654321 nopqrstuvwxyzabcdefghijklm NOPQRSTUVWXYZABCDEFGHIJKLM -_.&?!@ #/";
    let finstr = '';
    for (let i = 0; i < str.length; i++) {
        if (strAm.includes(str.charAt(i))) {
            finstr += str.charAt(i).replace(str.charAt(i), strNz[strAm.indexOf(str.charAt(i))]);
        }
    }
    return finstr;
}

let caesarCipher = (str, key) => {
    return str.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + key) % 26 + 65));
}

document.onkeydown = function (e) {

    if (e.ctrlKey && e.keyCode == 86 || e.ctrlKey && e.keyCode == 67 || e.ctrlKey && e.keyCode == 65 || e.ctrlKey && e.keyCode == 88) {
        return true;
    }
    else if (e.ctrlKey || e.keyCode == 123) {
        return false;
    }
}