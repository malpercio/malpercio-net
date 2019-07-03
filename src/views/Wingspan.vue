<template>
  <div>
    <NewRecordModal v-model="newRecordModal"></NewRecordModal>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <RecordsTable></RecordsTable>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { RecordsTable, NewRecordModal } from "@/components/wingspan";

export default {
  name: "Wingspan",
  components: { RecordsTable, NewRecordModal },
  data() {
    return {
      newRecordModal: false
    };
  }
};
</script>
