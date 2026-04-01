'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ledger", {
            ledger_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            reference_type: { //kl purchase masuk debit, kl sale credit
                type: Sequelize.ENUM("SALE","PURCHASE"),
                allowNull: false
            },
            reference_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            debit: {
                type: Sequelize.DECIMAL(15, 2),
                defaultValue: 0
            },
            credit: {
                type: Sequelize.DECIMAL(15, 2),
                defaultValue: 0
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

        await queryInterface.addColumn('ledger', 'transaction_id', {
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

        await queryInterface.addColumn('ledger', 'po_id', {
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
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('ledger', 'transaction_id')
        await queryInterface.removeColumn('ledger', 'po_id')
        await queryInterface.dropTable('ledger');
    }
}