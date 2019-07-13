package com.example.mobile;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import butterknife.ButterKnife;
import butterknife.OnClick;

public class ListTiket extends AppCompatActivity {
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_list_tiket);
            ButterKnife.bind(this);

        }
        @OnClick(R.id.btnLogout)
        void btnLogout() {
            Intent a = new Intent(ListTiket.this,MainActivity.class);
            startActivity(a);
            finish();
        }
        @OnClick(R.id.btnKembali)
        void btnKembali() {
            Intent a = new Intent(ListTiket.this,InputTiket.class);
            startActivity(a);
            finish();
        }
        @OnClick(R.id.btnUpdate)
        void btnUpdate() {
            Intent a = new Intent(ListTiket.this,Update.class);
            startActivity(a);
            finish();
        }
    }