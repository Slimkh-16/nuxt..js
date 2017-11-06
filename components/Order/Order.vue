<template>
  <div class="col l4 m6 s12 right align-center">
    <div class="you-order">
      <div class="you-order__head">Ваш заказ</div>
      <p>{{orderObj.recipient && orderObj.recipient.first_name}}</p>
      <no-ssr>
        <table>
          <tbody>
            <tr v-for="product in orderObj.products" :key="product.id">
              <td class="img_holder align-center">
                <img :src="getImgSrc(product.product)" :alt="product.product.locale.name">
              </td>
              <td>
                <router-link :to="`/${product.product.alias}`">
                  {{product.product.locale.name}}
                </router-link>
                <p>
                  <span v-if="product.size">Размер: {{product.size}}</span>
                  <span>Кол-во: {{product.count}}</span>
                  <span v-if="product.grave && JSON.parse(product.grave).text">Гравировка: {{JSON.parse(product.grave).text}}</span>
                  <br>
                  <span v-if="product.grave && JSON.parse(product.grave).style_id">Стиль гравировки: {{graveStyleList[+JSON.parse(product.grave).style_id - 1]}}</span>
                  <span class="price-order"><b>{{product.price}}</b> грн.</span>
                </p>
              </td>
            </tr>
            <tr class="order-total-price">
              <td colspan="2"><span class="price-order">Итого:<b> {{ orderObj.total }} </b> грн. </span></td>
            </tr>
          </tbody>
        </table>
      </no-ssr>
    </div>
    <div v-if="this.orderObj && this.orderObj.order_payment_method && this.orderObj.order_payment_method.id === 1" class="form_liqpay" v-html="form"></div>
    <div v-if="privatPaymentWay" class="container privat">
      <div id="content">
        <div id="countedResults">
          <div class="row">
            <div class="result col-sm-4" id="ipResult">
              <div class="logo">
                <img class="centered" src="../../assets/images/ip_logo.png">
                <span id="ipTitle" class="text-center bold">«Мгновенная рассрочка»</span>
              </div>
              <div class="result-holder holder-phys">
                <span>Сумма платежа</span>
                <div class="result-data">
                  <div class="result-value bold" id="ipResultValue">{{ipResultValue}}</div>
                </div>
                <div class="result-additional-data-phys">грн / мес</div>
              </div>
            </div>
          </div>
        </div>
        <div id="controlElements">
          <div id="term" class="control-element">
            <span class="legend bold">Срок кредитования</span>
            <div class="row">
              <div class="col-xs-12 col-md-2 text-center">
                <input
                  type="text"
                  class="form-control text-center numeric-input"
                  id="termInput"
                  v-model="termInput"
                  min="1"
                  max="24"
                  @change="setNewValueInTerm()"
                  @input="onlyNumbers()"
                >
                <div class="form-element" id="paymentsCount">2</div>
              </div>
              <div class="col-xs-12 col-md-2">
                <div class="additional-data form-element">месяцев</div>
                <div class="payments form-element">платежей</div>
              </div>
            </div>
            <div class="termSlider">
              <div id="termSlider"></div>
            </div>
          </div>
          <div id="price" class="control-element">
            <span class="legend bold">Стоимость товара</span>
                <span class="bold fz20">{{ orderObj.total }}</span>
                <span class="additional-data form-element">гривен</span>
            </div>
          </div>
        </div>
      </div>
      <a href="#" v-if="this.orderObj && this.orderObj.order_payment_method && this.orderObj.order_payment_method.id === 3"  class="btn waves-effect waves-light" @click.prevent="sendPrivatRequest">Оплатить заказ</a>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ImageHelper from '../../helpers/ImageHelper'
import { graveStyleList } from '../../enum'

export default {
  data () {
    return {
      graveStyleList: graveStyleList,
      termInput: 3,
      ipResultValue: 139.50
    }
  },
  mixins: [ImageHelper],
  computed: {
    ...mapGetters(['orderObj', 'form']),
    privatPaymentWay () {
      return this.orderObj.order_payment_method && this.orderObj.order_payment_method.id === 3 && this.orderObj.status.id === 1
    }
  },
  methods: {
    ...mapActions(['fetchOrderByHash', 'sendPrivatData']),
    noUiSlider () {
      this.sliderIt = window.noUiSlider.create(document.querySelector('#termSlider'), {
        start: 3,
        connect: true,
        step: 1,
        range: {
          'min': 1,
          'max': 24
        },
        format: window.wNumb({
          decimals: 0
        })
      })
      this.sliderIt.on('update', (values, handle) => {
        let value = parseInt(values[handle])
        this.termInput = +value
        window.$('#paymentsCount').html(this.termInput + 1)
        let resCalc = window.PP_CALCULATOR.calculatePhys(this.termInput, this.orderObj.total)
        this.ipResultValue = resCalc.ipValue
      })
    },
    setNewValueInTerm () {
      this.termInput <= 24 && this.termInput >= 1 ? this.sliderIt.updateOptions({start: this.termInput}, 'update') : this.sliderIt.updateOptions({start: this.termInput = 3}, 'update')
    },
    onlyNumbers () {
      this.termInput = +this.termInput.replace(/^\.|[^\d.]|\.(?=.*\.)|^0+(?=\d)/g, '')
    },
    sendPrivatRequest () {
      this.sendPrivatData({
        hash: this.$route.params.hash,
        partsCount: this.termInput + 1
      }).then(res => {
        console.log(res)
        if (res.token) {
          window.location = `https://payparts2.privatbank.ua/ipp/v2/payment?token=${res.token}`
        } else {
          alert('повторный платеж может быть создать только через 20 мин')
        }
      })
    },
    imgUrl (productId, imgName) {
      return this.url() + `/assets/images/products/${productId}/${imgName}`
    },
    getImgSrc (product) {
      let cover = this.coverImg(product)
      return cover
    }
  },
  mounted () {
    this.fetchOrderByHash(this.$route.params.hash).then(() => {
      this.$nextTick(() => {
        this.privatPaymentWay && this.noUiSlider()
      })
    })
  }
}
</script>

<style>
  .fz20 {
    font-size: 20px;
  }
  .img_holder {
    width: 80px;
    height: auto;
  }
  iframe {
    width: 100%;
    height: 500px;
  }
  .termSlider {
    width: 100%;
    padding: 15px 0;
  }
  #termSlider {
    width: 100%;
  }
  #ipResultValue {
    padding: 10px 0;
  }
  #termInput {
    margin-bottom: 0;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    min-height: 1px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    background-color: #fffeff;
    border: 1px solid #dcdcdc !important;
    -webkit-box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.08) !important;
    box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.08) !important;
  }
  .container.privat {padding: 0;
    text-align: center;}
  .container.privat .row {margin: 0;}
  .container.privat .bold{font-weight:bold}
  .container.privat .centered{margin:auto}
  .container.privat .control-element{padding:10px}
  .container.privat .numeric-input{text-align:center;border-radius:3px;display:inline}
  .container.privat .input-holder{max-width:100%}
  .container.privat .legend{display:block;font-size:18px;color:#413939; margin-bottom: 15px}
  .container.privat .logo img{width:60px;height:60px}
  .container.privat .logo span{display:block;font-size:20px;color:#413939;height:60px}
  .container.privat .result{padding:10px 10px 10px 10px;display:inline;text-align:center}
  .container.privat .result-additional-data-phys,
  .container.privat .result-additional-data-jur{margin-top:10px;font-size:22px;color:#413939;font-family:'Open Sans',Arial,Helvetica,sans-serif}
  .container.privat .result-holder{background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0.06,#fff),color-stop(0.6,#dbdcdc));background-image:-o-linear-gradient(bottom,#fff 6%,#dbdcdc 60%);background-image:-moz-linear-gradient(bottom,#fff 6%,#dbdcdc 60%);background-image:-webkit-linear-gradient(bottom,#fff 6%,#dbdcdc 60%);background-image:-ms-linear-gradient(bottom,#fff 6%,#dbdcdc 60%);background-image:linear-gradient(to bottom,#fff 6%,#dbdcdc 60%);border:1px solid #dbdcdc;padding:20px 10px;border-radius:3px;font-size:20px;color:#413939;width:250px;margin:auto}
  .container.privat .result-value{background-color:#56ae00;color:#fff;font-size:23px;font-family:'Open Sans',Arial,Helvetica,sans-serif;margin-top:10px;border-radius:3px}
  .container.privat .control-element>.row{display:table}
  .control-element [class*="col-"]{float:none;display:table-cell;vertical-align:middle}
  .container.privat .progress{height:1em}
  .container.privat .progress-bar{-webkit-transition:width 0 ease-in-out;transition:width 0 ease-in-out}
  .container.privat .ui-slider{height:0;position:relative}
  .container.privat .ui-widget-content{border:0}
  .container.privat .ui-slider .ui-slider-handle{height:1.6em;outline:0}
  .container.privat .hint{height:10px;font-size:10px;color:#413939}
  .container.privat .form-element{padding:6px 12px;text-align:center;width:100%}
  .container.privat .disabled{pointer-events:none;cursor:not-allowed;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}
  .container.privat .padShowRateSheet{height:20px}
  .container.privat .padBackCalcButton{height:56px}
  .container.privat .showRateSheet{position:relative;cursor:pointer;text-transform:uppercase;background-color:#56ae00;color:#fff;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out;transition:all .1s ease-in-out;letter-spacing:1px;display:inline-block;margin-left:313px;font-size:13px;line-height:36px;padding:0 16px;border-radius:5px;font-weight:normal}
  .container.privat .showRateSheet:hover{background-color:#489000}
  .container.privat .rateSheetLayout{display:block;position:absolute;text-align:center;margin-left:auto;margin-right:auto;padding-bottom:15px}
  .container.privat .rateSheetTable{color:#413939;background-color:#fff;font-size:18px;padding:178px 20px 58px;text-align:center;margin:15px;display:table}
  .container.privat .rateSheetLayout td{text-align:center;padding:10px;display:table-cell}
  .container.privat th,
  .container.privat td{border:1px solid black;border-collapse:collapse}
  .container.privat table{border:1px solid white;border-collapse:collapse}
  .container.privat .rateSheetLayout tr{display:table-row}
  .container.privat .trRateHeader{background-color:lightgrey;display:table-row}
  .container.privat .printRateSheetBtn{position:relative;cursor:pointer;text-transform:uppercase;background-color:#fff;letter-spacing:1px;display:inline-block;font-size:13px;line-height:36px;padding:0 16px;border-radius:5px;font-weight:normal;margin-top:5px;margin-right:15px;float:right;margin-bottom:15px}
  .container.privat .printIcon{float:right}
  .container.privat .printRateSheetBtn:hover{font-weight:bold}
  .container.privat #printRateSheetButton{background-color:#f0f0eb;border-radius:5px;float:right;margin-right:15px;padding:5px 0 5px 10px;width:120px}
  .container.privat #printRateSheetButton img{border:0 none;float:left;max-height:16px;vertical-align:bottom;width:16px}
  .container.privat #printRateSheetButton span{font-size:12px;letter-spacing:1px;margin-left:.2em;vertical-align:bottom}
  .container.privat #printRateSheetButton span:hover{color:#56ae00;cursor:pointer;transition:all .4s ease 0}
  .container.privat .backCalcButton{position:absolute;cursor:pointer;text-transform:uppercase;background-color:#56ae00;color:#fff;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out;transition:all .1s ease-in-out;letter-spacing:1px;display:block;font-size:13px;line-height:36px;border-radius:5px;font-weight:normal;padding:0 7px;left:44%}
  .container.privat .backCalcButton:hover{background-color:#489000}
  .container.privat .printLayout{position:relative;text-align:center;background-color:#fff;margin-right:auto;margin-left:auto;font-size:18pt;font-family:'Times New Roman',Times,serif}
  .container.privat td{padding:15px 15px}
  .container.privat table tr td{font-size:13pt;font-family:Open Sans,Arial,Helvetica,sans-serif}
  .container.privat table{color:#413939;background-color:#fff;font-family:Open Sans,Arial,Helvetica,sans-serif;font-size:13pt;text-transform:uppercase;padding:20px 20px 58px;text-align:center;margin:15px;display:table}
  .container.privat .nav-pills>li+li{margin-left:0 !important}#tariffs{width:900px}
  .container.privat .rateInfoText{text-align:left;font-size:medium;font-weight:bold;line-height:1.4}
  .container.privat .nav-pills>li.active>a,
  .container.privat .nav-pills>li.active>a:hover,
  .container.privat .nav-pills>li.active>a:focus{font-weight:bold;color:#413939;background-color:#b6ff00}
  .container.privat .ui-widget-content .ui-state-active{border:1px solid #489000;background:#56ae00}
</style>
