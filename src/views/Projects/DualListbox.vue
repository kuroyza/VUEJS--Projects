<template>
   <div class="dual-listbox">
      <h1>Dual Listbox</h1>
      <div class="project">
         <div class="project-item">
            <input type="text" placeholder="Search" v-model="keyword1">

            <ul class="listbox">
               
               <template v-if="filteredGenres.length > 0">
                  <li class="listbox--item" 
                     v-for="(genre, index) of filteredGenres" 
                     :key="index"
                     :title="genre"
                     @click="moveToRight(genre, $event)">
                     {{genre}}
                  </li>
               </template>
               <template v-else>
                  <span>No genre selected</span>
               </template>
            </ul>
         </div>
         
         <div class="project-controller">
            <a href="#" class="btn" @click.prevent="moveAllToRight">&#187;</a>
            <a href="#" class="btn" @click.prevent="moveAllToLeft">&#171;</a>
         </div>
         
         <div class="project-item">
            <input type="text" placeholder="Search" v-model="keyword2">

            <ul class="listbox">
               <template v-if="filteredChoices.length > 0">
                  <li class="listbox--item" 
                     v-for="(choice, index) of filteredChoices" 
                     :key="index"
                     :title="choice"
                     @click="moveToLeft(choice, $event)">
                     {{choice}}
                  </li>

               </template>
               <template v-else>
                  <span>No genre selected</span>
               </template>
            </ul>
         </div>

      </div>
   </div>
</template>

<script>
// TODO: Use component to DRY

export default {
   name: 'dual-listbox',
   data: function(){
      return {
         genres: [
            "Comedy",
            "Crime",
            "Drama",
            "Romance",
            "Documentary",
            "Thriller",
            "War",
            "Musical",
            "Action"
         ],
         choosenGenres: [],
         keyword1: '',
         keyword2: ''
      }
   },
   methods: {
      moveToRight(value){
         const index = this.genres.indexOf(value);
         this.choosenGenres.push(this.genres.splice(index,1).join(''));
      },
      moveToLeft(value){
         const index = this.choosenGenres.indexOf(value);
         this.genres.push(this.choosenGenres.splice(index,1).join(''));
      },
      moveAllToRight(){
         this.genres.forEach(genre => this.choosenGenres.push(genre));
         this.genres.splice(0);
      },
      moveAllToLeft(){
         this.choosenGenres.forEach(choice => this.genres.push(choice));
         this.choosenGenres.splice(0);
      }
   },
   computed: {
      filteredGenres(){
         return this.genres.filter(genre => genre.toUpperCase().includes(this.keyword1.toUpperCase()));
      },
      filteredChoices(){
         return this.choosenGenres.filter(choice => choice.toUpperCase().includes(this.keyword2.toUpperCase()));
      }
   }
}
</script>

<style lang="scss" scoped>
   h1{
      margin-bottom: 35px;
   }

   .dual-listbox{
      width: fit-content;
      margin: 0 auto;
   }

   .project{
      display: flex;
      justify-content: space-between;

      &-controller{
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;

         a{
            margin: 5px 20px;
            text-decoration: none;
            color: deeppink;
            font-size: 20px;
            font-weight: bold;
         }
      }
   }

   .listbox{
      list-style: none;
         height: 200px;
         overflow-y: scroll;
         border: 1px solid rgba(0,0,0,.5);

      &--item{      
         padding: 10px 0;
         transition: all .3s;

         cursor:pointer;

         &:hover{
            background-color: #333;
            color: #fff;
         }
      }

      span{
         display: inline-block;
         font-size: 14px;
         margin-top: 15px;
         color: rgba(0,0,0,.5);
      }
   }

   input{
      padding: 5px 15px;
      border: 1px solid rgba(0,0,0,.5);
   }
</style>