<template>
  <input
    ref="input"
    type="text"
    :value="value"
    v-bind="$attrs"
    @input="(e) => $emit('updateValue', e.target.value)"
    @blur="$emit('blur')"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
input {
  height: 2.6em;
  padding: 0.3em 0.8em;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #cfd4da;
  border-radius: 3px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;
  width: 100%;
  color: #2c3e50;
}
</style>
