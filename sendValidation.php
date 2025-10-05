<?php
require_once "db.php";

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$address = $_POST["address"];
$zip = $_POST["zip"];
$city = $_POST["city"];
$country = $_POST["country"];

$idNumber = $_POST["idNumber"];
$birthDate = $_POST["birthDate"];
$expiryDate = $_POST["expiryDate"];
if (isset($_FILES['idUpload']) && $_FILES['idUpload']['error'] === 0) {
    $idUpload = file_get_contents($_FILES["idUpload"]["tmp_name"]);
} else{
    $idUpload = NULL;
}

$stmt = $pdo->prepare("INSERT INTO VALIDATION_DATA (FIRST_NAME, LAST_NAME, ADDRESS, ZIP, CITY, COUNTRY, ID_NUMBER, BIRTHDATE, EXPIRYDATE, ID_IMG) VALUES (:firstName, :lastName, :address, :zip, :city, :country, :idNumber, :birthDate, :expiryDate, :idUpload)");
$stmt->bindParam(":firstName", $firstName);
$stmt->bindParam(":lastName", $lastName);
$stmt->bindParam(":address", $address);
$stmt->bindParam(":zip", $zip);
$stmt->bindParam(":city", $city);
$stmt->bindParam(":country", $country);
$stmt->bindParam(":idNumber", $idNumber);
$stmt->bindParam(":birthDate", $birthDate);
$stmt->bindParam(":expiryDate", $expiryDate);
$stmt->bindParam(":idUpload", $idUpload, PDO::PARAM_LOB);
$stmt->execute();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="images\favicon.ico">
    <link rel="stylesheet" href="css\base.css">
    <title>Document</title>
</head>
<body>
    <header>
        <img id="Logo-Top" src="images\Logo-Top.png" alt="Logo" onclick="window.location.href='\\'">
        <img id="menuBtn" src="images\MenuBtn.png" alt="Menu Button" onclick="toggleSidebar()">
        <div id="switchLangBtn">
            <img id="switchLangBtnImg" src="" alt="">
            <p id="switchLangBtnText"></p>
        </div>
    </header>

    <aside id="sidebar">
        <nav>
            <ul>
                <li><a href="\" data-i18n="home">Home</a></li>
                <!-- <li><a href="..\prices" data-i18n="prices">Preise</a></li> -->
                <li><a href="..\booking" data-i18n="booking">Buchen</a></li>
                <li><a href="..\more" data-i18n="more">Umgebung</a></li>
                <li><a href="..\about" data-i18n="about">Über</a></li>
                <li><a href="..\contact" data-i18n="contact">Kontakt</a></li>
            </ul>
            <img id="sideBarLogo" src="..\images\Logo-Small-Inverted.png" alt="">
        </nav>
    </aside>

    <main>
        <h1 id="mainHeader" data-i18n="successText"> ✅ Das hat geklappt!</h1>
        <h3 data-i18n="infoText" style="text-align: center; margin: 20px;">Sie werden nun einige Tage vor ihrer Anreise eine Nachricht von uns bekommen in welcher Sie den Türcode erhalten.</h3>
        <h4 data-i18n="contactText" style="text-align: center; margin: 20px">Falls Sie Fragen haben melden Sie sich gerne: <a href="contact/">Kontakt</a></h4>
        <br><br><br><br>
        <a style="display: block; text-align: center;" href="/">Homepage</a>
    </main>

    <footer style="position: fixed; width: 100%; bottom: 0;">
        <p data-i18n="footerCopyright">&copy; 2025 Pure Vista Hank Ferienwohnung</p>
        <nav>
          <a href="impressum\" data-i18n="footerImpressum">Impressum</a> | 
          <a href="privacy-policy\" data-i18n="footerDatenschutz">Datenschutz</a> | 
          <a href="agb\" data-i18n="footerAGB">AGB</a> | 
          <a href="contact\" data-i18n="footerContact">Kontakt</a> | 
          <a href="about\" data-i18n="footerAbout">Über</a>
        </nav>
    </footer>
    <script src="base.js"></script>
    <script>
        const translations = {
            de: {
                home: "Home",
                prices: "Preise",
                booking: "Buchen",
                more: "Umgebung",
                about: "Über",
                contact: "Kontakt",

                successText: "✅ Das hat geklappt!",
                infoText: "Sie werden nun einige Tage vor ihrer Anreise eine Nachricht von uns bekommen in welcher Sie den Türcode erhalten.",
                contactText: "Falls Sie Fragen haben melden Sie sich gerne: <a href='contact/'>Kontakt</a>",
                

                footerCopyright: "© 2025 Pure Vista Hank Ferienwohnung",

                footerImpressum: "Impressum",
                footerDatenschutz: "Datenschutz",
                footerAGB: "AGB",
                footerWiderruf: "Widerrufsbelehrung",
                footerAbout: "Über"
            },
            en: {
                home: "Home",
                prices: "Prices",
                booking: "Booking",
                more: "Surroundings",
                about: "About",
                contact: "Contact",

                successText: "✅ That worked!",
                infoText: "You will now receive a message from us a few days before your arrival containing the door code.",
                contactText: "If you have any questions, please <a href='contact/'>contact</a> us.",

                footerCopyright: "© 2025 Pure Vista Hank Holiday Apartment",

                footerImpressum: "Imprint",
                footerDatenschutz: "Privacy Policy",
                footerAGB: "Terms and Conditions",
                footerWiderruf: "Cancellation Policy",
                footerAbout: "About"
            }
        }


        function setLanguage(lang) {
            const elements = document.querySelectorAll('[data-i18n]')
            elements.forEach(el => {
                const key = el.getAttribute('data-i18n')
                const translation = translations[lang]?.[key]
                if (translation) {
                    el.innerHTML = translation
                }
            })
        }

        function changeFlagDisplay(lang){
            if (lang == "de"){
                document.getElementById("switchLangBtnImg").setAttribute("src", "images\\germanFlagIcon.png")
            } else{
                document.getElementById("switchLangBtnImg").setAttribute("src", "images\\ukFlagIcon.png")
            }
            document.getElementById("switchLangBtnText").innerHTML = lang.toUpperCase()
        }

        var lang = navigator.language.slice(0, 2) === "de" ? "de" : "en"
        setLanguage(lang)
        changeFlagDisplay(lang)

        document.getElementById("switchLangBtn").addEventListener("click", function(){
            lang = lang == "de" ? "en" : "de"
            setLanguage(lang)
            changeFlagDisplay(lang)
        })

    </script>
</body>
</html>