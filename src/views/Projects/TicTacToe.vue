<template>

   <div class="tic-tac-toe">
      <h1>This is Tic Tac Toe Game</h1>

      <div class="board">
         
         <div class="board__line" v-for="line in 3" :key="line">
            <div class="board__line--item" @click="clicked($event)"  v-for="box in 3" :key="line + '.' + box" :data-id="line + '.' + box"></div>
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
         winningLinesStr: '',
         nextPlayer: "X"
      }
   },
   methods: {
      clicked(e){
         // console.log(e.target.dataset.id);
         if(e.target.innerText != '') return;

         // Display value on UI
         e.target.innerText = this.nextPlayer;

         // Add Value to user array
         this[this.nextPlayer].push(e.target.dataset.id);

         // Check winning line
         console.log(this.X);

         if(this.checkWinner()){
            console.log('Hello World');

            return;
         }

         // Switch to next player
         this.nextPlayer = this.nextPlayer == "X" ? "O" : "X";
      },
      checkWinner(){
         if(this[this.nextPlayer].length < 3){
            return false;
         }

         // winningLinesStr.includes('');


      }
   },
   beforeMount(){
      this.winningLines.forEach(line =>{
         this.winningLinesStr += line.sort().toString() + "|";
      });
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
            transition: all .25s;

            &:hover{
               opacity: .75;
            }
         }
      }
   }
</style>