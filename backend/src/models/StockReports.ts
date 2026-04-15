import {
    Table, Column, Model, DataType, PrimaryKey,
    CreatedAt, UpdatedAt, BelongsTo
} from "sequelize-typescript";
import { Products } from "./Products";

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
    report_id!: string;

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    products_id!: string;

    @Column(DataType.INTEGER)
    system_stock!: number;

    @Column(DataType.INTEGER)
    actual_stock!: number;

    @Column(DataType.INTEGER)
    difference!: number;

    @Column({
        type: DataType.STRING,
        defaultValue: "PENDING"
    })
    status!: "PENDING" | "APPROVED" | "REJECTED";

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @BelongsTo(() => Products, "products_id")
    product!: Products;
}