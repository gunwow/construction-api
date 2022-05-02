import {
  Model,
  Table,
  Column,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';

@Table
export class BarberShop extends Model {
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

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: string;

  @Column
  imageURL: string | null;

  @Column
  coverImageURL: string | null;

  @Column({
    allowNull: false,
  })
  address: string;

  @Column
  longitude: number | null;

  @Column
  latitude: number | null;

  @BelongsTo(() => User)
  user: User;
}
