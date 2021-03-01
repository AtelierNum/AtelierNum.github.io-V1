<template>
<div class="footer">
   <!-- <svg  width="1920.065" height="585" viewBox="0 0 1920.065 585">
    <g id="Group_155" data-name="Group 155" transform="translate(0.065 -6452.833)">
        <path  d="M0,908.328H1920V255.2s-55.829,75.461-364.69,11.661S959.582,114.914,635.582,114.914c-480,0-635.647,126.167-635.647,126.167Z" transform="translate(0 6337.918)" fill="#e48174"/>
        <path  d="M0,0H1920V335.688s-69.613-5.778-207.017,12.121c-292.152,46.17-703.646,207-1027.646,207C205.336,554.81,0,407.792,0,407.792Z" transform="translate(1920 7246.246) rotate(180)" fill="#1c1c1c"/>
    </g>
    </svg> -->
    <div class="waves">
        <div class="wave_front"></div>
    </div>

    <div class="infos">
        <div class="edna">
            <img src="../../../public/img/logo_edna_white.png" alt="logo of l'ecole de design nantes atlantique">
            <h2>L'Atelier numérique</h2>
            <h3>by <a href="https://www.lecolededesign.com/">L'&#201;cole de design Nantes Atlantique</a></h3>
        </div>

        <div>
            <div class="socials instagram"><a href="https://www.instagram.com/ateliernum/"></a></div>
            <div class="socials discord"><a href="https://discord.gg/tF6qz8v"></a></div>
            <div class="socials github"><a href="https://github.com/AtelierNum"></a></div>
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
    padding-top:250px;

    & .waves{
        z-index:1;
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        height:100%;
        background-image: url('../../assets/masks/footer_back_mask.svg');
        background-size:100% 100%;
        background-position: right;

        .wave_front{
            position:absolute;
            bottom:0;
            left:0;
            width:100%;
            height:70%;
            z-index:2;
            background-image: url('../../assets/masks/footer_front_mask.svg');
            background-size:100% 100%;
            background-position: bottom;
        }       
        
    }

    @media(max-width:880px){
        padding-top:300px;

        .waves{
            background-size:300% 100%;

            .wave_front{
                background-position-x: -20vw;
                background-size:200% 100%;
            }
        }
    }
}

.infos {
    position:relative;
    width:100%;
    margin:auto;
    z-index:10;

    display:grid;
    justify-items: center;
    padding-bottom:50px;
    padding-top:30px;

    max-width:80vw;


    & h2 {
        color: var(--color-gray01);
        font-family: 'Rubik';
        font-size:1.98em;
        font-weight:700;
        text-transform: uppercase;
        text-align: left;
        grid-row:1/2;

        @media(max-width:720px){
            font-size:6vw;
        }
    }

    & h3 {
        color: var(--color-gray01);
        font-family: 'Open Sans';
        font-size:16px;
        font-weight: 300;
        text-transform: uppercase;
        text-align: left;
        grid-row: 2/ 3;

        & a {
            color : #e48174;
        }

        @media(max-width:720px){
            max-width:90%;
        }
    }

    & > div {
        width:200px;
        display:flex;
        justify-content: space-between;
        margin-top:24px;
        
        @media(max-width:480px){
            margin-top:50px;
        }
    }

    & .legals {
        position: absolute;
        right:-8%;
        bottom:50px;
        color:var(--color-gray01);
        font-family: 'Open Sans';
        font-size:16px;
        font-weight: 300;
        text-align: center;

        @media(max-width:880px){
            position:relative;
            left:0;
            bottom:0;
            margin:30px auto 20px auto;
        }

        @media(max-width:480px){
            margin-top:30px;
            margin-bottom:0px;
        }
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

    @media(max-width:720px){
        grid-template-columns: 6vw auto;
    }
}

.edna {
    display: grid !important;
    width: unset !important;
    grid-template-columns: 40px auto;
    grid-auto-rows: auto ;
    grid-column-gap:20px;
    grid-row-gap:8px;

    @media(max-width:480px){
        grid-template-columns: 6vw auto;
    }

    & img {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        height:100%;
        max-width:100%;
        object-fit: contain;
        object-position: left top;
        // width:100%;
        
    }
}

.instagram {
    background-image: url('~/icons/socials/instagram.svg');
    background-size:82%; 
    background-position: 0;
}
.discord { background-image: url('~/icons/socials/discord_logo.svg') }
.github{ 
    background-size:100%;
    background-image: url('~/icons/socials/github_logo.svg');
}
</style>