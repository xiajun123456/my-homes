<template>

  <validate class="form-content" :class="fieldClass">
    <div class="form-group">
      <label class="form-label">
        <span class="after-risk"
              v-if="afterRisk">*</span>
        {{label}}:
      </label>
      <div class="input-container">
        <slot></slot>
      </div>
    </div>
    <field-messages :name="name" show="$touched || $dirty || $submitted">
      <div v-for="(message,key) in messages"
           :key="key"
           :slot="key"
           class="text-warning">
        {{message}}
      </div>
    </field-messages>
  </validate>
</template>
<style type="text/scss" lang="scss">
  .w15{
    .form-label{
      width: 18%;
    }
    .text-warning {
      padding-left: 20%;
    }
    .input-container {
      width: 78%;
    }
  }
  .w20{
    .form-label{
      width: 21%;
    }
    .text-warning {
      padding-left: 21%;
    }
    .input-container {
      width: 75%;
    }
  }
  .w30{
    .form-label{
      width: 30%;
    }
    .text-warning {
      padding-left: 30%;
    }
    .input-container {
      width: 68%;
    }
  }
  .form-content{
    .el-select{
      width: 32%;
    }
  }
  .form-label {
    font-weight: normal;
    margin-bottom: 0;
    text-align: right;
    font-size: 14px;
    color: #7C7F90;
    display: block;
    line-height: 34px;
    float: left;
    padding-right: 10px;
    box-sizing: border-box;
  }

  .form-content {
    height: 60px;
  }

  .form-group:after {
    content: '';
    display: block;
    clear: both;
  }

  .after-risk {
    left: -5px;
    color: #f00;
    position: relative;
    top: 2px;
  }

  .text-warning {
    font-size: 12px;
    color: #ff0000;
    display: inline-block;
    margin-right: 5px;
  }

  .input-container {
    float: left;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'FormFieldValidate',
    props: {
      messages: {
        type: Object
      },
      name: {
        type: String
      },
      label: {
        type: String
      },
      fieldClass: String,
      afterRisk: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
