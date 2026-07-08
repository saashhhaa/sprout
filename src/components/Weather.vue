<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@vue/apollo-composable";
import { useDateStore } from "../stores/store.ts";
import gql from "graphql-tag";

const { t } = useI18n();
const dateStore = useDateStore();
const formattedDate = computed(() => {
  const date = dateStore.selectedDate;
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
});

const WEATHER_QUERY = gql`
  query GetWeather($latitude: Float!, $longitude: Float!, $date: String!) {
    weather(latitude: $latitude, longitude: $longitude, date: $date) {
      temperature
      weatherCode
    }
  }
`;

const { result, loading, error } = useQuery(WEATHER_QUERY, () => ({
  latitude: 42.87,
  longitude: 74.59,
  date: formattedDate.value,
}));

const temperature = computed(() => result.value?.weather?.temperature ?? null);

const condition = computed(() => {
  const code = result.value?.weather?.weatherCode;
  if (code === undefined || code === null) return "";

  if (code === 0) return t("weather.code1");
  if (code >= 1 && code <= 3) return t("weather.code2");
  if (code >= 45 && code <= 48) return t("weather.code3");
  if (code >= 51 && code <= 67) return t("weather.code4");
  if (code >= 71 && code <= 77) return t("weather.code5");
  if (code >= 80 && code <= 82) return t("weather.code6");
  return t("weather.code7");
});
</script>

<template>
  <div class="weather-widget">
    <div class="box">
      <div v-if="loading">{{ $t("weather.loading") }}</div>

    <div v-else-if="error"></div>

    <div v-else-if="result?.weather === null">
      <h3>{{ $t("weather.title1") }}</h3>
      <p>{{ $t("weather.error") }}</p>
    </div>

    <div v-else>
      <h3>{{ $t("weather.title1") }}</h3>
      <p> <p class="trans">{{ $t("weather.title2") }}</p> {{ temperature }}°C</p>
      <p> <p class="trans">{{ $t("weather.title3") }}</p> {{ condition }}</p>
    </div>
    </div>
    <img src="../assets/calendar/weather.svg" alt="">
  </div>
</template>

<style scoped>
.weather-widget {
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(74, 139, 88, 0.153);
  background: linear-gradient(to left, #cae4cb, transparent);
  padding: 2vh 2vw;
  display: flex;
  justify-content: space-between;
}

img {
  width: 80px !important;
  height: 80px;
}

h3 {
  font-size: 24px;
}

p {
  display: flex;
  gap: 20px;
}

.trans {
  opacity: .5;
}

@media (max-width: 400px) {
  .weather-widget {
    width: 80%;
    margin: 20px 0;
    font-size: 12px;
  }
}
</style>