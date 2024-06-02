//skins
import AfriqueSud from "../assets/images/drapeaux/AfriqueSud.png"
import Allemagne from "../assets/images/drapeaux/Allemagne.png"
import Angleterre from "../assets/images/drapeaux/Angleterre.png"
import Bresil from "../assets/images/drapeaux/Bresil.png"
import Cameroun from "../assets/images/drapeaux/Cameroun.png"
import Canada from "../assets/images/drapeaux/Canada.png"
import Chine from "../assets/images/drapeaux/Chine.png"
import Espagne from "../assets/images/drapeaux/Espagne.png"
import EtatUnis from "../assets/images/drapeaux/EtatUnis.png"
import France from "../assets/images/drapeaux/France.png"
import Italie from "../assets/images/drapeaux/Italie.png"
import Russie from "../assets/images/drapeaux/Russie.png"
import Ukraine from "../assets/images/drapeaux/Ukraine.png"

class Accueil {
    pseudo;
    type;
    indice;
    skins = [AfriqueSud, Allemagne, Angleterre, Bresil, Cameroun, Canada, Chine, Espagne, EtatUnis, France, Italie, Russie, Ukraine];
    photo;
    fleche_g;
    fleche_d;
    constructor() {

        this.pseudo = 'init';
        this.type = 'init';
        this.indice = 0;
        this.photo = document.getElementById("show");
        this.fleche_g = document.getElementsByClassName("arrow")[0];
        this.fleche_d = document.getElementsByClassName("arrow")[1];

        this.initListeners();
    }

    initListeners() {
        const self = this;

        // Fonction de gestion des données du formulaire
        function handleForm(event) {
            event.preventDefault();
            self.pseudo = document.getElementById('pseudo').value;
            const pseudoInput = document.getElementById('pseudo');
            if (self.pseudo.length < 3) {
                pseudoInput.style.borderColor = 'red';
                pseudoInput.value = '';
                pseudoInput.placeholder = 'Pseudo à 3 caractères minimum';
                return;
            } else {
                pseudoInput.style.borderColor = 'green';
                pseudoInput.placeholder = '';
            }
            console.log("Pseudo:", self.pseudo);
            console.log("Indice:", self.indice);

            const queryString = `?pseudo=${self.pseudo}&indice=${self.indice}`;

            window.location.href = `${window.location.pathname}game.html${queryString}`;
        }

        // Ajout de l'événement de soumission du formulaire
        document.getElementById('formulaire').addEventListener('submit', handleForm);

        // Gestion des clics sur les flèches gauche et droite
        this.fleche_d.onclick = function () {
            self.indice++;
            if (self.indice > self.skins.length - 1) {
                self.indice = 0;
            }
            console.log("Droite");
            self.photo.setAttribute("src", self.skins[self.indice]);
        };

        this.fleche_g.onclick = function () {
            self.indice--;
            if (self.indice < 0) {
                self.indice = self.skins.length - 1;
            }
            console.log("Gauche");
            self.photo.setAttribute("src", self.skins[self.indice]);
        };
    }
}

// Export de la classe Game
export default Accueil;
