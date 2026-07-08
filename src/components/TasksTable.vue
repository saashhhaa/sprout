<script setup lang="ts">
import {
  useVueTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/vue-table";
import { useCategoriesStore, useTasksSStore } from "../stores/store.js";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs"; // Перенесли наверх, чтобы функции ниже не падали

import doneIcon from "../assets/homepage/plant.svg";
import activeIcon from "../assets/homepage/circle.svg";

interface TaskItem {
  id: number;
  userId: number;
  title: string;
  createDate: string;
  doneDate: string;
  deadlineDate: string;
  deadlineDateNoFormat: string;
  category: string;
  catCol: string;
  isDone: boolean;
}

const props = defineProps<{
  tasksList: any[];
}>();

// function getLeftDays(createDate: string, deadlineNoFormat: string) {
//   if (!deadlineNoFormat || !createDate) return null;

//   const start = dayjs(createDate);
//   const end = dayjs(deadlineNoFormat);

//   if (!start.isValid() || !end.isValid()) return null;

//   return end.diff(start, "day");
// }

const tasksStore = useTasksSStore();
const { locale, t } = useI18n();
const categoriesStore = useCategoriesStore();

function formatTaskDate(rawDate: string) {
  if (!rawDate) return "";
  const dateObj = dayjs(rawDate);
  if (!dateObj.isValid()) return "";
  return dateObj.locale(locale.value).format("D MMMM");
}

function handleDeleteTask(id: number, categoryName: string) {
  tasksStore.deleteTask(id);
  const catAmount = categoriesStore.categories.find(
    (cat) => cat.title === categoryName,
  );
  if (catAmount) {
    catAmount.count -= 1;
  }
}

const columnHelper = createColumnHelper<TaskItem>();
const columns = [
  columnHelper.accessor("isDone", { header: "taskManager.col1" }),
  columnHelper.accessor("title", { header: "taskManager.col2" }),
  columnHelper.accessor("category", { header: "taskManager.col3" }),
  columnHelper.accessor("deadlineDate", { header: "taskManager.deadlineDate" }),
  columnHelper.accessor("createDate", { header: "taskManager.createDate" }),
  columnHelper.accessor("doneDate", { header: "taskManager.doneDate" }),
  columnHelper.display({ id: "delete", header: "taskManager.col5" }),
];

const table = useVueTable({
  get data() {
    return props.tasksList;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});

// function getAbsDeadlinedDays(
//   createDate: string,
//   deadlineNoFormat: string,
// ): number {
//   const days = getLeftDays(createDate, deadlineNoFormat);
//   if (days === null) return 0;
//   return Math.abs(days);
// }
</script>

<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :class="`col-${header.column.id}`"
          >
            <template
              v-if="
                header.column.id === 'isDone' || header.column.id === 'delete'
              "
            ></template>

            <template v-else>
              {{ t(header.column.columnDef.header as string) }}
            </template>
          </th>
        </tr>
      </thead>

      <tbody v-if="table.getRowModel().rows.length > 0" class="table-scroller">
        <tr @click="
                  tasksStore.switchTaskState(
                    row.original.id,
                    row.original.createDate,
                  )
                "
          v-for="row in table.getRowModel().rows" 
          :key="row.id" 
          :class="{ 'row-done': row.original.isDone }"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :class="`col-${cell.column.id}`"
          >
            <template v-if="cell.column.id === 'isDone'">
              <img
                
                class="status-icon"
                :src="cell.getValue() ? doneIcon : activeIcon"
                alt="status"
              />
            </template>

            <template v-else-if="cell.column.id === 'title'">
              <span :class="{ 'line-through': row.original.isDone }">
                {{ cell.getValue() }}
              </span>

              <!-- <template
                v-if="
                  getLeftDays(
                    row.original.createDate,
                    row.original.deadlineDate,
                  ) !== null && !row.original.isDone
                "
              >
                <span
                  class="leftDays"
                  v-if="
                    getLeftDays(
                      row.original.createDate,
                      row.original.deadlineDate,
                    )! > 0
                  "
                >
                  {{ $t("taskManager.daysLeft") }}
                  {{
                    getLeftDays(
                      row.original.createDate,
                      row.original.deadlineDate,
                    )
                  }}
                </span>

                <span class="dead-text" v-else>
                  {{ $t("taskManager.deadlinedDays") }}
                  {{
                    getAbsDeadlinedDays(
                      row.original.createDate,
                      row.original.deadlineDate,
                    )
                  }}
                  {{ $t("taskManager.days") }}
                </span>
              </template> -->
            </template>

            <template v-else-if="cell.column.id === 'category'">
              <span class="table-cat" :style="{ color: row.original.catCol }">
                <span
                  class="cat-dot"
                  :style="{ backgroundColor: row.original.catCol }"
                ></span>
                {{ cell.getValue() }}
              </span>
            </template>

            <template v-else-if="cell.column.id === 'deadlineDate'">
              <span class="deadline">
                {{
                  cell.getValue()
                    ? formatTaskDate(cell.getValue() as string)
                    : "—"
                }}
              </span>
            </template>
            <template v-else-if="cell.column.id === 'createDate'">
                 <span class="details">
                    {{
                cell.getValue()
                  ? formatTaskDate(cell.getValue() as string)
                  : "—"
              }}
                 </span>
              
            </template>
            <template v-else-if="cell.column.id === 'doneDate'" >
                <span class="details"> {{
                cell.getValue()
                  ? formatTaskDate(cell.getValue() as string)
                  : "—"
              }} </span>
             
            </template>

            <template v-else-if="cell.column.id === 'delete'">
              <img
                @click="
                  handleDeleteTask(row.original.id, row.original.category)
                "
                class="deleteTask"
                src="../assets/homepage/delete.svg"
                alt="delete"
              />
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  margin-top: 20px;
    max-height: 30vh; 

  overflow-x: auto;
}

.custom-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--blocks); 
  border-radius: 16px; 
  overflow: hidden;
  color: var(--text-main);
  border: 1.5px solid var(--bg-secondary2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.custom-table thead {
  display: block;
  width: 100%;
  background-color: var(--bg-secondary); 
  border-bottom: 1.5px solid var(--bg-secondary2);
}

.table-scroller {
  display: block;
  max-height: 450px;
  overflow-y: auto;
  width: 100%;
}

.custom-table tr {
  display: grid;
  grid-template-columns: 70px 2.5fr 1.2fr 1.2fr 1.2fr 1.2fr 70px;
  align-items: center;
  width: 100%;
  background-color: var(--contrast);
  box-sizing: border-box;
  transition: background-color 0.2s ease;
}

.custom-table tr:not(:last-child) {
  border-bottom: 1.5px solid var(--bg-secondary2);
}

.custom-table th,
.custom-table td {
  padding: 16px 12px;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
}

.custom-table th {
  height: 56px;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase; 
}

.col-isDone,
.col-delete {
  justify-content: center;
}

img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: block;
  transition: transform 0.1s ease, opacity 0.2s ease;
    opacity: .2;

}

.deleteTask {
  opacity: 0;
}

tr:hover .deleteTask {
    opacity: .4;
}

.deleteTask:hover {
  opacity: 1;
  transform: scale(1.05);
}

span {
  color: var(--text-main);
  font-size: 15px;
}

.table-cat {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.cat-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.row-done {
  background-color: rgba(46, 91, 62, 0.08) !important; 
  opacity: .5;
  text-decoration: line-through;
}

.row-done .status-icon {
  opacity: 1;
}

[data-theme="dark"] .row-done {
  background-color: rgba(126, 209, 150, 0.1) !important;
}

.deadline, td {
  color: rgba(255, 0, 0, 0.407);
}

.details {
    opacity: .5;
}

</style>