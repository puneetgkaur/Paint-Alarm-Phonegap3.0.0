/**
 
 * Button Clicker
 
 * Sample Implementation of the In-App Purchasing APIs
 
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
 
 
 
import java.util.Date;
 
import java.util.LinkedList;
 
import java.util.Map;
 
import java.util.HashMap;


 
import android.app.Activity;
 
import android.content.Context;
 
import android.content.SharedPreferences;
 
import android.os.AsyncTask;
 
import android.util.Log;
 
 
 
import com.amazon.inapp.purchasing.BasePurchasingObserver;
 
import com.amazon.inapp.purchasing.GetUserIdResponse;
 
import com.amazon.inapp.purchasing.GetUserIdResponse.GetUserIdRequestStatus;
 
import com.amazon.inapp.purchasing.Item;
 
import com.amazon.inapp.purchasing.ItemDataResponse;
 
import com.amazon.inapp.purchasing.Offset;
 
import com.amazon.inapp.purchasing.PurchaseResponse;
 
import com.amazon.inapp.purchasing.PurchaseUpdatesResponse;
 
import com.amazon.inapp.purchasing.PurchasingManager;
 
import com.amazon.inapp.purchasing.Receipt;
 
import com.amazon.inapp.purchasing.SubscriptionPeriod;
 
import org.apache.cordova.api.CallbackContext; 


/**
 
 * Purchasing Observer will be called on by the Purchasing Manager asynchronously.
 
 * Since the methods on the UI thread of the application, all fulfillment logic is done via an AsyncTask. This way, any
 
 * intensive processes will not hang the UI thread and cause the application to become
 
 * unresponsive.
 
 */
 
public class ButtonClickerObserver extends BasePurchasingObserver {
 
      
 
    private static final String TAG = "Amazon-IAP";
 
    private final Activity baseActivity;
       
     // currently logged in user
 
    private String currentUser;   
 
    public CallbackContext callbackContext; 

    /**
 
     * Creates new instance of the ButtonClickerObserver class.
 
     *
 
     * @param buttonClickerActivity Activity context
 
     */
 
    public ButtonClickerObserver(final Activity activity) {
 
        super(activity);
 
        this.baseActivity = activity;
 
    }
 
 
 
    /**
 
     * Invoked once the observer is registered with the Purchasing Manager If the boolean is false, the application is
 
     * receiving responses from the SDK Tester. If the boolean is true, the application is live in production.
 
     *
 
     * @param isSandboxMode
 
     *            Boolean value that shows if the app is live or not.
 
     */
 
    @Override
 
    public void onSdkAvailable(final boolean isSandboxMode) {
 
        Log.v(TAG, "onSdkAvailable recieved: Response -" + isSandboxMode);
 
        PurchasingManager.initiateGetUserIdRequest();
 
    }
 
 
 
    /**
 
     * Invoked once the call from initiateGetUserIdRequest is completed.
 
     * On a successful response, a response object is passed which contains the request id, request status, and the
 
     * userid generated for your application.
 
     *
 
     * @param getUserIdResponse
 
     *            Response object containing the UserID
 
     */
 
    @Override
 
    public void onGetUserIdResponse(final GetUserIdResponse getUserIdResponse) {
 
        Log.v(TAG, "onGetUserIdResponse recieved: Response -" + getUserIdResponse);
 
        Log.v(TAG, "RequestId:" + getUserIdResponse.getRequestId());
 
        Log.v(TAG, "IdRequestStatus:" + getUserIdResponse.getUserIdRequestStatus());
 
        new GetUserIdAsyncTask().execute(getUserIdResponse);

 
    }
 
 
 
    /**
 
     * Invoked once the call from initiateItemDataRequest is completed.
 
     * On a successful response, a response object is passed which contains the request id, request status, and a set of
 
     * item data for the requested skus. Items that have been suppressed or are unavailable will be returned in a
 
     * set of unavailable skus.
 
     *
 
     * @param itemDataResponse
 
     *            Response object containing a set of purchasable/non-purchasable items
 
     */
    
   /* @Override
 
    public void onItemDataResponse(final ItemDataResponse itemDataResponse) {
 
        Log.v(TAG, "onItemDataResponse recieved");
 
        Log.v(TAG, "ItemDataRequestStatus" + itemDataResponse.getItemDataRequestStatus());
 
        Log.v(TAG, "ItemDataRequestId" + itemDataResponse.getRequestId());
 
        new ItemDataAsyncTask().execute(itemDataResponse);
 
    }
 
 */
 
    /**
 
     * Is invoked once the call from initiatePurchaseRequest is completed.
 
     * On a successful response, a response object is passed which contains the request id, request status, and the
 
     * receipt of the purchase.
 
     *
 
     * @param purchaseResponse
 
     *            Response object containing a receipt of a purchase
 
     */
 
    @Override
 
    public void onPurchaseResponse(final PurchaseResponse purchaseResponse) {
 
        Log.v(TAG, "onPurchaseResponse recieved");
 
        Log.v(TAG, "PurchaseRequestStatus:" + purchaseResponse.getPurchaseRequestStatus());
 
        //new PurchaseAsyncTask().execute(purchaseResponse);
 
    }
 
 
 
    /**
 
     * Helper method to print out relevant receipt information to the log.
 
     */
 
 /*   private void printReceipt(final Receipt receipt) {
 
        Log.v(
 
            TAG,
 
            String.format("Receipt: ItemType: %s Sku: %s SubscriptionPeriod: %s", receipt.getItemType(),
 
                receipt.getSku(), receipt.getSubscriptionPeriod()));
 
    }
 
 */
 
    /**
 
     * Helper method to retrieve the correct key to use with our shared preferences
 
     */
 /*
    private String getKey(final String sku) {
 
        if (sku.equals(baseActivity.getResources().getString(R.string.consumable_sku))) {
 
            return ButtonClickerActivity.NUM_CLICKS;
 
        } else {
 
            return "";
 
        }
 
    }
 
 
 
    private SharedPreferences getSharedPreferencesForCurrentUser() {
 
        final SharedPreferences settings = baseActivity.getSharedPreferences(baseActivity.getCurrentUser(), Context.MODE_PRIVATE);
 
        return settings;
 
    }
 
     
 
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
 
    void setCurrentUser(String currentUser){
 
        this.currentUser = currentUser;
 
    }




    /**
 
     * Started when the Observer receives a GetUserIdResponse. The Shared Preferences file for the returned user id is
 
     * accessed.
 
     */
 
    private class GetUserIdAsyncTask extends AsyncTask<GetUserIdResponse, Void, Boolean> {
 
 
 
        @Override
 
        protected Boolean doInBackground(final GetUserIdResponse... params) {
 
            GetUserIdResponse getUserIdResponse = params[0];
 
 
 
            if (getUserIdResponse.getUserIdRequestStatus() == GetUserIdRequestStatus.SUCCESSFUL) {
 
                final String userId = getUserIdResponse.getUserId();
 
 
 
                // Each UserID has their own shared preferences file, and we'll load that file when a new user logs in.
 
                setCurrentUser(userId);
 
                return true;
 
            } else {
 
                Log.v(TAG, "onGetUserIdResponse: Unable to get user ID.");
 
                return false;
 
            }
 
        }
 
    }
 


 
 
    /**
 
     * Started when the observer receives an Item Data Response.
 
     * Takes the items and display them in the logs. You can use this information to display an in game
 
     * storefront for your IAP items.
 
     */
 /*
    private class ItemDataAsyncTask extends AsyncTask<ItemDataResponse, Void, Void> {
 
        @Override
 
        protected Void doInBackground(final ItemDataResponse... params) {
 
            final ItemDataResponse itemDataResponse = params[0];
 
 
 
            switch (itemDataResponse.getItemDataRequestStatus()) {
 
            case SUCCESSFUL_WITH_UNAVAILABLE_SKUS:
 
                // Skus that you cannot purchase will be here.
 
                for (final String s : itemDataResponse.getUnavailableSkus()) {
 
                    Log.v(TAG, "Unavailable SKU:" + s);
 
                }
 
            case SUCCESSFUL:
 
                // Information you'll want to display about your IAP items is here
 
                // In this example we'll simply log them.
 
                final Map<String, Item> items = itemDataResponse.getItemData();
 
                for (final String key : items.keySet()) {
 
                    Item i = items.get(key);
 
                    Log.v(TAG, String.format("Item: %s\n Type: %s\n SKU: %s\n Price: %s\n Description: %s\n", i.getTitle(), i.getItemType(), i.getSku(), i.getPrice(), i.getDescription()));
 
                }
 
                break;
 
            case FAILED:
 
                // On failed responses will fail gracefully.
 
                break;
 
 
 
            }
 
 
 
            return null;
 
        }
 
    }
 
 */
 
    /**
 
     * Started when the observer receives a Purchase Response
 
     * Once the AsyncTask returns successfully, the UI is updated.
 
     */
 /*
    private class PurchaseAsyncTask extends AsyncTask<PurchaseResponse, Void, Boolean> {
 
 
 
        @Override
 
        protected Boolean doInBackground(final PurchaseResponse... params) {
 
            final PurchaseResponse purchaseResponse = params[0];           
 
            final String userId = baseActivity.getCurrentUser();
 
             
 
            final SharedPreferences settings = getSharedPreferencesForCurrentUser();
 
            final SharedPreferences.Editor editor = getSharedPreferencesEditor();
 
            switch (purchaseResponse.getPurchaseRequestStatus()) {
 
            case SUCCESSFUL:
 
                /**
 
                 * You can verify the receipt and fulfill the purchase on successful responses.
 
                 
 
                final Receipt receipt = purchaseResponse.getReceipt();
 
                String key = "";
 
                switch (receipt.getItemType()) {
 
                case CONSUMABLE:
 
                    int numClicks = settings.getInt(ButtonClickerActivity.NUM_CLICKS, 0);
 
                    editor.putInt(ButtonClickerActivity.NUM_CLICKS, numClicks + 10);
 
                    break;
 
                editor.commit();
 
                printReceipt(purchaseResponse.getReceipt());
 
                return true;
 
            case FAILED:
 
                /**
 
                 * If the purchase failed for some reason, (The customer canceled the order, or some other
 
                 * extraneous circumstance happens) the application ignores the request and logs the failure.
 
                 
 
                Log.v(TAG, "Failed purchase for request" + baseActivity.requestIds.get(purchaseResponse.getRequestId()));
 
                return false;
 
            case INVALID_SKU:
 
                /**
 
                 * If the sku that was purchased was invalid, the application ignores the request and logs the failure.
 
                 * This can happen when there is a sku mismatch between what is sent from the application and what
 
                 * currently exists on the dev portal.
 
                 
 
                Log.v(TAG, "Invalid Sku for request " + baseActivity.requestIds.get(purchaseResponse.getRequestId()));
 
                return false;
 
            }
 
            return false;
 
        }
 
 
 
        @Override
 
        protected void onPostExecute(final Boolean success) {
 
            super.onPostExecute(success);
 
            if (success) {
 
                baseActivity.update();
 
            }
 
        }
 
    }
 
}*/
}

