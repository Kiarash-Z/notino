package com.notino;

import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;
import com.cboy.rn.splashscreen.SplashScreen;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

 public class MainActivity extends ReactActivity {
   @Override
 protected void onCreate(Bundle savedInstanceState) {
     SplashScreen.show(this);
     super.onCreate(savedInstanceState);
 }
    @Override
   protected String getMainComponentName() {
       return "notino";
 }
}
