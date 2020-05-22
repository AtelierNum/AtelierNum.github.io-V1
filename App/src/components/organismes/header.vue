<template>
    <header class="header">

       <router-link to="/">
            <div class="logo"></div>
       </router-link>

        <div class="burgerNum" :class="burgerOpened ? 'opened' : ''" @click="openBurger()">
            <svg width="191" height="53" viewBox="0 0 191 53" class="burgerLine" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M175.5 26.5C175.5 32.8513 170.351 38 164 38C157.649 38 152.5 32.8513 152.5 26.5C152.5 20.1487 157.649 15 164 15C170.351 15 175.5 20.1487 175.5 26.5ZM190.5 26.5C190.5 41.1355 178.636 53 164 53C152.153 53 142.121 45.2255 138.729 34.5L7.5 34.5C3.35786 34.5 0 31.1421 0 27C0 22.8579 3.35786 19.5 7.5 19.5L138.434 19.5C141.504 8.26112 151.788 0 164 0C178.636 0 190.5 11.8645 190.5 26.5Z"/>
            </svg>
            <svg width="191" height="53" viewBox="0 0 191 53" class="burgerLine" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M175.5 26.5C175.5 32.8513 170.351 38 164 38C157.649 38 152.5 32.8513 152.5 26.5C152.5 20.1487 157.649 15 164 15C170.351 15 175.5 20.1487 175.5 26.5ZM190.5 26.5C190.5 41.1355 178.636 53 164 53C152.153 53 142.121 45.2255 138.729 34.5L7.5 34.5C3.35786 34.5 0 31.1421 0 27C0 22.8579 3.35786 19.5 7.5 19.5L138.434 19.5C141.504 8.26112 151.788 0 164 0C178.636 0 190.5 11.8645 190.5 26.5Z"/>
            </svg>
            <svg width="191" height="53" viewBox="0 0 191 53" class="burgerLine" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M175.5 26.5C175.5 32.8513 170.351 38 164 38C157.649 38 152.5 32.8513 152.5 26.5C152.5 20.1487 157.649 15 164 15C170.351 15 175.5 20.1487 175.5 26.5ZM190.5 26.5C190.5 41.1355 178.636 53 164 53C152.153 53 142.121 45.2255 138.729 34.5L7.5 34.5C3.35786 34.5 0 31.1421 0 27C0 22.8579 3.35786 19.5 7.5 19.5L138.434 19.5C141.504 8.26112 151.788 0 164 0C178.636 0 190.5 11.8645 190.5 26.5Z"/>
            </svg>

        </div>
        
        <div class="inner" :class="burgerOpened ? 'opened' : ''">
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
    name: 'Header',
    data(){
        return {
            burgerOpened : false
        }
    },
    methods : {
        openBurger(){
            this.burgerOpened = !this.burgerOpened;
        }
    }
}
</script>

<style lang="scss" scoped>

.header{
    position:relative;

    & > a {
        position: fixed;
        top:15px;
        left:50px;
        z-index:9999;

        @media(max-width: 880px){
            top:20px;
        }
    }

    .inner{
        z-index: 999;
        position: fixed;
        top:0;
        right:0;
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
        position:relative;
        width:100px;
        height:100px;
        min-width:54px;
        min-height:54px;
        z-index:999999;

        border-radius:50px;
        background-size: 100px 100px;
        background-position: center;
        background-image: url('~/img/logo_ateliernum.png');
        box-shadow: 0 0 8px rgba(0, 0, 0, .32);
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

.burgerNum{
    display:none;
    z-index:999999999;
}

.opened{
    transition: .3s ease-out;
    .burgerLine{
        transform:translateY(100%) rotate(45deg) !important ;
        transition: .2s ease-out;

        &:nth-child(2){
            transform: translateX(-20px) !important;
            opacity:0;
        }
        &:last-child{
            transform:translateY(-100%) rotate(-45deg) !important;
        }
    }

    .nav{
        transform: translateX(0);
        transition: transform .3s ease-out .3s;
    }
}

@media (max-width:1200px){
    .inner{
        height:120px ;
        width:550px ;

        .nav{
            margin-left:100px
        }
    }

    .logo{
        width:7vw;
        height:7vw;
    }
}

@media (max-width:880px){
    .burgerNum{
        display:block;
        position:fixed;
        top:30px;
        right:40px;
        transition: .2s ease-out;
        // filter:saturate(30) hue-rotate(20deg);
        // mix-blend-mode: difference;

        .burgerLine {
            display:block;
            width:36px;
            height:10px;
            background-position: center;
            background-size: 100%;
            transition: .3s ease-out;
            fill:#1C1C1C;
            mix-blend-mode:screen;
            stroke:#fff;
            stroke-width:1px;

            &:nth-child(2){
                transform:rotate(180deg);
                transition: .2s ease-out;
            }
            
        }

        &:hover{
            cursor:pointer;

            .burgerLine{
                transform:translateX(5px);
                transition: .2s ease-out;

                &:nth-child(2){transform: translateX(-5px) rotate(180deg)}
            }

        }
        &.no-svg{
            background-image: url('../../assets/icons/burgerLineNum.svg');
        }
    }

    .inner{
        height:100vh;
        width:45vw;
        margin:0;
        box-shadow:-2px 0 8px 2px rgba(0, 0, 0, .32);
        opacity: 0;
        transform: translateX(50px);
        transition: .3s ease-out;
        visibility:hidden;
        transition: visibilty 0, opacity transform .2 ease-out;

        .nav{
            flex-direction:column;
            width:max-content;
            transform: translateX(10px);
            transition: .3s ease-out;
            margin:auto 25%;
        }

        &.opened{
            opacity: 1;
            transform: translateY(0);
            visibility:visible;
            transition: visibilty 0, opacity transform .2 ease-out;
        }
    }
}
}

@media (max-width:520px){
    .inner{
        width:70vw !important;
    }
}
</style>