'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('purchase_order_items', {
            poi_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            purchase_qty: {
                type: Sequelize.INTEGER, 
                allowNull: false,
            },
            cost: {
                type: Sequelize.DECIMAL(12,2),
                allowNull: false,
            },        
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        });

        await queryInterface.addColumn('purchase_order_items', 'po_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'purchase_orders',
                key: 'po_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })

        await queryInterface.addColumn('purchase_order_items', 'products_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'Products',
                key: 'products_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('purchase_order_items', 'po_id')
        await queryInterface.removeColumn('purchase_order_items', 'products_id')
        await queryInterface.dropTable('purchase_order_items');
    }
};