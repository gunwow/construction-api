import { Model, Table, Column, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;
}
