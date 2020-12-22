<template>
  <div id="page">
    <svg-curved content="p5"></svg-curved>

    <section>
      <h3>About</h3>

      <p>
        Ce site a été développé par Simon Renault, Raphaël Perraud et Bérenger Recoules.
        Conçu pour présenter les travaux effectués à l'Atelier Numérique par les élèves de l'École de design Nantes Atlantique, il met
        également à disposition des cours et des ressources externes.
        Le code source de ce site est entièrement open-source, disponible sur
        <a
          href="https://github.com/AtelierNum/AtelierNum.github.io/tree/src"
        >Github</a>.
      </p>

      <p>
        <strong>Contributeurs de la section cours:</strong>
        {{contributors}}
      </p>

      <p>
         <strong>Le programme d'accueil à été réalisé avec:</strong>
        <a href="https://p5js.org">p5js</a> par
        <a href="http://raphaelperraud.com">Raphaël Perraud</a>.
      </p>

      <div class="faces">
        <div class="perso_card superpromaster">
          <a href="http://b2renger.github.io/" target="blank">
            <img src alt />
            <h4>Bérenger Recoules</h4>
            <span>aka b2renger</span>
            <p>Responsable de l'Atelier Numérique</p>
            <p class="roles">Prof - Responsable</p>
          </a>
        </div>

        <div class="perso_card petitefourmi">
          <a href="http://www.raphaelperraud.com" target="blank">
            <img src alt />
            <h4>Raphaël Perraud</h4>
            <span>Squatteur invétéré</span>
            <p>Etudiant de l'Ecole de design</p>
            <p class="roles">Habitué</p>
          </a>
        </div>

        <div class="perso_card petitefourmi">
          <a href="https://www.simon-renault.com" target="blank">
            <img src alt />
            <h4>Simon Renault</h4>
            <span>@Palantir</span>
            <p>Alumni de l'Ecole de design</p>
            <p class="roles">Habitué - Médaille d'argent web-dev aux Worldskills</p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import svgCurved from "@/components/atoms/svgCurved";

export default {
  name: "Mentions",
  components: {
    "svg-curved": svgCurved,
  },
  data() {
    return {
      contributors: "Bérenger Recoules, Martin Cailleau, Benjamin Carrier ",
    };
  },
};
</script>

<style scoped lang="scss">
section {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
}

h3 {
  text-align: left;
  font-family: "Rubik";
  font-size: 2em;
  font-weight: 500;
  color: #373d4a;

  margin-bottom: 20px;
}

h4 {
  margin-top: 50px;
  text-align: left;
  font-family: "Rubik";
  font-size: 1.6em;
  font-weight: 500;
  color: #373d4a;

  margin-bottom: 20px;
}

h5 {
  text-align: left;
  font-family: "Rubik";
  font-size: 1.3em;
  font-weight: 500;
  color: #373d4a;

  margin-bottom: 8px;
}

a {
  display: inline-block;
  position: relative;
  font-family: "Open Sans";
  font-weight: 00;
  font-size: 1.2em;
  color: #373d4a;
  margin-bottom: 12px;

  max-width: 900px;
}

p {
  text-align: left;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.2em;
  color: rgb(98, 105, 121);

  max-width: 900px;

  a {
    font-size: 1em;

    &::after {
      content: " ";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 3px;
      border-radius: 2px;
      background-color: #373d4a;
    }
  }
}
</style>
