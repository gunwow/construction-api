import {
  Model,
  Table,
  Column,
  DataType,
  Default,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { Organization } from './organization.model';

@Table({
  tableName: 'users_organizations',
  timestamps: false,
})
export class UserOrganization extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Organization)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  organizationId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUIDV4,
    allowNull: false,
  })
  userId: string;
}
