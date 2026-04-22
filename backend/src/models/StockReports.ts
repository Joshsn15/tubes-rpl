import {
    Table, Column, Model, DataType, PrimaryKey,
    CreatedAt, UpdatedAt, BelongsTo
} from "sequelize-typescript";
import { Products } from "./products";

@Table({
    tableName: "stock_reports",
    timestamps: true
})
export class StockReports extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare report_id: string;

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare products_id: string;

    @Column(DataType.INTEGER)
    declare system_stock: number;

    @Column(DataType.INTEGER)
    declare actual_stock: number;

    @Column(DataType.INTEGER)
    declare difference: number;

    @Column({
        type: DataType.STRING,
        defaultValue: "PENDING"
    })
    declare status: "PENDING" | "APPROVED" | "REJECTED";

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @BelongsTo(() => Products, "products_id")
    declare product: Products;
}