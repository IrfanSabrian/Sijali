<template>
  <div class="hero-card">
    <div class="card-header">
      <div class="card-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <span class="card-title">Hari Ini</span>
    </div>
    <div class="card-content">
      <!-- Loading State -->
      <div v-if="loading" class="weather-loading">
        <div class="loading-spinner"></div>
        <p class="text-sm text-white/70">Memuat data cuaca...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="weather-error">
        <p class="text-sm text-white/70">{{ error }}</p>
      </div>

      <!-- Weather Content -->
      <div v-else class="weather-content">
        <!-- Date -->
        <div class="weather-date">
          <span class="date-text">{{ currentDate }}</span>
        </div>

        <!-- Main Weather Info -->
        <div class="weather-main">
          <div class="temperature-section">
            <div class="temperature">
              <span class="temp-value">{{ temperature }}</span>
              <span class="temp-unit">°C</span>
            </div>
            <div class="weather-description">
              {{ weatherDescription }}
            </div>
            <div class="location">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="inline mr-1"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                />
              </svg>
              {{ locationName }}
            </div>
          </div>

          <!-- Weather Icon -->
          <div class="weather-icon">
            <img
              v-if="weatherIcon"
              :src="weatherIcon"
              :alt="weatherDescription"
              class="weather-icon-img"
            />
            <div v-else class="weather-icon-placeholder">☀️</div>
          </div>
        </div>

        <!-- Weather Details -->
        <div class="weather-details">
          <!-- Humidity -->
          <div class="detail-item">
            <div class="detail-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                />
              </svg>
            </div>
            <div class="detail-content">
              <div class="detail-label">Kelembapan</div>
              <div class="detail-value">{{ humidity }}%</div>
            </div>
          </div>

          <!-- Wind Speed -->
          <div class="detail-item">
            <div class="detail-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
                ></path>
              </svg>
            </div>
            <div class="detail-content">
              <div class="detail-label">Kecepatan Angin</div>
              <div class="detail-value">{{ windSpeed }} km/jam</div>
            </div>
          </div>

          <!-- Wind Direction -->
          <div class="detail-item">
            <div class="detail-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
            <div class="detail-content">
              <div class="detail-label">Arah Angin</div>
              <div class="detail-value">{{ windDirection }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// Weather data
const loading = ref(true);
const error = ref(null);
const weatherData = ref(null);

// Location (Kubu Raya coordinates)
const latitude = -0.1167;
const longitude = 109.3167;
const locationName = "Kubu Raya";

// OpenWeatherMap API key (free tier)
const API_KEY = "4d8fb5b93d4af21d66a2948710284366"; // Public demo key

// Computed properties
const currentDate = computed(() => {
  if (!weatherData.value) return "";
  const date = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${days[date.getDay()]}, ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
});

const temperature = computed(() => {
  if (!weatherData.value) return "--";
  return Math.round(weatherData.value.main.temp);
});

const weatherDescription = computed(() => {
  if (!weatherData.value) return "--";
  const desc = weatherData.value.weather[0].description;
  // Translate to Indonesian
  const translations = {
    "clear sky": "Cerah",
    "few clouds": "Sedikit Berawan",
    "scattered clouds": "Berawan",
    "broken clouds": "Cerah Berawan",
    "overcast clouds": "Mendung",
    "shower rain": "Hujan Ringan",
    rain: "Hujan",
    thunderstorm: "Petir",
    snow: "Salju",
    mist: "Kabut",
    "light rain": "Hujan Ringan",
    "moderate rain": "Hujan Sedang",
    "heavy intensity rain": "Hujan Lebat",
  };
  return translations[desc] || desc.charAt(0).toUpperCase() + desc.slice(1);
});

const humidity = computed(() => {
  if (!weatherData.value) return "--";
  return weatherData.value.main.humidity;
});

const windSpeed = computed(() => {
  if (!weatherData.value) return "--";
  return (weatherData.value.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
});

const windDirection = computed(() => {
  if (!weatherData.value) return "--";
  const deg = weatherData.value.wind.deg;
  const directions = [
    "Utara",
    "Timur Laut",
    "Timur",
    "Tenggara",
    "Selatan",
    "Barat Daya",
    "Barat",
    "Barat Laut",
  ];
  const index = Math.round((deg % 360) / 45) % 8;
  return directions[index];
});

const weatherIcon = computed(() => {
  if (!weatherData.value) return null;
  const icon = weatherData.value.weather[0].icon;
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
});

const weatherLink = computed(() => {
  return `https://openweathermap.org/city/${weatherData.value?.id || ""}`;
});

// Fetch weather data
const fetchWeatherData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=id`
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data cuaca");
    }

    const data = await response.json();
    weatherData.value = data;
    console.log("Weather data loaded:", data);
  } catch (err) {
    console.error("Error fetching weather:", err);
    error.value = "Tidak dapat memuat data cuaca";
  } finally {
    loading.value = false;
  }
};

// Fetch weather on mount
onMounted(() => {
  fetchWeatherData();
});
</script>

<style scoped>
.hero-card {
  @apply bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden;
  transition: all 0.3s ease;
}

.hero-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
}

.card-header {
  @apply flex items-center justify-between p-4 bg-white/5 border-b border-white/10;
}

.card-dots {
  @apply flex space-x-2;
}

.dot {
  @apply w-3 h-3 rounded-full;
}

.dot-red {
  @apply bg-red-400;
}

.dot-yellow {
  @apply bg-yellow-400;
}

.dot-green {
  @apply bg-green-400;
}

.card-title {
  @apply text-sm font-medium text-white/80;
}

.card-content {
  @apply p-6;
}

.weather-loading,
.weather-error {
  @apply flex flex-col items-center justify-center h-96 text-center;
}

.loading-spinner {
  @apply w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4;
}

.weather-content {
  @apply space-y-6;
}

.weather-date {
  @apply text-center mb-4;
}

.date-text {
  @apply text-sm text-white/70;
}

.weather-main {
  @apply flex items-start justify-between;
}

.temperature-section {
  @apply flex-1;
}

.temperature {
  @apply flex items-start mb-2;
  transition: transform 0.3s ease;
}

.temperature:hover {
  transform: scale(1.05);
}

.temp-value {
  @apply text-6xl font-bold text-white;
}

.temp-unit {
  @apply text-2xl font-normal text-white/80 mt-2 ml-1;
}

.weather-description {
  @apply text-xl text-white/90 mb-2;
  transition: all 0.3s ease;
}

.weather-description:hover {
  color: rgba(255, 255, 255, 1);
  transform: translateX(5px);
}

.location {
  @apply text-sm text-white/70 flex items-center;
}

.weather-icon {
  @apply flex items-center justify-center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.weather-icon-img {
  @apply w-32 h-32 drop-shadow-lg;
  transition: transform 0.3s ease;
}

.weather-icon-img:hover {
  transform: rotate(10deg) scale(1.1);
}

.weather-icon-placeholder {
  @apply text-6xl;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.weather-details {
  @apply grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10;
}

.detail-item {
  @apply flex flex-col items-center text-center bg-white/5 rounded-lg p-3 backdrop-blur-sm;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
}

.detail-icon {
  @apply text-white/70 mb-2;
}

.detail-content {
  @apply flex flex-col items-center;
}

.detail-label {
  @apply text-xs text-white/70 mb-1;
}

.detail-value {
  @apply text-sm font-semibold text-white;
}

.weather-link {
  @apply mt-6 flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium;
}

.weather-link svg {
  @apply transition-transform duration-300;
}

.weather-link:hover svg {
  @apply translate-x-1;
}
</style>
