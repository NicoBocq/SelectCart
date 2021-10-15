<template>
  <detail />
</template>

<script>
import NLoading from './components/ui/NLoading.vue'
import { defineAsyncComponent } from 'vue'

const Detail = defineAsyncComponent({
  loader: () => import('./components/Detail.vue'),
  loadingComponent: NLoading
})

export default {
  name: 'SelectCart',
  components: { Detail }
}
</script>
