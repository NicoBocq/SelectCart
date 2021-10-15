<template>
  <Listbox
    v-model="selected"
    as="div"
  >
    <ListboxLabel class="block text-sm font-medium text-gray-700 sr-only">
      {{ label }}
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton
        class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
      >
        <div class="flex items-center h-6">
          <slot
            v-if="selected"
            name="selected-option"
            :option="selected"
          >
            {{ getOptionLabel(selected[optionLabel]) }}
          </slot>
        </div>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <n-icon
            icon="chevron-down"
            class="text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute z-10 border border-gray-400 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <listbox-option
            v-if="hasSlot('list-header')"
            key="list-header"
          >
            <li class="py-2 px-3 text-gray-500 border-b border-gray-200">
              <slot name="list-header" />
            </li>
          </listbox-option>
          <ListboxOption
            v-for="(option, index) in options"
            :key="index"
            v-slot="{ active, selected }"
            as="template"
            :value="option"
          >
            <li :class="[active ? 'bg-gray-200' : 'text-gray-900', 'cursor-default select-none relative py-2 px-3']">
              <slot
                v-if="hasSlot('option')"
                :option="option"
                name="option"
              />
              <span v-else>
                {{ getOptionLabel(option) }}
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { toRefs } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import NIcon from './NIcon.vue'
import { useModelWrapper } from '../../composable/modelWrapper'

export default {
  name: 'NSelect',
  components: {
    NIcon,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions
  },
  props: {
    modelValue: {
      type: [String, Number, Array, Object],
      default: null
    },
    options: {
      type: Array
    },
    label: {
      type: String,
      default: ''
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    placeholder: {
      type: String,
      default: ''
    },
    selectedIcon: {
      type: String,
      default: 'check'
    }
  },
  emits: ['update:modelValue', 'updateOnOpen'],
  setup (props, { slots, emit }) {
    const { optionLabel } = toRefs(props)
    const hasSlot = (name) => !!slots[name]

    const selected = useModelWrapper(props, emit)

    const getOptionLabel = (option) => {
      if (typeof option === 'object') {
        if (!Object.prototype.hasOwnProperty.call(option, optionLabel.value)) {
          return console.warn(
            ` Label key "${optionLabel.value}" does not` +
            ` exist in options object ${JSON.stringify(option)}.\n`
          )
        }
        return option[optionLabel.value]
      }
      return option
    }

    return {
      selected,
      hasSlot,
      getOptionLabel
    }
  }
}
</script>
