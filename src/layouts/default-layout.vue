<template>
  <div class="default-layout">
    <HeaderBlock />
    <div id="root-wrapper">
      <router-view />
    </div>
    <FooterBlock />
  </div>
</template>

<script>
import HeaderBlock from "@/components/main/header";
import FooterBlock from "@/components/main/footer";

export default {
  name: "default-layout",
  components: {
    FooterBlock,
    HeaderBlock,
  },
};
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

#root-wrapper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin: 0 0 0;
}
</style>
