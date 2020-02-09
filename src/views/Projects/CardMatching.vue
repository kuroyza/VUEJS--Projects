<template>
   <div>
      <h1>Card Matching</h1>

      <ul class="card">
         <li 
            class="card__item"
            v-for="(emoji, i) in emojis" 
            :key="'a-' + i" 
            @click.stop="flipCard($event.target.parentNode)">

            <span class="card__item--front"></span>
            <span class="card__item--back" name="cardBack">{{emoji}}</span>
         </li>
         
         <li 
            class="card__item"
            v-for="(emoji, i) in emojis" 
            :key="'b-' + i" 
            @click.stop="flipCard($event.target.parentNode)">

            <span class="card__item--front"></span>
            <span class="card__item--back" name="cardBack">{{emoji}}</span>
         </li>

         <div class="card-bar">
            <div class="card-bar--inner"  :style="{height: (lifes / max) * 100 + '%'}">{{lifes}}/{{max}}</div>
         </div>
      </ul>
      
      <div class="notify" v-if="showNotify">
         <h2 class="notify--headline">{{msg}}</h2>
         <button class="notify--btn" @click="resetAll">Play again</button>
      </div>
   </div>
</template>


<script>

// TODO: Add Game Levels

export default {
   data: function(){
      return{
         emojis: [
            "🎈",
            "⏰",
            "👓",
            "🌞",
            "🥎",
            "🧢"
         ],
         emojis2: [
            "🎈",
            "⏰",
            "👓",
            "🗞",
            "🥎",
            "🧢",
            "🌞",
            "🌻",
            "🍓",
            "🦞",
            "🥭",
            "🧀",
         ],
         choices: [],
         counter: 0,
         max: 7,
         lifes: 7,
         wait: false,
         msg: '',
         showNotify: false
      }
   },
   methods: {
      flipCard(card){
         if(card.classList.contains('done')){
            return;
         }

         if(this.counter >= 6 || this.lifes <= 0){
            this.showMsg();
            return;
         }

         if(this.wait){
            this.wait = false;
            this.choices[0].classList.remove('active');
            this.choices[1].classList.remove('active');
            this.choices.splice(0);
         }

         if(this.choices.length >= 2){
            this.choices[0].classList.remove('active');
            this.choices[1].classList.remove('active');
            this.choices.splice(0);
         }
         
         console.dir(card.innerText);
         console.log(this.choices);

         card.classList.toggle('active');
         this.choices.push(card);
         console.log(this.choices);

         if(this.choices.length == 2){
            this.checkWinningCard();
         }
      },
      checkWinningCard(){
         if(this.choices[0].innerText != this.choices[1].innerText){
            this.wait = true;
            this.lifes--;

            setTimeout(() => {

               if(this.choices.length > 0 && this.wait){
                  this.wait = false;
                  this.choices[0].classList.remove('active');
                  this.choices[1].classList.remove('active');
                  this.choices.splice(0);
               }
            }, 1150);
            return;
         }

         this.winningCards();
      },
      winningCards(){
         console.log('before: ', this.choices);

         if(this.choices.length > 0){
            this.choices[0].classList.add('done');
            this.choices[1].classList.add('done');
            this.choices.splice(0);
         }

         this.counter++;

         if(this.counter >= 6){  
            this.showMsg();
         }

         console.log('after: ', this.choices);
      },
      resetAll(){
         this.max = 7;
         this.lifes = this.max;
         this.showNotify = false;
         this.msg = '';
      },
      showMsg(){
         this.showNotify = true;
         if(this.lifes <= 0){
            this.msg = 'You LOSE!';
         }else if(this.counter >= this.emojis.length / 2){
            this.msg = 'You WON!';
         }
      },
      randomPositions(){
         // TODO: Get random from the existing array
         // this.emojis = [];
         console.log('I am Random Positions');
      }
   },
   beforeMount(){
      this.randomPositions();
   }
}

// Choice = 1 DOM obj (to be able to get data + removing active classes + )
</script>

<style lang="scss" scoped>
   .card{
      position: relative;
      width: 50%;
      margin: 5rem auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1.5rem;

      &__item{
         position: relative;
         font-size: 3rem;
         width: 7rem;
         height: 7rem;
         padding: 0;
         border-radius: 6px;
         cursor: pointer;
         transition: all .3s;
         overflow: hidden;

         &--front,
         &--back{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: yellowgreen;
            perspective: 7rem;
            transition: all .75s;
            backface-visibility: hidden;
         }

           
         &--front{
            transform: rotateY(0);
         }
           
         &--back{
            transform: rotateY(180deg);
         }

         &.active &--back{
            transform: rotateY(0deg);
         }

         &.active &--front{
            transform: rotateY(-180deg);
         }

         &.done &--back{
            background-color: orangered;
         }
      }

   }

   .card-bar{
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(300%);
      height: 100%;
      width: 50px;
      box-shadow: inset 0 0 5px rgba(0,0,0,.5);
      border-bottom-left-radius: 9px;
      border-bottom-right-radius: 9px;
      overflow: hidden;

      &--inner{
         transition: all .35s;
         position: absolute;
         bottom: 0;
         right: 0;
         width: 100%;
         background-color: orangered;
         display: flex;
         justify-content: center;
         align-items: center;
         color: #fff;
         
      }
   }

   .notify{
      position: fixed;
      right: 0;
      top: 0;
      background-color: rgba(0,0,0,.35);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      &--headline{
         font-size: 5rem;
         color: orangered;
         text-shadow: 0 0 5px rgba(255,255,255,.5);
      }

      &.success &--headline{
         color: yellowgreen;
      }

      &--btn{
         font-size: 2rem;
         padding: 1rem 1.5rem;
      }
   }
   
</style>