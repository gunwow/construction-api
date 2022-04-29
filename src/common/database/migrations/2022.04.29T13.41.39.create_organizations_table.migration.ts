import sequelize, { DataTypes } from 'sequelize';
import { IMigratorOptions } from '../type';

export const up = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.createTable('organizations', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    logo: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jib: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  await context.createTable('users_organizations', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    organizationId: {
      type: DataTypes.UUID,
      references: {
        model: 'organizations',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });
};

export const down = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.dropTable('users_organizations');
  await context.dropTable('organizations');
};
