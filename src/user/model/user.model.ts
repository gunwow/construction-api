import {
  Model,
  Column,
  DataType,
  Default,
  Table,
  BelongsToMany,
  DefaultScope,
} from 'sequelize-typescript';
import { Role } from '../../role/model/role.model';
import { UserRole } from '../../role/model/user-role.model';

@DefaultScope(() => ({
  include: [Role],
}))
@Table({
  tableName: 'users',
})
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
  activatedAt: Date | null;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
