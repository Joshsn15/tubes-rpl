'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            products_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            products_name: {
                type: Sequelize.STRING, 
                allowNull: false,
            },
            category: {
                type: Sequelize.ENUM('FOOD', 'DRINK', 'HEALTH', 'BEAUTY','HOUSEHOLD'),
                allowNull: false,
            },        
            price: {
                type: Sequelize.DECIMAL(12,2),
                allowNull: false,
            },        
            stock: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },        
            manufacture_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },        
            expiry_date: {
                type: Sequelize.DATEONLY,
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
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('products');
    }
};