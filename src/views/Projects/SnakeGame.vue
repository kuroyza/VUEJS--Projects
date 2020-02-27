<template>
   <div class="game">
      <div class="snake-board"  @click="changeMe" @dblclick="changeMe2">

         <div class="snake" :style="snakePosition">
            <div class="snake--part"></div>
            <div class="snake--part"></div>
            <div class="snake--part"></div>
            <div class="snake--part"></div>
         </div>
         <div class="obsticle"></div>
      </div>
   </div>
</template>

<script>
export default {
   data: function(){
      return {
         snakeLength: 1,
         obsticlePos: {
            x: 0,
            y: 0
         },
         snakePos: {
            y: 50,
            x: 60
         }
      }
   },
   computed:{
      snakePosition(){
         return `top: ${this.snakePos.y}px; left: ${this.snakePos.x}px;`;
      }
   },
   methods: {
      changeMe(){
         this.snakePos.x = 850;
      },
      changeMe2(){
         this.snakePos.x = 0;
      }
   }
}
</script>

<style lang="scss" scoped>
   .game{
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .snake-board{
      position: relative;
      background-color: #FFF;
      border: 5px solid #000;
      height: 340px;
      width: 75%;
   }

   .snake{
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      height: 18px;
      transition: all 2s;

      &--part{
         height: 100%;
         width: 18px;
         border: 1px solid black;
         background-color: yellowgreen;

         &:not(:last-child){
            border-right-width: 0;
         }
      }
   }

   .obsticle{
      position: absolute;
      top: 150px;
      left: 300px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: red;
      border: 1px solid black;
   }
</style>