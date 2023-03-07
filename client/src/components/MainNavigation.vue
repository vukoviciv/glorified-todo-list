<template>
  <nav aria-labelledby="main-menu">
    <h2 id="main-menu" class="p-sr-only">Main navigation</h2>
    <ul>
      <li>
        <TdRouterLink :to="{ name: 'today'}" label="Today" />
      </li>
      <li>
        <TdRouterLink :to="{ name: 'week'}" label="Week" />
      </li>
    </ul>
  </nav>
</template>
<script setup>
import TdRouterLink from './common/TdRouterLink.vue';
</script>
