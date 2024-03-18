<template>
  <a-space>
    <p class="fw-bold">Please select a meal</p>
    <a-select
      v-model:value="selectedMeal"
      style="width: 320px; margin-right: 20px;"
      :options="mealsOptions"
    ></a-select>

    <a-select
      v-model:value="selectedDish"
      style="width: 320px"
        :options="
          filteredDishes.map(dish => ({ value: dish.id, label: dish.name }))
        "
    ></a-select>

    <p class="fw-bold mt-3">Please enter number of people</p>
    <a-input-number id="inputNumber" v-model:value="number" :min="1" :max="10">
      <template #upIcon>
        <ArrowUpOutlined />
      </template>
      <template #downIcon>
        <ArrowDownOutlined />
      </template>
    </a-input-number> <span>(Maximum 10 people)</span>

    <div class="mt-2" style="float: right;">
      <a-button type="primary" ghost @click="submit">Next</a-button>
    </div>
  </a-space>
</template>

<script setup lang="ts">
import { computed, ref, defineProps } from "vue";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  dishes: Array,
  meals: Array,
  onNext: Function
});

const number = ref<number>(1);
const selectedMeal = ref(props.meals[0]);
const selectedDish = ref(null);

const filteredDishes = computed(() => {
  return props.dishes.filter((dish) =>
    dish.availableMeals.includes(selectedMeal.value.toLowerCase())
  );
});

const mealsOptions = computed(() => {
  return props.meals.map((meal) => ({ value: meal }));
});

const submit = () => {
  if (!selectedDish.value) {
    alert('Please choose your dish!');
    return;
  }

  if (number.value > 10 || number.value < 0) {
    alert('Invalid number of people!');
    return;
  }

  const dataToSave = {
    selectedMeal: selectedMeal.value,
    selectedDish: selectedDish.value,
    number: number.value
  };
  localStorage.setItem("formData", JSON.stringify(dataToSave));
  props.onNext(1);
};

const loadFormDataFromStorage = () => {
  const formData = localStorage.getItem('formData');
  if (formData) {
    const { selectedMeal: meal, selectedDish: dish, number: num } = JSON.parse(formData);
    selectedMeal.value = meal;
    selectedDish.value = dish;
    number.value = num;
  }
};
  loadFormDataFromStorage();
</script>