<template>
  <div class="grid grid-cols-12 flex-1">
    <div class="col-span-3 font-semibold">
      {{ item.label }}
    </div>
    <div class="col-span-6 text-center">
      {{ item.stockLabel }}
    </div>
    <div class="col-span-3 text-red-600 font-medium text-right">
      {{ formatPrice(item.price) }}
    </div>
    <div />
  </div>
</template>

<script>
import { formatPrice } from '../../composable/format'

export default {
  name: 'OptionItemSize',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return {
      formatPrice
    }
  }
}
</script>
