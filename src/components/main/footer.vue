<template>
  <div class="footer">
    <p><b> Simple Password Manager </b></p>
    <p style="font-size: 15px"><b>No rights reserved © 2021</b></p>
  </div>
</template>

<script>
export default {
  name: "FooterBlock",
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  p {
    background-color: #000;
    color: #fff;
    padding: 4px 1rem;
  }
}
</style>
