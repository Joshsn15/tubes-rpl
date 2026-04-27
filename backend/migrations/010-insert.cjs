'use strict';

const SUPPLIER_1 = 'aaaa0001-0000-0000-0000-000000000001';
const SUPPLIER_2 = 'aaaa0001-0000-0000-0000-000000000002';

const USER_1 = 'bbbb0002-0000-0000-0000-000000000001';
const USER_2 = 'bbbb0002-0000-0000-0000-000000000002';
const USER_3 = 'bbbb0002-0000-0000-0000-000000000003';
const USER_4 = 'bbbb0002-0000-0000-0000-000000000004';

const PRODUCT_1 = '0ff1736b-6ef0-424e-92e0-9e247d56710a';
const PRODUCT_2 = '390f63b1-ccc4-49cf-9462-309d80344a29';
const PRODUCT_3 = '1bee16a9-fc8a-4869-8629-2f5ccd38cc3c';
const PRODUCT_4 = 'afc36e5e-cbed-4119-8f0d-9fe0875b015d';
const PRODUCT_5 = '39dd1da3-3694-4f26-97d4-fc20524561f7';

const PO_1 = 'eeee0005-0000-0000-0000-000000000001';
const PO_2 = 'eeee0005-0000-0000-0000-000000000002';

const POI_1 = 'ffff0006-0000-0000-0000-000000000001';
const POI_2 = 'ffff0006-0000-0000-0000-000000000002';
const POI_3 = 'ffff0006-0000-0000-0000-000000000003';

const STOCK_1 = 'ffff0007-0000-0000-0000-000000000001';
const STOCK_2 = 'ffff0007-0000-0000-0000-000000000002';
const STOCK_3 = 'ffff0007-0000-0000-0000-000000000003';

const TRX_1 = 'aaaa0008-0000-0000-0000-000000000001';
const TRX_2 = 'aaaa0008-0000-0000-0000-000000000002';

const TRX_ITEM_1 = 'bbbb0009-0000-0000-0000-000000000001';
const TRX_ITEM_2 = 'bbbb0009-0000-0000-0000-000000000002';
const TRX_ITEM_3 = 'bbbb0009-0000-0000-0000-000000000003';

const LEDGER_1 = 'dddd0010-0000-0000-0000-000000000001';
const LEDGER_2 = 'dddd0010-0000-0000-0000-000000000002';

const REPORT_1 = 'eeee0011-0000-0000-0000-000000000001';
const REPORT_2 = 'eeee0011-0000-0000-0000-000000000002';

const NOW = new Date();

module.exports = {
    async up(queryInterface, Sequelize) {

        // ─────────────────────────────────────────
        // 1. Suppliers
        //    Model: suppliers_id (UUID), name, contact_phone
        //    Note: no paranoid (no deletedAt)
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('Suppliers', [
            {
                suppliers_id: SUPPLIER_1,
                name: 'PT Indofood Sukses Makmur',
                contact_phone: '02157900000',
                createdAt: NOW,
                updatedAt: NOW,
            },
            {
                suppliers_id: SUPPLIER_2,
                name: 'CV Tirta Investama',
                contact_phone: '02157911111',
                createdAt: NOW,
                updatedAt: NOW,
            },
        ]);

        // ─────────────────────────────────────────
        // 2. Users
        //    Model: user_id (UUID), username, email, password,
        //           role ENUM('ADMIN','MANAGER','STOCKER','EMPLOYEE'), paranoid
        //    Password hash = "secret" via bcrypt cost 10
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('Users', [
            {
                user_id: USER_1,
                username: 'admin01',
                email: 'admin@toko.com',
                password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
                role: 'ADMIN',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                user_id: USER_2,
                username: 'manager01',
                email: 'manager@toko.com',
                password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
                role: 'MANAGER',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                user_id: USER_3,
                username: 'stocker01',
                email: 'stocker@toko.com',
                password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
                role: 'STOCKER',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                user_id: USER_4,
                username: 'employee01',
                email: 'employee@toko.com',
                password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
                role: 'EMPLOYEE',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
        ]);

        // ─────────────────────────────────────────
        // 3. Products
        //    Model: products_id (UUID), products_name, category ENUM('FOOD','DRINK','HEALTH','BEAUTY'),
        //           price DECIMAL(12,2), stock INTEGER, manufacture_date DATE,
        //           expiry_date DATE, paranoid
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('Products', [
            {
                products_id: PRODUCT_1,
                products_name: 'Indomie Goreng',
                category: 'FOOD',
                price: 3000.00,
                stock: 120,
                manufacture_date: '2025-01-01',
                expiry_date: '2025-12-31',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                products_id: PRODUCT_2,
                products_name: 'Aqua Botol 600ml',
                category: 'DRINK',
                price: 4000.00,
                stock: 200,
                manufacture_date: '2025-02-01',
                expiry_date: '2026-02-01',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                products_id: PRODUCT_3,
                products_name: 'Vitamin C 500mg',
                category: 'HEALTH',
                price: 15000.00,
                stock: 75,
                manufacture_date: '2024-12-15',
                expiry_date: '2026-12-15',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                products_id: PRODUCT_4,
                products_name: 'Sabun Lifebuoy',
                category: 'BEAUTY',
                price: 7000.00,
                stock: 90,
                manufacture_date: '2025-03-01',
                expiry_date: '2027-03-01',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                products_id: PRODUCT_5,
                products_name: 'Teh Botol Sosro',
                category: 'DRINK',
                price: 5000.00,
                stock: 150,
                manufacture_date: '2025-01-20',
                expiry_date: '2026-01-20',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
        ]);

        // ─────────────────────────────────────────
        // 4. Purchase Orders
        //    Model: po_id (UUID), suppliers_id (UUID FK), total_cost DECIMAL(12,2),
        //           status ENUM('PENDING','RECEIVED','CANCELED'), paranoid
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('purchase_orders', [
            {
                po_id: PO_1,
                suppliers_id: SUPPLIER_1,
                total_cost: 360000.00,
                status: 'RECEIVED',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                po_id: PO_2,
                suppliers_id: SUPPLIER_2,
                total_cost: 800000.00,
                status: 'PENDING',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
        ]);

        // ─────────────────────────────────────────
        // 5. Purchase Order Items
        //    Model: poi_id (UUID), po_id (UUID FK), products_id (UUID FK),
        //           purchase_qty INTEGER, cost DECIMAL(12,2), paranoid
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('purchase_order_items', [
            {
                poi_id: POI_1,
                po_id: PO_1,
                products_id: PRODUCT_1,
                purchase_qty: 120,
                cost: 3000.00,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                poi_id: POI_2,
                po_id: PO_2,
                products_id: PRODUCT_2,
                purchase_qty: 200,
                cost: 4000.00,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                poi_id: POI_3,
                po_id: PO_1,
                products_id: PRODUCT_3,
                purchase_qty: 75,
                cost: 15000.00,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
        ]);

        // ─────────────────────────────────────────
        // 6. Stock Logs
        //    Model: stock_id (UUID), products_id (UUID FK),
        //           change_type ENUM('IN','OUT','ADJUST'),
        //           stock_qty INTEGER,
        //           reference_type ENUM('SALE','PURCHASE','ADJUST','RETURN'),
        //           reference_id UUID, paranoid
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('stock_logs', [
            {
                stock_id: STOCK_1,
                products_id: PRODUCT_1,
                change_type: 'IN',
                stock_qty: 120,
                reference_type: 'PURCHASE',
                reference_id: PO_1,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                stock_id: STOCK_2,
                products_id: PRODUCT_2,
                change_type: 'IN',
                stock_qty: 200,
                reference_type: 'PURCHASE',
                reference_id: PO_1,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                stock_id: STOCK_3,
                products_id: PRODUCT_1,
                change_type: 'OUT',
                stock_qty: 5,
                reference_type: 'SALE',
                reference_id: TRX_1,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
        ]);

        // ─────────────────────────────────────────
        // 7. Transactions
        //    Model: transaction_id (UUID), transaction_code STRING(50) unique,
        //           total_price DECIMAL(12,2),
        //           payment_method ENUM('CASH','DEBIT','CREDIT','QRIS'),
        //           transaction_date DATE, paranoid
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('transactions', [
            {
                transaction_id: TRX_1,
                transaction_code: 'TRX-20260420-001',
                total_price: 23000.00,
                payment_method: 'CASH',
                transaction_date: NOW,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                transaction_id: TRX_2,
                transaction_code: 'TRX-20260420-002',
                total_price: 15000.00,
                payment_method: 'QRIS',
                transaction_date: NOW,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
        ]);

        // ─────────────────────────────────────────
        // 8. Transaction Items
        //    Model: transaction_item_id (UUID), transaction_id (UUID FK),
        //           products_id (UUID FK), price DECIMAL(12,2), qty INTEGER, paranoid
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('transaction_items', [
            {
                transaction_item_id: TRX_ITEM_1,
                transaction_id: TRX_1,
                products_id: PRODUCT_1,
                price: 3000.00,
                qty: 5,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                transaction_item_id: TRX_ITEM_2,
                transaction_id: TRX_1,
                products_id: PRODUCT_2,
                price: 4000.00,
                qty: 2,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                transaction_item_id: TRX_ITEM_3,
                transaction_id: TRX_2,
                products_id: PRODUCT_3,
                price: 15000.00,
                qty: 1,
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
        ]);

        // ─────────────────────────────────────────
        // 9. Ledger
        //    Model: ledger_id (UUID), reference_type ENUM('SALE','PURCHASE'),
        //           reference_id UUID, debit DECIMAL(15,2), credit DECIMAL(15,2),
        //           description STRING, paranoid
        //    Convention: SALE → debit (uang masuk), PURCHASE → credit (uang keluar)
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('ledger', [
            {
                ledger_id: LEDGER_1,
                reference_type: 'PURCHASE',
                reference_id: PO_1,
                debit: 0.00,
                credit: 360000.00,
                description: 'Purchase Order received - PT Indofood Sukses Makmur',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
            {
                ledger_id: LEDGER_2,
                reference_type: 'SALE',
                reference_id: TRX_1,
                debit: 23000.00,
                credit: 0.00,
                description: 'Sale - TRX-20260420-001',
                createdAt: NOW,
                updatedAt: NOW,
                deletedAt: null,
            },
        ]);

        // ─────────────────────────────────────────
        // 10. Stock Reports
        //     Model: report_id (UUID), products_id (UUID FK),
        //            system_stock INTEGER, actual_stock INTEGER,
        //            difference INTEGER, status STRING default 'PENDING'
        //            Note: no paranoid (no deletedAt)
        // ─────────────────────────────────────────
        await queryInterface.bulkInsert('stock_reports', [
            {
                report_id: REPORT_1,
                products_id: PRODUCT_1,
                system_stock: 115,   // 120 IN - 5 OUT
                actual_stock: 113,   // hasil hitung fisik
                difference: -2,      // actual - system
                status: 'PENDING',
                createdAt: NOW,
                updatedAt: NOW,
            },
            {
                report_id: REPORT_2,
                products_id: PRODUCT_2,
                system_stock: 200,
                actual_stock: 200,
                difference: 0,
                status: 'APPROVED',
                createdAt: NOW,
                updatedAt: NOW,
            },
        ]);
    },

    async down(queryInterface) {
        // Hapus dalam urutan terbalik untuk menghindari FK constraint error
        await queryInterface.bulkDelete('stock_reports', null, {});
        await queryInterface.bulkDelete('ledger', null, {});
        await queryInterface.bulkDelete('transaction_items', null, {});
        await queryInterface.bulkDelete('transactions', null, {});
        await queryInterface.bulkDelete('stock_logs', null, {});
        await queryInterface.bulkDelete('purchase_order_items', null, {});
        await queryInterface.bulkDelete('purchase_orders', null, {});
        await queryInterface.bulkDelete('Products', null, {});
        await queryInterface.bulkDelete('Users', null, {});
        await queryInterface.bulkDelete('Suppliers', null, {});
    },
};
