// Jany - Needs optional parameters, incl. pagination and business ID
export function getBusinesses() {
  // Implementation here
}

// Jany - I would rename createBusiness as addBusiness, for consistency
export function createBusiness(businessData) {
  // Implementation here
}

// Jany - Needs optional parameters, incl. pagination,  seller ID, business ID
export function getSellers(params = {}) {
  // Implementation here
}

export function addSeller(businessId, sellerData) {
  // Implementation here
}

// Jany - Needs optional parameters, incl. business ID, might consider a flag param to also delete all Sellers under the Business
export function deactivateBusiness(businessId, deactivationData) {
  // Implementation here
}

// Jany getDeactivationRecords needs and ID to be passed, so we can use it for either business or seller
export function getDeactivationRecords() {
  // Implementation here
}

/* Jany
We need deactivateSeller
getDeactivationRecords needs and ID to be passed, so we can use it for either business or seller
*/