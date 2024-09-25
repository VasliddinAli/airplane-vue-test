<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-modal-provider>
          <n-dialog-provider>
            <AeroTable />
          </n-dialog-provider>
        </n-modal-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script>
import { defineComponent } from "vue";
import AeroTable from "./view/AeroTable.vue";

export default defineComponent({
  components: {
    AeroTable,
  },
});
</script>