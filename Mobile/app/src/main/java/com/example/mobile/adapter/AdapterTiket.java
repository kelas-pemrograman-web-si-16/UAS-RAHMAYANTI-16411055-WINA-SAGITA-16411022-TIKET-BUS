 package com.example.mobile.adapter;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.mobile.R;
import com.example.mobile.data.DataTiket;
//import com.example.tiketbus.R;
//import com.example.tiketbus.data.DataTiket;

import java.util.List;

public class AdapterTiket extends BaseAdapter {

    private Activity activity;
    private LayoutInflater inflater;
    private List<DataTiket> item;

    public AdapterTiket(Activity activity, List<DataTiket> item) {
        this.activity = activity;
        this.item = item;
    }

    @Override
    public int getCount() {
        return item.size();
    }

    @Override
    public Object getItem(int location) {
        return item.get(location);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        if (inflater == null)
            inflater = (LayoutInflater) activity
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        if (convertView == null)
            convertView = inflater.inflate(R.layout.content_tiket, null);


        TextView asal         = (TextView) convertView.findViewById(R.id.txtasal);
        TextView tujuan        = (TextView) convertView.findViewById(R.id.txttujuan);
        TextView tanggal_berangkat     = (TextView) convertView.findViewById(R.id.tanggal_berangkat);
        TextView kursi    = (TextView) convertView.findViewById(R.id.txtkursi);


        asal.setText(": "+item.get(position).getasal());
        tujuan.setText(": "+item.get(position).gettujuan());
        tanggal_berangkat.setText(": "+item.get(position).gettanggal_berangkat());
        kursi.setText(": "+item.get(position).getkursi());

        return convertView;
    }
}

