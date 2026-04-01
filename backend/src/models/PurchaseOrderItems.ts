import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from 'sequelize-typescript';
import { PurchaseOrders } from './PurchaseOrders';

@Table({
    tableName: 'purchase_order_items',
    timestamps: true,
    paranoid: true,
})
export class PurchaseOrderItems extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare poi_id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    purchase_qty!: number;

    @Column({
        type: DataType.DECIMAL(12,2),
        allowNull: false,
    })
    cost!: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => PurchaseOrders, 'po_id')
    pos!: PurchaseOrders;
    
}