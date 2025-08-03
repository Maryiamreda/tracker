import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, json, serial, primaryKey, boolean, timestamp, text, date, index } from "drizzle-orm/pg-core";

// columns.helpers.ts
const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
}


export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar('password'),
    birthday: date().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
    receipts: many(receiptTable),
    tags: many(tagsTable),

}));


export const receiptTable = pgTable("receipt", {
    id: serial("id").primaryKey(),
    headline: varchar({}).notNull(),
        total: integer().notNull(),

    ownerId: integer("owner_id").references(() => usersTable.id),
    ...timestamps

},(table) => [
    index("receipt_date_asc").on(table.created_at.asc()),
    index("receipt_total_asc").on(table.total.asc()),
        index("receipt_total_desc").on(table.total.desc()),



]
)


export const receiptRelations = relations(receiptTable, ({ one , many }) => ({
    owner: one(usersTable, {
        fields: [receiptTable.ownerId],
        references: [usersTable.id],
    }),
    items: many(receiptItemsTable )
}));

export const receiptItemsTable =pgTable("receipt_items", {
    id: serial("id").primaryKey(),
    cost: integer().notNull(),
    details: text().notNull(),
    receiptId: integer("receipt_id").references(() => receiptTable.id),
    ...timestamps

})
export const receiptItemsRelations=relations(receiptItemsTable,({many})=>({
    itemsToTags: many(itemsToTagsTable),

}))

export const tagsTable = pgTable("tags", {
    id: serial("id").primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    icon: varchar("icon", { length: 50 }),
    isEssential: boolean("is_essential").default(false).notNull(), // Flag to mark essential tags
    ownerId: integer("owner_id").references(() => usersTable.id),
    
    ...timestamps

})

export const tagsRelations = relations(tagsTable, ({ many, one }) => ({
    itemsToTags: many(itemsToTagsTable),
    owner: one(usersTable, {
        fields: [tagsTable.ownerId],
        references: [usersTable.id],
    })
}));

// junction/pivot table 
export const itemsToTagsTable = pgTable(
    "items_to_tags",
    {
        itemId: integer("item_id")
            .notNull()
            .references(() => receiptItemsTable.id),
        tagId: integer("tag_id")
            .notNull()
            .references(() => tagsTable.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.itemId, t.tagId] }),
        tagIdx: index("items_to_tags_tag_idx").on(t.tagId),

    })
);

export const itemsToTagsRelations  = relations(itemsToTagsTable, ({ one }) => ({
    item: one(receiptItemsTable, {
        fields: [itemsToTagsTable.itemId],
        references: [receiptItemsTable.id],
    }),
    tag: one(tagsTable, {
        fields: [itemsToTagsTable.tagId],
        references: [tagsTable.id],
    }),
}));

