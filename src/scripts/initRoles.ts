import { Role } from '../models/Role';
import { ROLES_ENUM } from '../enums/roles.enum';

export const initRoles = async (mongoose: any) => {
  try {
    const roles = Object.values(ROLES_ENUM);

    for (let i = 0; i < roles.length; i++) {
      // Check if role already exists
      const roleExists = await Role.findOne({ name: roles[i] });
      if (roleExists) {
        console.info(`Role ${roles[i]} already exists!`);
        continue;
      }

      const role = new Role({
        name: roles[i],
        permissions: [], // Empty for now, you can populate it based on your requirements
      });

      await role.save();
      console.info(`Role ${roles[i]} created successfully!`);
    }
  } catch (error) {
    console.error('Error creating roles:', error);
  } finally {
    // mongoose.connection.close(); // Close the MongoDB connection after creating roles
  }
};
