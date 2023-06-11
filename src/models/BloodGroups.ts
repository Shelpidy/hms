import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface BloodGroupAttributes {
  bloodGroupId: number;
  groupName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BloodGroupCreationAttributes extends Optional<BloodGroupAttributes, 'bloodGroupId' | 'createdAt' | 'updatedAt'> {}

class BloodGroup extends Model<BloodGroupAttributes, BloodGroupCreationAttributes> implements BloodGroupAttributes {
  public bloodGroupId!: number;
  public groupName!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

BloodGroup.init(
  {
    bloodGroupId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    groupName: {
      allowNull: false,
      type: DataTypes.STRING(10),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
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
