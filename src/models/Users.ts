import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface UserAttributes {
  userId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  profileImage?: string;
  contactNumber: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  address?: string;
  password: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userId' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userId!: number;
  public firstName!: string;
  public middleName?: string;
  public lastName!: string;
  public profileImage?: string;
  public contactNumber!: string;
  public gender!: 'male' | 'female' | 'other';
  public dateOfBirth?: Date;
  public address?: string;
  public password!: string;
  public email!: string;
  public role!: 'patient' | 'doctor' | 'admin';
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init(
  {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    middleName: {
      type: DataTypes.STRING(50),
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    profileImage: {
      type: DataTypes.STRING(8000),
    },
    contactNumber: {
      allowNull: false,
      type: DataTypes.STRING(15),
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM('male', 'female', 'other'),
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING(100),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50),
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM('patient', 'doctor', 'admin'),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
    underscored: false,
  }
);

export default User;
