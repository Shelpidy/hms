import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface BloodGroupAttributes {
  bloodGroupId: string;
  groupName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BloodGroupCreationAttributes extends Optional<BloodGroupAttributes, 'bloodGroupId' | 'createdAt' | 'updatedAt'> {}

class BloodGroup extends Model<BloodGroupAttributes, BloodGroupCreationAttributes> implements BloodGroupAttributes {
  public bloodGroupId!: string;
  public groupName!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

BloodGroup.init(
  {
    bloodGroupId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    groupName: {
      allowNull: false,
      type: DataTypes.STRING(10),
    },
    createdAt: {
     
      type: DataTypes.DATE,
    },
    updatedAt: {
      
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'BloodGroup',
    tableName: 'BloodGroups',
    timestamps: false,
    underscored: false,
  }
);

export default BloodGroup;
