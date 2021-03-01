<template>
<div id ="page">

    <svg-curved content="p5"></svg-curved>

  <section>
    <h3>Crédits et mentions légales</h3>
    <h4>Site officiel de l'Atelier Numérique de L’École de design Nantes Atlantique</h4>

    <p>Conception par des étudiants de l'école et le responsable de l'Atelier Numérique</p>
    <p> Ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle, 
        pour l’ensemble de ses contenus, textes et images. En ce sens, tout média, et texte présents ainsi que toute documentation
        de projet sont sujets à leurs licenses respectives ; toute marque et nom déposés cités sur ce site restent la propriété 
        intégrale de leurs ayant-droits.</p>

        <p>La présence de liens hypertextes vers d’autres sites web n’engage aucunement L’École de design Nantes Atlantique sur 
            le contenu de ces sites.
        </p>

        <p class="license">Le code source de ce site est mis à disposition selon les termes de la 
            <a rel="license" href="http://creativecommons.org/licenses/by/2.0/fr/">Licence Creative Commons Attribution 2.0 France</a>,
             disponible sur <a href="https://github.com/AtelierNum/AtelierNum.github.io/tree/src">Github</a>.</p>

        <h4>Contact</h4> 
        <h5>Bérenger Recoules</h5>
        <a href="mailto:b.recoules@lecolededesign.com">b.recoules@lecolededesign.com</a>
        <br>
        <a href="tel:+33 2 53 52 60 15">+33 2 53 52 60 15</a>
        <p>Responsable de l'Atelier Numérique à L’École de design Nantes Atlantique</p>
        <p>L’École de design Nantes Atlantique
            <br> Digital Design Factory
            <br> Atlanpole La Chantrerie
            <br> 9 rue Alfred Kastler
            <br> 44306 Nantes Cedex 3
            <br> FRANCE
        </p>
  </section>
</div>
</template>

<script>
import svgCurved from '@/components/atoms/svgCurved'

export default {
    name: 'Mentions',
    components: {
        'svg-curved' : svgCurved
    }
}
</script>

<style scoped lang="scss">
    section {
        max-width:900px;
        margin-left:auto;
        margin-right:auto;
        margin-top:50px;
    }

    h3{
        text-align: left;
        font-family: 'Rubik';
        font-size:2em;
        font-weight:500;
        color: #373D4A;

        margin-bottom:20px;
    }
    
    h4{ 
        margin-top:50px;
        text-align: left;
        font-family: 'Rubik';
        font-size:1.6em;
        font-weight:500;
        color: #373D4A;

        margin-bottom:20px;
    }

    h5{
        text-align: left;
        font-family: 'Rubik';
        font-size:1.3em;
        font-weight:500;
        color: #373D4A;

        margin-bottom:8px;
    }

    a {
        display: inline-block;
        position:relative;
        font-family: 'Open Sans';
        font-weight:00;
        font-size:1.2em;
        color: #373D4A;
        margin-bottom:12px;

        max-width:900px;

        &::after{
            content: ' ';
            position: absolute;
            bottom : -4px;
            left : 0;
            width:100%;
            height : 3px;
            border-radius:2px;
            background-color:#373D4A;
        }
    }

    p{
        text-align: left;
        font-family: 'Open Sans';
        font-weight:300;
        font-size:1.2em;
        color:rgb(98, 105, 121);

        max-width:900px;
    }

    .license {
        font-size:1.2em;
        margin-top:12px;    

        & a {
            font-size:1em;
        }
    }
</style>
