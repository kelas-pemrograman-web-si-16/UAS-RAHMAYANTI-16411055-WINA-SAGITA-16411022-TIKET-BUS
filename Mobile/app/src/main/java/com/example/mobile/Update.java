package com.example.mobile;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.RetryPolicy;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.example.mobile.server.AppController;
import com.example.mobile.server.Config_URL;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
public class Update extends AppCompatActivity {

    @BindView(R.id.kode_pesan)
    EditText kode_pesan;
    @BindView(R.id.asal)
    EditText asal;
    @BindView(R.id.tujuan)
    EditText tujuan;
    @BindView(R.id.tanggal_berangkat)
    EditText tanggal_berangkat;
    @BindView(R.id.kursi)
    EditText kursi;


    String kodee, asall, tjuan, tgl, krs;

    int socketTimeout = 300;
    RetryPolicy policy = new DefaultRetryPolicy(socketTimeout,
            DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
            DefaultRetryPolicy.DEFAULT_BACKOFF_MULT);

    private ProgressDialog pDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update);
        ButterKnife.bind(this);
        getSupportActionBar().hide();
        pDialog = new ProgressDialog(this);
        pDialog.setCancelable(false);

        Intent a = getIntent();
        kodee = a.getStringExtra("kode");
        asall = a.getStringExtra("asal");
        tjuan = a.getStringExtra("tujuan");
        tgl = a.getStringExtra("tanggal");
        krs = a.getStringExtra("kursi");
        kode_pesan.setText(kodee);
        asal.setText(asall);
        tujuan.setText(tjuan);
        tanggal_berangkat.setText(tgl);
        kursi.setText(krs);
    }

    @OnClick(R.id.submit)
    void submit() {
        final String kodee = kode_pesan.getText().toString();
        final String asall = asal.getText().toString();
        final String tjuan = tujuan.getText().toString();
        final String tgl = tanggal_berangkat.getText().toString();
        final String krs = kursi.getText().toString();

        if (kodee.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Kode barang tidak boleh kosong", Toast.LENGTH_LONG).show();
        } else if (asall.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Nama barang tidak boleh kosong", Toast.LENGTH_LONG).show();
        } else if (tjuan.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Jenis barang tidak boleh kosong", Toast.LENGTH_LONG).show();
        } else if (tgl.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Harga tidak boleh kosong", Toast.LENGTH_LONG).show();
        } else if (krs.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Harga tidak boleh kosong", Toast.LENGTH_LONG).show();
        } else {
            update(kodee, asall, tjuan, tgl, krs);
        }
    }

    @OnClick(R.id.hapus)
    void hapus() {
        final String kodee = kode_pesan.getText().toString();

        if (kodee.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Kode barang tidak boleh kosong", Toast.LENGTH_LONG).show();
        } else {
            final AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle(Html.fromHtml("<font color='#25c5da'><b>Yakin ingin Menghapus Data ini ?</b></font>"))
                    .setCancelable(false)
                    .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {

                            hapus(kodee);
                        }
                    }).setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    builder.setCancelable(true);
                }
            })
                    .show();
        }
    }

    public void update(final String kodee, final String asall, final String tjuan, final String tgl, final String krs) {

        String tag_string_req = "req_register";

        pDialog.setMessage("Loading.....");
        showDialog();

        StringRequest strReq = new StringRequest(Request.Method.POST,
                Config_URL.UpdateTiket, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d("Request", "Login Response: " + response.toString());
                hideDialog();

                try {
                    JSONObject jObj = new JSONObject(response);
                    boolean status = jObj.getBoolean("success");

                    if (status == true) {
                        String msg = jObj.getString("message");
                        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();
                        Intent a = new Intent(Update.this, ListTiket.class);
                        startActivity(a);
                        finish();
                    } else {
                        String msg = jObj.getString("message");
                        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();

                    }

                } catch (JSONException e) {
                    //JSON error
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("Rquest", "Login Error : " + error.getMessage());
                error.printStackTrace();
                hideDialog();
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("kode_pesan", kodee);
                params.put("asal", asall);
                params.put("tujuan", tjuan);
                params.put("tanggal_berangkat", tgl);
                params.put("kursi", krs);
                return params;
            }
        };

        strReq.setRetryPolicy(policy);
        AppController.getInstance().addToRequestQueue(strReq, tag_string_req);
    }

    public void hapus(final String kodee) {

        String tag_string_req = "req_register";

        pDialog.setMessage("Loading.....");
        showDialog();

        StringRequest strReq = new StringRequest(Request.Method.POST,
                Config_URL.HapusTiket, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d("Request", "Login Response: " + response.toString());
                hideDialog();

                try {
                    JSONObject jObj = new JSONObject(response);
                    boolean status = jObj.getBoolean("success");

                    if (status == true) {
                        String msg = jObj.getString("message");
                        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();
                        Intent a = new Intent(Update.this, ListTiket.class);
                        startActivity(a);
                        finish();
                    } else {
                        String msg = jObj.getString("message");
                        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();

                    }

                } catch (JSONException e) {
                    //JSON error
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("Rquest", "Login Error : " + error.getMessage());
                error.printStackTrace();
                hideDialog();
            }
        }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("kode_pesan", kodee);
                return params;
            }
        };

        strReq.setRetryPolicy(policy);
        AppController.getInstance().addToRequestQueue(strReq, tag_string_req);
    }

    private void showDialog() {
        if (!pDialog.isShowing())
            pDialog.show();
    }

    private void hideDialog() {
        if (pDialog.isShowing())
            pDialog.dismiss();
    }

    @OnClick(R.id.kembali)
    void btnKembali() {
        Intent a = new Intent(Update.this,
                ListTiket.class);
        startActivity(a);
        finish();
    }
}



