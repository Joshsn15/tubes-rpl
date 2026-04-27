import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from 'sequelize-typescript';
import { Products } from './products';

@Table({
    tableName: 'stock_logs',
    timestamps: true,
    paranoid: true,
})
export class StockLogs extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare stock_id: string;

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    declare products_id: string;

    @Column({
        type: DataType.ENUM('IN', 'OUT', 'ADJUST', 'RETURN', 'MANUAL'),
        allowNull: false,
    })
    declare change_type: 'IN' | 'OUT' | 'ADJUST' | 'MANUAL';

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare stock_qty: number;

    @Column({
        type: DataType.ENUM('SALE', 'PURCHASE', 'ADJUST'),
        allowNull: true,
    })
    declare reference_type: 'SALE' | 'PURCHASE' |'ADJUST';

    @Column({
        type: DataType.UUID,
        allowNull: false,
        // defaultValue: DataType.UUIDV4,
        // ini dapet dari po_id / transaction_id
    })
    declare reference_id: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => Products, 'products_id')
    declare products: Products;

}