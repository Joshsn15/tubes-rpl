import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey
} from "sequelize-typescript";

@Table({
  tableName: "ledger",
  timestamps: false
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
  reference_type!: "SALE" | "PURCHASE";

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  reference_id!: string;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  })
  debit!: number;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  })
  credit!: number;

  @CreatedAt
    declare createdAt: Date;

  @UpdatedAt
    declare updatedAt: Date;

  @DeletedAt
    declare deletedAt: Date;

}