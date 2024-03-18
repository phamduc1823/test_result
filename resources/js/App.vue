<template>
  <div class="container-sm border rounded p-5" style="height: 550px;">
    <a-steps
      v-model:current="current"
      type="navigation"
      :style="stepStyle"
      :items="steps"
    ></a-steps>

    <div v-if="current === 0">
      <Step1 :dishes="dishes" :meals="meals" :onNext="handleNext"/>
    </div>

    <div v-if="current === 1">
      <Step2 :restaurants="dishes" :previous="handlePrevious" :onNext="handleNext"/>
    </div>

    <div v-if="current === 2">
      <Step3 :dishes="dishes" :meals="meals" :previous="handlePrevious" :onNext="handleNext"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Step1 from './components/Step1.vue';
import Step2 from './components/Step2.vue';
import Step3 from './components/Step3.vue';

import axios from "axios";

const current = ref<number>(0);
const dishes = ref([]);
const meals = ref(["Breakfast", "Lunch", "Dinner"]);

const handleNext = () => {
  if (current.value < steps.length - 1) {
    steps[current.value].status = 'finish';
    current.value += 1;
    steps[current.value].status = 'process';
  }
};

const handlePrevious = () => {
  if (current.value > 0) {
    steps[current.value].status = 'wait';
    current.value -= 1;
    steps[current.value].status = 'process';
  }
};

const steps = [
  {
    status: 'process',
    title: 'Step 1',
    disabled: 'true'
  },
  {
    status: 'wait',
    title: 'Step 2',
    disabled: 'true'
  },
  {
    status: 'wait',
    title: 'Step 3',
    disabled: 'true'
  },
  {
    status: 'wait',
    title: 'Review',
    disabled: 'true'
  },
];

onMounted(async () => {
  try {
    const response = await axios.get("/get-json");
    dishes.value = response.data.dishes;
  } catch (error) {
    console.error("Error fetching dishes:", error);
  }
});

const stepStyle = {
  marginBottom: '60px',
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
};
</script>
