import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from "sequelize-typescript";

import { Products } from "./Products.js";
import { Transactions } from "./Transactions";
@Table({
  tableName: "transaction_items",
  timestamps: true,
  paranoid: true
})
export class TransactionItems extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false
  })
  declare transaction_item_id: string;

  // FK → Transaction
  @ForeignKey(() => Transactions)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  transaction_id!: string;

  @BelongsTo(() => Transactions)
  transaction!: Transactions;

  // FK → Product
  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  product_id!: string;

  @BelongsTo(() => Products)
  product!: Products;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  qty!: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}