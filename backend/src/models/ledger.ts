import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt, UpdatedAt, DeletedAt,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { PurchaseOrders } from "./PurchaseOrders";
import { Transactions } from "./Transactions";

@Table({
  tableName: "ledger",
  timestamps: false,
  paranoid: true
})
export class Ledger extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare ledger_id: string;

  @Column({
    type: DataType.ENUM("SALE", "PURCHASE"),
    allowNull: false
  })
  declare reference_type: "SALE" | "PURCHASE";

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare reference_id: string;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  })
  declare debit: number;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  })
  declare credit: number;

  // FK ke transactions
  @ForeignKey(() => Transactions)
  @Column({ type: DataType.UUID, allowNull: false })
  declare transaction_id: string;

  @BelongsTo(() => Transactions)
  declare transactions: Transactions;

  // FK ke purchase_orders
  @ForeignKey(() => PurchaseOrders)
  @Column({ type: DataType.UUID, allowNull: false })
  declare po_id: string;

   @BelongsTo(() => PurchaseOrders)
  declare purchase_order: PurchaseOrders;
  
  @CreatedAt
    declare createdAt: Date;

  @UpdatedAt
    declare updatedAt: Date;

  @DeletedAt
    declare deletedAt: Date;

}