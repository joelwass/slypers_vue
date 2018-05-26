<template>

  <div class="form__input-fields">

    <label v-if="!labelAfter && !noLabel"
      :class="[{ 'error': inputInvalid }, { 'form__label--disabled': disabled }, labelClassName]"
      :for="id" class="headline-label"
    >
      {{ label }}
    </label>

    <label v-else-if="labelAfter && !noLabel"
      :class="[{ 'error': inputInvalid }, { 'form__label--disabled': disabled }, labelClassName]"
      :for="id" class="headline-label"
    >
      {{ label }}
    </label>

    <div class="form__input-wrap" :class="{ 'form__input-wrap--disabled': disabled }">

      <the-mask v-if="phoneMask"
        :class="{'error': inputInvalid, 'fs-hide': fsHide}"
        :disabled="disabled"
        :masked="true"
        :name="name"
        :placeholder="placeholder"
        :readonly="!!readOnly"
        :tokens="tokens"
        :value="value"
        @blur="setDirty(); trackInput($event);"
        @input="updateValue"
        @keydown="eventPassthrough"
        @keyup="showClearButton"
        mask="(###) ###-####"
        ref="input"
        type="tel"
        @focus="focusInput"
      ></the-mask>

      <input v-else
        :autocapitalize="autocapitalize"
        :autocomplete="autocomplete"
        :class="{'error': inputInvalid, 'fs-hide': fsHide}"
        :disabled="disabled"
        :id="labelId"
        :name="name"
        :placeholder="placeholder"
        :readonly="!!readOnly"
        :type="type"
        :value="value"
        @focus="$emit('focusEvent')"
        @blur="labelId !== 'address' && setDirty(); trackInput($event); $emit('blurEvent', {func: setDirty})"
        @input="updateValue($event.target.value)"
        @keydown="eventPassthrough"
        @keyup="showClearButton; $emit('keyEvent')"
        ref="input"
      />

      <div
        :class="['btn-clear-val', (value && !disabled) ? 'btn-clear-val--active' : '' ]"
        :id="id"
        @click="clearTextVal(), updateValue(''); $emit('clearInput')"
      ></div>

    </div>

    <p v-if="inputInvalid && Object.keys(field.errors).length"
      class="error-text form__error-text"
      :class="id"
    >

      {{Object.values(field.errors)[0]}}

    </p>

  </div>

</template>

<style lang="scss" rel="stylesheet/scss">

</style>

<script>
  import ValidationService from 'globalSrc/validationService';
  import TrackingService from 'globalSrc/trackingService';
  import NewRelicService from 'globalSrc/newRelicService';
  import TheMask from 'vue-the-mask';

  export default {
    props: {
      action: Object,
      autocomplete: String,
      autocapitalize: {
        default: 'none',
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      fieldType: String,
      formName: String,
      formType: String,
      fsHide: Boolean,
      id: String,
      label: String,
      labelAfter: Boolean,
      labelClassName: String,
      pii: Boolean,
      name: String,
      noLabel: false,
      phoneMask: Boolean,
      placeholder: {},
      readOnly: Boolean,
      type: {
        default: 'text',
        type: String
      },
      validators: {},
      value: {},
      onBlurCallback: Function,
      focusCallback: Function
    },
    name: 'text-input',
    data() {
      return {
        isDirty: false,
        validation: {
          required: {
            message: 'This is required'
          }
        },
        field: {
          errors: {}
        },
        tokens: {
          '#': {
            pattern: /[\d*]/
          }
        }
      };
    },
    mounted() {
      this.$watch('value', (newVal) => {
        this.validate(newVal);
        if (this.$refs.input && newVal) {
          if (newVal) {
            this.$refs.input.value = newVal;
          } else {
            this.$refs.input.value = '';
          }
      }
      }, { immediate: true });
    },
    computed: {
      inputInvalid() {
        return !!this.validators && !this.field.isValid && this.isDirty;
      },
      validationService() {
        return new ValidationService(this.validators);
      },
      labelId() {
        return this.id || this.name;
      }
    },
    methods: {
      clearTextVal() {
        try {
          event.target.previousElementSibling.value = '';
          // set the focus back to the field
          event.target.previousElementSibling.focus();
          event.target.classList.remove('form__button-clear--active');
        } catch (e) {
          NewRelicService.logError(e);
        }
      },
      showClearButton(event) {
        if (event) {
          event.target.nextElementSibling.classList.add('form__button-clear--active');
        }
      },
      updateValue(n) {
        let newVal = n;
        // only get rid of extraneous characters when it's a phone number input
        if (this.phoneMask) {
          newVal = newVal.replace(/[^0-9]/g, '');
          if (newVal.length === 10) this.setDirty();
        }
        this.validate(newVal);
        this.$emit('input', newVal);
      },
      setDirty() {
        this.field = this.validationService.validate(this.$refs.input.value);
        this.isDirty = true;
      },
      validate(value) {
        this.field = this.validationService.validate(value);

        this.$emit('validation', {
          name: this.name,
          ...this.field
        });
      },
      trackInput(event) {
        if (this.onBlurCallback && typeof this.onBlurCallback === 'function') this.onBlurCallback()
        try {
          const value = event.target.value;
          const formName = this.formName;
          const formType = this.formType;
          const fieldName = this.name;
          const fieldType = this.fieldType;

          // if it's pii, pass everything along except for the value of the input
          if (this.pii) TrackingService.FieldInputted('pii', fieldName, this.$route.name, fieldType, formType, formName);
          else TrackingService.FieldInputted(value, fieldName, this.$route.name, fieldType, formType, formName);
        } catch (e) {
          NewRelicService.logError(e);
        }
      },
      eventPassthrough(e) {
        this.$emit(e.type, e);
      },
      focusInput() {
        if (this.focusCallback && typeof this.focusCallback === 'function') this.focusCallback()
      }
    },
    components: {
      TheMask
    }
  };
</script>
