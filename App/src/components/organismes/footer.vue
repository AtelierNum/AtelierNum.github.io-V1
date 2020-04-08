<template>
<div class="footer">
   <svg  width="1920.065" height="585" viewBox="0 0 1920.065 585">
    <g id="Group_155" data-name="Group 155" transform="translate(0.065 -6452.833)">
        <path  d="M0,908.328H1920V255.2s-55.829,75.461-364.69,11.661S959.582,114.914,635.582,114.914c-480,0-635.647,126.167-635.647,126.167Z" transform="translate(0 6337.918)" fill="#e48174"/>
        <path  d="M0,0H1920V335.688s-69.613-5.778-207.017,12.121c-292.152,46.17-703.646,207-1027.646,207C205.336,554.81,0,407.792,0,407.792Z" transform="translate(1920 7246.246) rotate(180)" fill="#1c1c1c"/>
    </g>
    </svg>

    <div class="infos">
        <h2>L'Atelier numérique</h2>
        <h3>from <a href="https://www.lecolededesign.com/">L'Ecole de design Nantes Atlantique</a></h3>

        <div>
            <div class="socials instagram"><a href="https://www.instagram.com/ateliernum/"></a></div>
            <div class="socials discord"><a href="https://discord.gg/tF6qz8v"></a></div>
        </div>

        <router-link class="legals" to="/mentions">Crédits et mentions légales</router-link>
    </div>


</div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.footer {
    margin-top: 130px;
    position: relative;

    & svg{
        max-width:100%;
        transform:translateY(5px);
    }
}

.infos {
    position:absolute;
    left:0;
    bottom:32px;
    width:100%;

    display:grid;
    justify-items: center;

    & h2 {
        color: var(--color-gray01);
        font-family: 'Rubik';
        font-size:1.9em;
        font-weight:700;
        text-transform: uppercase;
        text-align: center;
    }

    & h3 {
        color: var(--color-gray01);
        font-family: 'Open Sans';
        font-size:17px;
        font-weight: 300;
        text-transform: uppercase;
        text-align: center;

        & a {
            color : #e48174;
        }
    }

    & > div {
        width:200px;
        display:flex;
        justify-content: space-between;
        margin-top:24px;
    }

    & .legals {
        position: absolute;
        right:22px;
        bottom:0;
        color:var(--color-gray01);
        font-family: 'Open Sans';
        font-size:16px;
        font-weight: 300;
        text-align: center;
    }
}

.socials {
    display: inline-block;
    width:32px;
    height:32px;
    fill: #ffffff;
    background-size:100%;
    background: no-repeat center 100%;
        

    & a {
        display:inline-block;
        width:100%;
        height:100%;
    }
}

.instagram {
    background-image: url('~/icons/socials/instagram.svg');
    background-size:82%; 
    background-position: 0;
}
.discord { background-image: url('~/icons/socials/discord_logo.svg') }
</style>