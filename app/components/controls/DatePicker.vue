<script setup>
const { locale } = useI18n();

const date = ref(new Date());
const currentDate = ref(new Date());
const selectedDate = ref(null);

const month = computed( () => date.value.getMonth() );
const firstDay = computed( () => {
  const _date = new Date(date.value);
  _date.setDate(1);
  return _date.getDay();
});
// const daysInMonth = computed( () => {
//   const month = date.value.getMonth() + 1;
//   const year = date.value.getFullYear();
//   return new Date(year, month, 0).getDate()
// });
// const daysInPrevMonth = computed( () => {
//   const month = date.value.getMonth();
//   const year = date.value.getFullYear();
//   console.log( new Date(year, month, 0).getDate() )
//   return new Date(year, month, 0).getDate();
// });
const dates = computed( () => {
  const dates = [];
  for( let d, q = 42; q--; ) {
    d = new Date( date.value );
    d.setDate( q - firstDay.value + 1 );
    dates.unshift(d);
  }
  return dates;
});
const days = computed( () => {
  const d = new Date(2024, 0, 1);
  const _days = [];
  for ( let q = 7; q--; ) {
    _days.push( d.toLocaleDateString( locale, { weekday: 'short' }) );
    d.setDate( d.getDate() + 1 );
  }
  return _days
});

const qwe = computed( () => new Array(7).fill().map( (x, i) => {
  const d = new Date(2024, 0, 1);
  d.setDate( i + 1 );
  return d;
}));

const setMonth = (month) => {
  const _date = new Date(date.value);
  _date.setMonth(month);
  date.value = _date;
}
</script>

<template>
  Selected date: {{ selectedDate }}<br>
  <button @click="setMonth(month - 1)"> Prev </button>
  - {{ date.toLocaleDateString( locale, { month: 'long', year: 'numeric' } ) }} -
  <button @click="setMonth(month + 1)"> Next </button>
  <div class="datep">
    <div class="dates">
      <div v-for="(d, i) in qwe">
        {{ d.toLocaleDateString(locale, { weekday: "short" }) }}
      </div>
      <div v-for="(d, i) in new Array(7)">
        {{ dates?.[i].toLocaleDateString(locale, { weekday: "short" }) }}
      </div>
      <div v-for="(d, i) in dates"
           class="date"
           @click="selectedDate = new Date(d)">
        {{ d.toLocaleDateString('en', { month: "long", year: "numeric", weekday: "long", day: "numeric" }) }}
        - {{ d.getMonth() === date.getMonth() }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.datep {

}
.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: .1rem;
}
.date {
  aspect-ratio: 1/1;
  background-color: #ccc;
}
</style>