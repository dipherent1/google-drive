import {
  bigint,
  index,
  text,
  float,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `google-drive_${name}`,
);

export const files = createTable(
  "file_table",
  {
    id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    size: float("size").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (t) => {
    return [index("parent_index").on(t.parent!)];
  },
);

export const folder = createTable(
  "folder_table", 
  {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  modified: text("modified").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
});
