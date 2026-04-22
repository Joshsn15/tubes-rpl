'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transaction_items', {
            transcation_item_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            price: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false
            },
            qty: {
                type: Sequelize.INTEGER,
                allowNull: false
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

        await queryInterface.addColumn('transaction_items', 'transaction_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: {
                model: 'transactions',
                key: 'transaction_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })

        await queryInterface.addColumn('transaction_items', 'products_id', {
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
        await queryInterface.removeColumn('transaction_items', 'transaction_id')
        await queryInterface.removeColumn('transaction_items', 'products_id')
        await queryInterface.dropTable('transaction_items');
    }

}