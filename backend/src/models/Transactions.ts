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

import { Users } from "./Users.js";

@Table({
  tableName: "transactions",
  timestamps: true,
  paranoid: true
})
export class Transactions extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false
  })
  declare transaction_id: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  transaction_code!: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  cashier_id!: string;

  @BelongsTo(() => Users)
  cashier!: Users;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false
  })
  total_price!: number;

  @Column({
    type: DataType.ENUM("CASH","DEBIT","CREDIT","QRIS"),
    allowNull: false
  })
  payment_method!: "CASH" | "DEBIT" | "CREDIT" | "QRIS";

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  transaction_date!: Date;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}