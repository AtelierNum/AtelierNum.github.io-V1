<template>
    <header class="header">
        <div class="inner">
             <svg class="bg"  width="671.062" height="139.393" viewBox="0 0 671.062 139.393">
                <path id="Path_3" data-name="Path 3" d="M-3875.146,7769.736l53.707,139.393,617.355-15.24V7769.736Z" transform="translate(3875.146 -7769.736)" fill="#fff"/>
            </svg>
            <ul class="nav" >
                <li>Projects</li>
                <li>Courses</li>
                <li>Tools</li>
                <li>About</li>
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
    width:670px;
    .inner{
        position: relative;
        display: flex;
        height: 139.393px;
        justify-content: space-between;
        align-items: center;
        .bg{
            position: absolute;
            top:0;
            right:0;
           
        }
    }

    .nav{
        font-family: 'Open Sans', sans-serif;
        position: relative;
        z-index: 9999;
        display: flex;
        align-self: flex-end;
        font-size: 20px;
        margin:auto 90px auto 120px;
        width:100%;
        justify-content: space-between;
        li{
            margin: 10px;
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
    }
}
</style>