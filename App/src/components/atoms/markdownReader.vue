<template>
    <div class="mdReader">
      <h1>Titre H1</h1>
      <h2>Titre h2</h2>
      <h3>Titre H3</h3>
      <p>Voici un paragraphe de cours. C'est super top <a href="www.google.com">et j'aime la blanquette</a>. 
      Il parait que manger de l'artichaut fait pousser les orteils gauches. <strong>ici un mot en gras</strong> Un peu plus de texte pour faire du contenu</p>
      <ul>
        <li>Liste à puces</li>
        <li>Liste à puces</li>
        <li>Liste à puces</li>
      </ul>
      <img src="../../assets/logo.png" alt="logo">

      <code>
        void setup(){
          size(800, 800);
        }

        void super{
          top();
          ellipse(3,3,2,2);
        }

        void super{
          top();
          ellipse(3,3,2,2);
        }

        void super{
          top();
          ellipse(3,3,2,2);
        }

        void draw(){
          rect(4,4, 50, 20);
        }
      </code>
    </div>
</template>

<script>

export default {
  name: 'markdownReader',
  props : {
      content : {
          type : String,
          required : true,
          default : () => '## Un super titre '
      },
      markdown : {
        type: String,
        default : () => ''
      }
  },
  computed: {
  }
}
</script>

<style  lang="scss">

.mdReader{
  display:grid;
}

.mdReader h1 {
  text-align: left;
  font-family: 'Rubik';
  font-weight:600;
  font-size:3.0em;
  letter-spacing: 0;
  color: #373D4A;

  position:relative;
  margin-bottom:50px;
}

.mdReader h1:after{
  content: ' ';
  position: absolute;
  bottom : -8px;
  left : 0;
  width:100%;
  height : 2px;
  border-radius:2px;
  background-color:#373D4A;
}

.mdReader h2 {
  text-align: left;
  font-family: 'Rubik';
  font-weight:600;
  font-size:2.6em;
  letter-spacing: 0;
  color: #373D4A;

  margin-bottom:30px;
}

.mdReader h3{
  text-align: left;
  font-family: 'Rubik';
  font-weight:500;
  font-size:2.0em;
  letter-spacing: 0;
  color: #373D4A; 

  margin-bottom:20px;
}

.mdReader p {
text-align: left;
font-family: 'Open Sans';
font-weight:300;
font-size:1.2em;
letter-spacing: 0;
line-height: 1.6em;
color: #373D4A;
}

a{
  position:relative;
}

a::after{
  content: ' ';
  position: absolute;
  bottom : -4px;
  left : 0;
  width:100%;
  height : 3px;
  border-radius:2px;
  background-color:#373D4A;

}


.mdReader code {
  position:relative;

  text-align: left;
  font-family: 'DejaVu Sans Mono';
  font-size:1.6em;
  font-weight:400;
  letter-spacing: 0;
  color: #373D4A;

  background-color:#F8F8F8;
  border-radius:8px;
  padding:30px 40px;
}

.mdReader code::after{
  position:absolute;
  bottom: 20px;
  right:20px;
  content: '<> Copy the code';
  padding: 10px 20px;
  border-radius: 8px;

  text-align: center;
  font-family:'Rubik';
  font-size: 1em;
  color: #F8F8F8;
  background-color: #373D4A;
}

.mdReader img{
  border-radius:8px;
  box-shadow: 0px 3px 6px #00000029;
  height:100%;
  object-fit: cover;
  justify-self: center;
}

.mdReader ul {
  margin-top:20px;
  margin-bottom:20px;
  padding-left:40px;
}

.mdReader ul li {
  text-decoration: #373D4A dotted;  
  list-style: disc;
  text-align: left;

  font-family: 'Open Sans';
  font-weight:300;
  font-size:1.2em;
  letter-spacing: 0;
  line-height: 1.6em;
  color: #373D4A;
}


</style>
