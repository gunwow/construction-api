import {
  Model,
  Table,
  Column,
  DataType,
  Default,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { Role } from './role.model';

@Table({
  tableName: 'users_roles',
  timestamps: false,
})
export class UserRole extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  roleId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  userId: string;
}
