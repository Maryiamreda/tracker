import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, pgSchema, json, serial, primaryKey } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar('password'),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
    receipts: many(receiptTable),
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

})



export const receiptRelations = relations(receiptTable, ({ one, many }) => ({
    owner: one(usersTable, {
        fields: [receiptTable.ownerId],
        references: [usersTable.id],
    }),
    receiptToTabs: many(receiptToTabsTable),
}));

// export const postsRelations = relations(receiptTable, ({ one }) => ({
//     owner: one(usersTable, {
//         fields: [receiptTable.ownerId],
//         references: [usersTable.id],
//     }),
// }));

// export const receiptsRelations = relations(receiptTable, ({ many }) => ({
//     receiptToGroups: many(receiptToGroups),
// }));





export const tabsTable = pgTable("tabs", {
    id: serial("id").primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    icon: varchar("icon", { length: 50 }),
})

export const tabsRelations = relations(tabsTable, ({ many }) => ({
    receiptToGroups: many(receiptToTabsTable),
}));


export const receiptToTabsTable = pgTable(
    "receipt_to_tabs",
    {
        receiptId: integer("receipt_id")
            .notNull()
            .references(() => receiptTable.id),
        tabId: integer("tab_id")
            .notNull()
            .references(() => tabsTable.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.receiptId, t.tabId] })
    })
);

export const receiptToTabsRelations = relations(receiptToTabsTable, ({ one }) => ({
    receipt: one(receiptTable, {
        fields: [receiptToTabsTable.receiptId],
        references: [receiptTable.id],
    }),
    tab: one(tabsTable, {
        fields: [receiptToTabsTable.tabId],
        references: [tabsTable.id],
    }),
}));