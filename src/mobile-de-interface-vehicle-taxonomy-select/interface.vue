<template>
  <div class="vehicle-taxonomy-select">
    <!-- Class selector -->
    <v-select 
      v-model="selectedClass" 
      :items="classes" 
      item-text="description" 
      item-value="name" 
      :disabled="disabled" 
      :loading="isLoadingClasses"
      placeholder="Select class" 
      class="taxonomy-select-item"
    />
    
    <!-- Make selector -->
    <v-select 
      v-model="selectedMake" 
      :items="makes" 
      item-text="description" 
      item-value="name"
      :disabled="disabled || !selectedClass" 
      :loading="isLoadingMakes"
      placeholder="Select make" 
      class="taxonomy-select-item"
    />
    
    <!-- Model selector -->
    <v-select 
      v-model="selectedModel" 
      :items="models" 
      item-text="description" 
      item-value="name"
      :disabled="disabled || !selectedMake" 
      :loading="isLoadingModels"
      placeholder="Select model" 
      class="taxonomy-select-item"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";


// Props and emits
const props = withDefaults(
  defineProps<{
    value: VehicleTaxonomyValue | null;
    disabled?: boolean;
  }>(),
  {
    value: null,
    disabled: false,
  }
);

const emit = defineEmits<{
  (event: "input", value: VehicleTaxonomyValue | null): void;
}>();

// Component state
const isInitializing = ref(true);

// Selected values
const selectedClass = ref<string | null>(props?.value?.class || null);
const selectedMake = ref<string | null>(props?.value?.make || null);
const selectedModel = ref<string | null>(props?.value?.model || null);

// Data lists
const classes = ref<RefData[]>([]);
const makes = ref<RefData[]>([]);
const models = ref<RefData[]>([]);

// Loading states
const isLoadingClasses = ref(false);
const isLoadingMakes = ref(false);
const isLoadingModels = ref(false);

// Initialization
onMounted(async () => {
  await loadClasses();
});

// API data fetching functions
const loadClasses = async (): Promise<void> => {
  isLoadingClasses.value = true;
  try {
    const response = await fetch('/mobile-de/refdata/classes');
    if (!response.ok) throw new Error(`Failed to fetch classes: ${response.status}`);
    classes.value = await response.json();
  } catch (error) {
    console.error("Failed to load vehicle classes:", error);
  } finally {
    isLoadingClasses.value = false;
  }
};

const loadMakes = async (classValue: string): Promise<void> => {
  isLoadingMakes.value = true;
  try {
    const response = await fetch(`/mobile-de/refdata/classes/${classValue}/makes`);
    if (!response.ok) throw new Error(`Failed to fetch makes: ${response.status}`);
    makes.value = await response.json();
  } catch (error) {
    console.error("Failed to load makes:", error);
  } finally {
    isLoadingMakes.value = false;
  }
};

const loadModels = async (classValue: string, makeValue: string): Promise<void> => {
  isLoadingModels.value = true;
  try {
    const response = await fetch(`/mobile-de/refdata/classes/${classValue}/makes/${makeValue}/models`);
    if (!response.ok) throw new Error(`Failed to fetch models: ${response.status}`);
    models.value = await response.json();
  } catch (error) {
    console.error("Failed to load models:", error);
  } finally {
    isLoadingModels.value = false;
  }
};

// Update the model and emit changes
const emitSelection = (): void => {
  emit("input", {
    class: selectedClass.value,
    make: selectedMake.value,
    model: selectedModel.value
  });
};

// Watch for external value changes (including initial values)
watch(() => props.value, async (newValue) => {
  if (!newValue) return;
  
  isInitializing.value = true;
  
  // Load classes if needed
  if (classes.value.length === 0) {
    await loadClasses();
  }
  
  // Set the class value
  selectedClass.value = newValue.class;
  
  // Load makes if we have a class
  if (selectedClass.value) {
    await loadMakes(selectedClass.value);
    
    // Set the make value
    selectedMake.value = newValue.make;
    
    // Load models if we have a make
    if (selectedMake.value) {
      await loadModels(selectedClass.value, selectedMake.value);
      selectedModel.value = newValue.model;
    }
  }
  
  isInitializing.value = false;
}, { immediate: true });

// Handle user selection changes
watch(selectedClass, async (newClass, oldClass) => {
  if (isInitializing.value || newClass === oldClass) return;
  
  selectedMake.value = null;
  selectedModel.value = null;
  makes.value = [];
  models.value = [];
  
  if (newClass) {
    await loadMakes(newClass);
  }
  
  emitSelection();
});

watch(selectedMake, async (newMake, oldMake) => {
  if (isInitializing.value || newMake === oldMake) return;
  
  selectedModel.value = null;
  models.value = [];
  
  if (selectedClass.value && newMake) {
    await loadModels(selectedClass.value, newMake);
  }
  
  emitSelection();
});

watch(selectedModel, (newModel, oldModel) => {
  if (isInitializing.value || newModel === oldModel) return;
  emitSelection();
});
</script>


<style scoped>
.vehicle-taxonomy-select {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.taxonomy-select-item {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .vehicle-taxonomy-select {
    flex-direction: column;
    gap: 8px;
  }
}
</style>