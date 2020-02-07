<template>
      <div class="box--item" :style="{'font-family': font}">
         {{content}}
      </div>

</template>

<script>
   export default{
      props: ['content', 'font']
   }
</script>


<style lang="scss" scoped>
   .box--item{
      box-shadow: inset 0 0 5px rgba(51,51,51,.5);
      border: 1px solid rgba(51,51,51,.5);
      padding: 30px;
      border-radius: 3px;
      font-size: 20px;
      white-space: pre-line;
      line-height: 1.6;
      margin: 15px 0;
      cursor: pointer;
      user-select: none;
      background-color: rgba(255,255,255,.5);
   }
</style>