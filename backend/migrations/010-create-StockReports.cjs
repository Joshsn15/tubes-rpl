'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("stock_reports", {
            report_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            system_stock: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            actual_stock: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            difference: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED'),
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

        await queryInterface.addColumn('stock_reports', 'products_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: {
                model: 'products',
                key: 'products_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('stock_reports', 'products_id')
        await queryInterface.dropTable('stock_reports');
    }
}