import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/keystore'; // Adjust this import according to your file structure
import { store } from '@/lib/store'; // Import your store

describe('Keystore API', () => {
    afterEach(() => {
        // Clear the store after each test
        Object.keys(store).forEach(key => delete store[key]);
    });

    it('should return 400 if key or value is missing in POST', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: { value: 'testValue' },
            query: { key: '' }, // Missing key
        });

        await handler(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._getData()).toContain('Key and value are required');
    });

    it('should store the value and return success in POST', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: { value: 'testValue' },
            query: { key: 'testKey' },
        });

        await handler(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getData()).toContain('success');
        expect(store['testKey']).toBe('testValue');
    });

    it('should return 400 if key is missing in GET', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: { key: '' }, // Missing key
        });

        await handler(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._getData()).toContain('Key is required');
    });

    it('should return 404 if key not found in GET', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: { key: 'nonExistentKey' },
        });

        await handler(req, res);
        expect(res.statusCode).toBe(404);
        expect(res._getData()).toContain('Key not found');
    });

    it('should return the stored value in GET', async () => {
        // Pre-set the store value before testing GET
        store['testKey'] = 'testValue';

        const { req, res } = createMocks({
            method: 'GET',
            query: { key: 'testKey' },
        });

        await handler(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getData()).toContain('testKey');
        expect(res._getData()).toContain('testValue');
    });

    it('should return 400 if key is missing in DELETE', async () => {
        const { req, res } = createMocks({
            method: 'DELETE',
            query: { key: '' }, // Missing key
        });

        await handler(req, res);
        expect(res.statusCode).toBe(400);
        expect(res._getData().error).toContain('Key is required');
    });

    it('should delete the key and return success in DELETE', async () => {
        // Pre-set the store value before testing DELETE
        store['testKey'] = 'testValue';

        const { req, res } = createMocks({
            method: 'DELETE',
            query: { key: 'testKey' },
        });

        await handler(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getData()).toContain('success');
        expect(store['testKey']).toBeUndefined();
    });

    it('should return 405 for unsupported methods', async () => {
        const { req, res } = createMocks({
            method: 'PUT',
        });

        await handler(req, res);
        expect(res.statusCode).toBe(405);
        expect(res._getData()).toContain('Method Not Allowed');
    });
});
