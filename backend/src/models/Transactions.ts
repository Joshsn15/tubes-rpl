import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany
} from "sequelize-typescript";
import { TransactionItems } from "./TransactionItems";

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
  declare transaction_code: string;


  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false
  })
  declare total_price: number;

  @Column({
    type: DataType.ENUM("CASH", "DEBIT", "CREDIT", "QRIS"),
    allowNull: false
  })
  declare payment_method: "CASH" | "DEBIT" | "CREDIT" | "QRIS";

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  declare transaction_date: Date;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
  @HasMany(() => TransactionItems, 'transaction_id')
  declare ti: TransactionItems[];
}

