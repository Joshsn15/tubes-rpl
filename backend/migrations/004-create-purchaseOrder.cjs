'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('purchase_orders', {
            po_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            total_cost: {
                type: Sequelize.DECIMAL(12,2), 
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'RECEIVED', 'CANCELED'),
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

        await queryInterface.addColumn('purchase_orders', 'suppliers_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'suppliers',
                key: 'suppliers_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('purchase_orders', 'suppliers_id')
        await queryInterface.dropTable('purchase_orders');
    }
};