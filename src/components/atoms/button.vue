<template>
    <div 
        class="button" 
        :class="classes"
        :style="{ '--bgColor': color, '--textColor': textColor}"
    >
    {{labelButton}}
    </div>
</template>

<script>
export default {
   name: 'Button',
   props:{
       outlined:{
           type: Boolean,
           default: () => false,
           required: false
       },
       color: {
           type:String,
           default: () => 'var(--color-dark01)',
           required: false
       },
       textColor: {
           type:String,
           default: () => 'var(--color-dark01)',
           required: false
       },
       disabled: {
           type: Boolean,
           default: () => false,
           required: false
       },
       label: {
           type: String,
           default: () => 'projects',
           required: false
       }
   },
   computed:{
       labelButton(){
           if (this.disabled){
               return `No more ${this.label} to load`
           } else {
               return this.$slots.default[0].text;
           }
       },
       classes(){
           let classes = '';

           if (this.outlined) classes += 'outlined ';
           if (this.disabled) classes += 'disabled ';

           return classes ;
       }
   }
}
</script>

<style lang="scss" scoped>
.button{
    padding:12px 30px;
    font-family: 'Open Sans';
    font-size:18px;
    font-weight:600;
    border-radius:100px;
    border: none;

    background-color: var(--bgColor);
    color: var(--textColor);

    display:flex;
    justify-content: center;
    align-items: center;
    max-width:max-content;
    margin: 20px auto;

    transition: .3s ease-out;

    &:hover{
        cursor:pointer;
    }
}

.outlined{
    border: solid 2px  !important;
    background-color:unset !important;
}

.disabled {
    --textColor: rgba(0, 0, 0, .2) !important;
    --bgColor: rgba(0, 0, 0, .2) !important;
    transition: .3s ease-out;
}
</style>