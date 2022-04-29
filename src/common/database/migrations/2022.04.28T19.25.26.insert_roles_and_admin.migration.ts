import { IMigratorOptions } from '../type';
import { v4 as uuidv4 } from 'uuid';

export const up = async ({ context }: IMigratorOptions): Promise<void> => {
  const adminRoleId: string = uuidv4();
  const roles: { name: string; isChoosable: boolean }[] = [
    { name: 'admin', isChoosable: false },
    { name: 'company', isChoosable: true },
    { name: 'receptionist', isChoosable: false },
    { name: 'commercialist', isChoosable: false },
    { name: 'customer', isChoosable: true },
  ];

  await context.bulkInsert(
    'roles',
    roles.map((role, index: number) => ({
      id: index === 0 ? adminRoleId : uuidv4(),
      ...role,
    })),
  );

  const adminId: string = uuidv4();
  await context.bulkInsert('users', [
    {
      id: adminId,
      name: 'Administrator',
      email: 'admin@admin.com',
      password: '$2a$10$vvzsC6q3qfVFEM7D9jQ6MuFWMRTaSzCBZ//t8cJwtInr4dt51MvCy', // admin1234
      activatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await context.bulkInsert('users_roles', [
    { id: uuidv4(), roleId: adminRoleId, userId: adminId },
  ]);
};

export const down = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.bulkDelete('users_roles', {});
  await context.bulkDelete('roles', {});
  await context.bulkDelete('users', {});
};
