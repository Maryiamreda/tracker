import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, json, serial, primaryKey, boolean, timestamp } from "drizzle-orm/pg-core";

// columns.helpers.ts
const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
}


export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
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
    total: integer().notNull(),
    details: json('details').$type<Array<{
        itemName: string,
        price: number,
        quantity: number,
        notes?: string
    }>>().default([]),
    ownerId: integer("owner_id").references(() => usersTable.id),
    ...timestamps

})



export const receiptRelations = relations(receiptTable, ({ one, many }) => ({
    owner: one(usersTable, {
        fields: [receiptTable.ownerId],
        references: [usersTable.id],
    }),
    receiptToTags: many(receiptToTagsTable),
}));


export const tagsTable = pgTable("tags", {
    id: serial("id").primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    icon: varchar("icon", { length: 50 }),
    isEssential: boolean("is_essential").default(false).notNull(), // Flag to mark essential tags
    ownerId: integer("owner_id").references(() => usersTable.id),
    ...timestamps

})

export const tagsRelations = relations(tagsTable, ({ many, one }) => ({
    receiptToGroups: many(receiptToTagsTable),
    owner: one(usersTable, {
        fields: [tagsTable.ownerId],
        references: [usersTable.id],
    })
}));


export const receiptToTagsTable = pgTable(
    "receipt_to_tags",
    {
        receiptId: integer("receipt_id")
            .notNull()
            .references(() => receiptTable.id),
        tagId: integer("tag_id")
            .notNull()
            .references(() => tagsTable.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.receiptId, t.tagId] })
    })
);

export const receiptToTagsRelations = relations(receiptToTagsTable, ({ one }) => ({
    receipt: one(receiptTable, {
        fields: [receiptToTagsTable.receiptId],
        references: [receiptTable.id],
    }),
    tag: one(tagsTable, {
        fields: [receiptToTagsTable.tagId],
        references: [tagsTable.id],
    }),
}));