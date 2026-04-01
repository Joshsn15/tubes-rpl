'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('transactions', {
            transaction_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            transaction_code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            total_price: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false
            },

            payment_method: {
                type: Sequelize.ENUM('CASH', 'DEBIT', 'CREDIT', 'QRIS'),
                allowNull: false
            },

            transaction_date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
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

        

        
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('transactions');
    }
}