const Client = require("./models/Client");

const registerCustomer = async (email, password, source) => {
  let customerData = null;

  if (source === "magento") {
    customerData = await fetchMagentoCustomer(email, password);
  } else if (source === "shopify") {
    // Fetch customer data from Shopify API
  }

  if (customerData) {
    const newClient = new Client({
      magentoCustomerId: source === "magento" ? customerData.id : undefined,
      shopifyCustomerId: source === "shopify" ? customerData.id : undefined,
      firstName: customerData.firstname,
      lastName: customerData.lastname,
      email: customerData.email,
      isSubscribed: customerData.is_subscribed,
      dateOfBirth: customerData.dob,
      gender: customerData.gender,
      taxvat: customerData.taxvat,
      source,
      addresses: customerData.addresses.map((address) => ({
        firstName: address.firstname,
        lastName: address.lastname,
        address1: address.street[0],
        city: address.city,
        province: address.region ? address.region.region : null,
        zip: address.postcode,
        country: address.country_code,
        phone: address.telephone,
      })),
    });

    try {
      const savedClient = await newClient.save();
      console.log("Client saved successfully:", savedClient);
    } catch (error) {
      console.error("Error saving client:", error);
    }
  } else {
    console.error("No customer data found for the given email and password.");
  }
};
