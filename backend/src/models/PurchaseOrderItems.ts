import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from 'sequelize-typescript';
import { PurchaseOrders } from './PurchaseOrders';
import { Products } from './products';

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
        type: DataType.DECIMAL(12, 2),
        allowNull: false,
    })
    declare cost: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare products_id: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => PurchaseOrders, 'po_id')
    declare pos: PurchaseOrders;
    @BelongsTo(() => Products, 'products_id')
    declare product: Products;
}