import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});


export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  mode: boolean("mode").notNull().default(false),
});

export const auction = pgTable("auction", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  description: text("description"),

  coverImage: text("cover_image").notNull(),
  image1: text("image1"),
  image2: text("image2"),
  image3: text("image3"),
  image4: text("image4"),
  image5: text("image5"),
  image6: text("image6"),

  category: text("category").notNull(),
  brand: text("brand"),

  battery: boolean("battery"),
  bumper: boolean("bumper"),
  drawBar: boolean("draw_bar"),
  insurance: boolean("insurance"),
  itch: boolean("itch"),
  nocPapers: boolean("noc_papers"),
  readyForToken: boolean("ready_for_token"),
  top: boolean("top"),

  ipto: text("ipto"),

  clutch: text("clutch", { enum: ["dual", "single"] }).notNull(),
  condition: text("condition", {
    enum: ["push_start", "self_start", "towing"],
  }).notNull(),
  gearBox: text("gear_box", {
    enum: [
      "collarshift",
      "constant",
      "other",
      "semi_constant",
      "sliding",
      "synchro",
    ],
  }),
  steering: text("steering", { enum: ["mechanical", "power"] }).notNull(),
  drive: text("drive", { enum: ["2WD", "4WD"] }).notNull(),

  horsepower: text("horsepower").notNull(),
  mfgYear: text("mfg_year"),

  price: text("price"),

  hoursRun: text("hours_run").notNull(),
  registrationNumber: text("registration_number").notNull(),

  tyres: text("tyres"),
  tyrePercent: text("tyre_percent"),

  state: text("state"),

  verified: boolean("verified"),
  expYear: text("exp_year"),

  currentBid: text("current_bid"),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const schema = {
  user,
  session,
  account,
  verification,
  auction,
};
