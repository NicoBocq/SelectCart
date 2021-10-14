<template>
  <div class="bg-white">
    <header class="relative bg-white" />

    <main class="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
        <div class="lg:col-start-8 lg:col-span-5">
          <div class="flex justify-between">
            <h1 class="text-xl font-medium text-gray-900">
              {{ product.name }}
            </h1>
            <p class="text-xl font-medium text-gray-900">
              {{ product.price }}
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
                option-label="size"
              >
                <template #list-header>
                  Sélectionner votre pointure
                </template>
                <template
                  #option="{ option }"
                >
                  <select-item-size :item="option" />
                </template>
              </n-select>
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
import { reactive } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import NSelect from './ui/NSelect.vue'
import NIcon from './ui/NIcon.vue'
import SelectItemSize from './ui/SelectItemSize.vue'

const product = {
  name: 'CHAUSSURES DE RUNNING BROOKS RUNNING GLYCERIN 19 BLEU / JAUNE',
  price: '170,00 €',
  images: [
    {
      id: 1,
      imageSrc: 'https://media.alltricks.com/hd/18891825fe253a9ded875.56031014.jpg',
      imageAlt: 'CHAUSSURES DE RUNNING BROOKS RUNNING',
      primary: true
    },
    {
      id: 2,
      imageSrc: 'https://media.alltricks.com/hd/18891825fe2538f2497d1.06306980.jpg',
      imageAlt: 'CHAUSSURES DE RUNNING BROOKS RUNNING',
      primary: false
    },
    {
      id: 3,
      imageSrc: 'https://media.alltricks.com/hd/18891825fe25389dbe913.14566111.jpg',
      imageAlt: 'CHAUSSURES DE RUNNING BROOKS RUNNING',
      primary: false
    }
  ],
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' }
  ],
  sizes: [
    { size: '40', stock: 1, price: '220,00 €' },
    { size: '40.2/3', stock: 0, price: '220,00 €' },
    { size: '41.1/3', stock: 5, price: '220,00 €' },
    { size: '42', stock: 6, price: '220,00 €' },
    { size: '42.2/3', stock: 10, price: '220,00 €' },
    { size: '43.1/3', stock: 10, price: '220,00 €' },
    { size: '44', stock: 10, price: '220,00 €' },
    { size: '44.2/3', stock: 1, price: '220,00 €' },
    { size: '45.1/3', stock: 10, price: '220,00 €' },
    { size: '46', stock: 10, price: '220,00 €' },
    { size: '46.2/3', stock: false, price: '220,00 €' },
    { size: '47.1/3', stock: 10, price: '220,00 €' },
    { size: '48', stock: 10, price: '220,00 €' },
    { size: '49.1/3', stock: 10, price: '220,00 €' }
  ],
  description: 'Presque comme courir sur un nuage... Avec son supplément d\'élasticité dans la tige et son amorti extra-doux sur toute sa longueur, cette chaussure de running pour hommes a le dernier mot en termes de confort.',
  details: [
    'Tige en mesh 3D très respirant et très léger.',
    'Montage en forme de chausson pour plus de confort.',
    'Semelle intermédiaire Dna Loft pour un excellent amorti.',
    'Encoche de flexion pour un bon déroulement du pied.',
    'Type : Amorti Maximum',
    'Drop : 10mm',
    'Poids : 283 g'
  ]
}
const reviews = {
  average: 3.9,
  totalCount: 512
}

export default {
  components: {
    SelectItemSize,
    NSelect,
    NIcon,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    TransitionChild,
    TransitionRoot
  },
  setup () {
    const cart = reactive({
      size: null,
      color: null
    })

    return {
      product,
      reviews,
      cart
    }
  }
}
</script>
