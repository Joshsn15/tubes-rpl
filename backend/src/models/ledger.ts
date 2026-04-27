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
// ledger.ts — yang bener
@Table({ tableName: "ledger", timestamps: true, paranoid: true })
export class Ledger extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare ledger_id: string;

  @Column({ type: DataType.ENUM("SALE", "PURCHASE"), allowNull: false })
  declare reference_type: "SALE" | "PURCHASE";

  @Column({ type: DataType.UUID, allowNull: false })
  declare reference_id: string;

  @Column({ type: DataType.DECIMAL(15, 2), defaultValue: 0 })
  declare debit: number;   // uang masuk (SALE)

  @Column({ type: DataType.DECIMAL(15, 2), defaultValue: 0 })
  declare credit: number;  // uang keluar (PURCHASE)

  @Column({ type: DataType.STRING, allowNull: true })
  declare description: string;

  @CreatedAt declare createdAt: Date;
  @UpdatedAt declare updatedAt: Date;
  @DeletedAt declare deletedAt: Date;
}