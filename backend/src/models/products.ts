import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { PurchaseOrderItems } from './PurchaseOrderItems';
import { StockLogs } from './StockLogs';
import { TransactionItems } from './TransactionItems';

@Table({
    tableName: 'products',
    timestamps: true,
    paranoid: true,
})
export class Products extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare products_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare products_name : string;

    @Column({
        type: DataType.ENUM('FOOD', 'DRINK', 'HEALTH', 'BEAUTY'),
        allowNull: false,
    })
    declare category : 'FOOD' | 'DRINK' | 'HEALTH' | 'BEAUTY';

    @Column({
        type: DataType.DECIMAL(12,2),
        allowNull: false,
    })
    declare price : string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare stock : number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare manufacture_date : Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare expiry_date : Date;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @HasMany(() => PurchaseOrderItems, 'poi_id')
    declare poi : PurchaseOrderItems[];

    @HasMany(() => StockLogs, 'stock_id')
    declare stocks : StockLogs[];

    @HasMany(() => TransactionItems, 'transaction_item_id')
    declare tis : TransactionItems[];
}