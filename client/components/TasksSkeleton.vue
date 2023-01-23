<template>
  <div class="field col-12">
    <div class="custom-skeleton p-4">
      <ul class="m-0 p-0">
        <li v-for="n in 10" :key="n" class="mb-3">
          <div class="flex">
            <Skeleton shape="circle" size="4rem" class="mr-2" />
            <div style="flex: 1">
              <Skeleton width="100%" class="mb-2" />
              <Skeleton width="75%" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Skeleton from 'primevue/skeleton';
</script>
