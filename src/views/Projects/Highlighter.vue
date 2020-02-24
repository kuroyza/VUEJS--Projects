<template>

   <div class="highlighter">

      <p class="paragraph">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae incidunt nisi voluptas nam impedit
         accusantium eveniet? Similique quasi nisi dolores error quia, ex facere reiciendis iusto odio veritatis.
         Distinctio, vero.
         Fugit ut qui dicta optio esse aliquam vel, blanditiis corporis quibusdam dolore assumenda quis ipsam, sapiente
         nobis, praesentium eaque id eos sint officiis? Dicta, consequuntur! Odit esse voluptatibus harum suscipit.
         Facere illo molestias eius unde saepe numquam possimus dolorem, cum placeat accusantium, non ipsum
         exercitationem at totam expedita vel. Placeat, odit. Iusto tempore minima nisi minus non illum,perferendis beatae.
      </p>

      <input type="text" class="search" placeholder="Type to highlight" @keyup="highlightText">
   </div>

</template>


<script>
   export default {
      data: function () {
         return {
            paragraph: null,
            input: null
         }
      },
      methods: {
         highlightText() {

            const str = this.paragraph.innerText;// gets inner text only without span tags
            const search = this.input.value.trim();

            // console.dir({str, search});

            // Check if data exists
            if (str == '' || !str.includes(search)) {
               this.paragraph.innerHTML = this.paragraph.innerText;
               return;
            }
            console.log(search.trim());

            // this.paragraph.innerHTML = str.replace(search, `<span>${search}</span>`);
            this.paragraph.innerHTML = str.split(search.trim()).join(`<span>${search}</span>`);
         }
      },
      mounted() {
         this.paragraph = document.querySelector('.paragraph'),
         this.input = document.querySelector('.search')
      }
   }
</script>

<style lang="scss">
   .highlighter {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 50px;

      .paragraph {
         font-size: 16px;
         padding: 0 300px;
         line-height: 1.5;
      }

      span {
         // display: inline-block;
         background-color: deeppink;
         color: #fff;
      }

      .search {
         margin: 25px 0;
         padding: 10px 16px;
      }
   }
</style>