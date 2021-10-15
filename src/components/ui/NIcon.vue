<template>
  <component
    :is="processedIcon"
    :class="sizeStyle"
    class="inline-block"
    aria-hidden="true"
  />
</template>

<script>
import {
  ChevronDownIcon,
  RefreshIcon
} from '@heroicons/vue/solid'

import { computed, toRefs } from 'vue'
export default {
  name: 'NIcon',
  components: {
    ChevronDownIcon,
    RefreshIcon
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { icon, small, size } = toRefs(props)
    const processedIcon = computed(() => {
      return `${icon.value}-icon`
    })

    const sizeStyle = computed(() => {
      return small.value ? 'h-4 w-4' : size.value ? size.value : 'h-5 w-5'
    })

    return {
      processedIcon,
      sizeStyle
    }
  }
}
</script>
