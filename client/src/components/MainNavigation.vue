<template>
  <nav aria-labelledby="main-menu">
    <h2 id="main-menu" class="p-sr-only">Main navigation</h2>
    <ul class="unordered-list">
      <li class="list-item text-center">
        <TdRouterLink :to="{ name: 'today'}" label="Today" class="list-item-link" />
      </li>
      <li class="list-item text-center">
        <TdRouterLink :to="{ name: 'week'}" label="Week" class="list-item-link" />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import TdRouterLink from './common/TdRouterLink.vue';
</script>

<style lang="scss">
$menu-color: var(--primary-700);

.unordered-list {
  background-color: $menu-color;
  font-family: var(--font-family);
  border: 2px solid $menu-color;
  font-size: large;
  text-transform: uppercase;
  font-weight: bold;

  .list-item {
    background-color: $menu-color;
    border: 1px solid $menu-color;

    a.list-item-link {
      box-sizing: border-box;
      padding: 0.7rem 1.5rem;
      display: block;
      color: white;
      text-decoration: none;

      &.active {
        background-color: white;
        color: $menu-color;
        border-left: 5px solid $menu-color;
      }
    }

    &:hover a {
      background-color: white;
      border-left: 5px solid $menu-color;
      color: $menu-color;
    }
  }
}
</style>
