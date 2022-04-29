import {
  Model,
  Table,
  Column,
  DataType,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { UserOrganization } from './user-organization.model';

@Table({
  tableName: 'organizations',
})
export class Organization extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: true,
  })
  logo: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  address: string;

  @Column({
    allowNull: false,
  })
  jib: string;

  @BelongsToMany(() => User, () => UserOrganization)
  users: User[];
}
