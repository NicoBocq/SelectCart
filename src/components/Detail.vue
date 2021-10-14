<template>
  <div class="bg-white">
    <header class="relative bg-white" />

    <main class="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
        <div class="lg:col-start-8 lg:col-span-5">
          <div class="flex justify-between space-x-4">
            <h1 class="text-xl font-medium text-gray-900">
              {{ product.name }}
            </h1>
            <p class="text-xl font-medium text-gray-900">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <!-- Image gallery -->
        <div class="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
          <h2 class="sr-only">
            Images
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
            <img
              v-for="image in product.images"
              :key="image.id"
              :src="image.imageSrc"
              :alt="image.imageAlt"
              :class="[image.primary ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block', 'rounded-lg']"
            >
          </div>
        </div>

        <div class="mt-8 lg:col-span-5">
          <form>
            <div>
              <h2 class="text-sm font-medium text-gray-900">
                Couleur
              </h2>

              <RadioGroup
                v-model="cart.color"
                class="mt-2"
              >
                <RadioGroupLabel class="sr-only">
                  Choisir une couleur
                </RadioGroupLabel>
                <div class="flex items-center space-x-3">
                  <RadioGroupOption
                    v-for="color in product.colors"
                    :key="color.name"
                    v-slot="{ active, checked }"
                    as="template"
                    :value="color"
                  >
                    <div :class="[color.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none']">
                      <RadioGroupLabel
                        as="p"
                        class="sr-only"
                      >
                        {{ color.name }}
                      </RadioGroupLabel>
                      <span
                        aria-hidden="true"
                        :class="[color.bgColor, 'h-8 w-8 border border-black border-opacity-10 rounded-full']"
                      />
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>

            <div class="mt-8">
              <div class="flex items-center justify-between">
                <h2 class="text-sm font-medium text-gray-900">
                  Taille
                </h2>
                <a
                  href="#"
                  class="text-xs text-indigo-600 underline hover:text-indigo-500"
                >
                  Trouver ma taille
                </a>
              </div>

              <n-select
                v-model="cart.size"
                :options="product.sizes"
                label="Taille"
                option-label="label"
              >
                <template #list-header>
                  Sélectionner votre pointure
                </template>
                <template
                  #option="{ option }"
                >
                  <option-item-size :item="option" />
                </template>
              </n-select>
              <select-parse />
            </div>
            <button
              type="submit"
              class="mt-8 w-full bg-yellow-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ajouter au panier
            </button>
          </form>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">
              Description
            </h2>

            <div class="mt-4 prose prose-sm text-gray-500 text-sm">
              {{ product.description }}
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-8">
            <h2 class="text-sm font-medium text-gray-900">
              Idéal pour
            </h2>
            <div class="mt-4 text-sm prose prose-sm text-gray-500">
              <ul role="list">
                <li
                  v-for="item in product.details"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'
import NSelect from './ui/NSelect.vue'
import OptionItemSize from './ui/OptionItemSize.vue'
import SelectParse from './ui/SelectParse.vue'

export default {
  components: {
    SelectParse,
    OptionItemSize,
    NSelect,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  setup () {
    const cart = reactive({
      size: null,
      color: null
    })
    const product = ref({})

    const getProduct = () => {
      import('../fixtures/product.json')
        .then((response) => {
          product.value = response
        })
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
    }
    onMounted(() => {
      getProduct()
    })

    return {
      product,
      cart,
      formatPrice
    }
  }
}
</script>
