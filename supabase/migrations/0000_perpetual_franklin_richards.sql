CREATE TYPE "public"."action_history" AS ENUM('konfirmasi');--> statement-breakpoint
CREATE TYPE "public"."as_enum" AS ENUM('mahasiswa', 'umum');--> statement-breakpoint
CREATE TYPE "public"."divisi" AS ENUM('superadmin', 'bph', 'acara');--> statement-breakpoint
CREATE TYPE "public"."kabupaten_kota_enum" AS ENUM('Kab. Aceh Barat', 'Kab. Aceh Barat Daya', 'Kab. Aceh Besar', 'Kab. Aceh Jaya', 'Kab. Aceh Selatan', 'Kab. Aceh Singkil', 'Kab. Aceh Tamiang', 'Kab. Aceh Tengah', 'Kab. Aceh Tenggara', 'Kab. Aceh Timur', 'Kab. Aceh Utara', 'Kab. Agam', 'Kab. Alor', 'Kab. Asahan', 'Kab. Asmat', 'Kab. Badung', 'Kab. Balangan', 'Kab. Banggai', 'Kab. Banggai Laut', 'Kab. Bangka', 'Kab. Bangka Barat', 'Kab. Bangka Selatan', 'Kab. Bangka Tengah', 'Kab. Bangkalan', 'Kab. Bangli', 'Kab. Banjar', 'Kab. Banjarnegara', 'Kab. Bantul', 'Kab. Banyuasin', 'Kab. Banyumas', 'Kab. Banyuwangi', 'Kab. Barito Kuala', 'Kab. Barito Selatan', 'Kab. Barito Timur', 'Kab. Barito Utara', 'Kab. Barru', 'Kab. Batang', 'Kab. Batanghari', 'Kab. Belitung', 'Kab. Belitung Timur', 'Kab. Belu', 'Kab. Bener Meriah', 'Kab. Bengkalis', 'Kab. Bengkayang', 'Kab. Bengkulu Selatan', 'Kab. Bengkulu Tengah', 'Kab. Bengkulu Utara', 'Kab. Berau', 'Kab. Biak Numfor', 'Kab. Bima', 'Kab. Bintan', 'Kab. Bireun', 'Kab. Blitar', 'Kab. Blora', 'Kab. Boalemo', 'Kab. Bogor', 'Kab. Bojonegoro', 'Kab. Bolaang Mongondow', 'Kab. Bolaang Mongondow Selatan', 'Kab. Bolaang Mongondow Timur', 'Kab. Bolaang Mongondow Utara', 'Kab. Bombana', 'Kab. Bone', 'Kab. Bone Bolango', 'Kab. Bondowoso', 'Kab. Boven Digoel', 'Kab. Boyolali', 'Kab. Brebes', 'Kab. Buol', 'Kab. Buru', 'Kab. Buru Selatan', 'Kab. Buton', 'Kab. Buton Selatan', 'Kab. Buton Tengah', 'Kab. Buton Utara', 'Kab. Ciamis', 'Kab. Cianjur', 'Kab. Cilacap', 'Kab. Cirebon', 'Kab. Dairi', 'Kab. Deiyai', 'Kab. Demak', 'Kab. Dharmasraya', 'Kab. Dogiyai', 'Kab. Dompu', 'Kab. Donggala', 'Kab. Empat Lawang', 'Kab. Ende', 'Kab. Enrekang', 'Kab. Fakfak', 'Kab. Flores Timur', 'Kab. Garut', 'Kab. Gayo Lues', 'Kab. Gianyar', 'Kab. Gorontalo', 'Kab. Gorontalo Utara', 'Kab. Gowa', 'Kab. Gresik', 'Kab. Grobogan', 'Kab. Gunung Kidul', 'Kab. Gunung Mas', 'Kab. Halmahera Barat', 'Kab. Halmahera Selatan', 'Kab. Halmahera Tengah', 'Kab. Halmahera Timur', 'Kab. Halmahera Utara', 'Kab. Humbang Hasundutan', 'Kab. Hulu Sungai Selatan', 'Kab. Hulu Sungai Tengah', 'Kab. Hulu Sungai Utara', 'Kab. Indragiri Hilir', 'Kab. Indragiri Hulu', 'Kab. Indramayu', 'Kab. Intan Jaya', 'Kab. Jember', 'Kab. Jembrana', 'Kab. Jeneponto', 'Kab. Jepara', 'Kab. Jombang', 'Kab. Kaimana', 'Kab. Kampar', 'Kab. Kapuas', 'Kab. Kapuas Hulu', 'Kab. Karimun', 'Kab. Karo', 'Kab. Karanganyar', 'Kab. Karangasem', 'Kab. Karawang', 'Kab. Katingan', 'Kab. Kaur', 'Kab. Kayong Utara', 'Kab. Kebumen', 'Kab. Kediri', 'Kab. Keerom', 'Kab. Kendal', 'Kab. Kepahiang', 'Kab. Kepulauan Anambas', 'Kab. Kepulauan Aru', 'Kab. Kepulauan Mentawai', 'Kab. Kepulauan Meranti', 'Kab. Kepulauan Sangihe', 'Kab. Kepulauan Seribu', 'Kab. Kepulauan Sula', 'Kab. Kepulauan Talaud', 'Kab. Kepulauan Yapen', 'Kab. Kerinci', 'Kab. Ketapang', 'Kab. Klaten', 'Kab. Klungkung', 'Kab. Kolaka', 'Kab. Kolaka Timur', 'Kab. Kolaka Utara', 'Kab. Konawe Kepulauan', 'Kab. Konawe Selatan', 'Kab. Konawe Utara', 'Kab. Kotabaru', 'Kab. Kotamobagu', 'Kab. Kotawaringin Barat', 'Kab. Kotawaringin Timur', 'Kab. Kubu Raya', 'Kab. Kudus', 'Kab. Kulon Progo', 'Kab. Kuningan', 'Kab. Kupang', 'Kab. Kutai Barat', 'Kab. Kutai Kartanegara', 'Kab. Kutai Timur', 'Kab. Labuhanbatu', 'Kab. Lahat', 'Kab. Lamandau', 'Kab. Lamongan', 'Kab. Lampung Barat', 'Kab. Lampung Selatan', 'Kab. Lampung Tengah', 'Kab. Lampung Timur', 'Kab. Lampung Utara', 'Kab. Langkat', 'Kab. Lanny Jaya', 'Kab. Lebak', 'Kab. Lebong', 'Kab. Lembata', 'Kab. Lima Puluh Kota', 'Kab. Lingga', 'Kab. Lombok Barat', 'Kab. Lombok Tengah', 'Kab. Lombok Timur', 'Kab. Lombok Utara', 'Kab. Lumajang', 'Kab. Luwu', 'Kab. Luwu Timur', 'Kab. Luwu Utara', 'Kab. Madiun', 'Kab. Magelang', 'Kab. Magetan', 'Kab. Mahakam Ulu', 'Kab. Majalengka', 'Kab. Makassar', 'Kab. Malaka', 'Kab. Malang', 'Kab. Maluku Barat Daya', 'Kab. Maluku Tengah', 'Kab. Maluku Tenggara', 'Kab. Maluku Tenggara Barat', 'Kab. Mamberamo Raya', 'Kab. Mamberamo Tengah', 'Kab. Mandailing Natal', 'Kab. Manggarai', 'Kab. Manggarai Barat', 'Kab. Manggarai Timur', 'Kab. Manokwari', 'Kab. Manokwari Selatan', 'Kab. Mappi', 'Kab. Maros', 'Kab. Maybrat', 'Kab. Melawi', 'Kab. Mempawah', 'Kab. Merangin', 'Kab. Merauke', 'Kab. Mesuji', 'Kab. Mimika', 'Kab. Minahasa', 'Kab. Minahasa Selatan', 'Kab. Minahasa Tenggara', 'Kab. Minahasa Utara', 'Kab. Mojokerto', 'Kab. Morowali', 'Kab. Morowali Utara', 'Kab. Muara Enim', 'Kab. Muaro Jambi', 'Kab. Mukomuko', 'Kab. Muna', 'Kab. Muna Barat', 'Kab. Murung Raya', 'Kab. Musi Banyuasin', 'Kab. Musi Rawas', 'Kab. Musi Rawas Utara', 'Kab. Nabire', 'Kab. Nagan Raya', 'Kab. Nagekeo', 'Kab. Nduga', 'Kab. Ngada', 'Kab. Nganjuk', 'Kab. Ngawi', 'Kab. Nias', 'Kab. Nias Selatan', 'Kab. Ogan Ilir', 'Kab. Ogan Komering Ilir', 'Kab. Ogan Komering Ulu', 'Kab. Ogan Komering Ulu Selatan', 'Kab. Ogan Komering Ulu Timur', 'Kab. Pacitan', 'Kab. Padang Pariaman', 'Kab. Pakpak Bharat', 'Kab. Pamekasan', 'Kab. Pandeglang', 'Kab. Paniai', 'Kab. Pangkajene dan Kepulauan', 'Kab. Pangandaran', 'Kab. Parigi Moutong', 'Kab. Pasaman', 'Kab. Pasaman Barat', 'Kab. Paser', 'Kab. Pasuruan', 'Kab. Pati', 'Kab. Pekalongan', 'Kab. Pelalawan', 'Kab. Pemalang', 'Kab. Penajam Paser Utara', 'Kab. Penukal Abab Lematang Ilir', 'Kab. Pesawaran', 'Kab. Pesisir Barat', 'Kab. Pesisir Selatan', 'Kab. Pidie', 'Kab. Pidie Jaya', 'Kab. Pinrang', 'Kab. Pohuwato', 'Kab. Ponorogo', 'Kab. Poso', 'Kab. Probolinggo', 'Kab. Pulang Pisau', 'Kab. Puncak', 'Kab. Puncak Jaya', 'Kab. Purbalingga', 'Kab. Purwakarta', 'Kab. Purworejo', 'Kab. Raja Ampat', 'Kab. Rembang', 'Kab. Rejang Lebong', 'Kab. Rokan Hilir', 'Kab. Rokan Hulu', 'Kab. Rote Ndao', 'Kab. Sabu Raijua', 'Kab. Samosir', 'Kab. Sampang', 'Kab. Sambas', 'Kab. Sanggau', 'Kab. Sarmi', 'Kab. Sarolangun', 'Kab. Sidoarjo', 'Kab. Sigi', 'Kab. Sijunjung', 'Kab. Simeulue', 'Kab. Simalungun', 'Kab. Sinjai', 'Kab. Sintang', 'Kab. Siau Tagulandang Biaro', 'Kab. Situbondo', 'Kab. Sleman', 'Kab. Solok', 'Kab. Solok Selatan', 'Kab. Soppeng', 'Kab. Sorong', 'Kab. Sorong Selatan', 'Kab. Sragen', 'Kab. Subang', 'Kab. Sukabumi', 'Kab. Sukamara', 'Kab. Sukoharjo', 'Kab. Sumbawa', 'Kab. Sumbawa Barat', 'Kab. Sumenep', 'Kab. Supiori', 'Kab. Tabalong', 'Kab. Tabanan', 'Kab. Takalar', 'Kab. Tambrauw', 'Kab. Tanah Bumbu', 'Kab. Tanah Datar', 'Kab. Tanah Laut', 'Kab. Tana Toraja', 'Kab. Tangerang', 'Kab. Tanjung Jabung Barat', 'Kab. Tanjung Jabung Timur', 'Kab. Tapin', 'Kab. Tasikmalaya', 'Kab. Tebo', 'Kab. Tegal', 'Kab. Teluk Bintuni', 'Kab. Teluk Wondama', 'Kab. Temanggung', 'Kab. Timor Tengah Selatan', 'Kab. Timor Tengah Utara', 'Kab. Toba Samosir', 'Kab. Tojo Una-Una', 'Kab. Tolikara', 'Kab. Trenggalek', 'Kab. Tuban', 'Kab. Tulang Bawang', 'Kab. Tulang Bawang Barat', 'Kab. Tulungagung', 'Kab. Wakatobi', 'Kab. Waropen', 'Kab. Way Kanan', 'Kab. Wajo', 'Kab. Wonogiri', 'Kab. Wonosobo', 'Kab. Yahukimo', 'Kab. Yalimo', 'Kota Ambon', 'Kota Banda Aceh', 'Kota Banjar', 'Kota Banjarbaru', 'Kota Banjarmasin', 'Kota Batam', 'Kota Baubau', 'Kota Bengkulu', 'Kota Bima', 'Kota Binjai', 'Kota Bitung', 'Kota Blitar', 'Kota Bogor', 'Kota Bontang', 'Kota Bukittinggi', 'Kota Cilegon', 'Kota Cimahi', 'Kota Cirebon', 'Kota Denpasar', 'Kota Depok', 'Kota Dumai', 'Kota Fakfak', 'Kota Gorontalo', 'Kota Gunung Sitoli', 'Kota Jakarta Barat', 'Kota Jakarta Pusat', 'Kota Jakarta Selatan', 'Kota Jakarta Timur', 'Kota Jakarta Utara', 'Kota Jambi', 'Kota Jayapura', 'Kota Kediri', 'Kota Kendari', 'Kota Kupang', 'Kota Langsa', 'Kota Lhokseumawe', 'Kota Lubuk Linggau', 'Kota Madiun', 'Kota Magelang', 'Kota Makassar', 'Kota Malang', 'Kota Manado', 'Kota Mataram', 'Kota Medan', 'Kota Metro', 'Kota Mojokerto', 'Kota Padang', 'Kota Padang Panjang', 'Kota Padang Sidempuan', 'Kota Pagar Alam', 'Kota Palangkaraya', 'Kota Palembang', 'Kota Palopo', 'Kota Palu', 'Kota Pangkal Pinang', 'Kota Parepare', 'Kota Pariaman', 'Kota Pasuruan', 'Kota Payakumbuh', 'Kota Pekalongan', 'Kota Pekanbaru', 'Kota Pematang Siantar', 'Kota Pontianak', 'Kota Prabumulih', 'Kota Probolinggo', 'Kota Sabang', 'Kota Salatiga', 'Kota Samarinda', 'Kota Sawah Lunto', 'Kota Semarang', 'Kota Serang', 'Kota Sibolga', 'Kota Singkawang', 'Kota Solok', 'Kota Subulussalam', 'Kota Sukabumi', 'Kota Surakarta', 'Kota Surabaya', 'Kota Sungai Penuh', 'Kota Tangerang', 'Kota Tangerang Selatan', 'Kota Tanjung Balai', 'Kota Tanjung Pinang', 'Kota Tarakan', 'Kota Tasikmalaya', 'Kota Tebing Tinggi', 'Kota Tegal', 'Kota Ternate', 'Kota Tidore Kepulauan', 'Kota Tomohon', 'Kota Tual', 'Kota Yogyakarta', 'Lainnya');--> statement-breakpoint
CREATE TYPE "public"."metode_daftar" AS ENUM('individu', 'kelas');--> statement-breakpoint
CREATE TYPE "public"."prodi_enum" AS ENUM('D3 - TEKKOM', 'D4 - TIMD');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role" text,
	"divisi" "divisi",
	"banned" boolean,
	"ban_reason" text,
	"ban_expires" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "peserta_esport" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nama_tim" text NOT NULL,
	"id_ml" text NOT NULL,
	"npm" text,
	"nama" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "peserta_esport_id_ml_unique" UNIQUE("id_ml")
);
--> statement-breakpoint
CREATE TABLE "tim_esport" (
	"as" "as_enum" NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"nama_tim" text NOT NULL,
	"no_wa" text NOT NULL,
	"instansi" text,
	"bukti_pembayaran" text NOT NULL,
	"status_pembayaran" boolean DEFAULT false NOT NULL,
	"tanggal_konfirmasi" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tim_esport_nama_tim_unique" UNIQUE("nama_tim"),
	CONSTRAINT "tim_esport_bukti_pembayaran_unique" UNIQUE("bukti_pembayaran")
);
--> statement-breakpoint
CREATE TABLE "history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"action" "action_history",
	"table_name" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kelas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama" text NOT NULL,
	"prodi" text NOT NULL,
	CONSTRAINT "kelas_nama_unique" UNIQUE("nama")
);
--> statement-breakpoint
CREATE TABLE "prodi" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama" text NOT NULL,
	CONSTRAINT "prodi_nama_unique" UNIQUE("nama")
);
--> statement-breakpoint
CREATE TABLE "pendaftaran_pelatihan_kelas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kelas" text NOT NULL,
	"nominal" integer NOT NULL,
	"bukti_pembayaran" text NOT NULL,
	"status_pembayaran" boolean DEFAULT false NOT NULL,
	"tanggal_konfirmasi" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pendaftaran_pelatihan_kelas_kelas_unique" UNIQUE("kelas"),
	CONSTRAINT "pendaftaran_pelatihan_kelas_bukti_pembayaran_unique" UNIQUE("bukti_pembayaran")
);
--> statement-breakpoint
CREATE TABLE "peserta_pelatihan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"as" "as_enum" NOT NULL,
	"metode_daftar" "metode_daftar" NOT NULL,
	"kelas" text,
	"nama" text NOT NULL,
	"npm" text,
	"no_wa" text NOT NULL,
	"email" text NOT NULL,
	"instansi" text,
	"domisili" "kabupaten_kota_enum" NOT NULL,
	"bukti_pembayaran" text NOT NULL,
	"status_pembayaran" boolean DEFAULT false NOT NULL,
	"tanggal_konfirmasi" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "peserta_pelatihan_no_wa_unique" UNIQUE("no_wa"),
	CONSTRAINT "peserta_pelatihan_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "pendaftaran_seminar_kelas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kelas" text NOT NULL,
	"nominal" integer NOT NULL,
	"bukti_pembayaran" text NOT NULL,
	"status_pembayaran" boolean DEFAULT false NOT NULL,
	"tanggal_konfirmasi" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pendaftaran_seminar_kelas_kelas_unique" UNIQUE("kelas"),
	CONSTRAINT "pendaftaran_seminar_kelas_bukti_pembayaran_unique" UNIQUE("bukti_pembayaran")
);
--> statement-breakpoint
CREATE TABLE "peserta_seminar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"as" "as_enum" NOT NULL,
	"metode_daftar" "metode_daftar" NOT NULL,
	"kelas" text,
	"nama" text NOT NULL,
	"npm" text,
	"no_wa" text NOT NULL,
	"email" text NOT NULL,
	"instansi" text,
	"domisili" "kabupaten_kota_enum" NOT NULL,
	"bukti_pembayaran" text NOT NULL,
	"status_pembayaran" boolean DEFAULT false NOT NULL,
	"tanggal_konfirmasi" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "peserta_seminar_no_wa_unique" UNIQUE("no_wa"),
	CONSTRAINT "peserta_seminar_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "peserta_video_campaign" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nama_tim" text NOT NULL,
	"npm" text,
	"nama" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tim_video_campaign" (
	"as" "as_enum" NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"nama_tim" text NOT NULL,
	"no_wa" text NOT NULL,
	"instansi" text,
	"bukti_pembayaran" text NOT NULL,
	"status_pembayaran" boolean DEFAULT false NOT NULL,
	"tanggal_konfirmasi" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tim_video_campaign_nama_tim_unique" UNIQUE("nama_tim"),
	CONSTRAINT "tim_video_campaign_bukti_pembayaran_unique" UNIQUE("bukti_pembayaran")
);
--> statement-breakpoint
CREATE TABLE "peserta_web_design" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nama_tim" text NOT NULL,
	"npm" text,
	"nama" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tim_web_design" (
	"as" "as_enum" NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"nama_tim" text NOT NULL,
	"no_wa" text NOT NULL,
	"instansi" text,
	"bukti_pembayaran" text NOT NULL,
	"status_pembayaran" boolean DEFAULT false NOT NULL,
	"tanggal_konfirmasi" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tim_web_design_nama_tim_unique" UNIQUE("nama_tim"),
	CONSTRAINT "tim_web_design_bukti_pembayaran_unique" UNIQUE("bukti_pembayaran")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "peserta_esport" ADD CONSTRAINT "peserta_esport_nama_tim_tim_esport_nama_tim_fk" FOREIGN KEY ("nama_tim") REFERENCES "public"."tim_esport"("nama_tim") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelas" ADD CONSTRAINT "kelas_prodi_prodi_nama_fk" FOREIGN KEY ("prodi") REFERENCES "public"."prodi"("nama") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pendaftaran_pelatihan_kelas" ADD CONSTRAINT "pendaftaran_pelatihan_kelas_kelas_kelas_nama_fk" FOREIGN KEY ("kelas") REFERENCES "public"."kelas"("nama") ON DELETE set null ON UPDATE set default;--> statement-breakpoint
ALTER TABLE "peserta_pelatihan" ADD CONSTRAINT "peserta_pelatihan_kelas_pendaftaran_pelatihan_kelas_kelas_fk" FOREIGN KEY ("kelas") REFERENCES "public"."pendaftaran_pelatihan_kelas"("kelas") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pendaftaran_seminar_kelas" ADD CONSTRAINT "pendaftaran_seminar_kelas_kelas_kelas_nama_fk" FOREIGN KEY ("kelas") REFERENCES "public"."kelas"("nama") ON DELETE set null ON UPDATE set default;--> statement-breakpoint
ALTER TABLE "peserta_seminar" ADD CONSTRAINT "peserta_seminar_kelas_pendaftaran_seminar_kelas_kelas_fk" FOREIGN KEY ("kelas") REFERENCES "public"."pendaftaran_seminar_kelas"("kelas") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "peserta_video_campaign" ADD CONSTRAINT "peserta_video_campaign_nama_tim_tim_video_campaign_nama_tim_fk" FOREIGN KEY ("nama_tim") REFERENCES "public"."tim_video_campaign"("nama_tim") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "peserta_web_design" ADD CONSTRAINT "peserta_web_design_nama_tim_tim_web_design_nama_tim_fk" FOREIGN KEY ("nama_tim") REFERENCES "public"."tim_web_design"("nama_tim") ON DELETE cascade ON UPDATE no action;