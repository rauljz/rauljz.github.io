function googleTranslate(lang) {
    var selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
        selectField.value = lang;
        selectField.dispatchEvent(new Event("change"));
    }
}

function loadGoogleTranslate() {
    var script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=initTranslate";
    document.body.appendChild(script);
}

function initTranslate() {
    new google.translate.TranslateElement({ pageLanguage: "es", autoDisplay: false }, "google_translate_element");
}

document.addEventListener("DOMContentLoaded", loadGoogleTranslate);