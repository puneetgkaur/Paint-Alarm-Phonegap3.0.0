/**
 
 * Button Clicker
 
 * Sample Implementation of the In-App Purchasing APIs
 
 *
 
 * © 2012, Amazon.com, Inc. or its affiliates.
 
 * All Rights Reserved.
 
 * Licensed under the Apache License, Version 2.0 (the "License").
 
 * You may not use this file except in compliance with the License.
 
 * A copy of the License is located at
 
 * http://aws.amazon.com/apache2.0/
 
 * or in the "license" file accompanying this file.
 
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 
 * implied.
 
 * See the License for the specific language governing permissions and limitations under the License.
 
 */
 
package com.amazon.sample.buttonclicker;
 
 
 
import java.util.HashMap;
 
import java.util.Map;
 
 
 
import android.app.Activity;
 
import android.content.Context;
 
import android.content.SharedPreferences;
 
import android.os.Bundle;
 
import android.util.Log;
 
import android.view.View;
 
import android.widget.Button;
 
import android.widget.TextView;
 
 
 
import com.amazon.inapp.purchasing.PurchasingManager;
 
 
 
public class ButtonClickerActivity /* extends Activity */ {
 
 
 
    // Keys for our shared prefrences
 
    static final String NUM_CLICKS = "numClicks";
 
     
 /*
    // UI Elements
 
    private Button blueSwatch;
 
    private Button purpleSwatch;
 
    private Button greenSwatch;
 
    private Button centerButton;
 
    private TextView clicksLeft;   
 
 */
 
    // currently logged in user
 
    private String currentUser;   
 
     
 
    // Mapping of our requestIds to unlockable content
 
    public Map<String, String> requestIds;
 
 
 
    // State of the activity color of the button and the number of clicks left.
 
   // public String buttonColor;
 
   // public int numClicks;
 
 
 
    /**
 
     * When the app is first created the views are cached and the requestId mapping is created.
 
     */
    /*
    @Override
 
    public void onCreate(Bundle savedInstanceState) {
 
        super.onCreate(savedInstanceState);
 
        setContentView(R.layout.main);
 
 
 
        requestIds = new HashMap<String, String>();
 
 
 
        blueSwatch = (Button) findViewById(R.id.blueswatch);
 
        purpleSwatch = (Button) findViewById(R.id.purpleswatch);
 
        greenSwatch = (Button) findViewById(R.id.greenswatch);
 
 
 
        clicksLeft = (TextView) findViewById(R.id.numClicks);
 
        centerButton = (Button) findViewById(R.id.button);
 
    }
    */
 
 
    /**
 
     * Whenever the application regains focus, the observer is registered again.
 
     */
   /* 
    @Override
 
    public void onStart() {
 
        super.onStart();
 
        ButtonClickerObserver buttonClickerObserver = new ButtonClickerObserver(this);
 
        PurchasingManager.registerObserver(buttonClickerObserver);
 
    }
    */
 
 
    /**
 
     * When the application resumes the application checks which customer is signed in.
 
     */
    /*
    @Override
 
    protected void onResume() {
 
        super.onResume();
 
        PurchasingManager.initiateGetUserIdRequest();
 
    };
    */
 
 
    /**
 
     * Update the UI for any purchases the customer has made.
 
     */
    /*
    public void update() {
 
 
 
        // Display the lock overlay on each swatch unless the customer has purchased it.
 
        final SharedPreferences settings = getSharedPreferencesForCurrentUser();
 
         
 
        // Display the number of remaining clicks
 
        numClicks = settings.getInt(NUM_CLICKS, 5);
 
        clicksLeft.setText("" + numClicks);
 
    }
 
    */
 
    /**
 
     * Called when the customer presses the "Buy More" button.
 
     *
 
     * @param view
 
     *            View Object for the Buy More button
 
     */
     /*
    public void onBuyMoreClicks(View view) {
 
        String requestId =
 
            PurchasingManager.initiatePurchaseRequest(getResources().getString(R.string.consumable_sku));
 
        storeRequestId(requestId, NUM_CLICKS);
 
    }
 
 
    public void onBuy(View view) {
 
        String requestId =

            PurchasingManager.initiatePurchaseRequest(getResources().getString(R.string.consumable_sku));
 
        storeRequestId(requestId, NUM_CLICKS);
 
    }
    */
    /**
 
     * Called when the customer presses the "Click Me" button.
 
     * This consumes the number of clicks the customer has by 1.
 
     * If the customer no longer has clicks, then a dialog will ask them if they would like to purchase more clicks.
 
     *
 
     * @param view
 
     *            View Object for the Click Me Button
 
     */
    /*
    public void onButtonClick(View v) {
 
        if (numClicks > 0) {
 
            numClicks--;
 
            final SharedPreferences settings = getSharedPreferencesForCurrentUser();
 
            final SharedPreferences.Editor editor = getSharedPreferencesEditor();
 
            editor.putInt(NUM_CLICKS, numClicks);
 
            editor.commit();
 
            update();
 
        } else {
 
            DialogCommandWrapper.createConfirmationDialog(this, "You don't have any presses left!", "Buy More",
 
                "Bummer", new Runnable() {
 
                    @Override
 
                    public void run() {
 
                        PurchasingManager
 
                            .initiatePurchaseRequest(getResources().getString(R.string.consumable_sku));
 
                    }
 
                }).show();
 
        }
 
    }
 
   */
 
    /**
 
     * Helper method to associate request ids to shared preference keys
 
     *
 
     * @param requestId
 
     *            Request ID returned from a Purchasing Manager Request
 
     * @param key
 
     *            Key used in shared preferences file
 
     */
    /*
    private void storeRequestId(String requestId, String key) {
 
        requestIds.put(requestId, key);
 
    }
    */
     
 
    /**
 
     * Get the SharedPreferences file for the current user.
 
     * @return SharedPreferences file for a user.
 
     */
   /* 
    private SharedPreferences getSharedPreferencesForCurrentUser() {
 
        final SharedPreferences settings = getSharedPreferences(currentUser, Context.MODE_PRIVATE);
 
        return settings;
 
    }
 
     */
 
    /**
 
     * Generate a SharedPreferences.Editor object.
 
     * @return editor for Shared Preferences file.
 
     */
 /*
    private SharedPreferences.Editor getSharedPreferencesEditor(){
 
        return getSharedPreferencesForCurrentUser().edit();
 
    }
 */
     
 
    /**
 
     * Gets current logged in user
 
     * @return current user
 
     */
 
    String getCurrentUser(){
 
        return currentUser;
 
    }
 
     
 
    /**
 
     * Sets current logged in user
 
     * @param currentUser current user to set
 
     */
 
    void setCurrentUser(final String currentUser){
 
        this.currentUser = currentUser;
 
    }
 
 
 
}
