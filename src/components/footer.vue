<script setup>
import project from "../config/project";
</script>

<template>
  <footer class="footer">
    <b-container fluid>
      <b-row>
        <b-col col sm="6">
          {{ new Date().getFullYear() }} © {{ project.title }}.
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>