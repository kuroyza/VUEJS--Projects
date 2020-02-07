<template>
   <div class="quotes">
      <div class="progress-bar">
         <div class="progress-bar--filled" :style="{width: (quotes.length / max * 100) + '%'}">
         <span v-if="quotes.length > 0">{{quotes.length}} / {{max}}</span>
         </div>
      </div>
      <div class="quote-input">
         <textarea placeholder="Your quote..." v-model="inputField"></textarea>
         <select v-model="selectedFont">
            <option v-for="(font, index) in fonts" :key="index" :value="index">
               {{font}}
            </option>
         </select>
      </div>
      <div class="buttons">
         <button class="save" @click="saveQuote">Save</button>
         
         <button class="cancel" @click="resetQuotes">Reset</button>
      </div>

      <div class="box">
         <quotes-box 
               v-for="(q,i) in quotes" 
               :font="fonts[q.font]" 
               :content="q.content" 
               :key="i"
               @dblclick.native="removeQuote(i)" />
      </div>
   </div>
</template>


<script>
   import QuotesBox from '@/components/QuotesBox.vue';
   // TODO: Add Quote editing
   // TODO: Add make quotes draggable 
   // TODO: Add choosing MAX quotes
   // TODO: Add copy quote to clipboard
   // TODO: Add color picker for quotes background and font

   export default{
      data: function(){
         return {
            max: 10,
            quotes: [],
            fonts: [
               "'Pacifico', cursive",
               "'Permanent Marker', cursive",
               "'Kaushan Script', cursive",
               "'Molle', cursive",
               "'Rock Salt', cursive",
               "'Share Tech Mono', monospace",
               "'Beth Ellen', cursive"
            ],
            inputField: '',
            selectedFont: 0
         }
      },
      components: {
         QuotesBox
      },
      methods: {
         saveQuote(){
            if(this.quotes.length >= this.max){
               alert('You Cant Add More than ' + this.max + ' Quotes.\n You can remove a quote by clicking twice on it!');
            }if(this.inputField == ''){
               alert('You can\'t add an empty quote!');
            }else{
               this.quotes.push({
                  content: this.inputField,
                  font: this.selectedFont
               });

               this.inputField = '';
            }

         },
         resetQuotes(){
            if(confirm('Are You sure you want to reset all quotes?')){
               this.quotes.splice(0);
            }
         },
         removeQuote(index){
            this.quotes.splice(index,1);
         }
      }
   }
</script>

<style lang="scss" scoped>
   .quotes{
      position: relative;
      padding: 35px 100px;
   }

   .progress-bar{
      position: relative;
      width: 100%;
      height: 25px;
      box-shadow: inset 0 0 5px rgba(0,0,0,.15);
      background-color: rgba(66, 185, 131, .3);
      border-radius: 6px;
      overflow: hidden;

      &--filled{
         height: 100%;
         background-color: #42b983;
         text-align: center;
         display: flex;
         justify-content: center;
         align-items: center;
         color: #fff;
         transition: all .35s;
      }
   }

   textarea{
      margin: 30px;
      resize: none;
      width: 50%;
      height: 150px;
      padding: 10px 15px;
      display: inline-block;
   }

   .box{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin: 25px 0;
   }

   .quote-input{
      margin-bottom: 25px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
   }

   select{
      margin: 30px;
   }

   button{
      margin: 0 5px;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 600;
      border: 0;
      box-shadow: inset 0 0 10px rgba(255, 255, 255, .35);
      border-radius: 6px;
      outline: 0;
      color: #fff;
      transition: all .25s;
      cursor: pointer;
      
      &.cancel{
         background-color: hsl(0,100%,40%);

         &:hover{
            background-color: hsl(0, 100%, 55%);
         }
      }

      &.save{
         background-color: hsl(240,100%,40%);

         &:hover{
            
            background-color: hsl(240,100%,55%);
         }
      }

      &:active{
         transform: scale(.95);
      }
   }
</style>