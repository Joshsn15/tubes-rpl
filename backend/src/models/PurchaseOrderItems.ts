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
        type: DataType.UUID,
        allowNull: false
    })
    declare po_id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare purchase_qty: number;

    @Column({
        type: DataType.DECIMAL(12,2),
        allowNull: false,
    })
    declare cost: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => PurchaseOrders, 'po_id')
    declare pos: PurchaseOrders;
    
}