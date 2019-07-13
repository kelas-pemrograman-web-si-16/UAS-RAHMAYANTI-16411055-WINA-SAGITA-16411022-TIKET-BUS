package com.example.mobile;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
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
//import com.example.tiketbus.server.AppController;
//import com.example.tiketbus.server.Config_URL;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class InputTiket extends AppCompatActivity {

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


    int socketTimeout = 300;
    RetryPolicy policy = new DefaultRetryPolicy(socketTimeout,
            DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
            DefaultRetryPolicy.DEFAULT_BACKOFF_MULT);

    private ProgressDialog pDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_input_tiket);
//        getSupportActionBar().hide();

        ButterKnife.bind(this);
        pDialog = new ProgressDialog(this);
        pDialog.setCancelable(false);
    }

    @OnClick(R.id.pesan)
    void pesan(){
        final String Asal = asal.getText().toString();
        final String Tujuan= tujuan.getText().toString();
        final String TglBerangkat = tanggal_berangkat.getText().toString();
        final String Kursi = kursi.getText().toString();
        final String Kodeps = kode_pesan.getText().toString();

        if (Kodeps.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Kode Pemesanan tidak boleh kosong", Toast.LENGTH_LONG).show();
        }else if (Asal.isEmpty()){
            Toast.makeText(getApplicationContext(), "Terminal asal tidak boleh kosong", Toast.LENGTH_LONG).show();
        }else if(Tujuan.isEmpty()){
            Toast.makeText(getApplicationContext(), "Terminal tujuan tidak boleh kosong", Toast.LENGTH_LONG).show();
        }else if(TglBerangkat.isEmpty()){
            Toast.makeText(getApplicationContext(), "Tanggal Berangkat tidak boleh kosong", Toast.LENGTH_LONG).show();
        }else if (Kursi.isEmpty()){
            Toast.makeText(getApplicationContext(), "Jumlah Kursi tidak boleh kosong", Toast.LENGTH_LONG).show();
        }else {
            inputTiket(Kodeps, Asal, Tujuan, TglBerangkat, Kursi);
        }
    }

    public void inputTiket(final String kode_pesan, final String asal, final String tujuan, final String tanggal_berangkat, final String kursi){

        String tag_string_req = "req_register";

        pDialog.setMessage("Loading.....");
        showDialog();

        StringRequest strReq = new StringRequest(Request.Method.POST,
                Config_URL.inputTiket, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d("Request", "Login Response: " + response.toString());
                hideDialog();

                try {



                    JSONObject jObj = new JSONObject(response);
                    boolean status = jObj.getBoolean("success");

                    if(status == true){
                        String msg = jObj.getString("message");
                        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();
                        Intent a = new Intent(InputTiket.this, ListTiket.class);
                        startActivity(a);
                        finish();
                    }else {
                        String msg = jObj.getString("message");
                        Toast.makeText(getApplicationContext(), msg, Toast.LENGTH_LONG).show();

                    }

                }catch (JSONException e){
                    //JSON error
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener(){

            @Override
            public void onErrorResponse(VolleyError error){
                Log.e("Rquest", "Login Error : " + error.getMessage());
                error.printStackTrace();
                hideDialog();
            }
        }){

            @Override
            protected Map<String, String> getParams(){
                Map<String, String> params = new HashMap<String, String>();
                params.put("kode_pesan", kode_pesan);
                params.put("asal", asal);
                params.put("tujuan", tujuan);
                params.put("tanggal_berangkat", tanggal_berangkat);
                params.put("kursi", kursi);
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

    @Override
    public void onBackPressed() {
        Intent a = new Intent(InputTiket.this, ListTiket.class);
        startActivity(a);
        finish();
    }

    @OnClick(R.id.btnLihatTiket)
    void btnLihatTiket() {
        Intent a = new Intent(InputTiket.this,
                ListTiket.class);
        startActivity(a);
        finish();
    }

    @OnClick(R.id.kembali)
    void btnKembali() {
        Intent a = new Intent(InputTiket.this,
                MainActivity.class);
        startActivity(a);
        finish();
    }
}
