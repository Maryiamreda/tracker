import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, json, serial, primaryKey, boolean, timestamp, text } from "drizzle-orm/pg-core";

// columns.helpers.ts
const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
}


export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    birthday: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar('password'),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
    receipts: many(receiptTable),
    tags: many(tagsTable),

}));


export const receiptTable = pgTable("receipt", {
    id: serial("id").primaryKey(),
    headline: varchar({}).notNull(),
    total: integer(),
    ownerId: integer("owner_id").references(() => usersTable.id),
    ...timestamps

})


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
    details: text(),
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
        pk: primaryKey({ columns: [t.itemId, t.tagId] })
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