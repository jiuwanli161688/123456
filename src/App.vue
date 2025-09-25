<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
