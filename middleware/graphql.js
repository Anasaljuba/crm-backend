const { request } = require("graphql-request");

const MAGENTO_API_URL = "https://your-magento-store.com/graphql";

const fetchMagentoCustomer = async (email, password) => {
  const query = `
    mutation {
      generateCustomerToken(email: "${email}", password: "${password}") {
        token
      }
    }
  `;

  try {
    const response = await request(MAGENTO_API_URL, query);
    const token = response.generateCustomerToken.token;

    const customerQuery = `
      query {
        customer {
          id
          firstname
          lastname
          email
          is_subscribed
          dob
          gender
          taxvat
          addresses {
            id
            firstname
            lastname
            street
            city
            region {
              region
            }
            postcode
            country_code
            telephone
          }
        }
      }
    `;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const customerResponse = await request(
      MAGENTO_API_URL,
      customerQuery,
      undefined,
      headers
    );
    const customerData = customerResponse.customer;
    return customerData;
  } catch (error) {
    console.error("Error fetching customer data from Magento:", error);
  }
};
