import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

class Donor extends Model {
  public donorId!: number;
  public firstName!: string;
  public middleName?: string;
  public lastName!: string;
  public gender!: 'male' | 'female' | 'other';
  public dateOfBirth?: Date;
  public address!: string;
  public contactNumber!: string;
  public email!: string;
  public bloodGroupId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Donor.init(
  {
    donorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING(50),
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bloodGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BloodGroups',
        key: 'bloodGroupId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'Donor',
    tableName: 'Donors',
    timestamps: true,
    underscored: false,
  }
);

export default Donor;
