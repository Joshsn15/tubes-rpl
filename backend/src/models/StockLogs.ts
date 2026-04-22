import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from 'sequelize-typescript';
import { Products } from './Products';

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
        allowNull: false
    })
    declare products_id: string;

    @Column({
        type: DataType.ENUM('IN', 'OUT', 'ADJUST'),
        allowNull: false,
    })
    declare change_type: 'IN' | 'OUT' | 'ADJUST';

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare stock_qty: number;

    @Column({
        type: DataType.ENUM('SALE', 'PURCHASE', 'ADJUST', 'RETURN'),
        allowNull: true,
    })
    declare reference_type: 'SALE' | 'PURCHASE';

    @Column({
        type: DataType.UUID,
        allowNull: false,
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