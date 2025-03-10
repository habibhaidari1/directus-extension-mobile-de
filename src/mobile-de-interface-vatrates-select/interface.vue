<template>
  <v-select v-model="model" :items="items" item-text="description" item-value="name" :disabled="disabled"
    :loading="isLoading" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// Define props with default values
const props = withDefaults(
  defineProps<{
    value: string | null;
    type?: string;
    disabled?: boolean;
    sites: string;
  }>(),
  {
    value: null,
    disabled: false,
  },
);

const emit = defineEmits<{
  (event: "input", value: string | null): void;
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
    const response = await fetch(`/mobile-de/refdata/sites/${props.sites}/vatrates`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }
    items.value = await response.json();
  } catch (error) {
    console.error("Failed to load Reference Data:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>