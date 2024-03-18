<template>
  <div>
    <p class="fw-bold">Please select a restaurant</p>
    <a-select
      ref="select"
      v-model:value="selectedRestaurant"
      style="width: 220px;"
      :options="options"
    ></a-select>

    <div class="mt-5">
        <div style="float: left;">
          <a-button type="primary" ghost @click="previous">Previous</a-button>
        </div>
    
        <div style="float: right;">
          <a-button type="primary" ghost @click="submit">Next</a-button>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  restaurants: Array,
  previous: Function,
  onNext: Function
});

const selectedRestaurant = ref(null);
const options = ref([]);

const restaurantMap = {};
props.restaurants.forEach(restaurant => {
  if (!restaurantMap[restaurant.restaurant]) {
    restaurantMap[restaurant.restaurant] = restaurant;
  }
});

const loadFormDataFromStorage = () => {
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  console.log(formData);
  
  if (formData) {
    const { selectedMeal: meal, selectedDish: dish } = formData;

    const selectedDishName = props.restaurants.find(res => res.id === dish)?.name || '';

    const filteredRestaurants = props.restaurants.filter(restaurant => {
      return (
        restaurant.availableMeals.includes(meal.toLowerCase()) &&
        restaurant.name.includes(selectedDishName)
      );
    });

    options.value = filteredRestaurants.map(restaurant => ({
      value: restaurant.restaurant,
      label: restaurant.restaurant
    }));

    selectedRestaurant.value = options.value.length > 0 ? options.value[0].value : null;
  }
};

loadFormDataFromStorage();

const previous = () => {
  props.previous();
};

const submit = () => {
  if (!selectedRestaurant.value) {
    alert('Please choose a restaurant!');
    return;
  }
  
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  formData.restaurant = selectedRestaurant.value;
  localStorage.setItem('formData', JSON.stringify(formData));

  props.onNext(2);
};
</script>

