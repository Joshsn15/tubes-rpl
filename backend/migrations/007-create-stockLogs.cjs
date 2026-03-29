'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('stock_logs', {
            stock_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            change_type: {
                type: Sequelize.ENUM('IN', 'OUT', 'ADJUST'), 
                allowNull: false,
            },
            stock_qty: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },        
            reference_type: { //kl misal reference typenya purchase, berarti stoknya nambah krn dia beli dr supplier
                type: Sequelize.ENUM('SALE', 'PURCHASE'), 
                allowNull: false,
            },
            reference_id: {
                type: Sequelize.INTEGER, 
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

        await queryInterface.addColumn('stock_logs', 'products_id', {
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
        await queryInterface.removeColumn('stock_logs', 'products_id')
        await queryInterface.dropTable('stock_logs');
    }
};