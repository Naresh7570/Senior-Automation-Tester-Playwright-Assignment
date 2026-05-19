import { test, expect, APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://simple-books-api.click';

let apiContext: APIRequestContext;
let orderId: string;

test.describe.serial('Simple Books API End-to-End Flow', () => {

  // ============================================
  // Setup Authenticated API Context
  // ============================================
  test.beforeAll(async ({ playwright }) => {

    // Create request context for authentication
    const authRequest = await playwright.request.newContext();

    // Generate Token
    const authResponse = await authRequest.post(
      `${BASE_URL}/api-clients`,
      {
        data: {
          clientName: 'Playwright Client',
          clientEmail: `test${Date.now()}@mail.com`
        }
      }
    );

    expect(authResponse.status()).toBe(201);

    const authBody = await authResponse.json();

    const token = authBody.accessToken;

    console.log('Generated Token:', token);

    // Create authenticated API context
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
  });

  // ============================================
  // GET All Books
  // ============================================
  test('Get All Books', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/books`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);

    console.log(body);
  });

  // ============================================
  // GET Single Book
  // ============================================
  test('Get Single Book', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/books/1`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.name).toBeTruthy();

    console.log(body);
  });

  // ============================================
  // Negative Test - Invalid Book ID
  // ============================================
  test('Get Invalid Book', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/books/999`);

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.error).toContain('No book with id');

    console.log(body);
  });

  // ============================================
  // Create Order
  // ============================================
  test('Create Order', async () => {

    const response = await apiContext.post('/orders', {
      data: {
        bookId: 1,
        customerName: 'Naveen'
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.created).toBeTruthy();

    orderId = body.orderId;

    console.log('Created Order ID:', orderId);
  });

  // ============================================
  // Get Orders
  // ============================================
  test('Get Orders', async () => {

    const response = await apiContext.get('/orders');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);

    console.log(body);
  });

  // ============================================
  // Update Order
  // ============================================
  test('Update Order', async () => {

    const response = await apiContext.patch(`/orders/${orderId}`, {
      data: {
        customerName: 'Updated User'
      }
    });

    expect(response.status()).toBe(204);

    console.log('Order Updated Successfully');
  });

  // ============================================
  // Delete Order
  // ============================================
  test('Delete Order', async () => {

    const response = await apiContext.delete(`/orders/${orderId}`);

    expect(response.status()).toBe(204);

    console.log('Order Deleted Successfully');
  });

  // ============================================
  // Verify Deleted Order
  // ============================================
  test('Verify Deleted Order', async () => {

    const response = await apiContext.get(`/orders/${orderId}`);

    expect(response.status()).toBe(404);

    console.log('Verified Deleted Order');
  });

  // ============================================
  // Negative Test - Invalid Token
  // ============================================
  test('Access Orders With Invalid Token', async ({ playwright }) => {

    const invalidContext = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Authorization: 'Bearer invalid_token'
      }
    });

    const response = await invalidContext.get('/orders');

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.error).toContain('Invalid bearer token');

    console.log(body);
  });

  // ============================================
  // Negative Test - Missing Token
  // ============================================
  test('Access Orders Without Token', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/orders`);

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.error).toContain('Missing Authorization header');

    console.log(body);
  });

  // ============================================
  // Cleanup
  // ============================================
  test.afterAll(async () => {

    await apiContext.dispose();

  });

});