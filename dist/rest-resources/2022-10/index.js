"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Page = exports.OrderRisk = exports.Order = exports.MobilePlatformApplication = exports.Metafield = exports.MarketingEvent = exports.LocationsForMove = exports.Location = exports.InventoryLevel = exports.InventoryItem = exports.Image = exports.GiftCardAdjustment = exports.GiftCard = exports.FulfillmentService = exports.FulfillmentRequest = exports.FulfillmentOrder = exports.FulfillmentEvent = exports.Fulfillment = exports.Event = exports.DraftOrder = exports.DisputeFileUpload = exports.DisputeEvidence = exports.Dispute = exports.DiscountCode = exports.DeprecatedApiCall = exports.CustomerSavedSearch = exports.CustomerAddress = exports.Customer = exports.CustomCollection = exports.Currency = exports.Country = exports.Comment = exports.CollectionListing = exports.Collection = exports.Collect = exports.Checkout = exports.CarrierService = exports.CancellationRequest = exports.Blog = exports.Balance = exports.AssignedFulfillmentOrder = exports.Asset = exports.Article = exports.ApplicationCredit = exports.ApplicationCharge = exports.ApplePayCertificate = exports.AndroidPayKey = exports.AccessScope = exports.AbandonedCheckout = void 0;
exports.Webhook = exports.Variant = exports.User = exports.UsageCharge = exports.Transaction = exports.Theme = exports.TenderTransaction = exports.StorefrontAccessToken = exports.SmartCollection = exports.Shop = exports.ShippingZone = exports.ScriptTag = exports.ResourceFeedback = exports.Report = exports.Refund = exports.Redirect = exports.RecurringApplicationCharge = exports.Province = exports.ProductResourceFeedback = exports.ProductListing = exports.Product = exports.PriceRule = exports.Policy = exports.Payout = exports.PaymentTransaction = exports.PaymentGateway = void 0;
var abandoned_checkout_1 = require("./abandoned_checkout");
Object.defineProperty(exports, "AbandonedCheckout", { enumerable: true, get: function () { return abandoned_checkout_1.AbandonedCheckout; } });
var access_scope_1 = require("./access_scope");
Object.defineProperty(exports, "AccessScope", { enumerable: true, get: function () { return access_scope_1.AccessScope; } });
var android_pay_key_1 = require("./android_pay_key");
Object.defineProperty(exports, "AndroidPayKey", { enumerable: true, get: function () { return android_pay_key_1.AndroidPayKey; } });
var apple_pay_certificate_1 = require("./apple_pay_certificate");
Object.defineProperty(exports, "ApplePayCertificate", { enumerable: true, get: function () { return apple_pay_certificate_1.ApplePayCertificate; } });
var application_charge_1 = require("./application_charge");
Object.defineProperty(exports, "ApplicationCharge", { enumerable: true, get: function () { return application_charge_1.ApplicationCharge; } });
var application_credit_1 = require("./application_credit");
Object.defineProperty(exports, "ApplicationCredit", { enumerable: true, get: function () { return application_credit_1.ApplicationCredit; } });
var article_1 = require("./article");
Object.defineProperty(exports, "Article", { enumerable: true, get: function () { return article_1.Article; } });
var asset_1 = require("./asset");
Object.defineProperty(exports, "Asset", { enumerable: true, get: function () { return asset_1.Asset; } });
var assigned_fulfillment_order_1 = require("./assigned_fulfillment_order");
Object.defineProperty(exports, "AssignedFulfillmentOrder", { enumerable: true, get: function () { return assigned_fulfillment_order_1.AssignedFulfillmentOrder; } });
var balance_1 = require("./balance");
Object.defineProperty(exports, "Balance", { enumerable: true, get: function () { return balance_1.Balance; } });
var blog_1 = require("./blog");
Object.defineProperty(exports, "Blog", { enumerable: true, get: function () { return blog_1.Blog; } });
var cancellation_request_1 = require("./cancellation_request");
Object.defineProperty(exports, "CancellationRequest", { enumerable: true, get: function () { return cancellation_request_1.CancellationRequest; } });
var carrier_service_1 = require("./carrier_service");
Object.defineProperty(exports, "CarrierService", { enumerable: true, get: function () { return carrier_service_1.CarrierService; } });
var checkout_1 = require("./checkout");
Object.defineProperty(exports, "Checkout", { enumerable: true, get: function () { return checkout_1.Checkout; } });
var collect_1 = require("./collect");
Object.defineProperty(exports, "Collect", { enumerable: true, get: function () { return collect_1.Collect; } });
var collection_1 = require("./collection");
Object.defineProperty(exports, "Collection", { enumerable: true, get: function () { return collection_1.Collection; } });
var collection_listing_1 = require("./collection_listing");
Object.defineProperty(exports, "CollectionListing", { enumerable: true, get: function () { return collection_listing_1.CollectionListing; } });
var comment_1 = require("./comment");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return comment_1.Comment; } });
var country_1 = require("./country");
Object.defineProperty(exports, "Country", { enumerable: true, get: function () { return country_1.Country; } });
var currency_1 = require("./currency");
Object.defineProperty(exports, "Currency", { enumerable: true, get: function () { return currency_1.Currency; } });
var custom_collection_1 = require("./custom_collection");
Object.defineProperty(exports, "CustomCollection", { enumerable: true, get: function () { return custom_collection_1.CustomCollection; } });
var customer_1 = require("./customer");
Object.defineProperty(exports, "Customer", { enumerable: true, get: function () { return customer_1.Customer; } });
var customer_address_1 = require("./customer_address");
Object.defineProperty(exports, "CustomerAddress", { enumerable: true, get: function () { return customer_address_1.CustomerAddress; } });
var customer_saved_search_1 = require("./customer_saved_search");
Object.defineProperty(exports, "CustomerSavedSearch", { enumerable: true, get: function () { return customer_saved_search_1.CustomerSavedSearch; } });
var deprecated_api_call_1 = require("./deprecated_api_call");
Object.defineProperty(exports, "DeprecatedApiCall", { enumerable: true, get: function () { return deprecated_api_call_1.DeprecatedApiCall; } });
var discount_code_1 = require("./discount_code");
Object.defineProperty(exports, "DiscountCode", { enumerable: true, get: function () { return discount_code_1.DiscountCode; } });
var dispute_1 = require("./dispute");
Object.defineProperty(exports, "Dispute", { enumerable: true, get: function () { return dispute_1.Dispute; } });
var dispute_evidence_1 = require("./dispute_evidence");
Object.defineProperty(exports, "DisputeEvidence", { enumerable: true, get: function () { return dispute_evidence_1.DisputeEvidence; } });
var dispute_file_upload_1 = require("./dispute_file_upload");
Object.defineProperty(exports, "DisputeFileUpload", { enumerable: true, get: function () { return dispute_file_upload_1.DisputeFileUpload; } });
var draft_order_1 = require("./draft_order");
Object.defineProperty(exports, "DraftOrder", { enumerable: true, get: function () { return draft_order_1.DraftOrder; } });
var event_1 = require("./event");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return event_1.Event; } });
var fulfillment_1 = require("./fulfillment");
Object.defineProperty(exports, "Fulfillment", { enumerable: true, get: function () { return fulfillment_1.Fulfillment; } });
var fulfillment_event_1 = require("./fulfillment_event");
Object.defineProperty(exports, "FulfillmentEvent", { enumerable: true, get: function () { return fulfillment_event_1.FulfillmentEvent; } });
var fulfillment_order_1 = require("./fulfillment_order");
Object.defineProperty(exports, "FulfillmentOrder", { enumerable: true, get: function () { return fulfillment_order_1.FulfillmentOrder; } });
var fulfillment_request_1 = require("./fulfillment_request");
Object.defineProperty(exports, "FulfillmentRequest", { enumerable: true, get: function () { return fulfillment_request_1.FulfillmentRequest; } });
var fulfillment_service_1 = require("./fulfillment_service");
Object.defineProperty(exports, "FulfillmentService", { enumerable: true, get: function () { return fulfillment_service_1.FulfillmentService; } });
var gift_card_1 = require("./gift_card");
Object.defineProperty(exports, "GiftCard", { enumerable: true, get: function () { return gift_card_1.GiftCard; } });
var gift_card_adjustment_1 = require("./gift_card_adjustment");
Object.defineProperty(exports, "GiftCardAdjustment", { enumerable: true, get: function () { return gift_card_adjustment_1.GiftCardAdjustment; } });
var image_1 = require("./image");
Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return image_1.Image; } });
var inventory_item_1 = require("./inventory_item");
Object.defineProperty(exports, "InventoryItem", { enumerable: true, get: function () { return inventory_item_1.InventoryItem; } });
var inventory_level_1 = require("./inventory_level");
Object.defineProperty(exports, "InventoryLevel", { enumerable: true, get: function () { return inventory_level_1.InventoryLevel; } });
var location_1 = require("./location");
Object.defineProperty(exports, "Location", { enumerable: true, get: function () { return location_1.Location; } });
var locations_for_move_1 = require("./locations_for_move");
Object.defineProperty(exports, "LocationsForMove", { enumerable: true, get: function () { return locations_for_move_1.LocationsForMove; } });
var marketing_event_1 = require("./marketing_event");
Object.defineProperty(exports, "MarketingEvent", { enumerable: true, get: function () { return marketing_event_1.MarketingEvent; } });
var metafield_1 = require("./metafield");
Object.defineProperty(exports, "Metafield", { enumerable: true, get: function () { return metafield_1.Metafield; } });
var mobile_platform_application_1 = require("./mobile_platform_application");
Object.defineProperty(exports, "MobilePlatformApplication", { enumerable: true, get: function () { return mobile_platform_application_1.MobilePlatformApplication; } });
var order_1 = require("./order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
var order_risk_1 = require("./order_risk");
Object.defineProperty(exports, "OrderRisk", { enumerable: true, get: function () { return order_risk_1.OrderRisk; } });
var page_1 = require("./page");
Object.defineProperty(exports, "Page", { enumerable: true, get: function () { return page_1.Page; } });
var payment_1 = require("./payment");
Object.defineProperty(exports, "Payment", { enumerable: true, get: function () { return payment_1.Payment; } });
var payment_gateway_1 = require("./payment_gateway");
Object.defineProperty(exports, "PaymentGateway", { enumerable: true, get: function () { return payment_gateway_1.PaymentGateway; } });
var payment_transaction_1 = require("./payment_transaction");
Object.defineProperty(exports, "PaymentTransaction", { enumerable: true, get: function () { return payment_transaction_1.PaymentTransaction; } });
var payout_1 = require("./payout");
Object.defineProperty(exports, "Payout", { enumerable: true, get: function () { return payout_1.Payout; } });
var policy_1 = require("./policy");
Object.defineProperty(exports, "Policy", { enumerable: true, get: function () { return policy_1.Policy; } });
var price_rule_1 = require("./price_rule");
Object.defineProperty(exports, "PriceRule", { enumerable: true, get: function () { return price_rule_1.PriceRule; } });
var product_1 = require("./product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return product_1.Product; } });
var product_listing_1 = require("./product_listing");
Object.defineProperty(exports, "ProductListing", { enumerable: true, get: function () { return product_listing_1.ProductListing; } });
var product_resource_feedback_1 = require("./product_resource_feedback");
Object.defineProperty(exports, "ProductResourceFeedback", { enumerable: true, get: function () { return product_resource_feedback_1.ProductResourceFeedback; } });
var province_1 = require("./province");
Object.defineProperty(exports, "Province", { enumerable: true, get: function () { return province_1.Province; } });
var recurring_application_charge_1 = require("./recurring_application_charge");
Object.defineProperty(exports, "RecurringApplicationCharge", { enumerable: true, get: function () { return recurring_application_charge_1.RecurringApplicationCharge; } });
var redirect_1 = require("./redirect");
Object.defineProperty(exports, "Redirect", { enumerable: true, get: function () { return redirect_1.Redirect; } });
var refund_1 = require("./refund");
Object.defineProperty(exports, "Refund", { enumerable: true, get: function () { return refund_1.Refund; } });
var report_1 = require("./report");
Object.defineProperty(exports, "Report", { enumerable: true, get: function () { return report_1.Report; } });
var resource_feedback_1 = require("./resource_feedback");
Object.defineProperty(exports, "ResourceFeedback", { enumerable: true, get: function () { return resource_feedback_1.ResourceFeedback; } });
var script_tag_1 = require("./script_tag");
Object.defineProperty(exports, "ScriptTag", { enumerable: true, get: function () { return script_tag_1.ScriptTag; } });
var shipping_zone_1 = require("./shipping_zone");
Object.defineProperty(exports, "ShippingZone", { enumerable: true, get: function () { return shipping_zone_1.ShippingZone; } });
var shop_1 = require("./shop");
Object.defineProperty(exports, "Shop", { enumerable: true, get: function () { return shop_1.Shop; } });
var smart_collection_1 = require("./smart_collection");
Object.defineProperty(exports, "SmartCollection", { enumerable: true, get: function () { return smart_collection_1.SmartCollection; } });
var storefront_access_token_1 = require("./storefront_access_token");
Object.defineProperty(exports, "StorefrontAccessToken", { enumerable: true, get: function () { return storefront_access_token_1.StorefrontAccessToken; } });
var tender_transaction_1 = require("./tender_transaction");
Object.defineProperty(exports, "TenderTransaction", { enumerable: true, get: function () { return tender_transaction_1.TenderTransaction; } });
var theme_1 = require("./theme");
Object.defineProperty(exports, "Theme", { enumerable: true, get: function () { return theme_1.Theme; } });
var transaction_1 = require("./transaction");
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return transaction_1.Transaction; } });
var usage_charge_1 = require("./usage_charge");
Object.defineProperty(exports, "UsageCharge", { enumerable: true, get: function () { return usage_charge_1.UsageCharge; } });
var user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
var variant_1 = require("./variant");
Object.defineProperty(exports, "Variant", { enumerable: true, get: function () { return variant_1.Variant; } });
var webhook_1 = require("./webhook");
Object.defineProperty(exports, "Webhook", { enumerable: true, get: function () { return webhook_1.Webhook; } });
