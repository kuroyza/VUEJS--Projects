<template>
   <div>
      <h1>Card Matching</h1>

      <ul class="card">
         <li 
            class="card__item"
            v-for="(emoji, i) in gameEmojis" 
            :key="i" 
            @click.stop="flipCard($event.target.parentNode)">

            <span class="card__item--front"></span>
            <span class="card__item--back" name="cardBack">{{emoji}}</span>
         </li>

         <div class="card-bar">
            <span class="card-bar--time">{{timeLeftInMinutes}}</span>
            <div  class="card-bar--inner"  
                  :style="{height: Math.round(timeLeft / maxTime * 10000) / 100 + '%'}">
                  {{ Math.round(timeLeft / maxTime * 10000) / 100}}%
            </div>
         </div>
      </ul>
      
      <div class="notify" v-if="showNotification">
         <h2 class="notify--headline">{{msg}}</h2>
         <button class="notify--btn" @click="resetAll">Play again</button>
      </div>
   </div>
</template>


<script>

// TODO: Add Game Levels
// (new Date().getTime() - before) / 60 / 60;
export default {
   data: function(){
      return{
         emojis: [
            "🎈",
            "⏰",
            "🧀",
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
         gameEmojis: [],
         choices: [],
         wait: false,
         msg: '',
         showNotification: false,
         counter: 0,
         maxTime: 2* 60,
         timeLeft: 2 * 60,
         mainInterval: null
      }
   },
   computed:{
      timeLeftInMinutes(){
         const ans = (Math.round((this.timeLeft / 60  * 100 )) / 100).toString().split('.');

         ans[1] =  ans[1] ? `0.${ans[1]}` : 0;

         const theAns = this.pad(ans[0]) + ':' + this.pad(Math.round(ans[1] * 60));

         console.log({theAns, ans});

         return theAns;
      }
   },
   methods: {
      flipCard(card){

         // Stop Game if all cards answered as correct
         if(card.classList.contains('done')){
            return;
         }

         // Check if time is out or user answerd all cards correctly  and show msg
         // NOTE: The correct Number of answers equals length of emojis array
         if(this.counter >= this.emojis.length || this.timeLeft <= 0){
            this.showMsg();
            return;
         }

         if(this.wait){
            this.wait = false;
            this.choices[0].classList.remove('active');
            this.choices[1].classList.remove('active');
            this.choices.splice(0);
         }

         // If user chose two cards check them out and empty choices array
         if(this.choices.length >= 2){
            this.choices[0].classList.remove('active');
            this.choices[1].classList.remove('active');
            this.choices.splice(0);
         }
         
         card.classList.toggle('active');
         this.choices.push(card);
         // console.log(this.choices);

         if(this.choices.length == 2){
            this.checkWinningCard();
         }
      },
      checkWinningCard(){
         if(this.choices[0].innerText != this.choices[1].innerText){
            this.wait = true;
            this.timeLeft--;

            // empty up the array of choices after 1150ms for good UX
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
         // console.log('before: ', this.choices);

         if(this.choices.length > 0){
            this.choices[0].classList.add('done');
            this.choices[1].classList.add('done');

            this.choices.splice(0);
         }

         this.counter++;

         if(this.counter >= this.emojis.length){  
            clearInterval(this.mainInterval);
            this.showMsg();
         }

         // console.log('after: ', this.choices);
      },
      resetAll(){
         this.timeLeft = 2 * 60;
         this.showNotification = false;
         this.msg = '';
         
         document.querySelectorAll('.done').forEach(e => {
            e.classList.remove('active', 'done');
         });

         clearInterval(this.mainInterval);
         this.randomPositions();
      },
      showMsg(){
         this.showNotification = true;
         if(this.timeLeft <= 0){
            this.msg = 'You LOSE!';
         }else if(this.counter >= this.emojis.length / 2){
            this.msg = 'You WON!';
         }
      },
      randomPositions(){
         // Generat new random positions for the array

         this.gameEmojis = [];
         // console.log('I am Random Positions');
         const newEmojis = this.emojis.concat(this.emojis);

         while(newEmojis.length > 0){
            const rand = Math.floor(Math.random() * newEmojis.length);
            this.gameEmojis.push(newEmojis.splice(rand, 1).join(''));
         }

         // console.log(this.gameEmojis);

         this.mainInterval = setInterval(() => {
            this.timeLeft -= 1;

            if(this.timeLeft <= 0){
               this.timeLeft = 0;
               clearInterval(this.mainInterval);
               this.showMsg();
            }
         }, 1000);
      },
      pad(nmbr){
         return (nmbr < 10) ? '0' + nmbr.toString() : nmbr.toString();
      }
   },
   beforeMount(){
      this.randomPositions();
   }
}

// Choice = 1 DOM obj (to be able to get data + removing active classes + )
// Add Timing instead of failing progress

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
      width: 60px;
      box-shadow: inset 0 0 5px rgba(0,0,0,.5);
      border-bottom-left-radius: 9px;
      border-bottom-right-radius: 9px;

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
         border-bottom-left-radius: 9px;
         border-bottom-right-radius: 9px;
      }

      &--time{
         position: absolute;
         top: -5px;
         left: 50%;
         transform: translate(-50%, -100%);
         color: red;
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