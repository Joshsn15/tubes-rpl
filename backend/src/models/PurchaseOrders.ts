import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from 'sequelize-typescript';
import { Suppliers } from './Suppliers';

@Table({
    tableName: 'purchase_orders',
    timestamps: true,
    paranoid: true,
})
export class PurchaseOrders extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare po_id: string;

    @Column({
        type: DataType.DECIMAL(12,2),
        allowNull: false,
    })
    total_cost!: string;

    @Column({
        type: DataType.ENUM('PENDING', 'RECEIVED', 'CANCELED'),
        allowNull: true,
    })
    status!: 'PENDING' | 'RECEIVED' | 'CANCELED';


    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => Suppliers, 'suppliers_id')
    suppliers!: Suppliers;
    
}