<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { fetchRefData } from './utils/api'

// Define props with default values
const props = withDefaults(
  defineProps<{
    value: string | null;
    type?: string;
    disabled?: boolean;
    reference_data_type: string;
  }>(),
  {
    reference_data_type: null,
    value: null,
    disabled: false,
  },
);

const emit = defineEmits<{
  (event: "input", value: string): void;
}>();

// Create a computed property for v-model
const model = computed({
  get: () => props.value,
  set: (newValue) => {
    emit("input", newValue);
  },
});

// Create a ref to store the items
const items = ref<RefData[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    items.value = await fetchRefData(props.reference_data_type);
  } catch (error) {
    console.error("Failed to load Reference Data:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <v-select v-model="model" :items="items" item-text="description" item-value="name" :disabled="disabled"
    :clearable="clear" :loading="isLoading" />
</template>
