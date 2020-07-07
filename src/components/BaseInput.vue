<template>
    <div class="field">
        <label v-if="label">{{ label }}</label>
        <input type="text" :placeholder="placeholder" :value="value" @input="updateValue" v-bind="$attrs"/>
    </div>
</template>

<script>
    import { formFieldMixin } from '../mixins/formFieldMixin'
    export default {
        mixins: [ formFieldMixin ],
        inheritAttrs: false,
        props: {
            placeholder: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>