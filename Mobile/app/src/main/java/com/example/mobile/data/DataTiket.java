package com.example.mobile.data;

public class DataTiket {

    String kode_pesan, asal, tujuan, tanggal_berangkat, kursi;

    public String getkode_pesan() { return kode_pesan; }

    public void setkode_pesan(String kode_pesan) {
        this.kode_pesan = kode_pesan;
    }

    public String getasal() { return asal; }

    public void setasal(String asal) {
        this.asal = asal;
    }

    public String gettujuan() {
        return tujuan;
    }

    public void settujuan(String tujuan) {
        this.tujuan = tujuan;
    }

    public String gettanggal_berangkat() {
        return tanggal_berangkat;
    }

    public void settanggal_berangkat(String tanggal_berangkat) { this.tanggal_berangkat = tanggal_berangkat; }

    public String getkursi() { return kursi; }

    public void setkursi(String kursi) {
        this.kursi = kursi;
    }

}
