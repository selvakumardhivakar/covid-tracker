<template>
  <div class="wrapper">
    <h3>Covid-19 🦠</h3>
    <div v-if="totalCases !== ''" class="container">
      <h4>Total No of cases: {{ totalCases }}</h4>
      <h4 class="danger">Total No of death: {{ death }}</h4>
      <h4>Total No of recovered: {{ recovered }}</h4>
      <h4>Total Active Cases: {{ totalCases - recovered }}</h4>
    </div>
    <p v-else>Loading...</p>
    <div class="container country-data">
      <h4>Search for country data</h4>
      <form @submit.prevent="fetchCountryData" class="container country-form">
        <input v-model="countryName" type="text" />
        <button class="btn-danger" type="submit">Submit</button>
      </form>
      <div v-if="countryData !== ''" class="container">
        <div v-if="countryData !== 'Country not found'">
          <h4>Country Name: {{ countryData.country }}</h4>
          <h4>Today Cases: {{ countryData.todayCases }}</h4>
          <h4 class="danger">Today Deaths: {{ countryData.todayDeaths }}</h4>
          <hr />
          <h4>Total Cases: {{ countryData.cases }}</h4>
          <h4 class="danger">Total Deaths: {{ countryData.deaths }}</h4>
          <h4>Active Cases: {{ countryData.active }}</h4>
          <h4>Recovered Cases: {{ countryData.recovered }}</h4>
          <h4>Critical Cases: {{ countryData.critical }}</h4>
        </div>
        <p v-else>Country Not found</p>
      </div>
    </div>
  </div>
</template>

<script>
import service from './services'
export default {
  data() {
    return {
      countryData: '',
      countryName: '',
      totalCases: '',
      death: '',
      recovered: '',
    }
  },
  created() {
    service.getData().then((res) => {
      this.totalCases = res.data.cases
      this.death = res.data.deaths
      this.recovered = res.data.recovered
    })
  },
  methods: {
    fetchCountryData() {
      if (this.countryName.trim() !== '') {
        console.log(this.countryName)
        service
          .getCountryData(this.countryName)
          .then((res) => res.data)
          .then((data) => {
            this.countryData = data
            console.log(this.countryData)
          })
      }
    },
  },
}
</script>

<style>
:root {
  --text-color: rgba(53, 226, 53, 0.89);
  --btn-danger-color: rgba(236, 107, 56, 0.904);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  line-height: 1.5;
}
.container {
  margin: 2rem auto;
  text-align: center;
}
.country-data {
  margin: 1rem auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: baseline;
}
.country-form input {
  padding: 0.5rem;
  margin: 1rem;
  font-size: 1.2rem;
  outline: none;
}
.country-form button {
  padding: 0.5rem 1.5rem;
  margin: 0.5rem;
  border: none;
  font-size: 1.2rem;
  border-radius: 1rem;
  outline: none;
}
.country-form {
  border-top: 1px solid var(--text-color);
  border-bottom: 1px solid var(--text-color);
}
.wrapper {
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 1.5rem;
  height: 100%;
  min-height: 100vh;
  color: var(--text-color);
}
.wrapper h3 {
  text-decoration: underline;
}
.btn-danger {
  background-color: var(--btn-danger-color);
  cursor: pointer;
}
.danger {
  color: var(--btn-danger-color);
}
</style>
