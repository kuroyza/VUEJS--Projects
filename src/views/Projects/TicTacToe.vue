<template>

   <div class="tic-tac-toe">
      <h1>This is Tic Tac Toe Game</h1>

      <div class="board">
         
         <div class="board__line" v-for="line in 3" :key="line">
            <div class="board__line--item" @mouseover="mouseOver($event)" @mouseleave="mouseLeave($event)" @click="clicked($event)"  v-for="box in 3" :key="line + '.' + box" :data-id="line + '.' + box"></div>
         </div>
      </div>

   </div>

</template>
   
<script>
// TODO: when user a box is hovered a show user what will he pu there
export default {
   data: function(){
      return{
         X: [],
         O: [],
         winningLines: [
            ["1.1","1.2","1.3"],
            ["2.1","2.2","2.3"],
            ["3.1","3.2","3.3"],

            ["1.1","2.1","3.1"],
            ["1.2","2.2","3.2"],
            ["1.3","2.3","3.3"],

            ["1.1","2.2","3.3"],
            ["1.3","2.2","3.1"],
         ],
         nextPlayer: "X",
      }
   },
   methods: {
      mouseOver(e){
         if(e.target.innerText != '') return;

         e.target.innerText = this.nextPlayer;
      },
      mouseLeave(e){
         // TODO: finish this one later
         if(e.target.classList.contains('active')) return;

         e.target.innerText = "";
      },
      clicked(e){
         
         if(e.target.classList.contains('active')) return;

         // Display value on UI
         e.target.innerText = this.nextPlayer;
         e.target.classList.add('active');

         // Add Value to user array
         this[this.nextPlayer].push(e.target.dataset.id);

         // Check winning line

         if(this.checkWinner(e.target.dataset.id)){
            if(confirm('Player ' + this.nextPlayer + ' Won!!\nDo you want to play again?')){
               this.resetAll();
            }
            return;
         }

         if(this.X.length >= 5){
            if(confirm('Drawn out!\nwould you like to play again?')){
               this.resetAll();
            }
            return;
         }

         // Switch to next player
         this.nextPlayer = this.nextPlayer == "X" ? "O" : "X";
      },
      checkWinner(lastChecked){
         if(this[this.nextPlayer].length < 3){
            return false;
         }

         // Get all arrays that includes last checked box id
         const res = this.winningLines.filter(arr => arr.includes(lastChecked));

         if(!res) return false;

         let nmbrRes = 0;

         // Check if all 
         res.forEach(arr => {
            if(   this[this.nextPlayer].includes(arr[0]) 
               && this[this.nextPlayer].includes(arr[1])
               && this[this.nextPlayer].includes(arr[2])){
               nmbrRes++;
            }
         });

         if(nmbrRes > 0){
            return true;
         }

         return false;
      },
      resetAll(){

         // get all active (checked) boxes and reset them
         const checked = document.querySelectorAll('.active');
         checked.forEach(dom => {
            dom.innerText = '';
            dom.classList.remove('active');
         });

         // Empty X and O's data
         this.X = [];
         this.O = [];
         
         this.nextPlayer = "X";
      }
   }
}
</script>


<style lang="scss" scoped>

   .tic-tac-toe{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }

   .board{
      display: flex;
      flex-direction: column;
      margin-top: 100px;
      padding: 1px;
      background-color: #333;

      &__line{
         display: flex;
         margin-bottom: 1px;

         &--item{
            width: 50px;
            height: 50px;
            background-color: yellow;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 1px;
            color: rgba(0, 0, 0, 0.2);
            transition: all .3s;
            cursor: pointer;

            &.active{
               color: rgb(0,0,0);
            }
         }
      }
   }
</style>