CREATE TABLE "approvals" (
	"id" serial PRIMARY KEY NOT NULL,
	"expense_id" integer,
	"trip_id" integer,
	"frequency" varchar(50) DEFAULT 'Once' NOT NULL,
	"status" varchar(50) DEFAULT 'Pending' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(255) NOT NULL,
	"merchant" varchar(255) NOT NULL,
	"expense_date" date NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'EUR' NOT NULL,
	"reimbursable" boolean DEFAULT false NOT NULL,
	"category" varchar(100) NOT NULL,
	"description" text,
	"employee" varchar(255) NOT NULL,
	"report_name" varchar(255),
	"status" varchar(50) DEFAULT 'Not Submitted' NOT NULL,
	"invoice_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"purpose" varchar(255),
	"flight_type" varchar(100),
	"depart_form" varchar(255),
	"destination" varchar(255),
	"start_date" date,
	"end_date" date,
	"amount" numeric(12, 2),
	"check_in" date,
	"check_out" date,
	"hotel" varchar(255),
	"currency" varchar(10),
	"report_name" varchar(255),
	"status" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_expense_id_expenses_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."expenses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;