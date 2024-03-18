<template>
    <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
      @finish="onFinish"
    >
      <a-space
        v-for="(dish, index) in dynamicValidateForm.dishs"
        :key="dish.id"
        style="display: flex; margin-bottom: 8px"
        align="baseline"
      >
      <MinusCircleOutlined class="mt-2" style="margin-right: 10px;" @click="removeUser(dish)" />
      
        <div>
            <p class="fw-bold mt-1">Choose your {{selectedMeal}} dish</p>
            <a-select
                v-model:value="selectedDish"
                style="width: 320px"
                    :options="
                    filteredDishes.map(dish => ({ value: dish.id, label: dish.name }))
                    "
            ></a-select>
        </div>

        <div style="margin-left: 10px;">
            <p class="fw-bold mt-1">Please enter no of servingss</p>
            <a-input-number id="inputNumber" v-model:value="number" :min="1" :max="10">
            <template #upIcon>
                <ArrowUpOutlined />
            </template>
            <template #downIcon>
                <ArrowDownOutlined />
            </template>
            </a-input-number> <span>(Maximum 10 dishs)</span>
        </div>
      </a-space>

      <a-form-item>
        <a-button type="dashed" block @click="addUser">
          <PlusOutlined />
          Add dishes
        </a-button>
      </a-form-item>
    </a-form>
    <div class="mt-5">
          <div style="float: left;">
            <a-button type="primary" ghost @click="previous">Previous</a-button>
          </div>
      
          <div style="float: right;">
            <a-button type="primary" ghost @click="submit">Next</a-button>
          </div>
      </div>
  </template>
  <script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue';

  const props = defineProps({
    dishes: Array,
    meals: Array,
    onNext: Function,
    previous: Function
  });

  interface User {
    first: string;
    last: string;
    id: number;
  }

  const number = ref<number>(1);
  const selectedMeal = ref(props.meals[0]);
  const selectedDish = ref(null);

  const formRef = ref<FormInstance>();
  const dynamicValidateForm = reactive<{ dishs: User[] }>({
    dishs: [],
  });
  const removeUser = (item: User) => {
    const index = dynamicValidateForm.dishs.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.dishs.splice(index, 1);
    }
  };
  const addUser = () => {
    dynamicValidateForm.dishs.push({
      first: '',
      last: '',
      id: Date.now(),
    });
  };

  const filteredDishes = computed(() => {
  const selectedRestaurantFromStorage = localStorage.getItem('formData');
  const restaurantData = selectedRestaurantFromStorage ? JSON.parse(selectedRestaurantFromStorage) : {};
  const selectedRestaurant = restaurantData.restaurant || '';

  return props.dishes.filter((dish) =>
    dish.availableMeals.includes(selectedMeal.value.toLowerCase()) &&
    dish.restaurant === selectedRestaurant
  );
});

  const previous = () => {
    props.previous();
  }

  const submit = () => {
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  formData.restaurant = selectedRestaurant.value;
  localStorage.setItem('formData', JSON.stringify(formData));

  props.onNext(2);
  }

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
  
  