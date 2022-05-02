import { Model, Column, DataType, Default, Table } from 'sequelize-typescript';
import { Role } from '../type/role.enum';

@Table
export class User extends Model {
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

  @Column({
    allowNull: false,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: true,
  })
  verifiedAt: Date | null;

  @Column({
    allowNull: false,
    type: DataType.ENUM,
    values: Object.values(Role),
  })
  role: Role;
}
