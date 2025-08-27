/seminar
   - form
      - sebagai mahasiswa
         - individu
            - nama
            - no wa (unique)
            - email (unique)
            - asal instansi
            - domisili 
               * pilih "lainnya" jika tidak ada
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
         - sekelas
            - kelas
               - prodi
               - nama kelas
            - nominal bayar
               * sesuai dengan htm x total mahasiswa yang daftar
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
            - data mahasiswa (xlsx)
               * button "unduh format" untuk format excel
               * kolom data
                  - nama
                  - email (unique, valid email type)
                  - noWa (unique, text not number)
            - checkbox terms
               * wajib
      - sebagai umum
         - individu
            - nama
            - no wa (unique)
            - email (unique)
            - domisili 
               * pilih "lainnya" jika tidak ada
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
   - submit button
      * berhasil ? 
         * individu ?
            - beralih ke /pelatihan/detail-pendaftaran
         * sekelas ?
            - beralih ke /pelatihan/detail-pendaftaran/[nama kelas]
   - cek status pendaftaran
      - input kode registrasi (kode ini berdasarkan id tim di database)
         * berhasil ? beralih ke halaman detail pendaftaran.
            * individu ?
               - beralih ke /pelatihan/detail-pendaftaran
            * sekelas ?
               - beralih ke /pelatihan/detail-pendaftaran/[nama kelas]

/seminar/detail-pendaftaran
   * informasi pendaftaran individu
   * hanya dapat diakses disaat setelah cek status pendaftaran
   - sebagai mahasiswa
      - nama
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id peserta (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi peserta dengan format xlsx
      - nama lengkap
      - no wa
      - email
      - instansi
      - kelas (kalo daftar sekelas)
      - domisili
      - "ubah bukti pembayaran" refresh setelah mengupload gambar
   - sebagai umum
      - nama
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id peserta (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi peserta dengan format xlsx
      - nama lengkap
      - no wa
      - email
      - domisili
      - "ubah bukti pembayaran" refresh setelah mengupload gambar

/seminar/detail-pendaftaran/[nama kelas]
   * khusus pendaftaran secara kelas
   * hanya dapat diakses disaat setelah cek status pendaftaran
   - nama tim
   - status pendaftaran
      - default "menunggu konfirmasi"
      - sukses "terkonfirmasi" + muncul button menuju grub wa
   - "salin kode" untuk menyalin id tim (kode registrasi)
   - "unduh data pendaftaran" untuk download data informasi tim dan peserta dengan format xlsx
   - "ubah bukti pembayaran" refresh setelah mengupload gambar
   - instansi
   - no wa
   - anggota tim
      - nama
      - npm

-------------------------------------------------------

/pelatihan
   - form
      - sebagai mahasiswa
         - individu
            - nama
            - no wa (unique)
            - email (unique)
            - asal instansi
            - domisili 
               * pilih "lainnya" jika tidak ada
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
         - sekelas
            - kelas
               - prodi
               - nama kelas
            - nominal bayar
               * sesuai dengan htm x total mahasiswa yang daftar
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
            - data mahasiswa (xlsx)
               * button "unduh format" untuk format excel
               * kolom data
                  - nama
                  - email (unique, valid email type)
                  - noWa (unique, text not number)
            - checkbox terms
               * wajib
      - sebagai umum
         - individu
            - nama
            - no wa (unique)
            - email (unique)
            - domisili 
               * pilih "lainnya" jika tidak ada
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
   - submit button
      * berhasil ? 
         * individu ?
            - beralih ke /pelatihan/detail-pendaftaran
         * sekelas ?
            - beralih ke /pelatihan/detail-pendaftaran/[nama kelas]
   - cek status pendaftaran
      - input kode registrasi (kode ini berdasarkan id tim di database)
         * berhasil ? beralih ke halaman detail pendaftaran.
            * individu ?
               - beralih ke /pelatihan/detail-pendaftaran
            * sekelas ?
               - beralih ke /pelatihan/detail-pendaftaran/[nama kelas]

/pelatihan/detail-pendaftaran
   * informasi pendaftaran individu
   * hanya dapat diakses disaat setelah cek status pendaftaran
   - sebagai mahasiswa
      - nama
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id peserta (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi peserta dengan format xlsx
      - nama lengkap
      - no wa
      - email
      - instansi
      - kelas (kalo daftar sekelas)
      - domisili
      - "ubah bukti pembayaran" refresh setelah mengupload gambar
   - sebagai umum
      - nama
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id peserta (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi peserta dengan format xlsx
      - nama lengkap
      - no wa
      - email
      - domisili
      - "ubah bukti pembayaran" refresh setelah mengupload gambar

/pelatihan/detail-pendaftaran/[nama kelas]
   * khusus pendaftaran secara kelas
   * hanya dapat diakses disaat setelah cek status pendaftaran
   - nama tim
   - status pendaftaran
      - default "menunggu konfirmasi"
      - sukses "terkonfirmasi" + muncul button menuju grub wa
   - "salin kode" untuk menyalin id tim (kode registrasi)
   - "unduh data pendaftaran" untuk download data informasi tim dan peserta dengan format xlsx
   - "ubah bukti pembayaran" refresh setelah mengupload gambar
   - instansi
   - no wa
   - anggota tim
      - nama
      - npm

-------------------------------------------------------

/web-design
   - form
      - sebagai mahasiswa
         - tim
            - nama tim (unique)
            - no wa (perwakilan) (unique)
            - asal instansi
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
         - peserta (min 1, max 2)
            - npm (unique)
            - nama
         - checkbox terms
            * wajib
      - sebagai umum
         - tim
            - nama tim (unique)
            - no wa (perwakilan) (unique)
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
         - peserta (min 1, max 2)
            - nama
         - checkbox terms
            * wajib
   - submit button
      * berhasil ? beralih ke /web-design/detail-pendaftaran
   - cek status pendaftaran
      - input kode registrasi (kode ini berdasarkan id tim di database)
         * berhasil ? beralih ke halaman detail pendaftaran.

/web-design/detail-pendaftaran
   * hanya dapat diakses disaat setelah cek status pendaftaran
   - sebagai mahasiswa
      - nama tim
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id tim (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi tim dan peserta dengan format xlsx
      - instansi
      - no wa
      - "ubah bukti pembayaran" refresh setelah mengupload gambar
      - anggota tim
         - nama
         - npm
   - sebagai umum
      - nama tim
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id tim (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi tim dan peserta dengan format xlsx
      - instansi
      - no wa
      - "ubah bukti pembayaran" refresh setelah mengupload gambar
      - anggota tim
         - nama
   
-------------------------------------------------------

/video-campaign
   - form
      - sebagai mahasiswa
         - tim
            - nama tim (unique)
            - no wa (perwakilan) (unique)
            - asal instansi
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
         - peserta (min 1, max 2)
            - npm (unique)
            - nama
         - checkbox terms
            * wajib
      - sebagai umum
         - tim
            - nama tim (unique)
            - no wa (perwakilan) (unique)
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
         - peserta (min 1, max 2)
            - nama
         - checkbox terms
            * wajib
   - submit button
      * berhasil ? beralih ke /web-design/detail-pendaftaran
   - cek status pendaftaran
      - input kode registrasi (kode ini berdasarkan id tim di database)
         * berhasil ? beralih ke halaman detail pendaftaran.

/video-campaign/detail-pendaftaran
   * hanya dapat diakses disaat setelah cek status pendaftaran
   - sebagai mahasiswa
      - nama tim
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id tim (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi tim dan peserta dengan format xlsx
      - instansi
      - no wa
      - "ubah bukti pembayaran" refresh setelah mengupload gambar
      - anggota tim
         - nama
         - npm
   - sebagai umum
      - nama tim
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id tim (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi tim dan peserta dengan format xlsx
      - instansi
      - no wa
      - "ubah bukti pembayaran" refresh setelah mengupload gambar
      - anggota tim
         - nama

-------------------------------------------------------

/e-sport
   - form
      - sebagai mahasiswa
         - tim
            - nama tim (unique)
            - no wa (perwakilan) (unique)
            - asal instansi
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
         - peserta (min 5 (inti), max 7 (+ 2 cadangan))
            - id ml (unique)
            - npm (unique)
            - nama
         - checkbox terms
            * wajib
      - sebagai umum
         - tim
            - nama tim (unique)
            - no wa (perwakilan) (unique)
            - bukti pembayaran (jpeg, jpg, png, max 500kb)
         - peserta (min 5 (inti), max 7 (+ 2 cadangan))
            - id ml (unique)
            - nama
         - checkbox terms
            * wajib
   - submit button
      * berhasil ? beralih ke /web-design/detail-pendaftaran
   - cek status pendaftaran
      - input kode registrasi (kode ini berdasarkan id tim di database)
         * berhasil ? beralih ke halaman detail pendaftaran.

/e-sport/detail-pendaftaran
   * hanya dapat diakses disaat setelah cek status pendaftaran
   - sebagai mahasiswa
      - nama tim
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id tim (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi tim dan peserta dengan format xlsx
      - instansi
      - no wa
      - "ubah bukti pembayaran" 
         * refresh setelah mengupload gambar
      - anggota tim
         - id ml
         - nama
         - npm
   - sebagai umum
      - nama tim
      - status pendaftaran
         - default "menunggu konfirmasi"
         - sukses "terkonfirmasi" + muncul button menuju grub wa
      - "salin kode" untuk menyalin id tim (kode registrasi)
      - "unduh data pendaftaran" untuk download data informasi tim dan peserta dengan format xlsx
      - instansi
      - no wa
      - "ubah bukti pembayaran"
         * refresh setelah mengupload gambar
      - anggota tim
         - id ml
         - nama