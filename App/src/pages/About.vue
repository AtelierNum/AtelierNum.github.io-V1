<template>
<div id ="page">

    <svg-curved content="p5"></svg-curved>

  <section>
    <h3>About</h3>

    <p>Ce site a été développé par Bérenger Recoules, Simon Renault et Raphaël Perraud. 
        Conçu pour présenter les travaux effectués à l'Atelier Numérique par les élèves de l'Ecole, il met 
        également à disposition des cours et des ressources externes à ceux-ci.
        Le code source de ce site est entièrement open-source, disponible sur <a href="https://github.com/AtelierNum/AtelierNum.github.io/tree/src">Github</a>.
    </p>

    <div class="faces">
        <div class="perso_card superpromaster"> 
            <a href="http://b2renger.github.io/">
                <img src="" alt="">
                <h4>Bérenger Recoules</h4>
                <span>aka B2renger</span>
                <p>Responsable de l'Atelier Numérique</p>
                <p class="roles">Prof - Responsable - Semi-Croustillant</p>
            </a>
        </div>
        
        <div class="perso_card petitefourmi"> 
            <a href="www.raphaelperraud.com">
                <img src="" alt="">
                <h4>Raphaël Perraud</h4>
                <span>Squatteur invétéré</span>
                <p>Etudiant de l'Ecole de design</p>
                <p class="roles">Habitué - Semi-Croustillant</p>
            </a>
        </div>
        
        <div class="perso_card petitefourmi"> 
            <a href="www.simon-renault.com">
                <img src="" alt="">
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
    }

    p {
        text-align: left;
        font-family: 'Open Sans';
        font-weight:300;
        font-size:1.2em;
        color:rgb(98, 105, 121);

        max-width:900px;

        a {
            font-size :1em;

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
    }
</style>
