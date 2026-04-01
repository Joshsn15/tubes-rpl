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
    products_name!: string;

    @Column({
        type: DataType.ENUM('FOOD', 'DRINK', 'HEALTH', 'BEAUTY'),
        allowNull: false,
    })
    category!: 'FOOD' | 'DRINK' | 'HEALTH' | 'BEAUTY';

    @Column({
        type: DataType.DECIMAL(12,2),
        allowNull: false,
    })
    price!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    stock!: number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    manufacture_date!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    expiry_date!: Date;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @HasMany(() => PurchaseOrderItems, 'poi_id')
    poi!: PurchaseOrderItems[];

    @HasMany(() => StockLogs, 'stock_id')
    stocks!: StockLogs[];

    @HasMany(() => TransactionItems, 'stock_id')
    tis!: TransactionItems[];
}