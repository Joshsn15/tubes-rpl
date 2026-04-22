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

import { Products } from "./products.js";
import { Transactions } from "./Transactions.js";
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
  declare transaction_id: string;

  @BelongsTo(() => Transactions)
  declare transaction: Transactions;

  // FK → Product
  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare products_id: string;

  @BelongsTo(() => Products)
  declare product: Products;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare qty: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}
