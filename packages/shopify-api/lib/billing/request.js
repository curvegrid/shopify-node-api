"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const tslib_1 = require("tslib");
const types_1 = require("../types");
const error_1 = require("../error");
const get_embedded_app_url_1 = require("../auth/get-embedded-app-url");
const admin_1 = require("../clients/admin");
const crypto_1 = require("../../runtime/crypto");
const types_2 = require("../../runtime/crypto/types");
function request(config) {
    return function (_a) {
        var _b;
        var { session, plan, isTest = true, returnUrl: returnUrlParam, returnObject = false } = _a, overrides = tslib_1.__rest(_a, ["session", "plan", "isTest", "returnUrl", "returnObject"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!config.billing || !config.billing[plan]) {
                throw new error_1.BillingError({
                    message: `Could not find plan ${plan} in billing settings`,
                    errorData: [],
                });
            }
            const billingConfig = Object.assign({}, config.billing[plan]);
            const filteredOverrides = Object.fromEntries(Object.entries(overrides).filter(([_key, value]) => value !== undefined));
            const cleanShopName = session.shop.replace('.myshopify.com', '');
            const embeddedAppUrl = (0, get_embedded_app_url_1.buildEmbeddedAppUrl)(config)((0, crypto_1.hashString)(`admin.shopify.com/store/${cleanShopName}`, types_2.HashFormat.Base64));
            const appUrl = `${config.hostScheme}://${config.hostName}?shop=${session.shop}`;
            // if provided a return URL, use it, otherwise use the embedded app URL or hosted app URL
            const returnUrl = returnUrlParam || (config.isEmbeddedApp ? embeddedAppUrl : appUrl);
            const GraphqlClient = (0, admin_1.graphqlClientClass)({ config });
            const client = new GraphqlClient({ session });
            function isLineItemPlan(billingConfig) {
                return 'lineItems' in billingConfig;
            }
            function isOneTimePlan(billingConfig) {
                return billingConfig.interval === types_1.BillingInterval.OneTime;
            }
            let data;
            if (isLineItemPlan(billingConfig)) {
                const mergedBillingConfigs = mergeBillingConfigs(billingConfig, filteredOverrides);
                const mutationRecurringResponse = yield requestSubscriptionPayment({
                    billingConfig: mergedBillingConfigs,
                    plan,
                    client,
                    returnUrl,
                    isTest,
                });
                data = mutationRecurringResponse.appSubscriptionCreate;
            }
            else if (isOneTimePlan(billingConfig)) {
                const mutationOneTimeResponse = yield requestSinglePayment({
                    billingConfig: Object.assign(Object.assign({}, billingConfig), filteredOverrides),
                    plan,
                    client,
                    returnUrl,
                    isTest,
                });
                data = mutationOneTimeResponse.appPurchaseOneTimeCreate;
            }
            else {
                switch (billingConfig.interval) {
                    case types_1.BillingInterval.Usage: {
                        const mutationUsageResponse = yield requestUsagePayment({
                            billingConfig: Object.assign(Object.assign({}, billingConfig), filteredOverrides),
                            plan,
                            client,
                            returnUrl,
                            isTest,
                        });
                        data = mutationUsageResponse.appSubscriptionCreate;
                        break;
                    }
                    default: {
                        const mutationRecurringResponse = yield requestRecurringPayment({
                            billingConfig: Object.assign(Object.assign({}, billingConfig), filteredOverrides),
                            plan,
                            client,
                            returnUrl,
                            isTest,
                        });
                        data = mutationRecurringResponse.appSubscriptionCreate;
                    }
                }
            }
            if ((_b = data.userErrors) === null || _b === void 0 ? void 0 : _b.length) {
                throw new error_1.BillingError({
                    message: 'Error while billing the store',
                    errorData: data.userErrors,
                });
            }
            if (returnObject) {
                return data;
            }
            else {
                return data.confirmationUrl;
            }
        });
    };
}
exports.request = request;
function requestSubscriptionPayment({ billingConfig, plan, client, returnUrl, isTest, }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const lineItems = billingConfig.lineItems.map((item) => {
            if (item.interval === types_1.BillingInterval.Every30Days ||
                item.interval === types_1.BillingInterval.Annual) {
                const appRecurringPricingDetails = {
                    interval: item.interval,
                    price: {
                        amount: item.amount,
                        currencyCode: item.currencyCode,
                    },
                };
                if (item.discount) {
                    appRecurringPricingDetails.discount = {
                        durationLimitInIntervals: item.discount.durationLimitInIntervals,
                        value: {
                            amount: item.discount.value.amount,
                            percentage: item.discount.value.percentage,
                        },
                    };
                }
                return {
                    plan: {
                        appRecurringPricingDetails,
                    },
                };
            }
            else if (item.interval === types_1.BillingInterval.Usage) {
                const appUsagePricingDetails = {
                    terms: item.terms,
                    cappedAmount: {
                        amount: item.amount,
                        currencyCode: item.currencyCode,
                    },
                };
                return {
                    plan: {
                        appUsagePricingDetails,
                    },
                };
            }
            else {
                throw new error_1.BillingError({
                    message: 'Invalid interval provided',
                    errorData: [item],
                });
            }
        });
        const mutationResponse = yield client.request(RECURRING_PURCHASE_MUTATION, {
            variables: {
                name: plan,
                trialDays: billingConfig.trialDays,
                replacementBehavior: billingConfig.replacementBehavior,
                returnUrl,
                test: isTest,
                lineItems,
            },
        });
        if (mutationResponse.errors) {
            throw new error_1.BillingError({
                message: 'Error while billing the store',
                errorData: mutationResponse.errors,
            });
        }
        return mutationResponse.data;
    });
}
function requestRecurringPayment({ billingConfig, plan, client, returnUrl, isTest, }) {
    var _a, _b, _c, _d, _e;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const mutationResponse = yield client.request(RECURRING_PURCHASE_MUTATION, {
            variables: {
                name: plan,
                trialDays: billingConfig.trialDays,
                replacementBehavior: billingConfig.replacementBehavior,
                returnUrl,
                test: isTest,
                lineItems: [
                    {
                        plan: {
                            appRecurringPricingDetails: {
                                interval: billingConfig.interval,
                                price: {
                                    amount: billingConfig.amount,
                                    currencyCode: billingConfig.currencyCode,
                                },
                                discount: {
                                    durationLimitInIntervals: (_a = billingConfig.discount) === null || _a === void 0 ? void 0 : _a.durationLimitInIntervals,
                                    value: {
                                        amount: (_c = (_b = billingConfig.discount) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.amount,
                                        percentage: (_e = (_d = billingConfig.discount) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.percentage,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        });
        if (mutationResponse.errors) {
            throw new error_1.BillingError({
                message: 'Error while billing the store',
                errorData: mutationResponse.errors,
            });
        }
        return mutationResponse.data;
    });
}
function requestUsagePayment({ billingConfig, plan, client, returnUrl, isTest, }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const mutationResponse = yield client.request(RECURRING_PURCHASE_MUTATION, {
            variables: {
                name: plan,
                returnUrl,
                test: isTest,
                trialDays: billingConfig.trialDays,
                replacementBehavior: billingConfig.replacementBehavior,
                lineItems: [
                    {
                        plan: {
                            appUsagePricingDetails: {
                                terms: billingConfig.usageTerms,
                                cappedAmount: {
                                    amount: billingConfig.amount,
                                    currencyCode: billingConfig.currencyCode,
                                },
                            },
                        },
                    },
                ],
            },
        });
        if (mutationResponse.errors) {
            throw new error_1.BillingError({
                message: `Error while billing the store:: ${mutationResponse.errors}`,
                errorData: mutationResponse.errors,
            });
        }
        return mutationResponse.data;
    });
}
function requestSinglePayment({ billingConfig, plan, client, returnUrl, isTest, }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const mutationResponse = yield client.request(ONE_TIME_PURCHASE_MUTATION, {
            variables: {
                name: plan,
                returnUrl,
                test: isTest,
                price: {
                    amount: billingConfig.amount,
                    currencyCode: billingConfig.currencyCode,
                },
            },
        });
        if (mutationResponse.errors) {
            throw new error_1.BillingError({
                message: 'Error while billing the store',
                errorData: mutationResponse.errors,
            });
        }
        return mutationResponse.data;
    });
}
function mergeBillingConfigs(billingConfig, overrides) {
    const mergedConfig = Object.assign(Object.assign({}, billingConfig), overrides);
    const mergedLineItems = [];
    if (billingConfig.lineItems && overrides.lineItems) {
        for (const i of billingConfig.lineItems) {
            let found = false;
            for (const j of overrides.lineItems) {
                if (i.interval === j.interval) {
                    mergedLineItems.push(Object.assign(Object.assign({}, i), j));
                    found = true;
                    break;
                }
            }
            if (!found) {
                mergedLineItems.push(i);
            }
        }
        mergedConfig.lineItems = mergedLineItems;
    }
    return mergedConfig;
}
const RECURRING_PURCHASE_MUTATION = `
  mutation test(
    $name: String!
    $lineItems: [AppSubscriptionLineItemInput!]!
    $returnUrl: URL!
    $test: Boolean
    $trialDays: Int
    $replacementBehavior: AppSubscriptionReplacementBehavior
  ) {
    appSubscriptionCreate(
      name: $name
      lineItems: $lineItems
      returnUrl: $returnUrl
      test: $test
      trialDays: $trialDays
      replacementBehavior: $replacementBehavior
    ) {
      appSubscription {
        id
        name
        test
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
const ONE_TIME_PURCHASE_MUTATION = `
  mutation test(
    $name: String!
    $price: MoneyInput!
    $returnUrl: URL!
    $test: Boolean
  ) {
    appPurchaseOneTimeCreate(
      name: $name
      price: $price
      returnUrl: $returnUrl
      test: $test
    ) {
      appPurchaseOneTime {
        id
        name
        test
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
//# sourceMappingURL=request.js.map