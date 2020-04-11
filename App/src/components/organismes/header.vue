<template>
    <header class="header">

       <router-link to="/">
            <div class="logo"></div>
       </router-link>

        <div class="inner">
             <!-- <svg class="bg"  width="   " height="139.393" viewBox="0 0 671.062 139.393">
                <path id="Path_3" data-name="Path 3" d="M-3875.146,7769.736l53.707,139.393,617.355-15.24V7769.736Z" transform="translate(3875.146 -7769.736)" fill="#fff"/>
            </svg> -->
            <ul class="nav" >
                <router-link to="/projects">
                    <li :class="$route.name == 'projects' ? 'activeCategory' : ''">Projets</li>
                </router-link>
                <router-link to="/courses">
                    <li :class="$route.name == 'courses' ? 'activeCategory' : ''">Cours</li>
                </router-link>
                <router-link to="/ressources">
                    <li :class="$route.name == 'ressources' ? 'activeCategory' : ''">Ressources</li>
                </router-link>
                <router-link to="/about">
                    <li :class="$route.name == 'about' ? 'activeCategory' : ''">About</li>
                </router-link>
            </ul>
        </div>       

    </header>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.header{
    z-index: 999;
    position: fixed;
    top:0;
    right:0;
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding-left:50px;
    padding-right:0;
    

    .inner{
        position: relative;
        display: flex;
        height: 139.393px;
        justify-content: space-between;
        align-items: center;
        width:617px;

        background-color:#fff;
        clip-path: polygon(0% 0, 100% 0%, 100% 100%, 10% 100%);
        .bg{
            position: absolute;
            top:0;
            right:0;
           
        }
    }

    .logo{
        width:100px;
        height:100px;

        border-radius:50px;
        background-size: 100px 100px;
        background-image: url('~/icons/logo/logo@1x.png');
        box-shadow: 0 0 8px rgba(0, 0, 0, .08)
    }

    .nav{
        font-family: 'Open Sans', sans-serif;
        position: relative;
        z-index: 9999;
        display: flex;
        align-self: flex-end;
        font-size: 20px;
        margin:auto 70px auto calc(10% + 70px);
        width:100%;
        justify-content: space-between;
        li{
            margin: 10px 18px;
            list-style: none;
            position: relative;
             cursor: pointer;

            &:after{
                content: "";
                position: absolute;
                display: block;
                width:0%;
                height:2px;
                border-radius: 1px;
                background-color: #1C1C1C;
                transition: all .3s ease;
               
            }

            &:hover{
                &:after{
                    width:80%;
                }
            }
        }

        & .activeCategory {
            &:after{
                width:100%;
            }
        }
    }
}
</style>