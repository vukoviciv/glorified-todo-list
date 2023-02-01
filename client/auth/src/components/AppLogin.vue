<template>
  <div class="login-wrapper min-h-screen">
    <form class="pt-5">
      <Card class="m-auto md:col-6">
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
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: url(../assets/auth_background.jpg);
  background-size: cover;
}
</style>
