<template>
  <div class="grid grid-cols-12 flex-1">
    <div class="col-span-3 font-semibold">
      {{ item.size }}
    </div>
    <div class="col-span-6 text-center">
      {{ processedStock }}
    </div>
    <div class="col-span-3 text-red-600 font-medium text-right">
      {{ item.price }}
    </div>
    <div />
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
  name: 'SelectItemSize',
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
  setup (props) {
    const { item } = toRefs(props)

    const processedStock = computed(() => {
      const stock = item.value.stock
      let message
      switch (true) {
        case !stock:
          message = 'Épuisé'
          break
        case stock === 1:
          message = 'C\'est le dernier, dépêchez vous !'
          break
        case stock <= 5:
          message = `Vite, plus que ${stock} en stock`
          break
        case stock > 5:
          message = 'En stock'
          break
      }
      return message
    })
    return {
      processedStock
    }
  }
}
</script>
