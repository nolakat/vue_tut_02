<template>
    <div class="field">
        <label v-if="label">{{ label }}</label>
        <select :value="value" @input="updateValue" v-bind="$attrs">
            <option 
                v-for="option in options"
                :value="option" 
                :key="option"
                :selected="option === value"
            >{{ option }}</option>
        </select>
    </div>
</template>

<script>
    import { formFieldMixin } from '../mixins/formFieldMixin'
    export default {
        mixins: [ formFieldMixin ],
        props: {
            options: {
                type: Array,
                required: true
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>