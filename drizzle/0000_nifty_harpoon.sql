CREATE TABLE "peserta_ml" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nama_tim" text NOT NULL,
	"id_ml" text NOT NULL,
	"npm" text,
	"nama" text,
	CONSTRAINT "peserta_ml_id_ml_unique" UNIQUE("id_ml")
);
--> statement-breakpoint
CREATE TABLE "tim_ml" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nama_tim" text NOT NULL,
	"no_wa" text,
	"instansi" text,
	"bukti_pembayaran" text,
	CONSTRAINT "tim_ml_nama_tim_unique" UNIQUE("nama_tim"),
	CONSTRAINT "tim_ml_bukti_pembayaran_unique" UNIQUE("bukti_pembayaran")
);
--> statement-breakpoint
ALTER TABLE "peserta_ml" ADD CONSTRAINT "peserta_ml_nama_tim_tim_ml_nama_tim_fk" FOREIGN KEY ("nama_tim") REFERENCES "public"."tim_ml"("nama_tim") ON DELETE cascade ON UPDATE no action;