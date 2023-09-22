<script setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps({
  currentPage: {type: Number, required: true},
  pageNumber: {type: Number, required: true},
  total: {type: Number, required: true}
})

const emits = defineEmits(['pageChange'])

function changePage(page) {
  emits('pageChange', {page})
}
</script>

<template>
  <nav>
    <ul class="pagination">
      <li style="margin-top: 8px;" class="text-muted">
        <i>
          {{ this.$t('pagination.displayingRecords', {total: props.total}) }}.
        </i>
      </li>
      <li class="page-item" :class="{'disabled' : currentPage === 1}" style="margin-left: auto">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">{{$t('pagination.previous')}}</a>
      </li>
      <li v-for="page in props.pageNumber" :key="page" class="page-item"
          :class="{'active': page === props.currentPage}">
        <a href="javascript:void(0)" @click.prevent="changePage(page)" class="page-link">{{ page }}</a>
      </li>
      <li class="page-item" :class="{'disabled': currentPage === props.pageNumber }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">{{$t('pagination.next')}}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>