<template>
  <form>
    <Card class="m-auto mt-5 md:col-6">
      <template #title>
        <h2 class="text-center">Login</h2>
      </template>
      <template #content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" type="submit" />
        <Button
          icon="pi pi-times"
          label="Cancel"
          class="p-button-secondary"
          style="margin-left: 0.5em" />
      </template>
    </Card>
  </form>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
</script>
