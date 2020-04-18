<template functional>
  <button v-on="listeners"><slot /></button>
</template>

<style lang="scss" scoped>
button {
  padding: 10px 15px;
  font-weight: 500;
  border-radius: 6px;
  background-color: #4299e1;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
